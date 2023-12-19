import React from "react";

const TodoTop = () => {
  return (
    <div className="flex items-center justify-between pb-10 ">
      {/* logo  */}
      <div>
        <h1 className="text-3xl font-bold tracking-[6px] text-white">TODO</h1>
      </div>
      {/* day night mode  */}
      <div>
        <span>
          <img src="/icon-sun.svg" alt="sun/image" />
        </span>
      </div>
    </div>
  );
};

export default TodoTop;
