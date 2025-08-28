import { configureStore } from "@reduxjs/toolkit";
import { eventsApi } from "./events/eventsApi";
import eventsReducer from "./events/eventsSlice";

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        [eventsApi.reducerPath]: eventsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(eventsApi.middleware)
})

