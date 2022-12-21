import React, { useState } from "react";
import Panel from "./Panel";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import AccordionButton from "react-bootstrap/AccordionButton";
import Button from "react-bootstrap/Button";

const FlightFilters = (props) => {
  const [travelFacilities, setTravelFacilities] = useState([]);
  const [show, setShow] = useState(false);

  return (
    <Panel>
      <h3>
        Refine your flight criteria{" "}
        <Button
          size="sm"
          className=""
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? "-" : "+"}
        </Button>
      </h3>

      <Row className={show ? "" : "d-none"}>
        <Form.Group as={Col} md={5}>
          <Form.Label>Class type</Form.Label>
          <ToggleButtonGroup type="radio" name="class_type" defaultValue="ECO">
            <ToggleButton value="ECO" id="eco">Economy</ToggleButton>
            <ToggleButton value="PEC" id="pec">Premium</ToggleButton>
            <ToggleButton value="BUS" id="bus">Business</ToggleButton>
            <ToggleButton value="FST" id="fst">First</ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
        <Form.Group as={Col} md={3} className="offset-md-1">
          <Form.Label>Sort by</Form.Label>
          <Form.Control as="select" name="sort_order" defaultValue="">
            <option value="PRICE">Price</option>
            <option value="ARRIVETIME">Arrival time</option>
            <option value="DEPARTTIME">Departure time</option>
            <option value="TRAVELTIME">Travel time</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md={2}>
          <Form.Label>Room number</Form.Label>
          <Form.Control
            name="room_number"
            type="number"
            defaultValue={1}
            min={1}
          />
        </Form.Group>
      </Row>
    </Panel>
  );
};

export default FlightFilters;
