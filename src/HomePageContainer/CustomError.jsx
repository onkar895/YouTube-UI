/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from "react";

const Error = ({ message }) => {

  const classNameString = `bg-black font-bold tracking-wide rounded-2xl shadow-md text-white text-justify box-border lg:w-[48%] md:mt-12 max-sm:mt-12 max-sm:w-[94vw] lg:py-6 lg:px-6 max-sm:py-6 max-sm:px-5 max-sm:mx-3 lg:ml-[24.5%] lg:min-h-[20vh] md:w-[68%] md:py-6 md:px-6 md:ml-[15%] relative`

  return (
    <>
      <div className={`w-[100%] ${classNameString} flex flex-col gap-2 text-lg justify-between overflow-hidden top-10 hover:scale-105 hover:transition-all hover:duration-500 hover:cursor-pointer`}>
        <div className="py-1">
          <h1 className="text-2xl text-red-600 animate-pulse text-center">{message}</h1>
        </div>
        <h3> - This service, powered by free APIs with limitations, may experience interruptions.</h3>
        <p> - The API key has reached the maximum number of allowed requests. So, it breaks anytime! Sorry for the inconvenience.</p>
        <h3> - For a more reliable experience, kindly consider using the original YouTube platform.</h3>
      </div>
    </>
  );
};

export default Error;