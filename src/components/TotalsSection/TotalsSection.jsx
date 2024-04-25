import React from 'react';

const TotalsSection = ({
  reimbursableMeals,
  setReimbursableMeals,
  leftoverMeals,
  setLeftoverMeals,
  totalMeals,
  totalItems,
  sectionDisabled,
}) => {
  const handleReimbursableDecrease = () => {
    if (reimbursableMeals == 0) return;
    setReimbursableMeals(reimbursableMeals - 1);
  };

  const handleReimbursableIncrease = () => {
    setReimbursableMeals(reimbursableMeals + 1);
  };

  const handleLeftoverDecrease = () => {
    if (leftoverMeals == 0) return;
    setLeftoverMeals(leftoverMeals - 1);
  };

  const handleLeftoverIncrease = () => {
    setLeftoverMeals(leftoverMeals + 1);
  };

  return (
    <div className="w-[350px] lg:w-[400px] xl:w-[500px] p-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex items-center justify-center mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900">Totals</h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-xs md:text-sm xl:text-base font-medium text-gray-900 truncate">
                  Total Meals Served
                </p>
              </div>
              <div className="min-w-24 inline-flex items-center justify-center text-base font-semibold text-gray-900">
                {totalMeals}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center ">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-xs md:text-sm xl:text-base font-medium text-gray-900 truncate ">
                  Total damaged / incomplete / other
                </p>
                <p className="text-xs md:text-sm xl:text-base font-medium text-gray-900 truncate ">
                  non reimbursable meals
                </p>
              </div>
              <div className="min-w-24 inline-flex items-center justify-center text-base font-semibold text-gray-900">
                <button
                  onClick={handleReimbursableDecrease}
                  className={`flex-shrink-0 inline-flex items-center justify-center rounded-2xl h-6 w-6 focus:ring-gray-100 focus:ring-2 focus:outline-none ${
                    sectionDisabled
                      ? 'bg-gray-500'
                      : 'bg-[#3A3A44] hover:bg-[#2E2E38]'
                  }`}
                  disabled={sectionDisabled}
                >
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <span className="flex-shrink-0 text-gray-900 border-0 bg-transparent text-base font-semibold focus:outline-none focus:ring-0 w-[2rem] text-center">
                  {reimbursableMeals}
                </span>
                <button
                  onClick={handleReimbursableIncrease}
                  className={`flex-shrink-0 inline-flex items-center justify-center rounded-2xl h-6 w-6 focus:ring-gray-100 focus:ring-2 focus:outline-none ${
                    sectionDisabled
                      ? 'bg-gray-500'
                      : 'bg-indigo-700 hover:bg-indigo-800'
                  }`}
                  disabled={sectionDisabled}
                >
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-xs md:text-sm xl:text-base font-medium text-gray-900 truncate ">
                  Total leftover meals
                </p>
              </div>
              <div className="min-w-24 inline-flex items-center justify-center text-base font-semibold text-gray-900">
                <button
                  onClick={handleLeftoverDecrease}
                  className={`flex-shrink-0 inline-flex items-center justify-center rounded-2xl h-6 w-6 focus:ring-gray-100 focus:ring-2 focus:outline-none ${
                    sectionDisabled
                      ? 'bg-gray-500'
                      : 'bg-[#3A3A44] hover:bg-[#2E2E38]'
                  }`}
                  disabled={sectionDisabled}
                >
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <span className="flex-shrink-0 text-gray-900 border-0 bg-transparent text-base font-semibold focus:outline-none focus:ring-0 w-[2rem] text-center">
                  {leftoverMeals}
                </span>
                <button
                  onClick={handleLeftoverIncrease}
                  className={`flex-shrink-0 inline-flex items-center justify-center rounded-2xl h-6 w-6 focus:ring-gray-100 focus:ring-2 focus:outline-none ${
                    sectionDisabled
                      ? 'bg-gray-500'
                      : 'bg-indigo-700 hover:bg-indigo-800'
                  }`}
                  disabled={sectionDisabled}
                >
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="font-semibold text-base md:text-lg text-gray-900">
                  Total Of Items
                </p>
              </div>
              <div className="min-w-24 inline-flex items-center justify-center text-base font-semibold text-gray-900">
                <span className="p-[2px] relative w-[80px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-4 py-1 bg-white text-black text-lg font-medium text-center rounded-[6px] relative group transition duration-200 hover:bg-transparent hover:text-white">
                    {totalItems}
                  </div>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TotalsSection;
