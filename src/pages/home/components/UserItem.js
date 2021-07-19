import React, { useState } from "react";
import { API_USERS_DATA } from "../../../global/constants";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const UserItem = ({ recordId }) => {
  // detail info
  const [data, setData] = useState({});
  // control open the dialog
  const [open, setOpen] = React.useState(false);

  const clickOpen = async () => {
    // Call API with ID
    fetch(API_USERS_DATA + recordId)
      .then((response) => response.json())
      .then((data) => {
        //set the company,address json info to a new json
        var name = data.name;
        var address = data.address;
        var company = data.company;
        var companyName = data.company.name;
        var namejson = { name: name, companyname: companyName };
        var newDataJson = { ...data, ...address, ...company, ...namejson };
        setData(newDataJson);
      });
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <div className="proflieactions">
      <Button
        className="profliebtn"
        variant="outlined"
        color="primary"
        onClick={clickOpen}
      >
        MORE DETAILS
      </Button>
      <Dialog
        open={open}
        onClose={clickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"User's Details Info"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <div className="detail">
            <p>-name: {data.name}</p>
            <p>-username: {data.username}</p>
            <p>-email: {data.email}</p>
            <p>-phone: {data.phone}</p>
            <p>-company: {data.companyname}</p>
            <p>-website: {data.website}</p>
            <p>-address:</p>
            <ul className="ul">
              <li>street: {data.street}</li>
              <li>suite: {data.suite}</li>
              <li>city: {data.city}</li>
              <li>zipcode: {data.zipcode}</li>
            </ul>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserItem;
