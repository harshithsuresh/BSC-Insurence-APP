import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import ErrorMsg from './component/ErrorMSG';

const HomeScreen = () => {
  const history = useHistory();
  const [policyId, setPolicyID] = useState('');
  const [showError, setShowError] = useState(false);
  const onSubmitHandler = () => {
    // Validating search input
    if (policyId) {
      setShowError(false);
      // Redirect to premiumDetails screen
      history.push({
        pathname: `/policyDetails/${policyId}`,
      });
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };
  return (
    <div className=" h-screen">
      <div className="w-full mt-48 flex justify-center items-center ">
        <div className="w-full ">
          <div className="flex justify-center text-5xl mb-10 text-secondary">
            Search Insurence Details
          </div>
          <div>
            <div className="">
              <div className="flex justify-center w-full item-center">
                <BiSearch size="40" className="text-onBackground"></BiSearch>
                <input
                  className="border w-1/2 rounded h-12"
                  placeholder="   Search Insurence PremiumID or Customer ID"
                  type="search"
                  required
                  onChange={(e) => setPolicyID(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex justify-center w-full item-center mt-8 ">
              {showError ? (
                <ErrorMsg Text="Enter PremiumID or CustomerID" />
              ) : null}
            </div>
          </div>
          <div className="flex justify-center w-full item-center mt-8 ">
            <button
              className="border w-1/3 h-10 rounded bg-secondary text-white"
              type="submit"
              onClick={onSubmitHandler}
            >
              Search Premium Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
