import {setFlights, setHotels} from "../features/results/reducer";
import {store} from "../app/store"

const flights_url = 'http://localhost:8000/flights'
const hotels_url = 'http://localhost:8001/booking'

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
