import {configureStore} from '@reduxjs/toolkit';
import panelReducer from '../features/panel/reducer'
import airportReducer from "../features/airport/reducer"
import resultsReducer from "../features/results/reducer"

export const store = configureStore({
    reducer: {
        panel: panelReducer,
        airport: airportReducer,
        results: resultsReducer,
    },
});
