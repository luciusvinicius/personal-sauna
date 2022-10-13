import React, {useState} from "react";
import {Col, Row, Container} from "react-bootstrap";
import Forms from "../components/Forms"
import {CircularProgress} from "@mui/material";
import Graph from "../components/Graph";
import {LABELS} from "../temps/Temps.json";
import "../css/index.css"
import PieChart from "../components/PieChart";


const ShowData = () => {

    const [labels, setLabels] = useState([])
    const [offs, setOffs] = useState([])
    const [ecos, setEcos] = useState([])
    const [comforts, setComforts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState([])
    const [isHourly, setIsHourly] = useState(false)

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
                isHourly={isHourly}
            />
        )
    }

    const pie_chart = () => {
        return (
            <div>
                <PieChart values={[12,8,4]}/>
            </div>
        
        );
    }

    return (
        <Container fluid >
            <br/>
            <br/>
            <Row>
                <Col xs={2} className="pl-5 pt-5">
                    <Forms
                        setLabels={setLabels}
                        setOffs={setOffs}
                        setEcos={setEcos}
                        setComforts={setComforts}
                        setIsLoading={setIsLoading}
                        setValues={setValues}
                        setIsHourly={setIsHourly}
                    />
                </Col>
            
                <Col xs={10}>
                    <Row>
                        <Col xl={6} md={12}>
                            {isLoading ?
                                <div className={"center-container"}>
                                    <CircularProgress/>
                                </div>
                                :
                                graph_or_text()
                            }
                        </Col>
                        <Col xl={6} md={12}>
                            {isLoading ?
                                <div className={"center-container"}>
                                    <CircularProgress/>
                                </div>
                                :
                                graph_or_text()
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} md={12}>
                            {isLoading ?
                                <div className={"center-container"}>
                                    <CircularProgress/>
                                </div>
                                :
                                graph_or_text()
                            }
                        </Col>
                        <Col xl={6} md={12}>
                            {isLoading ?
                                <div className={"center-container"}>
                                    <CircularProgress/>
                                </div>
                                :
                                graph_or_text()
                            }
                        </Col>
                    </Row>
                </Col>
               
            </Row>
        </Container>
    )
}

export default ShowData;