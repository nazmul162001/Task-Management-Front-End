import React from "react";

interface TodoFooterProps {
  activeTodosCount: any;
  active: string;
  setActive: (active: string) => void;
}

const TodoFooter: React.FC<TodoFooterProps> = ({
  activeTodosCount,
  active,
  setActive,
}) => {
  return (
    <div className="py-5 bg-[#25273c] flex justify-between text-[#656680] gap-3 px-5 rounded items-center border-b-2 border-gray-300 border-opacity-25 ">
      <p>{activeTodosCount} task left</p>
      <ul className="flex items-center gap-4">
        <li
          onClick={() => setActive("all")}
          className={`hover:text-blue-500 cursor-pointer ${
            active === "all"
              ? "text-blue-500 hover:text-blue-500"
              : "hover:text-white"
          }`}
        >
          All
        </li>
        <li
          onClick={() => setActive("active")}
          className={`hover:text-blue-500 cursor-pointer ${
            active === "active"
              ? "text-blue-500 hover:text-blue-500"
              : "hover:text-white"
          }`}
        >
          Active
        </li>
        <li
          onClick={() => setActive("completed")}
          className={`hover:text-blue-500 cursor-pointer ${
            active === "completed"
              ? "text-blue-500 hover:text-blue-500"
              : "hover:text-white"
          }`}
        >
          Completed
        </li>
      </ul>
      {/* <p className="cursor-pointer">Clear Completed</p> */}
    </div>
  );
};

export default TodoFooter;
