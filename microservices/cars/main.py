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

url = "https://priceline-com-provider.p.rapidapi.com/v2/cars/resultsRequest"


def query(
        pickup_date: str = None,
        dropoff_date: str = None,
        dropoff_time: str = None,
        pickup_time: str = None,
        dropoff_city_string: str = None,
        pickup_airport_code: str = None,
        dropoff_city_id: str = None,
        **kwargs,
):
    """

    Parameters
    ----------
    pickup_date
    dropoff_date
    dropoff_time
    pickup_time
    dropoff_city_string
    pickup_airport_code
    dropoff_city_id
    kwargs

    Returns
    -------

    """
    querystring = {
        "pickup_date": pickup_date,
        "dropoff_date": dropoff_date,
        "dropoff_time": dropoff_time,
        "pickup_time": pickup_time,
        "dropoff_city_string": dropoff_city_string,
        "pickup_airport_code": pickup_airport_code,
        "dropoff_city_id": dropoff_city_id,
        **kwargs
    }

    headers = {
        "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
        "X-RapidAPI-Key": "xpR8a221kKmshz3a8P4Q0AMYYqAWp17qwO2jsn3JBNWU98tof0"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    print(response.text)

    data = response.json()

    ts = datetime.now().timestamp()
    with open(f"results/{ts}.json", "w") as f:
        json.dump(data, f)

    return data


@app.post("/search")
def search_hotels(pickup_date: str = Form(),
                  dropoff_date: str = Form(),
                  dropoff_time: str = Form(),
                  pickup_time: str = Form(),
                  dropoff_city_string: str = Form(),
                  pickup_airport_code: str = Form(),
                  dropoff_city_id: str = Form(),
                  location_departure: str = Form(),
                  date_departure: str = Form(),
                  date_departure_return: Optional[str] = Form(None)):
    # dropoff_time
    # pickup_time
    # dropoff_city_string
    # dropoff_city_id

    return query(
        pickup_airport_code=location_departure,
        pickup_date=date_departure,
        dropoff_date=date_departure_return,
        dropoff_time=dropoff_time,
        pickup_time=pickup_time,
        dropoff_city_string=dropoff_city_string,
        dropoff_city_id=dropoff_city_id,
    )


@app.get("/")
def test_hotels():
    pickup_date = datetime.now() + timedelta(days=7)
    dropoff_date = pickup_date + timedelta(days=3)

    return query(
        pickup_date=pickup_date.strftime("%Y-%m-%d"),
        dropoff_date=dropoff_date.strftime("%Y-%m-%d"),
        dropoff_time="10:00",
        pickup_time="10:00",
        dropoff_city_string="New York",
        pickup_airport_code="JFK",
        dropoff_city_id="800049480"
    )
