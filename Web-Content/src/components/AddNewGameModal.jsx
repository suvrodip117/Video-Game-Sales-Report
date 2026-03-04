import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API_ROUTES } from '../utils/apiRoutes';
import axiosInstance from '../utils/axiosInstance';
import DatePicker from 'react-datepicker';

const AddNewGameModal = ({ setCustomAlert, setReloadTable }) => {
  /*--------------STATE MANAGEMENT------------*/
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
    globalSales: '',
  });
  const [show, setShow] = useState(false);
  const [platformDropdowns, setPlatformDropDowns] = useState([]);
  const [platformGroupDropdowns, setPlatformGroupDropDowns] = useState([]);
  const [genre, setGenre] = useState([]);

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
    //console.log("Form Data:", formData);
    try {
      const response = await axiosInstance.post(
        `${API_ROUTES.VIDEOGAMEDATATABLE.SAVEGAME}`,
        formData,
      );
      console.log(response.data);

      setCustomAlert({ variant: 'success', message: response.data });

      setReloadTable((prev) => !prev);

      handleClose();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setCustomAlert({ variant: 'danger', message: error.response.data.message });
      } else {
        setCustomAlert({ variant: 'danger', message: 'Something went wrong. Please try again.' });
      }
    }
    //window.location.reload();
  };

  return (
    <>
      <button
        style={{
          padding: '6px 10px',
          float: 'right',
        }}
        onClick={handleShow}
        className="btn btn-outline-primary mt-3 me-3 mb-2 btn-sm"
      >
        ADD
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
                    name="publisher"
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

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Sales (Global)</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="globalSales"
                    value={formData.globalSales}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Insert
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddNewGameModal;
