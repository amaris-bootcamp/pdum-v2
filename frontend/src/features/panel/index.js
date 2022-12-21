import React from "react";
import {toggle} from './reducer'
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Row} from "react-bootstrap";

const Panel = () => {
    const panel = useSelector((state) => state.panel.open)
    const dispatch = useDispatch()

    return (
        <Row>
            <Col md={12}>
                {panel ? 'Yay' : 'Nope'}
            </Col>
            <Col md={12}>
                <Button onClick={() => dispatch(toggle())}>Click</Button>
            </Col>
        </Row>
    )
}

export default Panel
