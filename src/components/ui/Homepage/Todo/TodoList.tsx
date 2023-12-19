import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import TodoFooter from "./TodoFooter";

interface TodoListProps {
  todos: any;
  active: string;
  handleCheckboxClick: any;
  handleUpdateTodo: any;
  handleDeleteTodo: any;
  activeTodosCount: any;
  setActive: any;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  active,
  handleCheckboxClick,
  handleUpdateTodo,
  handleDeleteTodo,
  activeTodosCount,
  setActive,
}) => {
  return (
    <div className="">
      <div className="w-full max-h-72 overflow-y-scroll scrollbar-hide">
        {
          //@ts-ignore
          todos?.data?.map((todo: any) => (
            <div
              key={todo?.id}
              className="py-5 bg-[#25273c] hover:bg-[#353752] flex gap-3 px-3 rounded items-center border-b-2 border-gray-300 border-opacity-25 relative _hover"
            >
              <input
                type="checkbox"
                name={`check-${todo.id}`}
                id={`check-${todo.id}`}
                checked={todo?.status === "completed"}
                onChange={() => handleCheckboxClick(todo.id)}
                className="cursor-pointer w-8 h-8 rounded-full appearance-none border-2 border-gray-300 checked:bg-blue-500 checked:border-transparent"
              />
              <p
                className={`text-[#A6ABD8] hover:text-white transition-all duration-100 ${
                  todo?.status === "completed" ? "line-through" : ""
                }`}
              >
                {todo?.name}
              </p>
              <div className="flex gap-3 absolute right-3 w-16 h-full items-center _action">
                <span onClick={() => handleUpdateTodo(todo?.id)}>
                  <FaEdit className="text-[#A6ABD8] text-2xl cursor-pointer" />
                </span>
                <span onClick={() => handleDeleteTodo(todo?.id)}>
                  <MdOutlineDelete className="text-2xl text-red-500 cursor-pointer" />
                </span>
              </div>
            </div>
          ))
        }
      </div>

      {/* todo footer  */}
      <TodoFooter
        activeTodosCount={activeTodosCount}
        active={active}
        setActive={setActive}
      />
    </div>
  );
};

export default TodoList;
