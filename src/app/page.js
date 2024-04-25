'use client';
import CountersSection from '@/components/CountersSection/CountersSection';
import TotalsSection from '@/components/TotalsSection/TotalsSection';
import Footer from '@/components/footer/Footer';
import MealForm from '@/components/mealForm/MealForm';
import Modal from '@/components/modal/Modal';
import RequestCounter from '@/components/requestCounter/RequestCounter';
import SiteInfo from '@/components/siteInfo/SiteInfo';
import SitesSelect from '@/components/siteSelect/SitesSelect';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [siteSelected, setSiteSelected] = useState('');
  const [isLoadingSiteData, setIsLoadingSiteData] = useState(false);
  const [mealForm, setMealForm] = useState({
    mealType: '',
    deliveryTime: null,
    date: null,
    mealsReceived: '',
    mealsFromPreviousDays: '',
  });
  const [errors, setErrors] = useState({
    mealType: null,
    deliveryTime: null,
    date: null,
    mealsReceived: null,
    mealsFromPreviousDays: null,
  });
  const [mealFormDisabled, setMealFormDisabled] = useState(true)
  const [sectionDisabled, setSectionDisabled] = useState(true);
  const [firstCounter, setFirstCounter] = useState(0);
  const [secondCounter, setSecondCounter] = useState(0);
  const [programCounter, setProgramCounter] = useState(0);
  const [noProgramCounter, setNoProgramCounter] = useState(0);

  const [reimbursableMeals, setReimbursableMeals] = useState(0);
  const [leftoverMeals, setLeftoverMeals] = useState(0);

  const [additionalMeals, setAdditionalMeals] = useState(0);

  const totalMealsAvailable =
    Number(mealForm.mealsReceived) + Number(mealForm.mealsFromPreviousDays);

  const totalMeals =
    firstCounter + secondCounter + programCounter + noProgramCounter;

  const totalItems = totalMeals + reimbursableMeals + leftoverMeals;

  const [showModal, setShowModal] = useState(false);

  const submitData = {
    mealType: mealForm.mealType,
    deliveryTime: mealForm.deliveryTime,
    date: mealForm.date,
    mealsReceived: mealForm.mealsReceived,
    mealsFromPreviousDays: mealForm.mealsFromPreviousDays,
    firstCounter,
    secondCounter,
    programCounter,
    noProgramCounter,
    reimbursableMeals,
    leftoverMeals,
    additionalMeals,
  };

  useEffect(()=>{
    if (siteSelected) {
      setMealFormDisabled(false)
    }
  },[siteSelected])

  useEffect(() => {
    if (
      siteSelected == '' ||
      mealForm.mealType == '' ||
      mealForm.deliveryTime == null ||
      mealForm.date == null ||
      mealForm.mealsReceived == '' ||
      mealForm.mealsFromPreviousDays == ''
    ) {
      setSectionDisabled(true);
    }
    if (
      siteSelected != '' &&
      mealForm.mealType != '' &&
      mealForm.deliveryTime != null &&
      mealForm.date != null &&
      mealForm.mealsReceived != '' &&
      mealForm.mealsFromPreviousDays != ''
    ) {
      setSectionDisabled(false);
    }
  }, [mealForm, siteSelected]);

  useEffect(() => {
    setMealForm({
      mealType: '',
      deliveryTime: null,
      date: null,
      mealsReceived: '',
      mealsFromPreviousDays: '',
    });
    setErrors({
      mealType: null,
      deliveryTime: null,
      date: null,
      mealsReceived: null,
      mealsFromPreviousDays: null,
    });
    setSectionDisabled(true);
    setFirstCounter(0);
    setSecondCounter(0);
    setProgramCounter(0);
    setNoProgramCounter(0);
    setReimbursableMeals(0);
    setLeftoverMeals(0);
    setAdditionalMeals(0);
  }, [siteSelected]);

  const isValid = () => {
    const {
      mealType,
      deliveryTime,
      date,
      mealsReceived,
      mealsFromPreviousDays,
    } = mealForm;

    const newErrors = {
      siteSelected: siteSelected ? null : 'Please select a Site',
      mealType: mealType ? null : 'Meal type is required',
      deliveryTime: deliveryTime && deliveryTime.isValid() ? null : 'Delivery time is required',
      date: date && date.isValid() ? null : 'Valid date is required',
      mealsReceived:
        mealsReceived !== '' &&
        !isNaN(mealsReceived) &&
        Number(mealsReceived) >= 0
          ? null
          : 'Positive number is required',
      mealsFromPreviousDays:
        mealsFromPreviousDays !== '' &&
        !isNaN(mealsFromPreviousDays) &&
        Number(mealsFromPreviousDays) >= 0
          ? null
          : 'Positive number is required',
      firstCounter:
        firstCounter > 0 ? null : 'At least 1 meal needs to be served',
      total:
        totalItems == totalMealsAvailable
          ? null
          : 'Total of items must be equal to total meals available',
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === null);
  };



  const siteSelectRef = useRef(null);
  const mealFormRef = useRef(null);
  const countersSectionRef = useRef(null);

  const handleNext = () => {
    if (!isValid()) {
      if (errors.siteSelected) {
        siteSelectRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      } else if (errors.firstCounter) {
        countersSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      } else {
        mealFormRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="bg-[#F7F7F7]">
      <Footer />
      <section
        ref={siteSelectRef}
        className="flex flex-col md:flex-row items-center justify-between px-6"
      >
        <h2 className="text-2xl font-bold text-center text-primary my-10 animate-fadein">
          Daily Meal Count Form
        </h2>

        <span className="min-w-56">
          <SitesSelect
            errors={errors}
            siteSelected={siteSelected}
            setSiteSelected={setSiteSelected}
            isLoadingSiteData={isLoadingSiteData}
          />
        </span>
      </section>
      <main className="my-4 flex flex-col md:flex-row items-center justify-evenly">
        <SiteInfo
          siteSelected={siteSelected}
          setIsLoadingSiteData={setIsLoadingSiteData}
        />
        <div ref={mealFormRef}>
          <MealForm
            mealForm={mealForm}
            setMealForm={setMealForm}
            totalMealsAvailable={totalMealsAvailable}
            errors={errors}
            siteSelected={siteSelected}
            mealFormDisabled={mealFormDisabled}
          />
        </div>
      </main>
      <div
        ref={countersSectionRef}
        className="my-4 flex flex-col md:flex-row items-center justify-evenly"
      >
        <CountersSection
          sectionDisabled={sectionDisabled}
          firstCounter={firstCounter}
          setFirstCounter={setFirstCounter}
          secondCounter={secondCounter}
          setSecondCounter={setSecondCounter}
          programCounter={programCounter}
          setProgramCounter={setProgramCounter}
          noProgramCounter={noProgramCounter}
          setNoProgramCounter={setNoProgramCounter}
          errors={errors}
        />
        <div className="flex flex-col items-center gap-10">
          <TotalsSection
            reimbursableMeals={reimbursableMeals}
            setReimbursableMeals={setReimbursableMeals}
            leftoverMeals={leftoverMeals}
            setLeftoverMeals={setLeftoverMeals}
            totalMeals={totalMeals}
            totalItems={totalItems}
            sectionDisabled={sectionDisabled}
          />
          <RequestCounter
            additionalMeals={additionalMeals}
            setAdditionalMeals={setAdditionalMeals}
            sectionDisabled={sectionDisabled}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center pb-20 mt-10 md:mt-0">
        {/* <button
          className="border border-black rounded-xl px-6 py-2  hover:bg-black hover:text-white"
          onClick={handleNext}
        >
          Next
        </button> */}
        <button
          onClick={handleNext}
          disabled={mealFormDisabled}
          className={`relative inline-flex h-12 overflow-hidden rounded-[12px] p-[1px] focus:outline-none transition duration-200 ${mealFormDisabled ? '' : 'hover:scale-105 hover:shadow-lg'}`}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className={`inline-flex h-full w-full items-center justify-center rounded-[12px] px-8 py-1 text-sm font-semibold text-black backdrop-blur-3xl ${mealFormDisabled ? 'bg-gray-500 text-white' : 'bg-white cursor-pointer'}`}>
            Next
          </span>
        </button>

        {errors.total && (
          <span className="text-xs text-red-600 mt-2">{errors.total}</span>
        )}
      </div>
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          submitData={submitData}
          siteSelected={siteSelected}
        />
      )}
    </div>
  );
}
