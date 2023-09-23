import { createApi } from "@reduxjs/toolkit/dist/query";
import config from "./config";
import { baseQuery } from "./baseQuery";

// export const authApi = createApi({
//     reducerPath: 'passport/account',
//     baseQuery: baseQuery,
//     endpoints: builder => {
//         return ({

//         })
//     }
// })

export const getAccessToken = () => {
    const storageContent = localStorage.getItem(`oidc.user:${config.AUTHORITY}:E.Shop`);
    
    if (storageContent) return JSON.parse(storageContent)
    
    return null
};