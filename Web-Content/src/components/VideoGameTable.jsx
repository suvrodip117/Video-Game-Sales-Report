import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import videoGameColumns from '../data/columns/VideoGameColumns';
import axiosInstance from '../utils/axiosInstance';
import { API_ROUTES } from '../utils/apiRoutes';
import PredictSalesModal from '../components/PredictSalesModal';
import AddNewGameModal from './AddNewGameModal';
import UpdateGameModal from './UpdateGameModal';
import AlertGeneric from './generic/AlertGeneric';
import { modelPlotContext } from '../contexts/ModelPlotContext';

const VideoGameTable = () => {
  /*---------------STATE MANAGEMENT-----------------*/
  const [data, setData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [reloadTable, setReloadTable] = useState(false);
  const [customAlert, setCustomAlert] = useState({ variant: '', message: '' });
  const [platformDropdowns, setPlatformDropDowns] = useState([]);
  const [platformGroupDropdowns, setPlatformGroupDropDowns] = useState([]);
  const [genre, setGenre] = useState([]);
  const [plot, setPlot] = useState({});

  const fetchAllVideoGames = async () => {
    try {
      console.log(import.meta.env);
      const response = await axiosInstance.get(`${API_ROUTES.VIDEOGAMEDATATABLE.GETALL}`); //setting up the query parameters to send to express
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setCustomAlert({ variant: 'danger', message: error.response.data.message });
        setData(response.data);
      } else {
        setCustomAlert({ variant: 'danger', message: 'Something went wrong. Please try again.' });
      }
    }
  };

  const trainDataset = async () => {
    try {
      const response = await axiosInstance.post(`${API_ROUTES.VIDEOGAMEDATATABLE.TRAIN}`);
      //console.log(response.data);
      setCustomAlert({ variant: 'success', message: response.data.status });

      //storing the base64 into an object and store it in file system
      //console.log(response.data.plots);
      setPlot(response.data.plots);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setCustomAlert({ variant: 'danger', message: error.response.data.message });
      } else {
        setCustomAlert({ variant: 'danger', message: 'Something went wrong. Please try again.' });
      }
    }
  };

  const handleClickUpdate = async (row) => {
    console.log(typeof row);
    setShowUpdateModal(true);
    setRowData(row);

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

  const handleClickDelete = async (row) => {
    console.log(row);
    try {
      const response = await axiosInstance.delete(`${API_ROUTES.VIDEOGAMEDATATABLE.DELETE}`, {
        params: { id: row.id },
      });
      console.log(response.data);

      setCustomAlert({ variant: 'success', message: response.data });

      //refreshing the data table using reloadstate
      setReloadTable((prev) => !prev);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setCustomAlert({ variant: 'danger', message: error.response.data.message });
      } else {
        setCustomAlert({ variant: 'danger', message: 'Something went wrong. Please try again.' });
      }
    }
  };

  useEffect(() => {
    fetchAllVideoGames();
  }, [reloadTable]);

  return (
    <modelPlotContext.Provider value={plot}>
      <div>
        <AlertGeneric
          variant={customAlert.variant}
          message={customAlert.message}
          setCustomAlert={setCustomAlert}
        />

        <PredictSalesModal />

        <button
          className="btn btn-outline-primary btn-sm mt-3 me-3 mb-2"
          style={{ float: 'right', padding: '6px 10px' }}
          onClick={trainDataset}
        >
          Train
        </button>

        <AddNewGameModal setCustomAlert={setCustomAlert} setReloadTable={setReloadTable} />

        <div className="w-100 text-center fw-bold pt-5">Video Game Sales Report</div>
        <DataTable
          columns={videoGameColumns(handleClickUpdate, handleClickDelete)}
          data={data}
          pagination
          paginationPerPage={10}
          highlightOnHover
        />
        <UpdateGameModal
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
          rowData={rowData}
          setCustomAlert={setCustomAlert}
          setReloadTable={setReloadTable}
          platformDropdowns={platformDropdowns}
          platformGroupDropdowns={platformGroupDropdowns}
          genre={genre}
        />
      </div>
    </modelPlotContext.Provider>
  );
};

export default VideoGameTable;
