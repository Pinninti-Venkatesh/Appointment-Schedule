import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import { getLocations, getServices, submitApplication } from '../../APIs/apiCalls';
import Alert from 'react-bootstrap/Alert';
import BackgroundImage from '../../assets/images/bg.png'
const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}
const HomePage = () => {
    const [services, setServices] = useState([]);
    const [serv, setServ] = useState();
    const [city, setCity] = useState();
    const [date_time, setDateTime] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    const handleChange = (name) => (event) => {
        setCity(event.target.value);
    }
    const handleDateChange = (name) => (event) => {
        setDateTime(event.target.value);
    }
    const [cities, setCitites] = useState([]);
    useEffect(() => {
        console.log('it is happening')
        getServices().then(res => {
            console.log('services', res)
            setServices(res);
            setServ(res[0])
        })
    }, [error, success]);
    const handleServiceChange = (name) => (event) => {
        setServ(event.target.value);
        getLocations(event.target.value).then((value) => {
            setCitites(value);
            setCity(value[0]);
        })
    }
    const submitAppointment = () => {
        console.log('appointment submitted')
        const object = {
            location: city,
            service: serv,
            date_time: date_time,
            user: localStorage.getItem("user")
        };
        submitApplication(object).then(value => {
            if (value.service) {
                document.getElementById("success").style.display = 'block';
            } else {
                document.getElementById("error").style.display = 'block';
            }
        })
    }
    const closeError = () => {
        document.getElementById("error").style.display = 'none';
    }
    const closeSuccess = () => {
        document.getElementById("success").style.display = 'none';
    }
    return (
        <div className="text-center" style={HeaderStyle}>
            <Container fluid="md">
                <Alert variant="danger" onClose={() => closeError()} id="error" style={{ display: 'none' }} dismissible>
                    <Alert.Heading>Oh snap! The slot is booked!</Alert.Heading>
                </Alert>
                <Alert variant="success" onClose={() => closeSuccess()} id="success" style={{ display: 'none' }} dismissible>
                    <Alert.Heading>Yayy! Appointment confirmed</Alert.Heading>
                    <p>
                        A confirmation email has been sent! Please check your inbox.
                    </p>
                </Alert>
                <Row>
                    <Col><h1 className="main-title home-page-title">Hello  {localStorage.getItem('user')} </h1></Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Pick a Service to avail</Form.Label>
                            <Form.Select aria-label="Default select example" id="service" value={serv} onChange={handleServiceChange()}>
                                {services && services.map(service => {
                                    return <option value={service}>{service}</option>
                                })}
                            </Form.Select></Form.Group></Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Pick a City</Form.Label>
                            <Form.Select aria-label="Default select example" id="city" value={city} onChange={handleChange()}>
                                {cities && cities.map(service => {
                                    return <option value={service}>{service}</option>
                                })}
                            </Form.Select></Form.Group></Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Pick DateTime</Form.Label>
                            <Form.Control type="datetime-local" id="meeting-time" value={date_time}
                                name="meeting-time" onChange={handleDateChange()}
                                min="2018-06-07T00:00" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row> <Col><button className="primary-button" onClick={submitAppointment}>Book</button></Col><Col><Link to="/">
                    <button className="primary-button" >Log out</button>
                </Link></Col></Row>

                {/* <Button variant="dark" onClick={submitAppointment}>Book Appointment</Button>

                <Link to="/">
                    <button className="primary-button" >Log out</button>
                </Link> */}
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
                    integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                    crossorigin="anonymous"
                />
            </Container>
        </div >
    )
}

export default HomePage;
