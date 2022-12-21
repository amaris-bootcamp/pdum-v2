import {setFlights, setHotels} from "../features/results/reducer";

import {store} from "../app/store"

// export const flights_url = '"http://host.docker.internal:4990"'
const flights_url = 'http://localhost:4990'

// const hotels_url = 'http://host.docker.internal:4992'
const hotels_url = 'http://localhost:4992'

export async function get_flights(form, then) {
    fetch(`${flights_url}/search`, {
        method: "POST", body: new FormData(form),
    })
        .then((response) => response.json())
        .then((value) => {
            store.dispatch(setFlights(value));
        })
        .catch(console.error)
        .finally(then);
}

export async function get_hotels(form, then) {
    fetch(`${hotels_url}/search`, {
        method: "POST", body: new FormData(form),
    })
        .then((response) => response.json())
        .then((value) => store.dispatch(setHotels(value)))
        .catch(console.error)
        .finally(then);
}
