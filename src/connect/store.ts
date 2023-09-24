import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { bookApi } from './bookApi/bookApi';
import { authApi } from './authApi/authApi';


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [bookApi.reducerPath]: bookApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat([
            authApi.middleware,
            bookApi.middleware
        ])
});

setupListeners(store.dispatch);