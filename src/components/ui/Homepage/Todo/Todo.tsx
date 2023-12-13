"use client";

import React, { ChangeEvent, useState } from "react";

/* eslint-disable @next/next/no-img-element */
const Todo = () => {
  const [active, setActive] = useState("all");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    console.log("Checkbox status:", event.target.checked);
  };

  return (
    <div className="w-full h-full relative">
      {/* bg image  */}
      <div
        style={{
          backgroundImage: `url('/bg-desktop-dark.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-96"
      ></div>
      {/* todo form  */}
      <div className="w-2/5 h-auto left-1/2 right-1/2 transform -translate-x-1/2  absolute top-28">
        <div>
          {/* todo top  */}
          <div className="flex items-center justify-between pb-10 ">
            {/* logo  */}
            <div>
              <h1 className="text-3xl font-bold tracking-[6px] text-white">
                TODO
              </h1>
            </div>
            {/* day night mode  */}
            <div>
              <span>
                <img src="/icon-sun.svg" alt="sun/image" />
              </span>
            </div>
          </div>
          {/* todo body  */}
          {/* add todo field  */}
          <div className="py-5 bg-[#25273c] flex justify-between items-center gap-3 rounded">
            <img className="w-8 ml-3" src="/addCircle2.svg" alt="" />
            <input
              type="text"
              className="w-full bg-transparent border-none focus:outline-none text-white"
              placeholder="Create a new todo"
            />
          </div>
          {/* search todo  */}
          <div className="py-4 mt-5 bg-[#25273c] flex justify-between items-center gap-3 rounded-full px-5">
            <input
              type="text"
              className="w-full bg-transparent border-none focus:outline-none text-white"
              placeholder="Search todo..."
            />
            <img className="w-8 ml-3" src="/search.svg" alt="" />
          </div>
          {/* todo task  */}
          <div className="mt-8">
            <div className="py-5 bg-[#25273c] flex gap-3 px-3 rounded items-center border-b-2 border-gray-300 border-opacity-25 ">
              <input
                type="checkbox"
                name="check"
                id="check"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="cursor-pointer w-8 h-8 rounded-full appearance-none border-2 border-gray-300 checked:bg-blue-500 checked:border-transparent"
              />
              <p
                className={`text-[#A6ABD8] hover:text-white transition-all duration-100 ${isChecked && 'line-through'}`}
              >
                This is a new todo
              </p>
            </div>

            {/* todo footer  */}
            <div className="py-5 bg-[#25273c] flex justify-between text-[#656680] gap-3 px-5 rounded items-center border-b-2 border-gray-300 border-opacity-25 ">
              <p>4 task left</p>
              <ul className="flex items-center gap-4">
                <li
                  onClick={() => setActive("all")}
                  className={`hover:text-blue-500 cursor-pointer ${
                    active === "all" ? "text-blue-500 hover:text-blue-500" : "hover:text-white"
                  }`}
                >
                  All
                </li>
                <li
                  onClick={() => setActive("active")}
                  className={`hover:text-blue-500 cursor-pointer ${
                    active === "active" ? "text-blue-500 hover:text-blue-500" : "hover:text-white"
                  }`}
                >
                  Active
                </li>
                <li
                  onClick={() => setActive("completed")}
                  className={`hover:text-blue-500 cursor-pointer ${
                    active === "completed" ? "text-blue-500 hover:text-blue-500" : "hover:text-white"
                  }`}
                >
                  Completed
                </li>
              </ul>
              <p className="cursor-pointer">Clear Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
