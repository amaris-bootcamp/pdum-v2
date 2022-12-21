import React, {useState} from "react";
import Panel from "./Panel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import LocationInput from "./LocationInput";
import {setDeparture, setArrival} from "../airport/reducer";
import {useDispatch} from "react-redux";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const FlightDetails = (props) => {
    const [returnTicket, setReturnTicket] = useState("ROUND_TRIP");
    const dispatch = useDispatch();

    return (
        <Panel>
            <h2>Select your best destination</h2>
            <Row>
                <Form.Group as={Col} md={6}>
                    <Form.Label htmlFor="departure">Departure</Form.Label>
                    <LocationInput
                        id="departure"
                        name="location_departure"
                        onChange={(value) => dispatch(setDeparture(value))}
                    />
                </Form.Group>
                <Form.Group as={Col} md={6}>
                    <Form.Label htmlFor="arrival">Destination</Form.Label>
                    <LocationInput
                        id="arrival"
                        name="location_arrival"
                        onChange={(value) => dispatch(setArrival(value))}
                        latlong
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md={returnTicket === "ROUND_TRIP" ? 6 : 12}>
                    <Form.Label htmlFor="date-departure">Departure date</Form.Label>
                    <Form.Control id="date-departure" name="date_departure" type="date"/>
                </Form.Group>
                {returnTicket === "ROUND_TRIP" && (
                    <Form.Group as={Col} md={6}>
                        <Form.Label htmlFor="date-return">Return date</Form.Label>
                        <Form.Control
                            id="date-return"
                            name="date_departure_return"
                            type="date"
                        />
                    </Form.Group>
                )}
            </Row>
            <Row>
                <Form.Group as={Col} md={3}>
                    <Form.Label>Itinerary type</Form.Label>
                    <ToggleButtonGroup
                        type="radio"
                        name="itinerary_type"
                        defaultValue={returnTicket}
                        onChange={(value) => {
                            setReturnTicket(value);
                        }}
                    >
                        <ToggleButton value="ONE_WAY" id="one-way">
                            One way
                        </ToggleButton>
                        <ToggleButton value="ROUND_TRIP" id="round-trip">
                            Return
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Form.Group>
                {returnTicket === "ONE_WAY" ? (
                    <Form.Group as={Col} md={3}>
                        <Form.Label htmlFor="min_days">Minimum stay (days)</Form.Label>
                        <Form.Control
                            type="number"
                            defaultValue={3}
                            id="min_days"
                            name="min_days"
                        />
                    </Form.Group>
                ) : (<Col md={3}/>)}

                <Form.Group as={Col} md={2}>
                    <Form.Label htmlFor="nr_passengers">Number of travelers</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={1}
                        id="nr_passengers"
                        name="number_of_passengers"
                    />
                </Form.Group>
                <Form.Group as={Col} md={2}>
                    <Form.Label htmlFor="nr_passengers">children</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={0}
                        id="nr_infants"
                        name="number_of_infants"
                    />
                </Form.Group>
                <Form.Group as={Col} md={2}>
                    <Form.Label htmlFor="stopovers">Stopovers</Form.Label>
                    <Form.Range
                        id="stopovers"
                        name="number_of_stops"
                        min={0}
                        max={2}
                        step={1}
                        defaultValue={2}
                    />
                    <table className="range-labels">
                        <tbody>
                        <tr>
                            <td>direct</td>
                            <td>&le; 1</td>
                            <td>2+</td>
                        </tr>
                        </tbody>
                    </table>
                </Form.Group>
            </Row>
        </Panel>
    );
};

export default FlightDetails;
