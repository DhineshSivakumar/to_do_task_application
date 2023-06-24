import { useState } from 'react';
import { useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


export function Addtask(props) {
    const { displayAddTask, isOpen, onClose, sumbitdata } = props;
    const [_isOpen, setOpen] = useState(isOpen);
    const currentDate = dayjs(); // Get current date using dayjs
    const [taskData, setTaskData] = useState({
        task_name: "",
        description: "",
        due_date: currentDate,
        check: false
    });
    const [errors, setErrors] = useState({});

    const handleClose = () => {
        setOpen(false);
        if (onClose) onClose();
        setErrors({});
        setTaskData({ task_name: '', description: '', due_date: currentDate, check: false });
    };

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);


    const handleChange = (event) => {
        setErrors({});
        const { name, value } = event.target;
        setTaskData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = {};
    for (const [key, value] of Object.entries(taskData)) {
        var name;
            if (key === "task_name") { name = "Task name" };
            if (key === "description") { name = "Description" };
        if (!String(value).trim()) {
          errors[key] = `${name} is required`;
        }
        else if (key === "task_name" && !/^(?![\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$).+$/.test(value)) {
          errors[key] = `${name} is invalid`;
        }
    }

    if (!taskData.due_date) {
        errors['due_date'] = `Due date is required`;
    }
    console.log(errors)
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
        setOpen(false);
        if (onClose) onClose();
        setErrors({});
        setTaskData({ task_name: '', description: '', due_date: currentDate, check: false });
        sumbitdata(taskData);
    }
    };

    const styleName = "ms-2 rounded border border-2 border-primary py-1 w-100";
    const styleNameError = "ms-2 rounded border border-2 border-danger py-1 w-100";

    return (
        <Dialog
            open={displayAddTask}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            scroll={'body'}
            disablebackdropclick="true"
            disableEscapeKeyDown={true}
            fullWidth={true}
            maxWidth={false}
            PaperProps={{
                style: {
                    maxWidth: "600px",
                    width: "100%",
                    height: "auto",
                    maxHeight: "900px",
                    margin: "auto"
                }
            }}
        >
            <DialogTitle sx={{ position: 'relative' }} id="alert-dialog-title" className="fw-bold fs-4 mt-2 align-content-center ">
                Create a new task
                <i
                    className="bi bi-x-lg"
                    style={{ position: "absolute", top: "22%", right: "5%", bottom: "0%", color: "#d5cdcd", cursor: "pointer" }}
                    onClick={handleClose}
                ></i>
            </DialogTitle>
            <hr />
            <DialogContent className="px-5 mt-2">
                <div className="my-4">
                    <div className="form-group row m-4">
                        <label className="col-sm-4 fw-bold py-1 text-sm-start text-dark">Task Name <span style={{color: 'red'}}>*</span></label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className={`${errors.task_name ? styleNameError : styleName}`}
                                name='task_name'
                                value={taskData.task_name}
                                onChange={handleChange}
                            />
                            {errors.task_name && <span className='px-2 text-danger text-capitalize'>{errors.task_name}</span>}
                        </div>
                    </div>
                    <div className="form-group row m-4">
                        <label className="col-sm-4 fw-bold py-1 text-sm-start text-dark">Description <span style={{color: 'red'}}>*</span></label>
                        <div className="col-sm-8">
                            <textarea
                                className={`${errors.description ? styleNameError : styleName}`}
                                name="description"
                                value={taskData.description}
                                onChange={handleChange}
                            ></textarea>
                            {errors.description && <span className='px-2 text-danger text-capitalize'>{errors.description}</span>}
                        </div>
                    </div>
                    <div className="form-group row m-4">
                        <label className="col-sm-4 fw-bold py-1 text-sm-start text-dark">Due Date <span style={{color: 'red'}}>*</span></label>
                        <div className="col-sm-8">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className={errors.due_date ?  `ms-2 rounded border border-2 border-danger w-100` : `ms-2 rounded border border-2 border-primary w-100`}
                                    slotProps={{ textField: { size: 'small' } }}
                                    value={taskData ? dayjs(taskData.due_date) : null}
                                    onChange={(newDate) => {
                                        const updatedDate = newDate ? dayjs(newDate).toDate() : null;
                                        setTaskData({ ...taskData, due_date: updatedDate });
                                    }}
                                    format='DD/MM/YYYY'
                                />
                            </LocalizationProvider>
                            {errors.due_date && <span className='px-2 text-danger text-capitalize'>{errors.due_date}</span>}
                        </div>
                    </div>
                </div>
            </DialogContent>
            <hr />
            <DialogActions className='mb-3'>
                <button onClick={handleClose} className={`btn btn-white border rounded-5 border-primary mx-2 text-capitalize fw-bold`}>
                    Cancel
                </button>
                <button onClick={handleSubmit} className="btn btn-primary border rounded-5 border-primary me-4 px-4 text-capitalize fw-bold">
                    Save
                </button>
            </DialogActions>
        </Dialog>
    );
}