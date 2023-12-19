import React, { ChangeEvent } from "react";

interface TodoSearchProps {
  searchValue: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TodoSearch: React.FC<TodoSearchProps> = ({
  searchValue,
  handleSearchChange,
}) => {
  return (
    <div className="py-4 mt-5 bg-[#25273c] flex justify-between items-center gap-3 rounded-tr-3xl rounded-tl-3xl px-5 mb-1">
      <input
        type="text"
        className="w-full bg-transparent border-none focus:outline-none text-white"
        placeholder="Search todo..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      <img className="w-8 ml-3" src="/search.svg" alt="" />
    </div>
  );
};

export default TodoSearch;
