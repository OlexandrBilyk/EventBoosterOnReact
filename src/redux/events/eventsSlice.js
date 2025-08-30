import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const eventsSlice = createSlice({
    name: 'eventsSlice',
    initialState: {
        events: []
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload
        }
    }
})

export const { setEvents } = eventsSlice.actions
const eventsReducer = eventsSlice.reducer
export default eventsReducer