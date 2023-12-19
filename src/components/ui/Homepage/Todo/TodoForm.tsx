import { useCreateTodoMutation } from "@/redux/feature/todo/TodoApiSlice";
import React from "react";
import { useForm } from "react-hook-form";

interface TodoFormProps {
  refetch: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      name: "",
    },
  });

  const [createTodo] = useCreateTodoMutation();

  // create todo
  const onSubmit = async (data: any) => {
    try {
      if (!data.name || data.name.trim().length < 3) {
        return;
      }
      refetch();
      await createTodo({
        name: data.name.trim(),
      });
      refetch();
      reset();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-5 bg-[#25273c] flex justify-between items-center gap-3 rounded-br-3xl rounded-bl-3xl">
        <img className="w-8 ml-3" src="/addCircle2.svg" alt="" />
        <input
          {...register("name", {
            required: true,
            minLength: {
              value: 3,
              message: "Task name must be at least 3 characters.", // Error message
            },
          })}
          type="text"
          className="w-full bg-transparent border-none focus:outline-none text-white"
          placeholder="Create a new todo"
        />
      </div>
      {errors.name && (
        <p className="text-red-300 pl-3">{errors.name.message}</p>
      )}
    </form>
  );
};

export default TodoForm;
