import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import ErrorMsg from './component/ErrorMSG';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

const EditPremiumDetails = ({ history, location }) => {
  const [premiumDetails, setPremiumDetails] = useState(location.premiumDetails);
  const [customerDetails, setCustomerDetails] = useState(
    location.customerDetails
  );
  const [showPremiumAmountError, setShowPremiumAmountError] = useState(false);

  // Update Premium Details
  const updatePremiumValue = (val, key) => {
    setPremiumDetails({
      ...premiumDetails,
      [key]: val,
    });
  };
  // Update Customer Details
  const updateCustomerValue = (val, key) => {
    setCustomerDetails({
      ...customerDetails,
      [key]: val,
    });
  };

  // Validate premiumAmount is less than 1 million
  const onPremiumValueChange = (val, key) => {
    if (key === 'premiumAmount') {
      if (parseInt(val) > 1000000) {
        setShowPremiumAmountError(true);
      } else {
        setShowPremiumAmountError(false);
        updatePremiumValue(val, key);
      }
    } else {
      updatePremiumValue(val, key);
    }
  };

  // On submit clicked Updating the values
  const submitClicked = async (e) => {
    let data = JSON.stringify(_.merge(premiumDetails, customerDetails));
    const options = {
      headers: { 'content-type': 'application/json' },
    };
    function UpdatePremiumDetails() {
      const result = axios
        .post(`/api/updatePremiumDetails/`, data, options)
        .then((response) => {
          alert('Success');
          history.push({
            pathname: `/policyDetails/${premiumDetails.premiumID}`,
          });
        })
        .catch((error) => {
          alert('Error');
          history.push({
            pathname: `/policyDetails/${premiumDetails.premiumID}`,
          });
        });
      return result;
    }
    UpdatePremiumDetails();
  };

  return (
    <div>
      {/* Load if premium details exist  */}
      {premiumDetails && Object.keys(premiumDetails).length !== 0 ? (
        <div className="w-full h-auto">
          <div className="lg:w-3/4 mx-auto px-5 lg:px-0 py-10">
            <div className="mx-auto rounded-lg shadow-sm w-full lg:w-3/4 h-full p-2 lg:p-10 bg-secondary m-5">
              <div className="text-4xl text-white py-6">Update Details</div>
              <div className="bg-onBackground rounded-l-none rounded-lg w-full h-2"></div>
              <div className="grid grid-cols-12">
                <div className="col-span-1 bg-onBackground rounded-t-none rounded-lg w-2 h-full"></div>
                <div className="col-span-11 pt-10 text-onSurface">
                  <label className="font-semibold text-3xl">Premium Info</label>
                  <div className="w-3/4 bg-onSurface h-0.5"></div>
                  <div className="p-4 lg:pt-10 lg:grid lg:grid-cols-12">
                    <div className="lg:col-span-9 pl-4">
                      <div className="mb-5 lg:grid lg:grid-cols-2 gap-10">
                        <div className="mb-5 lg:mb-0 pt-0 text-2xl">
                          Premium ID
                          <div>
                            <input
                              className="text-white rounded w-72 h-12 "
                              value={premiumDetails.premiumID || ''}
                              disabled
                            ></input>
                          </div>
                        </div>
                        <div className="pt-0 text-2xl">
                          Date Of Purchage
                          <div>
                            <input
                              className="text-white rounded w-72 h-12 "
                              type="text"
                              value={premiumDetails.dateOfPurchage}
                              disabled
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="mb-5 lg:grid lg:grid-cols-2 gap-10">
                        <div className="mb-5 lg:mb-0 pt-0 text-2xl">
                          Premium Amount
                          <div>
                            <input
                              className="text-black rounded w-72 h-12 "
                              value={premiumDetails.premiumAmount}
                              placeholder="Premium Amount"
                              required
                              onChange={(e) =>
                                onPremiumValueChange(
                                  e.target.value,
                                  'premiumAmount'
                                )
                              }
                            />
                            {/* Display error if Value is more than 1 million */}
                            {showPremiumAmountError ? (
                              <ErrorMsg Text="Premium amount should below 1000000(1 million)" />
                            ) : null}
                          </div>
                        </div>
                        <div className="pt-0 text-2xl">
                          Body Injury Liability
                          <div>
                            <input
                              className="text-black rounded w-72 h-12 "
                              type="number"
                              placeholder="Body Injury Liability "
                              required
                              value={premiumDetails.bodyInjuryLiability}
                              onChange={(e) =>
                                onPremiumValueChange(
                                  e.target.value,
                                  'bodyInjuryLiability'
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-5 lg:grid lg:grid-cols-2 gap-10">
                        <div className="mb-5 lg:mb-0 pt-0 text-2xl">
                          Personal Injury Protection
                          <div>
                            <input
                              className="text-black rounded w-72 h-12 "
                              type="number"
                              placeholder="Personal Injury Protection "
                              required
                              value={premiumDetails.personalInjuryProtection}
                              onChange={(e) =>
                                onPremiumValueChange(
                                  e.target.value,
                                  'personalInjuryProtection'
                                )
                              }
                            ></input>
                          </div>
                        </div>
                        <div className="pt-0 text-2xl">
                          Property Damage Liability
                          <div>
                            <input
                              className="text-black rounded w-72 h-12 "
                              type="number"
                              placeholder="Property Damage Liability "
                              required
                              value={premiumDetails.propertyDamageLiability}
                              onChange={(e) =>
                                onPremiumValueChange(
                                  e.target.value,
                                  'propertyDamageLiability'
                                )
                              }
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="mb-5 lg:grid lg:grid-cols-2 gap-10">
                        <div className="mb-5 lg:mb-0 pt-0 text-2xl">
                          Collision
                          <div>
                            <input
                              className="text-black rounded w-72 h-12 "
                              type="number"
                              placeholder="Collision"
                              required
                              value={premiumDetails.collision}
                              onChange={(e) =>
                                onPremiumValueChange(
                                  e.target.value,
                                  'collision'
                                )
                              }
                            ></input>
                          </div>
                        </div>
                        <div className="pt-0 text-2xl">
                          Income Group
                          <div>
                            {/* Select option for Customer IncomeGroup */}
                            <select
                              className="p-2 text-black w-72 h-12 rounded"
                              value={premiumDetails.customerIncomeGroup}
                              onChange={(e) =>
                                onPremiumValueChange(
                                  e.target.value,
                                  'customerIncomeGroup'
                                )
                              }
                            >
                              <option value="0- $25K">0- $25K</option>
                              <option value="$25-$70K">$25-$70K</option>
                              <option value=">$70K">$70K</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto rounded-lg shadow-sm w-full lg:w-3/4 h-full p-2 lg:p-10 bg-secondary m-1">
              <div className="grid grid-cols-12">
                <div className="col-span-11 pt-10 text-onSurface">
                  <label className="font-semibold text-3xl">
                    Customer Info
                  </label>
                  <div className="w-3/4 bg-onSurface h-0.5"></div>
                  <div className="p-4 lg:p-10">
                    <div className="mb-5 lg:grid lg:grid-cols-2 gap-10">
                      <div className="mb-5 lg:mb-0 pt-0 text-2xl">
                        Customer ID
                        <div>
                          <input
                            className="rounded w-72 h-12 "
                            value={customerDetails.customerID}
                            disabled
                          ></input>
                        </div>
                      </div>
                      <div className="pt-0 text-2xl">
                        Fuel type
                        <div>
                          {/* Select option for fuel type */}
                          <select
                            className="p-2 text-black w-72 h-12 rounded"
                            value={customerDetails.fuel}
                            onChange={(e) =>
                              updateCustomerValue(e.target.value, 'fuel')
                            }
                          >
                            <option value="CNG">CNG</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mb-5 lg:grid lg:grid-cols-2 gap-10 text-2xl">
                      <div className="mb-5 lg:mb-0 pt-0">
                        Vechile Segment
                        <div>
                          {/* Select option for Segment type */}
                          <select
                            className="p-2 text-black w-72 h-12 rounded"
                            value={customerDetails.vechileSegment}
                            onChange={(e) =>
                              updateCustomerValue(
                                e.target.value,
                                'vechileSegment'
                              )
                            }
                          >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                          </select>
                        </div>
                      </div>
                      <div className="pt-0 text-2xl">
                        Gender
                        <div>
                          {/* Select option for gender */}
                          <select
                            className="p-2 text-black w-72 h-12 rounded"
                            value={customerDetails.gender}
                            onChange={(e) =>
                              updateCustomerValue(e.target.value, 'gender')
                            }
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mb-5 lg:grid lg:grid-cols-2 gap-10">
                      <div className="mb-5 lg:mb-0 pt-0 text-2xl">
                        Region
                        <div>
                          {/* Select option for region */}
                          <select
                            className="p-2 text-black w-72 h-12 rounded"
                            value={customerDetails.region}
                            onChange={(e) =>
                              updateCustomerValue(e.target.value, 'region')
                            }
                          >
                            <option value="North">North</option>
                            <option value="Sount">South</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end col-span-1">
                  <div className=" bg-onBackground rounded-b-none rounded-lg w-2 h-full"></div>
                </div>
              </div>
              <div className="bg-onBackground rounded-r-none -mt-2 -ml-2 rounded-lg w-full h-2"></div>
            </div>
            <div className="flex justify-end w-full lg:w-3/4 h-7 mx-auto m-1"></div>
            <div className="flex justify-end w-full lg:w-3/4 h-auto mx-auto gap-6">
              <button
                onClick={submitClicked}
                type="submit"
                className="text-xl text-white bg-secondary font-semibold rounded flex justify-center bg-success text-background px-5 rounded text-center py-2"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      ) : (
        history.goBack()
      )}
    </div>
  );
};

export default EditPremiumDetails;
