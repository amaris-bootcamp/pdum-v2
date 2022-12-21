import {setFlights, setHotels} from "../features/results/reducer";
import {store} from "../app/store"
// require('dotenv').config()

// const flights_url = process.env.FLIGHTS_API_URL || 'http://40.113.156.11/flights'
const flights_url = "http://flights:80"
// const hotels_url = process.env.BOOKING_API_URL || 'http://40.113.156.11/booking'
const hotels_url = "http://hotels:80"

// console.log(process.env)
// console.log("flights", process.env.FLIGHTS_API_URL)
// console.log("hotels", process.env.BOOKING_API_URL)

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
