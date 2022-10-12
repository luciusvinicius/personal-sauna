import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import Forms from "../components/Forms"
import {CircularProgress, Container} from "@mui/material";
import Graph from "../components/Graph";
import {LABELS} from "../temps/Temps.json";
import "../css/index.css"


const ShowData = () => {

    const [labels, setLabels] = useState([])
    const [offs, setOffs] = useState([])
    const [ecos, setEcos] = useState([])
    const [comforts, setComforts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState([])

    const graph_or_text = () => {
        return (labels.length === 0 ?
            <div className={"center-container"}>
                <p>Please insert information on the form before :)</p>
            </div>
            :
            <Graph
                labels={labels}
                offs={offs}
                ecos={ecos}
                comforts={comforts}
                values={values}
            />
        )
    }

    return (
        <Container>
            <br/>
            <br/>
            <Row>
                <Col xs={4}>
                    <Forms
                        setLabels={setLabels}
                        setOffs={setOffs}
                        setEcos={setEcos}
                        setComforts={setComforts}
                        setIsLoading={setIsLoading}
                        setValues={setValues}
                    />
                </Col>
                <Col xs={8}>
                    {isLoading ?
                        <div className={"center-container"}>
                            <CircularProgress/>
                        </div>
                        :
                        graph_or_text()
                    }

                </Col>
            </Row>
        </Container>
    )
}

export default ShowData;