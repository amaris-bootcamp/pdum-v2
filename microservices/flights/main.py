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


def query(
        location_departure: str,
        location_arrival: str,
        date_departure: str,
        itinerary_type: str,
        number_of_passengers: int,
        number_of_stops: int,
        class_type: str,
        sort_order: str,
        date_departure_return: str = None,
        **kwargs,
) -> Dict[str, Any]:
    """

    Parameters
    ----------
    location_departure
    location_arrival
    date_departure
    itinerary_type
    number_of_passengers
    number_of_stops
    class_type
    sort_order
    date_departure_return
    kwargs

    Returns
    -------

    """
    url = "https://priceline-com-provider.p.rapidapi.com/v1/flights/search"

    querystring = {
        "location_departure": location_departure,
        "location_arrival": location_arrival,
        "date_departure": date_departure,
        "itinerary_type": itinerary_type,
        "number_of_passengers": number_of_passengers,
        "number_of_stops": number_of_stops,
        "class_type": class_type,
        "sort_order": sort_order,
        "date_departure_return": date_departure_return,
        **kwargs,
    }

    headers = {
        "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
        "X-RapidAPI-Key": "fe460c4cd0mshaf2319ea2f11e8bp1df1aajsn9dcd69653338",
    }

    response = requests.request("GET", url, headers=headers, params=querystring)
    data = response.json()

    ts = datetime.now().timestamp()
    with open(f"results/{ts}.json", "w") as f:
        json.dump(data, f)

    newfield = dict(dict())
    sliceList = []
    notNestedField = ["changesAllowed", "totalTripDurationInHours", "passportRequired"]

    if not data["pricedItinerary"]:
        return {}

    for i in data["pricedItinerary"]:

        sliceID = i["slice"][0]["uniqueSliceId"]
        sliceList.append(sliceID)
        newfield[sliceID] = dict()
        newfield[sliceID]["totalFare"] = i["pricingInfo"]["totalFare"]
        for field in notNestedField:
            newfield[sliceID][field] = i[field]

    segmentsBySlice = dict()
    sliceField = ["duration", "overnightLayover"]
    for j in sliceList:
        segmentsBySlice[j] = []
        for i in data["slice"]:

            if i["uniqueSliceId"] == j:
                for segment in i["segment"]:
                    segmentsBySlice[j].append(segment["uniqueSegId"])
                for field in sliceField:
                    newfield[j][field] = i[field]

    flightInfo = [
        "departDateTime",
        "arrivalDateTime",
        "origAirport",
        "destAirport",
        "duration",
        "marketingAirline",
        "flightNumber",
    ]

    for Slice in segmentsBySlice:
        newfield[Slice]["trip"] = []
        for i in data["segment"]:
            for segment in segmentsBySlice[Slice]:
                if i["uniqueSegId"] == segment:
                    newfield[Slice]["trip"].append(
                        {info: i[info] for info in flightInfo}
                    )

    summary = data["filteredTripSummary"]

    newJson = {
        "airline": data["airline"],
        "airport": data["airport"],
        "summary": summary,
        "itinerary": newfield,
    }
    with open(f"results/{ts}.json", "w") as f:
        json.dump(newJson, f)

    return newJson


@app.post("/flights/search")
async def search_flights(location_departure: str = Form(),
                   location_arrival: str = Form(),
                   date_departure: str = Form(),
                   itinerary_type: str = Form(),
                   number_of_passengers: int = Form(),
                   number_of_stops: int = Form(),
                   class_type: str = Form(),
                   sort_order: str = Form(),
                   date_departure_return: Optional[str] = Form(None),
                   ):

    return query(location_departure,
                 location_arrival,
                 date_departure,
                 itinerary_type,
                 number_of_passengers,
                 number_of_stops,
                 class_type,
                 sort_order,
                 date_departure_return)


@app.get("/flights")
def test_flight():
    date_departure = datetime.now() + timedelta(days=7)
    date_departure_return = date_departure + timedelta(days=3)

    return query(
        date_departure=date_departure.strftime("%Y-%m-%d"),
        class_type="ECO",
        itinerary_type="ONE_WAY",
        location_arrival="BRU",
        location_departure="PAR",
        sort_order="PRICE",
        date_departure_return=date_departure_return.strftime("%Y-%m-%d"),
        duration_max=2051,
        number_of_passengers=1,
        price_max=20000,
        number_of_stops=1,
    )
