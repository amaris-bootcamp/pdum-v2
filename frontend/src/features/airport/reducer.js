import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'airport', initialState: {
        departure: {
            name: "", gps: [], iata: "",
        }, arrival: {
            name: "", gps: [], iata: "",
        },
    }, reducers: {
        setDeparture: ((state, action) => {
            state.departure = action.payload
        }), setArrival: ((state, action) => {
            state.arrival = action.payload
        }),
    }
})

export const {setDeparture, setArrival} = slice.actions

export default slice.reducer
