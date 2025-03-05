import React from "react";
function Spinner() {

    return (
      <button
        type="button"
        className="items-center justify-center flex gap-2 rounded-md bg-white text-primary px-5 py-2.5 text-sm tx-start font-medium shadow border border-primary transition ease-in-out delay-150 w-full text-nowrap"
        disabled
      >
        Loading...
        <svg
          className="animate-ping h-3 w-3 mr-1 rounded-full bg-primary"
          viewBox="0 0 24 24"
        ></svg>
      </button>
    );
}

export default Spinner;