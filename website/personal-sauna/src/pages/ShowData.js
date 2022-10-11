import React from "react";
import {Col, Row} from "react-bootstrap";
import Forms from "../components/Forms"

const ShowData = () => {
    return (
        <Row>
            <Col xs={6}>
                <Forms />
            </Col>
            <Col xs={6}>
                <p>siropth</p>
            </Col>
        </Row>
    )
}

export default ShowData;