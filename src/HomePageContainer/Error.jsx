/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";

const Error = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  const classNameString = !isMenuOpen
    ? `bg-black font-bold tracking-wide rounded-2xl text-white text-justify box-border md:w-[42%] max-sm:w-[90%] md:py-6 md:px-6 max-sm:py-6 max-sm:px-5 md:ml-[24.5%] max-sm:ml-[5%] md:min-h-[20vh] relative  `
    : `bg-black font-bold text-justify tracking-wide rounded-2xl text-white box-border w-[42%] py-6 px-8 ml-[36.5%] min-h-[20vh] relative  `;

  return (
    <>
      <h1 className={`${!isMenuOpen ? 'w-[100%] gap-2 overflow-hidden mt-24 lg:mx-60 max-sm:mx-5 text-red-500 font-bold text-3xl' : 'w-[100%] gap-2 overflow-hidden mt-24 lg:mx-[23rem] max-sm:mx-5 text-red-500 font-bold text-3xl'} `}>
        Unable to fetch the request for now! 🙄
      </h1>
      <div className={`w-[100%] ${classNameString} flex flex-col gap-2 justify-between overflow-hidden mt-5`}>
        <h3>- This service, powered by free APIs with limitations, may experience interruptions.</h3>
        <p>- So, it breaks anytime! Sorry for the inconvenience.</p>
        <h3>- For a more reliable experience, kindly consider using the original YouTube platform.</h3>
      </div>
    </>
  );
};

export default Error;
