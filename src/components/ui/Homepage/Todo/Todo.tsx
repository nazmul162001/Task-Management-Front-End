"use client";

import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodoByCategoryQuery,
  useUpdateTodosMutation,
} from "@/redux/feature/todo/TodoApiSlice";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
//@ts-ignore
import Swal from "sweetalert2";
import TodoForm from "./TodoForm";
import TodoTop from "./TodoTop";
import TodoSearch from "./TodoSearch";
import TodoList from "./TodoList";

/* eslint-disable @next/next/no-img-element */
const Todo = () => {
  const [active, setActive] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const { reset } = useForm();

  // console.log(checkedTodos);

  // get todos using status filtering
  const { data: todos, refetch } = useGetTodoByCategoryQuery({
    status: active === "all" ? undefined : active,
    search: searchValue,
  });

  const [updateTodo] = useUpdateTodosMutation();
  // const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  // console.log(todos);

  // // create todo
  // const onSubmit = async (data: any) => {
  //   try {
  //     if (data?.name?.length < 2) {
  //       return;
  //     }

  //     refetch();
  //     await createTodo({
  //       name: data.name,
  //     });
  //     refetch();
  //     reset();
  //   } catch (error) {
  //     console.error("Error creating todo:", error);
  //   }
  // };

  // search Todo
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    // console.log("Search value:", event.target.value);
  };
  // update todo status
  const handleCheckboxClick = async (todoId: string) => {
    //@ts-ignore
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
  //@ts-ignore
  const activeTodosCount = todos?.data?.filter(
    (todo: any) => todo.status === "active"
  ).length;

  // handle update todo
  const handleUpdateTodo = (todoId: any) => {
    //@ts-ignore
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
          <TodoTop />
          {/* add todo field  */}
          <TodoForm refetch={refetch} />
          {/* search todo  */}
          <TodoSearch
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
          />

          {/* todo task  */}
          <TodoList
            todos={todos}
            active={active}
            handleCheckboxClick={handleCheckboxClick}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodo}
            activeTodosCount={activeTodosCount}
            setActive={setActive}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
