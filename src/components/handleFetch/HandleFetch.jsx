import React from 'react';
import Spinner from '../spinner/Spinner';
import Toast from '../toast/Toast';

const HandleFetch = ({ isLoading, showToast }) => {
  return (
    <div className="min-h-[420px] flex flex-col items-center justify-center">
      {isLoading && (
        <>
          <Spinner />
          <h4 className="mt-2">Sending Form . . .</h4>
        </>
      )}
      {showToast && <Toast />}
    </div>
  );
};

export default HandleFetch;
