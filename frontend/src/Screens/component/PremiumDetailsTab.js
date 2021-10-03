import React from 'react';

const PremiumDetailsTab = (props) => {
  return (
    <div
      key={props.premiumDetails.premiumID}
      className="w-11/12 border rounded my-10"
    >
      <div className="bg-secondary rounded text-2xl md:flex md:justify-between sm:flex sm:flex-wrap">
        <div className=" text-white  p-4">
          Premium ID :{props.premiumDetails.premiumID}
        </div>
        <div className="p-2">
          <button
            className="text-white rounded border px-10"
            onClick={() => props.policyEditClicked(props.premiumDetails)}
          >
            Edit Premium
          </button>
        </div>
      </div>
      <div className="flex flex-wrap md:gap-7">
        <div className="p-2 text-2xl  rounded">
          {'\u2022'} Premium Amount: ${props.premiumDetails.premiumAmount}
        </div>
        <div className="p-2 text-2xl  rounded">
          {'\u2022'} Income Group: {props.premiumDetails.customerIncomeGroup}
        </div>
      </div>
      <div className="pl-10 py-3">
        <div className="text-xl"> {'\u2022'} User Details:</div>
        <div className="text-md px-5 text-secondary">
          <ul className="flex flex-wrap gap-6 px-6">
            <li>
              {'\u2022'} Customer ID : {props.customerDetails.customerID}
            </li>
            <li>
              {'\u2022'} Fuel Type : {props.customerDetails.fuel}
            </li>
            <li>
              {'\u2022'} Gender : {props.customerDetails.gender}
            </li>
            <li>
              {'\u2022'} Region: {props.customerDetails.region}
            </li>
            <li>
              {'\u2022'} Segment Type : {props.customerDetails.vechileSegment}
            </li>
          </ul>
        </div>
      </div>
      <div className="pl-10 py-3">
        <div className="text-xl  "> {'\u2022'} Coverages:</div>
        <div className="text-md px-5 text-secondary">
          <ul className="flex flex-wrap gap-6 px-6">
            <li>
              {'\u2022'} Body Injury Liability :{' '}
              {props.premiumDetails.bodyInjuryLiability}
            </li>
            <li>
              {'\u2022'} Collision : {props.premiumDetails.collision}
            </li>
            <li>
              {'\u2022'} Comprehensive : {props.premiumDetails.comprehensive}
            </li>
            <li>
              {'\u2022'} Personal Injury Protection :{' '}
              {props.premiumDetails.personalInjuryProtection}
            </li>
            <li>
              {'\u2022'} Property Damage Liability :{' '}
              {props.premiumDetails.propertyDamageLiability}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PremiumDetailsTab;
