import { api } from "@/redux/api/apiSlice";

const todoApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    createTodo: builder.mutation({
      query: (todoData: any) => ({
        url: "/api/v1/todos/create-todo",
        method: "POST",
        body: todoData,
      }),
      invalidatesTags: ["Todo"],
    }),
    getTodo: builder.query({
      query: () => `/api/v1/todos`,
      providesTags: ["Todo"],
    }),

    getSingleTodo: builder.query({
      query: (id: number) => `/api/v1/todos/${id}`,
      providesTags: ["Todo"],
    }),

    updateTodos: builder.mutation({
      query: (todo: any) => ({
        url: `/api/v1/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (todoId: any) => ({
        url: `/api/v1/todos/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
    getTodoByCategory: builder.query({
      query: ({ status, search }: any) => {
        let url = "/api/v1/todos";

        let queryParameters = "";

        if (status) {
          queryParameters += `&status=${status}`;
        }

        if (search) {
          queryParameters += `&search=${search}`;
        }

        if (queryParameters) {
          url += `?${queryParameters.substring(1)}`;
        }

        return {
          url,
          method: "GET",
          providesTags: ["Todo"],
        };
      },
    }),
  }),
});

export const {
  useGetTodoQuery,
  useGetSingleTodoQuery,
  useGetTodoByCategoryQuery,
  useCreateTodoMutation,
  useUpdateTodosMutation,
  useDeleteTodoMutation,
} = todoApi;
