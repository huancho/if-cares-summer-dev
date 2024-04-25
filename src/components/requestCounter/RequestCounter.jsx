import React from 'react';

const RequestCounter = ({
  additionalMeals,
  setAdditionalMeals,
  sectionDisabled,
}) => {
  const handleRequestDecrease = () => {
    if (additionalMeals == 0) return;
    setAdditionalMeals(additionalMeals - 1);
  };

  const handleRequestIncrease = () => {
    if (additionalMeals == 15) return;
    setAdditionalMeals(additionalMeals + 1);
  };

  return (
    <div>
      <h4 className="text-center mb-4 hidden md:block font-medium">
        Meals requested after all available meals were served
      </h4>
      <div className="w-[340px] mx-auto flex items-center justify-between mt-10 md:mt-0">
        <button
          onClick={handleRequestDecrease}
          className={`flex items-center justify-center rounded-l-lg h-[50px] px-4 ${
            sectionDisabled ? 'bg-gray-500' : 'bg-[#3A3A44] hover:bg-[#2E2E38]'
          }`}
          disabled={sectionDisabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>

        <span className="w-full bg-white border-t border-b border-black text-base md:text-xl flex flex-col items-center justify-center h-[50px]">
          {additionalMeals}
          <h5 className="text-xs text-stone-500 md:hidden">
            Additional Meals Requested
          </h5>
        </span>

        <button
          onClick={handleRequestIncrease}
          className={`flex items-center justify-center rounded-r-lg h-[50px] px-4 ${
            sectionDisabled
              ? 'bg-gray-500'
              : 'bg-indigo-700 hover:bg-indigo-800'
          }`}
          disabled={sectionDisabled}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RequestCounter;
