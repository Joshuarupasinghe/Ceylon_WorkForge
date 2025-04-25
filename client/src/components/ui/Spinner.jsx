import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center my-4">
      <div
        className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
