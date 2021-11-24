import React, { Component } from "react";
import App from "../App";
import Trial from "./trialCommands";
import Tutorial from "./tutorialPage";
import trial1 from "../trial.png";
import tutorialvideo from '../tutorialvideo.MP4';

// mport { useEffect, useState } from "react";
// import 'antd/dist/antd.css';
// import { Checkbox } from 'antd';
class Main extends Component {
  state = {
    showTutorial: true,
    startTrial: false,
    startReal: false,
    consent: false,
    disabled1: false,
    backgroundColor1: "gray",
    backgroundColor2: "gray",
    borderColor1:"gray",
    borderColor2: "gray",
  };

  trial = e => {
    // console.log(document.getElementById("consent").checked)
    // console.log(e.target.disabled)
    // let temp = document.getElementById("consent").checked
    // this.setState({
    //   consent: temp
    // });
    if (this.state.consent) {
      this.setState({
        showTutorial: false,
        startTrial: true,
      });
    } else {
      document.getElementById("alert").innerHTML = "Please click on the consent checkbox"
      // alert("Please click on the consent checkbox")
    }
  };

  real = e => {
    // let temp = document.getElementById("consent").checked
    // this.setState({
    //   consent:temp
    // });
    if (this.state.consent) {
      this.setState({
        showTutorial: false,
        startTrial: false,
        startReal: true,
      });
    } else {
      document.getElementById("alert").innerHTML = "Please click on the consent checkbox"
      // alert("Please click on the consent checkbox")
    }
  };
  real2 = () => {
    this.setState({
      showTutorial: false,
      startTrial: false,
      startReal: true,
    });
  };
  checkboxchange = e =>{
    let temp = document.getElementById("consent").checked
    this.setState({
      consent: temp
    });
    // window.open("https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=745e39f9-b207-49e8-9603-57605cc446b5&env=demo&acct=cae06343-f718-4143-bb24-4a8293a617dd&v=2")
    console.log(e.target.checked)
    let state = this.state
    if(e.target.checked === true) {
      document.getElementById("alert").innerHTML = ""
      // window.open("https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=47fdb643-790c-4558-9801-8dda0bdd5400&env=demo&acct=cae06343-f718-4143-bb24-4a8293a617dd&v=2")
      // state.disabled1 = false
      state.consent = e.target.checked
      this.setState(state)
      this.setState({
        backgroundColor1: '#00B050',
        backgroundColor2: '#00B050',
        borderColor1: '#00B050',
        borderColor2: '#00B050',
      });
    }
    else if(e.target.checked === false) {
      // state.disabled1 = true
      state.consent = e.target.checked
      this.setState(state)
      this.setState({
        backgroundColor1: 'gray',
        backgroundColor2: 'gray',
        borderColor1: 'gray',
        borderColor2: 'gray',
      });
    } 
  }
  render() {
    const { showTutorial, startTrial, startReal } = this.state;
    // const [agree, setAgree] = useState(false);
    return (
      <div className="container">
        <div>
          {showTutorial && (
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  {/* <h1>Shalin Shah</h1> */}
                  <Tutorial></Tutorial>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="row">
                  <label id='labelconsent'>
                    {/* <a href={"https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=745e39f9-b207-49e8-9603-57605cc446b5&env=demo&acct=cae06343-f718-4143-bb24-4a8293a617dd&v=2"}> */}
                    <input type="checkbox" 
                    
                    className="checkbox" 
                    id="consent" 
                    // onClick={window.location.assign("https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=745e39f9-b207-49e8-9603-57605cc446b5&env=demo&acct=cae06343-f718-4143-bb24-4a8293a617dd&v=2")}
                    // target="_blank"
                    checked={this.state.consent} 
                    onChange= {this.checkboxchange}/>
                      <b style={{paddingLeft:"20px"}}>     Please check to consent for participating in the study</b>
                  </label>
                  <label id="alert" style={{color:"red"}}></label>
                  </div>
                  <div className="row h-50 w-100 row-centered">
                    <center>
                  <button
                    className="btn btn-lg"
                    id="warmup"
                    disabled = {this.state.disabled1}
                    style={{ height: "100px", width: "50%", fontSize: "30px", backgroundColor: this.state.backgroundColor1, borderColor: this.state.borderColor1 }}
                    onClick={this.trial}
                  >
                    Warmup Exercises
                  </button>
                  </center>
                  </div>
                  <div className="row h-50 w-100">
                    <center>
                  <button
                    className="btn btn-lg"
                    id="real"
                    disabled = {this.state.disabled1}
                    style={{ height: "100px", width: "50%", fontSize: "30px", backgroundColor: this.state.backgroundColor2, borderColor: this.state.borderColor2 }}
                    onClick={this.real}
                  >
                    Begin Recording Study
                  </button>
                  </center>
                  </div>
                </div>
                <div className="col">
                  {/* <img src={ trial1 } className="img-fluid" id="youtube"/> */}
                  <video controls style={{height:"70%", width:"80%"}} id="youtube">
                    <source src={tutorialvideo} type='video/mp4'/>
                  </video>
                </div>
              </div>
            </div>
          )}
        </div>
        {startReal && <App />}
        {startTrial && <Trial real={this.real} />}
      </div>
    );
  }
}

export default Main;
