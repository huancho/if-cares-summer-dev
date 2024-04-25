import React, { useState } from 'react';
import SignaturePad from '../signaturePad/SignaturePad';
import { API_URL_ENDPOINT } from '@/constants/constants';
import HandleFetch from '../handleFetch/HandleFetch';

const Modal = ({ showModal, setShowModal, submitData, siteSelected }) => {
  const [signature, setSignature] = useState('');
  const [signatureError, setSignatureError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { deliveryTime, date } = submitData;

  const handleModalClose = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  if (showModal) {
    document.body.style.overflow = 'hidden';
  }

  const handleSubmit = () => {
    let newError;
    if (signature == '') {
      newError = 'Please Sign Above';
    } else {
      setIsLoading(true);

      const data = {
        ...submitData,
        signature,
        deliveryTime: deliveryTime.format('hh:mm A'),
        date: date.format('MM/DD/YYYY'),
        site: siteSelected,
        type: 'mealCountForm',
      };

      fetch(API_URL_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          setIsLoading(false);
          setShowToast(true);
          setTimeout(() => {
            // cambia la url un poco, habria que ver como se ve en el deploy
            // history.replaceState(null, '', `${location.pathname}?t=${new Date().getTime()}`);
            window.scrollTo(0, 0);
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.error('Error:', error);
          setIsLoading(false);
        });
    }

    setSignatureError(newError);
  };
  return (
    <div
      id="select-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        showModal ? 'flex' : 'hidden'
      } overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center bg-gray-500 bg-opacity-50`}
    >
      <div className="relative px-4 py-2 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow min-h-[420px]">
          {isLoading || showToast ? (
            <HandleFetch isLoading={isLoading} showToast={showToast} />
          ) : (
            <>
              <div className="flex items-center justify-between px-4 pt-4 rounded-t">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                  data-modal-toggle="select-modal"
                  onClick={handleModalClose}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="px-4 py-2 md:p-5 flex flex-col items-center justify-center">
                <p className="text-stone-500 mb-4">
                  By signing below, I certify that the previous information is
                  true and accurate:
                </p>

                <span className="my-2">
                  <SignaturePad
                    setSignature={setSignature}
                    signatureError={signatureError}
                  />
                </span>

                <button
                  onClick={handleSubmit}
                  className="relative inline-flex h-12 overflow-hidden rounded-[12px] p-[1px] focus:outline-none transition duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[12px] bg-white px-8 py-1 text-sm font-semibold text-black backdrop-blur-3xl">
                    Submit
                  </span>
                </button>

                {/* <button
                  onClick={handleSubmit}
                  className="text-black inline-flex w-full justify-center font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-black hover:text-white hover:bg-black"
                >
                  Submit
                </button> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
