"use client";

import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodoByCategoryQuery,
  useUpdateTodosMutation,
} from "@/redux/feature/todo/TodoApiSlice";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
//@ts-ignore
import Swal from "sweetalert2";

/* eslint-disable @next/next/no-img-element */
const Todo = () => {
  const [active, setActive] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const { register, handleSubmit, reset } = useForm();

  // console.log(checkedTodos);

  // get todos using status filtering
  const { data: todos, refetch } = useGetTodoByCategoryQuery({
    status: active === "all" ? undefined : active,
    search: searchValue,
  });


  const [updateTodo] = useUpdateTodosMutation();
  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  // console.log(todos);

  // create todo
  const onSubmit = async (data: any) => {
    try {
      refetch();
      await createTodo({
        name: data.name,
      });
      refetch();
      reset();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // search Todo
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    // console.log("Search value:", event.target.value);
  };
  // update todo status
  const handleCheckboxClick = async (todoId: string) => {
    const todoToUpdate = todos?.data?.find((todo: any) => todo.id === todoId);

    if (todoToUpdate) {
      const updatedStatus =
        todoToUpdate.status === "active" ? "completed" : "active";
      refetch();
      await updateTodo({
        id: todoId,
        status: updatedStatus,
      });
      refetch();
    }
  };

  // active todo count
  const activeTodosCount = todos?.data?.filter(
    (todo: any) => todo.status === "active"
  ).length;

  // handle update todo
  const handleUpdateTodo = (todoId: any) => {
    const todoToUpdate = todos?.data?.find((todo: any) => todo.id === todoId);

    Swal.fire({
      title: "Update Todo",
      input: "text",
      inputValue: todoToUpdate?.name || "",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Update",
      preConfirm: async (inputValue: any) => {
        if (!inputValue || inputValue === todoToUpdate?.name) {
          return;
        }

        try {
          await updateTodo({
            id: todoId,
            name: inputValue,
          });
          refetch();
          console.log("Updated name:", inputValue);
        } catch (error) {
          console.error("Failed to update:", error);
        }
      },
    });
  };

  // handle delete todo
  const handleDeleteTodo = async (id: any) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this todo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        refetch();
        await deleteTodo(id).unwrap();
        refetch();
      } catch (error) {
        Swal.fire("Error", "Failed to delete todo", "error");
      }
    }
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
      <div className="w-4/5 md:w-3/5 lg:w-2/5 h-auto left-1/2 right-1/2 transform -translate-x-1/2  absolute top-10">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-5 bg-[#25273c] flex justify-between items-center gap-3 rounded-br-3xl rounded-bl-3xl">
              <img className="w-8 ml-3" src="/addCircle2.svg" alt="" />
              <input
                {...register("name")} // Registering input with React Hook Form
                type="text"
                className="w-full bg-transparent border-none focus:outline-none text-white"
                placeholder="Create a new todo"
              />
            </div>
          </form>
          {/* search todo  */}
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
          {/* todo task  */}
          <div className="">
            <div className="w-full max-h-72 overflow-y-scroll scrollbar-hide">
              {todos?.data?.map((todo: any) => (
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
              ))}
            </div>

            {/* todo footer  */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
