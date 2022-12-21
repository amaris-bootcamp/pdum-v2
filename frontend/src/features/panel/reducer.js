import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'panel',
    initialState: {
        open: true
    },
    reducers: {
        open: (state => {
            state.open = true
        }),
        close: (state => {
            state.open = false
        }),
        toggle: (state => {
            state.open = !state.open
        }),
    }
})

export const {open, close, toggle} = slice.actions

export default slice.reducer
