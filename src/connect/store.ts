import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { bookApi } from './bookApi/bookApi';


export const store = configureStore({
    reducer: {
        [bookApi.reducerPath]: bookApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat([
            bookApi.middleware
        ])
});

setupListeners(store.dispatch);

/*
    middleware: (getDefaultMiddleware) =>{
        let defaultMiddleware = getDefaultMiddleware()
        
        defaultMiddleware.concat(rtkQueryErrorLogger),
        defaultMiddleware.concat(basketApi.middleware)

        return defaultMiddleware
    }
 */