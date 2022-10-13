import React, {useState} from "react";
import {Col, Row, Container} from "react-bootstrap";
import Forms from "../components/Forms"
import {CircularProgress} from "@mui/material";
import Graph from "../components/Graph";
import "../css/index.css"
import PieChart from "../components/PieChart";
import Card from 'react-bootstrap/Card';

const ShowData = () => {

    const [labels, setLabels] = useState([])
    const [offs, setOffs] = useState([])
    const [ecos, setEcos] = useState([])
    const [comforts, setComforts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [temperature, setTemperature] = useState([])
    const [isHourly, setIsHourly] = useState(false)

    const [energy_comsumption, setEnergy_Cons] = useState([])
    const [energy_comsumption_norm, setEnergy_Cons_Norm] = useState([])
    const [cum_energy_comsumption, setCum_Energy_Cons] = useState([])
    const [cum_energy_comsumption_norm, setCum_Energy_Cons_Norm] = useState([])

    const [energy_cost, setEnergy_Cost] = useState([])
    const [energy_cost_norm, setEnergy_Cost_Norm] = useState([])
    const [cum_energy_cost, setCum_Energy_Cost] = useState([])
    const [cum_energy_cost_norm, setCum_Energy_Cost_Norm] = useState([])

    const [cumComf, setCumComf] = useState([])
    const [cost_diff, setCost_Diff] = useState([])



    const graph_or_text = () => {
        return (labels.length === 0 && !isLoading ?
            <div className={"center-container"}>
                <Card style={{minHeight:"400px", minWidth:"800px"}}>
                <p className={"center-container"} style={{margin:"auto"}}>Please insert information on the form before :)</p>
                </Card>
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
                        <Col xl={6} md={12} className="pt-4">
                            {
                                show_graph(energy_cost, 'Energy Cost (€)', energy_cost_norm, 'Standard Energy Cost (€)')
                            }
                        </Col>
                        <Col xl={6} md={12} className="pt-4">
                            {
                                show_graph(cum_energy_cost, 'Cumulative Energy Cost (€)', cum_energy_cost_norm, 'Standard Cumulative Energy Cost (€)', true)
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} md={12} className="pt-4">
                            {
                                show_graph(energy_comsumption, 'Energy Consumption (kWh)', energy_comsumption_norm, 'Standard Energy Consumption (kWh)')
                            }
                        </Col>
                        <Col xl={6} md={12} className="pt-4">
                            {
                                show_graph(cum_energy_comsumption, 'Cumulative Energy Consumption (kWh)', cum_energy_comsumption_norm, 'Standard Cumulative Energy Consumption (kWh)', true)
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} md={12} className="pt-4">
                            {
                                show_graph(temperature,'Temperature (Cº)')
                            }
                        </Col>
                        <Col xl={6} md={12} className="pt-4">
                            {
                                show_graph(cumComf, "Cumulative Comfort")
                            }
                        </Col>
                    </Row>
                </>
        )
    }

    const show_graph = (val, title, values2=[], title2='', stepped=false) => {
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
                stepped={stepped}
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
            <Row>
                <Col xl={2} md={4} className="pt-4">
                    <Row>
                        <Card className="text-center p-0" style={{borderTopLeftRadius:'0px', borderBottomLeftRadius:'0px'}}>
                            <Card.Header>Profit gain</Card.Header>
                            <br></br>
                            <Card.Body className="justify-content-md-center">
                                <Card.Title>
                                    {Math.round(cost_diff * 100) / 100} €
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                        <Forms
                            setLabels={setLabels}
                            setOffs={setOffs}
                            setEcos={setEcos}
                            setComforts={setComforts}
                            setIsLoading={setIsLoading}
                            setTemperature={setTemperature}
                            setIsHourly={setIsHourly}
                            setEnergy_Cons={setEnergy_Cons}
                            setCum_Energy_Cons={setCum_Energy_Cons}
                            setEnergy_Cons_Norm = {setEnergy_Cons_Norm}
                            setEnergy_Cost = {setEnergy_Cost}
                            setEnergy_Cost_Norm = {setEnergy_Cost_Norm}
                            setCum_Energy_Cost = {setCum_Energy_Cost}
                            setCum_Energy_Cons_Norm = {setCum_Energy_Cons_Norm}
                            setCum_Energy_Cost_Norm = {setCum_Energy_Cost_Norm} 
                            setCost_Diff = {setCost_Diff}
                            setCumComf={setCumComf}
                        />
                    </Row>
                    
                </Col>
            
                <Col xl={10} md={8}>
                    {graph_or_text()}
                </Col>
               
            </Row>
        </Container>
    )
}

export default ShowData;