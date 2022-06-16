import React, { useState } from "react";

export const TestFormVideo = ({ setCount, setStepTest }) => {

  const [checkActive, setCheckActive] = useState(false);

  return (
    <>
      <p>
        Before you complete your investor profile, please watch this video which
        explains how Invertor works, and the requirements for investing in our
        funds.
      </p>
      {/* AQUI VA EL VIDEO */}
      <div className="video">
        <span className="material-symbols-outlined">play_circle</span>
      </div>

      {/* checkbox */}
      <label>
        <input
          type="checkbox"
          onChange={() => {
            setCheckActive(!checkActive);
          }}
        />{" "}
        I confirm I have watched the video and understand the requirements for
        investing with Invertor
      </label>

      <button
        disabled={checkActive ? false : true}
        onClick={() => {
          setCount(2);
          setStepTest(1);
        }}
      >
        Confirm
      </button>
    </>
  );
};
