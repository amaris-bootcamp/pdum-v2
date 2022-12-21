import React, {useState} from "react";
import "./App.css";
import {Col, Container, Row} from "react-bootstrap";

import FlightFiltersPanel from "./features/forms/FlightFilters";
import FlightDetails from "./features/forms/FlightDetails";
import WorldMap from "./features/airport/WorldMap";
import {FlightResults, HotelResults} from "./features/results";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import {useAccordionButton} from "react-bootstrap/AccordionButton";

import {useDispatch, useSelector} from "react-redux";

import {get_flights, get_hotels} from "./api"

import {unsetFlights, unsetHotels} from "./features/results/reducer";


const App = () => {
    const [flightsPlaceholder, setFlightsPlaceholder] = useState("none");
    const [hotelsPlaceholder, setHotelsPlaceholder] = useState("none");

    const dispatch = useDispatch();

    let has_flights = useSelector((state) => !!state.results.flights.itineraries);
    const has_hotels = useSelector((state) => state.results.hotels.count > 0);
    const trigger_flights_accordion = useAccordionButton("flights", () => {
    });

    const results_placeholders = {
        loader: <img src={require("./loader.gif")} alt="loader" className="loader"/>,
        none: <></>,
        no_result: <p>Sorry there are no flights anymore or yet for this period.</p>
    }

    return (<div className="App">
        <br/>
        <Container fluid>
            <Row>
                <Col md={6}>
                    <Form method="post"
                          onSubmit={(event) => {
                              const {target: form} = event;

                              dispatch(unsetFlights());
                              setFlightsPlaceholder("loader");
                              dispatch(unsetHotels());
                              setHotelsPlaceholder("loader");

                              get_flights(form, () => {
                                  setFlightsPlaceholder("no_result");
                                  trigger_flights_accordion();
                              })
                              get_hotels(form, () => {
                                  setHotelsPlaceholder("no_result");
                              })

                              event.preventDefault();
                          }}
                    >
                        <FlightDetails/>
                        <FlightFiltersPanel/>
                        <div className="my-3 d-flex justify-content-center">
                            <input
                                className="btn btn-lg btn-outline-primary"
                                type="submit"
                                value="Let's go ! ✈"
                            />
                        </div>
                    </Form>
                </Col>
                <Col>
                    <WorldMap/>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Accordion flush defaultActiveKey="flights">
                        <Accordion.Item eventKey="flights">
                            <Accordion.Header><h2>Flights</h2></Accordion.Header>
                            <Accordion.Body>
                                {has_flights ? <FlightResults/> : results_placeholders[flightsPlaceholder]}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="hotels">
                            <Accordion.Header><h2>Hotels</h2></Accordion.Header>
                            <Accordion.Body>
                                {has_hotels ? <HotelResults/> : results_placeholders[hotelsPlaceholder]}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        </Container>
    </div>);
};

export default App;
