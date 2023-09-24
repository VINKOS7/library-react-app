
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';
import { FethBooksResponse } from "./Responses";
import { AddBookRequest, ChangeBookRequest } from "./Requests";
import { SignInResponse } from "../authApi/Responses";
import { SignInEmailRequest } from "../authApi/Requests";

export const bookApi = createApi({
    reducerPath: "book",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            addBook: builder.mutation<string, AddBookRequest>({
                query: data => ({
                    url: 'book/add',
                    method: 'POST',
                    body: data
                })
            }),
            changeBook: builder.mutation<void, ChangeBookRequest>({
                query: data => ({
                    url: 'book/change',
                    method: 'POST',
                    body: data 
                })
            }),
            fetchBooks: builder.query<FethBooksResponse, {offset: 0, size: 20}>({
                query: data => `/book/fetch?offset=${data.offset}&size=${data.size}`
            }),
            deleteBook: builder.query<void, string>({
                query: id => ({
                    url: `book/delete?id=${id}`,
                    method: 'DELETE'
                })
            }),
        })
    }
})

export const {
    useAddBookMutation,
    useLazyDeleteBookQuery,
    useChangeBookMutation,
    useFetchBooksQuery
} = bookApi