// used to create modal to capture user data -- deprecated.

import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

class MetaDataModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      userData: {
        email: "",
        age: "",
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    var name = event.target.name;
    var value = event.target.value;
    var userData = this.state.userData;
    userData[name] = value;
    this.setState({ userData: userData });
  }

  handleSubmit(event) {
    const userData = this.state.userData;
    //console.log(this.state);
    event.preventDefault();

    this.setState({
      show: false,
    });

    this.props.setUserId(userData.email);

    this.sendToServer(userData);
    //console.log(this.state);
  }

  sendToServer = async (formData) => {
    //console.log(formData);

    await axios.post("/receive-userData", formData);
    //console.log("Done");
  };

  render() {
    return (
      <Modal show={this.state.show} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Please submit your response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <label>Email :</label>
            <br></br>
            <input
              name="email"
              type="text"
              onChange={this.handleInputChange}
              required
            ></input>
            <br />
            <br />
            <label>Age :</label>
            <br></br>
            <input
              name="age"
              type="text"
              onChange={this.handleInputChange}
              required
            ></input>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmit} variant="primary">
            {" "}
            Submit{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MetaDataModal;
