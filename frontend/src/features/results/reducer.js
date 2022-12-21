import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'results',
    initialState: {
        any: false,
        flights: {},
        hotels: {}
    },
    reducers: {
        setFlights: ((state, action) => {
            state.flights.airlines = action.payload.airline;
            state.flights.airports = action.payload.airport;
            state.flights.itineraries = action.payload.itinerary;
            state.flights.summary = action.payload.summary;
            state.any = true;
        }),
        unsetFlights: ((state, action) => {
            state.flights = {};
            state.any = false;
        }),
        setHotels: ((state, action) => {
            state.hotels = action.payload;
            state.any = true;
        }),
        unsetHotels: ((state, action) => {
            state.flights = {};
            state.any = false;
        }),
    }
})

export const {setFlights, unsetFlights, setHotels, unsetHotels} = slice.actions

export default slice.reducer
