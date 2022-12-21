import React from "react";
import Table from "react-bootstrap/Table";
import {useSelector} from "react-redux";
import moment from "moment";
import {Button} from "react-bootstrap";
import {CartFill} from 'react-bootstrap-icons';
import {useAccordionButton} from "react-bootstrap/AccordionButton";


function format_duration(duration, format) {
    return moment.utc(duration.asMilliseconds()).format(format);
}

function SelectFlight({children, eventKey}) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {

    });

    return (<Button
        variant="outline-success" size="lg"
        className="float-end" onClick={decoratedOnClick}>{children}</Button>);
}


const FlightResults = () => {
    const {airports, airlines, itineraries, summary} = useSelector((state) => state.results.flights);
    const {departure, arrival} = useSelector((state) => state.airport);
    const departureCity = airports
        .filter((a) => a.code === departure.iata)
        .pop().city;
    const arrivalCity = airports
        .filter((a) => a.code === arrival.iata)
        .pop().city;

    return (<>
        {itineraries && (<>
            <h3>Flights from {departureCity} to {arrivalCity}</h3>
            <Table bordered hover className="search-results flights">
                <thead>
                <tr>
                    <th>Ranking</th>
                    <th>Airline</th>
                    <th>Flight(s)</th>
                    <th>Duration</th>
                    <th>Price</th>
                    {/*<th style={{maxWidth: 50}}>Add to cart</th>*/}
                </tr>
                </thead>
                <tbody>
                {/*<tr>*/}
                {/*    <td><b>#1</b></td>*/}
                {/*    <td><b>MAD</b><br/>Linate Airport, Madrid<br/><b>18/05 9:05</b></td>*/}
                {/*    <td><b>1:55</b><br/>(direct)<br/></td>*/}
                {/*    <td><b>BRU</b><br/>Linate Airport, Brussels<br/><b>18/05 11:30</b></td>*/}
                {/*    <td><b>Iberia</b><br/>IB3206</td>*/}
                {/*    <td>$109.1 USD</td>*/}
                {/*</tr>*/}
                {/*{Object.values(mapValues(itineraries, (itinerary, index) => {*/}
                {Object.values(itineraries).map((itinerary, index) => {
                    const trip = itinerary.trip
                        .slice()
                        .sort((a, b) => new Date(a.departDateTime) - new Date(b.departDateTime));
                    const totalDuration = moment.duration(itinerary.duration, "minutes");

                    return (<tr className={index < 3 ? "table-success" : ""} key={index.toString()}>
                        <td>
                            <b>{index + 1}</b>
                        </td>
                        {/*<td><b>#{index}</b></td>*/}
                        <td>
                            <table className="table-borderless table-sm text-right">
                                {trip.map((t) => {
                                    const airline = airlines
                                        .filter((a) => a.code === t.marketingAirline)
                                        .pop();

                                    return (<tr>
                                        <td className="w-100">
                                            <a href={"https://" + airline.websiteUrl}>
                                                <img
                                                    src={"https://www.priceline.com/sam/air/carrier_logos/" + airline.smallImage}
                                                    className="airline-logo"
                                                    alt={airline.name + " logo"}
                                                />
                                            </a>
                                        </td>
                                        <td>
                                            <i>
                                                {t.marketingAirline}
                                                {t.flightNumber}
                                            </i>
                                        </td>
                                    </tr>);
                                })}
                            </table>
                        </td>
                        <td>
                            <table className="table-borderless table-sm">
                                {trip.map((t) => {
                                    return (<tr>
                                        <td>
                                            <b>
                                                {moment(t.departDateTime).format("D/MM HH:mm")}
                                            </b>
                                        </td>
                                        <td>
                                            <b>{t.origAirport}</b>
                                        </td>
                                        <td>&#10140;</td>
                                        <td>
                                            <b>{t.destAirport}</b>
                                        </td>
                                        <td>
                                            <b>
                                                {moment(t.arrivalDateTime).format("D/MM HH:mm")}
                                            </b>
                                        </td>
                                        <td>
                                            <i>
                                                (
                                                {format_duration(moment.duration(t.duration, "minutes"), "HH:mm")}
                                                )
                                            </i>
                                        </td>
                                    </tr>);
                                })}
                            </table>
                        </td>
                        <td className="hotel-price">
                            {totalDuration.days() * 24 + totalDuration.hours()}:
                            {format_duration(totalDuration, "mm")}
                        </td>
                        <td className="hotel-price">${itinerary.totalFare} USD <SelectFlight
                            eventKey="hotels"><CartFill/></SelectFlight>
                        </td>
                    </tr>);
                })}
                </tbody>
            </Table>
        </>)}
    </>);
};

export default FlightResults;
