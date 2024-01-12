/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";

const Error = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  const classNameString = !isMenuOpen
    ? `bg-black font-bold tracking-wide rounded-2xl shadow-md text-white text-justify box-border lg:w-[48%] max-sm:w-[94%] lg:py-6 lg:px-6 max-sm:py-6 max-sm:px-5 lg:ml-[24.5%] max-sm:ml-[3%] lg:min-h-[20vh] md:w-[68%] md:py-6 md:px-6 md:ml-[15%] relative`
    : `bg-black shadow-md font-bold text-justify tracking-wide rounded-2xl text-white box-border w-[42%] py-6 px-8 ml-[36.5%] min-h-[20vh] relative  `;

  return (
    <>
      <div className={`w-[100%] ${classNameString} flex flex-col gap-2 text-lg justify-between overflow-hidden top-24`}>
        <div className="py-2">
          <h1 className="text-2xl text-red-600">Unable to fetch the request for now! 🙄</h1>
        </div>
        <h3>- This service, powered by free APIs with limitations, may experience interruptions.</h3>
        <p>- So, it breaks anytime! Sorry for the inconvenience.</p>
        <h3>- For a more reliable experience, kindly consider using the original YouTube platform.</h3>
      </div>
    </>
  );
};

export default Error;
