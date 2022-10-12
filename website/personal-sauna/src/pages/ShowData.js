import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import Forms from "../components/Forms"
import {Container} from "@mui/material";

const ShowData = () => {

    const [x, setX] = useState("")
    const [offs, setOffs] = useState([])
    const [ecos, setEcos] = useState([])
    const [conforts, setConforts] = useState([])



    return (
        <Container>
            <br/>
            <br/>
            <Row>
                <Col xs={6}>
                    <Forms />
                </Col>
                <Col xs={6}>
                    <p>siropth</p>
                </Col>
            </Row>
        </Container>
    )
}

export default ShowData;