import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const eventsSlice = createSlice({
    name: 'eventsSlice',
    initialState: {
        events: []
    },
    reducers: {
        // addEvent: (state, action) => {
        //     const { name, date, location, info, who, prices, icon, qr } = action.payload;
        //     state.events.push({
        //         id: nanoid(),
        //         name,
        //         date,
        //         location,
        //         info,
        //         who,
        //         prices,
        //         icon,
        //         qr
        //     });
        // }
        setEvents: (state, action) => {
            state.events = action.payload
        }
    }
})

export const { setEvents } = eventsSlice.actions
const eventsReducer = eventsSlice.reducer
export default eventsReducer