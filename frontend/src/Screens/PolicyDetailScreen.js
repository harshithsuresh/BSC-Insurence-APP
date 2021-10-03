import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PremiumDetailsTab from './component/PremiumDetailsTab';
import _ from 'lodash';

const PolicyDetailScreen = () => {
  const history = useHistory();

  const { policyID } = useParams();

  const [premiumDetails, setPremiumDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({});

  useEffect(() => {
    // Fetching premium Details from DB
    try {
      async function fetchPremiumDetails() {
        const { data } = await axios.get(`/api/getPremiumDetails/${policyID}`);
        setPremiumDetails(data);
        setCustomerDetails(_.omit(data, ['premiumList']));
      }
      fetchPremiumDetails();
    } catch {
      alert('Error loading Premium Details');
      history.goBack();
    }
  }, [policyID, history]);

  const policyEditClicked = (premiumDetails) => {
    history.push({
      pathname: '/editPremiumDetails',
      premiumDetails: premiumDetails,
      customerDetails: customerDetails,
    });
  };

  const renderPremiumDetails = () => {
    const premiumList = premiumDetails.premiumList.map((premium) => {
      return (
        // Rendering each premium in different tabs
        <PremiumDetailsTab
          key={premium.premiumID}
          policyEditClicked={(premiumDetails) =>
            policyEditClicked(premiumDetails)
          }
          premiumDetails={premium}
          customerDetails={customerDetails}
        />
      );
    });
    return [premiumList];
  };

  return (
    <div>
      {premiumDetails && Object.keys(premiumDetails).length === 0 ? (
        <div className="mt-20 text-5xl flex justify-center items-center text-secondary">
          No premium Found
        </div>
      ) : (
        <div className="w-full h-auto">
          <div className="text-5xl flex justify-left lg:ml-28 p-2 items-center text-secondary">
            Premium Details
          </div>
          <div className="flex justify-around p-2">
            <div className="w-4/6">{renderPremiumDetails()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyDetailScreen;
