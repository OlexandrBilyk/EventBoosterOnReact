import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_TIKETMASTER_API_KEY

export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://app.ticketmaster.com/discovery/' }),
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: ({ page = 0, keyword = "", countryCode = "" } = {}) => ({
                url: "v2/events.json",
                params: {
                    apikey: apiKey,
                    size: 20,
                    page,
                    keyword,
                    countryCode,
                },
            }),
        }),
    })
})

export const { useGetEventsQuery, useLazyGetEventsQuery } = eventsApi