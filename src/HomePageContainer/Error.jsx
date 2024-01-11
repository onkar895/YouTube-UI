/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";

const Error = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen)

  const classNameString = !isMenuOpen
    ? `bg-black box-border w-[92%] py-4 px-8 ml-[8%] min-h-[90vh] relative  `
    : `bg-black box-border w-[85%] py-4 px-8 ml-[15%] min-h-[90vh] relative  `;

  return (
    <div
      className={`w-[100%] ${classNameString} flex flex-col gap-2 justify-between overflow-hidden pt-6`}
    >
      <h1>Unable to fetch the request for now !</h1>
      <h3>
        This service, powered by free APIs with limitations, may experience interruptions.
        For a more reliable experience, kindly consider using the original YouTube platform.
      </h3>
      <p>So , it breaks anytime ! Sorry for the inconvenience</p>
    </div>
  );
};

export default Error;