import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../canvasjs.react';
import axios from 'axios';
import _ from 'lodash';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphScreen = ({ history }) => {
  const [regions, setRegions] = useState(['North', 'South', 'West', 'East']);
  const [monthCount, setMonthCount] = useState({});

  useEffect(() => {
    async function fetchCount() {
      // Fetching Aggegrated count
      try {
        const { data } = await axios.get('/api/getPremiumCounts/');
        setMonthCount(data);
      } catch {
        alert('Error fetching Graph count');
        history.goBack();
      }
    }
    fetchCount();
  }, [setMonthCount, history]);

  // Converting count to graph format {label:01-01-2018,y:10}
  let temp = {};
  _.forEach(monthCount, function (value, key) {
    if (regions.includes(key)) {
      _.forEach(value, function (v) {
        if (v[v['month']] in temp) {
          temp[v['month']] += v['count'];
        } else {
          temp[v['month']] = v['count'];
        }
      });
    }
  });
  let result = [];
  _.forEach(temp, function (value, key) {
    result.push({ label: key, y: parseInt(value) });
  });

  // Updating Graph details
  const options = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: 'No of Polices based on month',
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: 'column',
        indexLabelFontColor: '#5A5757',
        indexLabelPlacement: 'outside',
        dataPoints: result,
      },
    ],
  };
  return (
    <div className="p-10">
      <div className="">
        Select Region :{/* Select Option for region */}
        <select
          className="p-2"
          value={regions}
          onChange={(e) => setRegions(e.target.value)}
        >
          <option value="['North', 'South', 'West', 'East']" default>
            All
          </option>
          <option value="[North]">North</option>
          <option value="[South]">South</option>
          <option value="[East]">East</option>
          <option value="[West">West</option>
        </select>
      </div>
      {/* Display Graph */}
      <div className="">
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
};

export default GraphScreen;
