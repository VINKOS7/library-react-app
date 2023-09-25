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
    const storageContent = localStorage.getItem(`library.token`)

    if (storageContent){
        let token = JSON.parse(storageContent) as string

        if(Array.from(token)[0] = '"'){

            token = token.substring(1)
            token = token.substring(0, token.length - 1)

            return token
        }

        return JSON.parse(storageContent)
    }
    
    return null
};