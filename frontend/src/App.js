import './App.css';
import HomeScreen from './Screens/HomeScreen';
import GraphScreen from './Screens/GraphScreen';
import Header from './Screens/component/Header';
import PolicyDetailScreen from './Screens/PolicyDetailScreen';
import EditPolicyDetails from './Screens/EditPremiumDetails';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <div className="">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/viewGraph" component={GraphScreen} />
          <Route
            exact
            path="/editPremiumDetails/"
            component={EditPolicyDetails}
          />
          <Route
            exact
            path="/policyDetails/:policyID"
            component={PolicyDetailScreen}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
