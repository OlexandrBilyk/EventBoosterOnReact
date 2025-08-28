import { configureStore } from "@reduxjs/toolkit";
import { eventsApi } from "./events/eventsApi";


export const store = configureStore({
    reducer: {
        [eventsApi.reducerPath]: eventsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(eventsApi.middleware)
})

