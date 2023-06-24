import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from 'react';

const ConfirmationDialog = ({ displayDelete, isOpen, onConfirm, onCancel }) => {

    const [_isOpen, setOpen] = useState(isOpen);

    return (
      <Dialog
      open={displayDelete}
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
      <DialogContent className="px-4 my-2 text-center">
        <i className="bi bi-x-circle text-danger" style={{ fontSize: '75px' }}> </i>
        <div className='fw-bold mt-3'>
        <h5 style={{color: "#685e5e" }}>Are you sure</h5>
        <h5>Do you really want to delete these record?</h5>
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", marginBottom: "18px" }}>
          <button  onClick={onConfirm} className="btn btn-danger border rounded-5 border-danger me-4 px-4 text-capitalize fw-bold">
              Delete
          </button>
          <button onClick={onCancel} className={`btn btn-white border rounded-5 border-primary mx-2 text-capitalize fw-bold`}>
              Cancel
          </button>
      </DialogActions>
  </Dialog>
    );
  };


export default ConfirmationDialog;