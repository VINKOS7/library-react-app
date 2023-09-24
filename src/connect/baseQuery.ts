import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import config from './config';
import { getAccessToken } from './getAccessToken';


export const baseQuery = fetchBaseQuery({
    baseUrl: `${config.BOOK_API}`,
    prepareHeaders: (headers, { getState }) => {
        const token = getAccessToken()

        
        console.log(config.BOOK_API)
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    },
})