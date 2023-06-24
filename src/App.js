import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Addtask } from './Add_Task';
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';
import ConfirmationDialog from './Delete_Popup';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const styleMessage = {
  backgroundColor: '#ffffff',
  borderRadius: '18px',
  padding: '15px 20px',
  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
  height: 'auto',
  maxHeight: '600px',
  width: 'auto',
  maxWidth: '800px',
  margin: 'auto',
  textAlign: 'center'
}

function App() {
  const [taskData, setTaskData] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});

  useEffect(() => {
    const storedTaskData = localStorage.getItem('taskData');
    if (storedTaskData) {
      setTaskData(JSON.parse(storedTaskData));
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('taskData', JSON.stringify(taskData));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [taskData]);

  const fetchData = (newValue) => {
    setTaskData((prevTaskData) => [...prevTaskData, newValue]);
  }

  const handleChange = (event, item) => {
    const updatedTaskData = taskData.map((value) =>
      value === item ? { ...value, check: event.target.checked } : value
    );
    setTaskData(updatedTaskData);
  };

  const handleDelete = (item) => {
    setShowConfirmation(true);
    setItemToDelete(item);
  };

  const handleConfirmDelete = () => {
    setTaskData((prevTaskData) => prevTaskData.filter((value) => value !== itemToDelete));
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const customStyles = {
    headRow: {
      style: {
        color: '#000',
        fontWeight: "bolder",
        fontSize: "16px",
        borderBottom: "1px solid black"
      },
    },
    rows: {
      style: {
        color: "#000",
        backgroundColor: "#fff",
        fontSize: "16px",
        minHeight: '55px'
      }
    },

  }

  const columns = [
    {
      name: 'Task name',
      selector: row => row.task_name,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'Due date',
      selector: row => row.due_date,
      center: true,
    },
    {
      name: 'Completed',
      selector: row => row.checkbox,
      center: true
    },
    {
      name: '',
      selector: row => row.delete,
      center: true
    },
  ];

  const rows = taskData.length ? taskData.map((item) => {
    return {
      task_name: item.task_name,
      description: item.description,
      due_date: item.due_date && dayjs(item.due_date).format("DD/MM/YYYY"),
      checkbox: (
        <Checkbox
          {...label}
          checked={item.check}
          onChange={(event) => handleChange(event, item)}
        />
      ),
      delete: <span onClick={() => handleDelete(item)}><i className="bi bi-trash" style={{ fontSize: "23px", color: "red" }}></i></span>
    };
  }) : null;

  const renderTable = () => {
    if (rows) {
      return (
        <DataTable
          columns={columns}
          data={rows}
          fixedHeaderScrollHeight="600px"
          customStyles={customStyles}
          persistTableHead
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50]}
        />
      );
    } else {
      return (
        <div className='container' style={styleMessage}>
          <p className='fw-bold'>No data available. Click the button below to add your task.</p>
          <button className='btn btn-primary fw-bold' onClick={() => setAddTask(true)}>Add task</button>
        </div>
      );
    }
  };

  return (
    <div className='container'>
      <div className="row my-5">
        <div className="col-9 text-start fw-bold fs-3 text-capitalize">
          Task List
        </div>
        <div className="col-3 text-end">
          {taskData.length ? <button className="btn btn-primary fw-bold" onClick={() => { setAddTask(true) }}>Add task</button> : null}
        </div>
      </div>
      {renderTable()}
      <Addtask
        sumbitdata={fetchData}
        displayAddTask={addTask}
        isOpen={addTask}
        onClose={() => {
          setAddTask(false);
        }}
      />
      {showConfirmation && (
        <ConfirmationDialog
          displayDelete={showConfirmation}
          isOpen={showConfirmation}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default App;