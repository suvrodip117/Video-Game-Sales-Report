import React from 'react';
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API_ROUTES } from '../utils/apiRoutes';
import axiosInstance from '../utils/axiosInstance';
import { Card } from 'react-bootstrap';
import { Alignment } from 'react-data-table-component';
import AlertGeneric from './generic/AlertGeneric';
import { modelPlotContext } from '../contexts/ModelPlotContext';

const PredictSalesModal = () => {
  const plot = useContext(modelPlotContext);

  //------------STATE MANAGEMENT-------------
  const [show, setShow] = useState(false);
  const [customAlert, setCustomAlert] = useState({ variant: '', message: '' });
  const [formData, setFormData] = useState({
    gameRank: '',
    name: '',
    platform: '',
    platformGroup: '',
    gameYear: '',
    genre: '',
    publisher: '',
    naSales: '',
    euSales: '',
    jpSales: '',
    otherSales: '',
  });
  const [predictedValue, setPredictedValue] = useState();
  const [metrics, setMetrics] = useState(null);
  const [platformDropdowns, setPlatformDropDowns] = useState([]);
  const [platformGroupDropdowns, setPlatformGroupDropDowns] = useState([]);
  const [genre, setGenre] = useState([]);

  //--------------FUNCTIONS--------------------
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    try {
      const responsePlatform = await axiosInstance.get(
        `${API_ROUTES.VIDEOGAMEDATATABLE.DROPDOWNS}`,
        {
          params: { paramName: 'platform' },
        },
      );
      setPlatformDropDowns(responsePlatform.data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setCustomAlert({ variant: 'danger', message: error.response.data.message });
      } else {
        setCustomAlert({ variant: 'danger', message: 'Something went wrong. Please try again.' });
      }
    }

    try {
      const responsePlatformGroup = await axiosInstance.get(
        `${API_ROUTES.VIDEOGAMEDATATABLE.DROPDOWNS}`,
        {
          params: { paramName: 'platformGroup' },
        },
      );
      setPlatformGroupDropDowns(responsePlatformGroup.data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setCustomAlert({ variant: 'danger', message: error.response.data.message });
      } else {
        setCustomAlert({ variant: 'danger', message: 'Something went wrong. Please try again.' });
      }
    }

    try {
      const responseGenre = await axiosInstance.get(`${API_ROUTES.VIDEOGAMEDATATABLE.DROPDOWNS}`, {
        params: { paramName: 'genre' },
      });
      setGenre(responseGenre.data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setCustomAlert({ variant: 'danger', message: error.response.data.message });
      } else {
        setCustomAlert({ variant: 'danger', message: 'Something went wrong. Please try again.' });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${API_ROUTES.VIDEOGAMEDATATABLE.PREDICT}`,
        formData,
      );
      console.log(response);
      setPredictedValue(response.data.predictedValue);
      response.data.performance.plot = plot;
      //console.log(response.data.performance);
      setMetrics(response.data.performance);
    } catch (error) {
      if (error.response && error.response.data.message) {
        if (error.response && error.response.data.message) {
          setCustomAlert({ variant: 'danger', message: error.response.data.message });
        } else {
          setCustomAlert({ variant: 'danger', message: 'Something went wrong. Please try again.' });
        }
      }
    }
  };

  const downloadMetricsExcel = async (e) => {
    e.preventDefault();
    try {
      console.log('metrics', metrics);
      const response = await axiosInstance.post(`${API_ROUTES.MODEL_REPORT}`, metrics, {
        responseType: 'blob',
      });
      console.log(response.data.type);

      const blob = new Blob([response.data], {
        type: response.data.type,
      });
      const url = URL.createObjectURL(blob);
      console.log(url);
      const atag = document.createElement('a');
      atag.href = url;
      atag.download = 'regression_model.xlsx';
      atag.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      if (error.response && error.response.data.message) {
        if (error.response && error.response.data.message) {
          setCustomAlert({ variant: 'danger', message: error.response.data.message });
        } else {
          setCustomAlert({ variant: 'danger', message: 'Something went wrong. Please try again.' });
        }
      }
    }
  };

  return (
    <>
      <AlertGeneric
        variant={customAlert.variant}
        message={customAlert.message}
        setCustomAlert={setCustomAlert}
      />
      <button
        className="btn btn-outline-primary btn-sm mt-3 me-3 mb-2"
        style={{ float: 'right', padding: '6px 10px' }}
        onClick={handleShow}
      >
        Predict
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Rank</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="gameRank"
                    value={formData.gameRank}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Platform</Form.Label>
                  <Form.Select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    size="sm"
                  >
                    {platformDropdowns.map((dropdownValue, index) => (
                      <option key={dropdownValue} value={dropdownValue}>
                        {dropdownValue}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Platform Group</Form.Label>
                  <Form.Select
                    name="platformGroup"
                    size="sm"
                    value={formData.platformGroup}
                    onChange={handleChange}
                  >
                    {platformGroupDropdowns.map((dropdownValue, index) => (
                      <option key={dropdownValue} value={dropdownValue}>
                        {dropdownValue}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="gameYear"
                    value={formData.gameYear}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Genre</Form.Label>
                  <Form.Select
                    name="genre"
                    size="sm"
                    value={formData.genre}
                    onChange={handleChange}
                  >
                    {genre.map((dropdownValue, index) => (
                      <option key={dropdownValue} value={dropdownValue}>
                        {dropdownValue}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Sales (NA)</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="naSales"
                    value={formData.naSales}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Sales (EU)</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="euSales"
                    value={formData.euSales}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Sales (JP)</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="jpSales"
                    value={formData.jpSales}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Sales (Other)</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="otherSales"
                    value={formData.otherSales}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Modal.Footer>
              <Row className="w-100 align-items-center">
                <Col className="d-flex justify-content-start">
                  {predictedValue && (
                    <Card bg="light" text="black" className=" rounded-4">
                      <Card.Body>Predicted Global Sale: {Math.round(predictedValue, 2)}</Card.Body>
                    </Card>
                  )}
                </Col>
                <Col className="d-flex justify-content-center">
                  {metrics && (
                    <Button variant="info" onClick={downloadMetricsExcel}>
                      Download Metrics Report
                    </Button>
                  )}
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    Predict
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PredictSalesModal;
