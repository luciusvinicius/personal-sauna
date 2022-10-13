import React, {useState} from "react";
import {Col, Row, Container} from "react-bootstrap";
import Forms from "../components/Forms"
import {CircularProgress} from "@mui/material";
import Graph from "../components/Graph";
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

    const [energy_comsumption, setEnergy_Cons] = useState([])
    const [energy_comsumption_norm, setEnergy_Cons_Norm] = useState([])
    const [cum_energy_comsumption, setCum_Energy_Cons] = useState([])
    const [cum_energy_comsumption_norm, setCum_Energy_Cons_Norm] = useState([])

    const [energy_cost, setEnergy_Cost] = useState([])
    const [energy_cost_norm, setEnergy_Cost_Norm] = useState([])
    const [cum_energy_cost, setCum_Energy_Cost] = useState([])
    const [cum_energy_cost_norm, setCum_Energy_Cost_Norm] = useState([])



    const graph_or_text = () => {
        return (labels.length === 0 && !isLoading ?
            <div className={"center-container"}>
                <p>Please insert information on the form before :)</p>
            </div>
            :
            loading_or_graph()

        )
    }

    const loading_or_graph = () => {
        console.log("isloading", isLoading)
        return (
            isLoading ?
                <div className={"center-container"}>
                    <CircularProgress/>
                </div>
                :
                <>
                    <Row>
                        <Col xl={6} md={12}>
                            {
                                show_graph(values,'Temperature')
                            }
                        </Col>
                        <Col xl={6} md={12}>
                            {
                                show_graph(values)
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} md={12}>
                            {
                                show_graph(energy_comsumption, 'Energy Consumption', energy_comsumption_norm, 'Normal energy Consumption')
                            }
                        </Col>
                        <Col xl={6} md={12}>
                            {
                                show_graph(cum_energy_comsumption, 'Energy Consumption Cumulative', cum_energy_comsumption_norm, 'Normal Energy Consumption Cumulative')
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} md={12}>
                            {
                                show_graph(energy_cost, 'Energy Cost', energy_cost_norm, 'Normal Energy Cost')
                            }
                        </Col>
                        <Col xl={6} md={12}>
                            {
                                show_graph(cum_energy_cost, 'Energy Cost Cumulative', cum_energy_cost_norm, 'Normal Energy Cost Cumulative')
                            }
                        </Col>
                    </Row>
                </>
        )
    }

    const show_graph = (val, title, values2=[], title2='') => {
        return (
            <Graph
                labels={labels}
                offs={offs}
                ecos={ecos}
                comforts={comforts}
                // values={values}
                isHourly={isHourly}
                values={val}
                title={title}
                values2={values2}
                title2={title2}
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
                <Col xl={2} md={4} className="pl-5 pt-5">
                    <Forms
                        setLabels={setLabels}
                        setOffs={setOffs}
                        setEcos={setEcos}
                        setComforts={setComforts}
                        setIsLoading={setIsLoading}
                        setValues={setValues}
                        setIsHourly={setIsHourly}
                        setEnergy_Cons={setEnergy_Cons}
                        setCum_Energy_Cons={setCum_Energy_Cons}
                        setEnergy_Cons_Norm = {setEnergy_Cons_Norm}
                        setEnergy_Cost = {setEnergy_Cost}
                        setEnergy_Cost_Norm = {setEnergy_Cost_Norm}
                        setCum_Energy_Cost = {setCum_Energy_Cost}
                        setCum_Energy_Cons_Norm = {setCum_Energy_Cons_Norm}
                        setCum_Energy_Cost_Norm = {setCum_Energy_Cost_Norm} 
                    />
                </Col>
            
                <Col xl={10} md={8}>
                    {graph_or_text()}
                </Col>
               
            </Row>
        </Container>
    )
}

export default ShowData;