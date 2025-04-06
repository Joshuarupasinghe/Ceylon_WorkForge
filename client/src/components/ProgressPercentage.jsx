import React from "react";

/**
 * Displays the numeric percentage in the center of the circular progress.
 */
const ProgressPercentage = ({ progress = 0 }) => {
  return (
    <div className="absolute text-lg font-bold text-white drop-shadow-md">
      {progress}%
    </div>
  );
};

export default ProgressPercentage;
