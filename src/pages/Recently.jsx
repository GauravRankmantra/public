import React, { useRef } from "react";

const Recently = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -150, 
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 150, 
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative lg:px-36 mt-6">
      <div className="w-full inline-block mb-8">
        <h1 className="text-lg pb-2 relative inline-block text-capitalize text-[#3bc8e7]">
          Recently Played
          <div className="absolute bottom-0 left-[-15px] w-[100px] h-[5px] bg-gradient-to-r from-[#3bc8e7] to-transparent"></div>
        </h1>
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute lg:top-28 top-24 left-0 transform -translate-y-1/2 bg-[#3bc8e7] text-white p-2 rounded-full hover:bg-[#2b9bb2] z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          ref={scrollContainerRef}
          className="flex space-x-6 py-4 w-full overflow-hidden"
        >
          {[...Array(10)].map((_, index) => (
            <div className="flex-shrink-0" key={index}>
              <div className="text-center">
                <div className="relative overflow-hidden rounded-[10px]">
                  <img
                    className="w-[150px] sm:w-[200px] md:w-[200px] rounded-[10px]" // Adjust width responsively
                    src="https://dummyimage.com/150x150"
                    alt=""
                  />
                </div>

                <div className="text-left mt-5">
                  <h3 className="text-[14px] sm:text-[14px] md:text-[14px] mb-[5px]">
                    <a href="#" className="text-white hover:text-[#3bc8e7]">
                      Dream Your Moments (Duet)
                    </a>
                  </h3>
                  <p className="text-[#dedede] text-[12px] sm:text-[12px] md:text-[12px]">
                    Ava Cornish & Brian Hill
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute lg:top-28 top-24 right-0 transform -translate-y-1/2 bg-[#3bc8e7] text-white p-2 rounded-full hover:bg-[#2b9bb2] z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Recently;
