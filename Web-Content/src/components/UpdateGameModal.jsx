import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';

import axiosInstance from '../utils/axiosInstance';
import { API_ROUTES } from '../utils/apiRoutes';

const UpdateGameModal = ({
  showUpdateModal,
  setShowUpdateModal,
  rowData,
  setCustomAlert,
  setReloadTable,
  platformDropdowns,
  platformGroupDropdowns,
  genre,
}) => {
  /*----------------STATES-----------------*/
  const [formData, setformData] = useState({
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

  /*-----------------FUNCTIONS-------------*/
  const handleModalClose = () => {
    setShowUpdateModal(false);
  };

  useEffect(() => {
    setformData({
      gameRank: rowData.gameRank,
      name: rowData.name,
      platform: rowData.platform,
      platformGroup: rowData.platformGroup,
      gameYear: rowData.gameYear,
      genre: rowData.genre,
      publisher: rowData.publisher,
      naSales: rowData.naSales,
      euSales: rowData.euSales,
      jpSales: rowData.jpSales,
      otherSales: rowData.otherSales,
      globalSales: rowData.globalSales,
    });
  }, [rowData]);

  /*-------------FUNCTIONS----------------*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Hello');

    try {
      const response = await axiosInstance.put(
        `${API_ROUTES.VIDEOGAMEDATATABLE.UPDATE}`,
        formData,
        { params: { id: rowData.id } },
      );
      console.log(response.data);

      setCustomAlert({ variant: 'success', message: response.data });

      handleModalClose();

      setReloadTable((prev) => !prev);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Modal
        show={showUpdateModal}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={true}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>ID</Form.Label>
                  <Form.Control size="sm" type="text" name="gameRank" disabled value={rowData.id} />
                </Form.Group>
              </Col>
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
                formData
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
                Update
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateGameModal;
