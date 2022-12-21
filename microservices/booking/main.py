from datetime import datetime, timedelta
from typing import Dict, Any, Optional

import requests
import json

from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

url = "https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates"


def query(
        adults_number: int = None,
        room_number: int = None,
        units: str = None,
        locale: str = None,
        checkout_date: str = None,
        checkin_date: str = None,
        latitude: float = None,
        longitude: float = None,
        order_by: str = None,
        filter_by_currency: str = None,
        page_number: int = None,
        **kwargs
) -> Dict[str, Any]:
    """
    Parameters
    ----------
    adults_number
    room_number
    units
    locale
    checkout_date
    checkin_date
    latitude
    longitude
    order_by:
        Can be one of 'popularity', 'class_ascending', 'class_descending', 'distance', 'upsort_bh', 'review_score', 'price'
    filter_by_currency
    page_number

    Returns
    -------

    """
    querystring = {
        "adults_number": adults_number,
        "room_number": room_number,
        "units": units,
        "locale": locale,
        "checkout_date": checkout_date,
        "checkin_date": checkin_date,
        "latitude": latitude,
        "longitude": longitude,
        "order_by": order_by,
        "filter_by_currency": filter_by_currency,
        "page_number": page_number,
        **kwargs
    }

    headers = {
        "x-rapidapi-host": "booking-com.p.rapidapi.com",
        "x-rapidapi-key": "xpR8a221kKmshz3a8P4Q0AMYYqAWp17qwO2jsn3JBNWU98tof0",
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    print(response.text)

    data = response.json()

    ts = datetime.now().timestamp()
    with open(f"results/{ts}.json", "w") as f:
        json.dump(data, f)

    return data


@app.post("/booking/search")
async def search(date_departure: str = Form(),
                 number_of_passengers: int = Form(),
                 room_number: int = Form(),
                 latitude: float = Form(),
                 longitude: float = Form(),
                 sort_order: str = Form(),
                 date_departure_return: Optional[str] = Form(None),
                 min_days: Optional[int] = Form(None),
                 ) -> Dict[str, Any]:
    """

    Returns
    -------

    """

    if not date_departure_return:
        default_date = datetime.strptime(date_departure, "%Y-%m-%d")
        default_date += timedelta(days=min_days)
        date_departure_return = default_date.strftime("%Y-%m-%d")

    return query(
        adults_number=number_of_passengers,
        room_number=room_number,
        units="metric",
        locale="en-us",
        checkout_date=date_departure_return,
        checkin_date=date_departure,
        latitude=latitude,
        longitude=longitude,
        order_by=sort_order.lower(),
        # filter_by_currency=filter_by_currency,
        filter_by_currency="USD",
        page_number=0,
        # page_number=page_number,
        # pickup_airport_code=location_departure,
        # pickup_date=date_departure,
        # dropoff_date=date_departure_return if "date_departure_return" in params else None,
    )


@app.get("/booking")
def test() -> Dict[str, Any]:
    """Runs a random query for 2 adults at lat:51, lon:4

    Returns
    -------

    """
    checkin = datetime.now() + timedelta(days=7)
    checkout = checkin + timedelta(days=3)

    return query(
        adults_number=2,
        room_number=1,
        units="metric",
        locale="fr",
        checkin_date=checkin.strftime("%Y-%m-%d"),
        checkout_date=checkout.strftime("%Y-%m-%d"),
        latitude=51.200429,
        longitude=4.454687,
        order_by="price",
        filter_by_currency="EUR",
        page_number=0,
    )
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)
