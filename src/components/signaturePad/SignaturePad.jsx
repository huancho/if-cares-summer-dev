import React, { useRef, useState } from 'react';

const SignaturePad = ({ setSignature, signatureError }) => {
  const canvasRef = useRef(null);
  const [isSigning, setIsSigning] = useState(false);

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (event.touches) {
      // Touch event
      const touch = event.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      // Mouse event
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
  };

  const startSigning = (event) => {
    // event.preventDefault();
    setIsSigning(true);
    const { x, y } = getCoordinates(event);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopSigning = () => {
    setIsSigning(false);
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    setSignature(dataURL);
  };

  const draw = (event) => {
    if (!isSigning) return;
    // event.preventDefault();
    const { x, y } = getCoordinates(event);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature('');
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        onMouseDown={startSigning}
        onMouseUp={stopSigning}
        onMouseMove={draw}
        onTouchStart={startSigning}
        onTouchEnd={stopSigning}
        onTouchMove={draw}
        className="border-2 border-stone-500"
      ></canvas>
      <div className="flex flex-col items-center justify-center mb-4">
        <button
          onClick={clear}
          className="mt-2 px-4 py-2 backdrop-blur-sm border text-red-600 border-red-600 rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200 hover:text-white hover:bg-red-600"
        >
          Clear
        </button>
        {/* <button
          onClick={clear}
          className="mt-2 py-1 px-3 rounded border border-red-600 hover:bg-red-600 hover:text-white"
        >
          Clear
        </button> */}
        {signatureError && (
          <span className="mt-1 text-red-600 text-xs">{signatureError}</span>
        )}
      </div>
    </div>
  );
};

export default SignaturePad;
