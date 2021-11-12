import React from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import "audio-react-recorder/dist/index.css";
import Command from "./components/commands";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// import sound from "./1-second-of-silence.mp3";
import sound from "./500-milliseconds-of-silence.mp3"
// import PopUp from "./PopUp";
// frontend\src\1-second-of-silence.mp3

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1 id="poptext">{this.props.text}</h1>
        {/* <button id="popupclose" onClick={this.props.closePopup}>close me</button> */}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.commandRef = React.createRef();
    console.log(this.commandRef)
    this.state = {
      text: [],
      index: 0,
      currentText: "",
      endOfCommands: false,
      progress: 0,
      userId: "",
      recordState: null,
      audioData: null,
      showStart: true,
      showStop: false,
      showUpload: false,
      disableCancel: true,
      showCancel: true,
      showAudio: true,
      showSurvey: true,
      googleFormLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSfDjiBwRF0ih3ERrvPIzb5n3Nvam1huhTQaF7xgd3eHS9SGqg/viewform?usp=pp_url&entry.121201065=",
      showPause:true,
      disablePause:true,
      showResume:false,
      disabledStart: false,
      disbaledNext: false,
      // disabledPause: false,
      disbaledResume: false,
      disbalePhrase: false,
      showPopup: false,
      disabledStart: false,
      autoplay: false,
      showOriginalAudio: false,
      disabledRecording: false,
    };
  }

  componentDidMount() {
    axios
      .get("/read-file")
      .then((arr) => {
        var res = [];

        for (let i = 0; i < 3; i++) {
          res = res.concat(arr.data);
        }

        res = this.shuffleArray(res);
        console.log(res);

        this.setState({
          text: res,
          index: 0,
          currentText: res[0],
        });
        //console.log(this.state.text);
      })
      .catch((err) => {
        console.log("Error from ShowCommandDetails");
      });
    const uuid = uuidv4();
    var link = this.state.googleFormLink + uuid;
    this.setState({
      userId: uuid,
      googleFormLink: link,
    });

    this.sendUserIdToServer({ uuid: uuid });
  }
  
  incrementCommand() {
    var { index, text } = this.state;
    var progress = Math.floor(((index + 1) / text.length) * 100);
    index = index + 1;
    if (index >= text.length) {
      this.setState({
        index: text.length,
        endOfCommands: true,
        progress: 100,
      });
      this.props.survey();
    } else {
      this.setState({
        index: index,
        currentText: text[index],
        progress: progress,
      });
    }
  }

  getCurrentText() {
    var { currentText } = this.state;
    console.log(currentText)
    return currentText;
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  sendUserIdToServer = async (formData) => {
    //console.log(formData);

    await axios.post("/receive-userData", formData);
    //console.log("Done");
  };

  start = () => {
    this.setState({
      recordState: RecordState.START,
      showStart: false,
      showUpload: true,
      disablePause: false,
      disbalePhrase: false,
      disabledRecording: true,
      showOriginalAudio: false,
    });
  };

  // stop = () => {
  //   this.setState({
  //     recordState: RecordState.STOP,
  //     showStart: false,
  //     showStop: false,
  //     showUpload: true,
  //     disableCancel: false,
  //   });
  //   //this.commandRef.current.incrementCommand();
  // };

  upload = (data) => {
    this.setState({
      recordState: RecordState.STOP,
      showStart: false,
      // showStop: false,
      showUpload: true,
      showPause: true,
      disablePause: false,
      disableCancel: true,
      showOriginalAudio: false,
      autoplay: false,
      disabledRecording:true,
    }, function(){
      this.start();
    });

    var data = this.state.audioData;
    this.incrementCommand();
    var command_name = this.getCurrentText();
    var userId = this.state.userId;
    console.log(command_name);
    console.log("This is data url : ", data.url);
    this.sendToServer(data.url, command_name, userId);
    //this.testFun();
    console.log("onStop: audio data", data);
    // this.setState({
    //   recordState: RecordState.STOP,
    // });
  };

  survey = () => {
    this.setState({
      showStart: false,
      showCancel: false,
      showAudio: false,
      showSurvey: true,
      // seen: !this.state.seen
    });
  };

  cancel = () => {
    this.setState({
      showStart: true,
      showStop: false,
      showUpload: false,
      disableCancel: true,
    });
    console.log("Cancelled");
  };

  pause = () => {
    this.setState({
      recordState: RecordState.STOP,
      showStart: true,
      showResume:true,
      showPause:false,
      showStop: false,
      disbaledNext:true,
      disabledStart: true,
      showUpload: false,
      disablePause: false,
      disbalePhrase: true,
      showOriginalAudio: true,
      disabledRecording: false,
    });
    console.log("Cancelled");
  };

  resume = () => {
    this.setState({
      // recordState: RecordState.START,
      showStart: true,
      showResume: false,
      // showStop: true,
      showUpload: false,
      disbaledNext:false,
      disabledStart: false,
      showPause:true,
      disbalePhrase: false,
      disabledRecording: false
    });

  };

  onStop = (data) => {
    this.setState({
      audioData: data,
    });
  };

  play1 = (data) => {
    this.setState({
      recordState: RecordState.STOP,
      autoplay: true,
      showOriginalAudio: true,
      disabledRecording: false,
    });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  sendToServer = async (mediaBlob, command_name, userId) => {
    console.log("sending blob to server.");
    if (mediaBlob != null) {
      var xhr_get_audio = new XMLHttpRequest();
      xhr_get_audio.open("GET", mediaBlob, true);
      xhr_get_audio.responseType = "blob";
      xhr_get_audio.onload = function (e) {
        if (this.status === 200 && this.readyState === 4) {
          console.log("this blob is: ", this.response);
          var blob = this.response;
          //send the blob to the server
          var xhr_send = new XMLHttpRequest();

          var fd = new FormData();
          fd.append("audio_data", blob);
          xhr_send.open("POST", "/receive-audio", true);
          xhr_send.setRequestHeader("command_name", command_name);
          console.log(command_name, userId);
          xhr_send.setRequestHeader("userId", userId);
          // xhr_send.onload = function (e) {
          //   if (this.status === 200 && this.readyState == 4) {
          //     console.log(this.response);
          //     alert("Hooray!");
          //   } else {
          //     console.log(this.response);
          //     alert("Error");
          //   }
          // };
          xhr_send.send(fd);
        }
      };
      xhr_get_audio.send();
    }
  };

  testFun = () => {
    console.log("Sent blob to server.");
  };

  render() {
    const {
      currentText, 
      endOfCommands, 
      progress,
      recordState,
      showStart,
      showStop,
      showUpload,
      disableCancel,
      showCancel,
      showSurvey,
      googleFormLink,
      showAudio,
      showPause,
      disablePause,
      showResume,
      disabledStart,
      disbaledNext,
      // disabledPause: false,
      disbaledResume,
      disbalePhrase,
      showPopup,
      autoplay,
      showOriginalAudio,
      disabledRecording,
    } = this.state;
    let startText;
    let nextText;
    let displayText;
    if (showStart) {
      startText = (
        <div
          className="text-black m-2 rounded"
          style={{ height: "200px" }}
        >
          <center><p id="startText" style={{fontSize:"22px"}}> Click the <b>START</b> button to begin recording</p></center>
        </div>
      );
      // startText="Click the START button to begin recording"
    }
    if (showUpload) {
      startText = (
        <div
          className="text-black m-2 rounded"
          style={{ height: "50px" }}
        >
          <center><p>Speak the following phrase:</p></center>
        </div>
      );
      displayText = (
        <div
          className="text-black m-2 rounded"
          style={{ height: "100px" }}
          key={currentText}
        >
          <h1 className="text-center">"{currentText}"</h1>
        </div>
      );
      nextText = (
        <div
          className="text-black m-2 rounded"
          style={{ height: "50px" }}
        >
          <p className="text-center">After speaking, click <b>NEXT</b> to move to the next phrase.</p>
        </div>
      );
    }
    if(showResume) {
      startText = (
        <div
          className="text-black m-2 rounded"
          style={{ height: "50px" }}
        >
          <center><p></p></center>
        </div>
      );
      displayText = (
        <div
          className="text-black rounded"
          style={{ height: "100px" }}
          // disabled={this.state.disbalePhrase}
          key={currentText}
        >
          <h2 className="text-center">The Recording is paused now.</h2>
          <h2 className="text-center">Click Resume Study button to resume recording study.</h2>
        </div>
      );
      nextText = (
        <div
          className="text-black m-2 rounded"
          style={{ height: "50px" }}
        >
          <p className="text-center"></p>
        </div>
      );
    }
    
    
    if (endOfCommands) {
      displayText = (
        <div
          className="m-2 rounded text-center"
          style={{ height: "100px" }} 
        >
          <h1>Warm Up Completed</h1>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col text-center">
            {/* <h1>SHALIN SHAH </h1> */}
            <div hidden>
              <AudioReactRecorder state={recordState} onStop={this.onStop} />
            </div>

            <div className="command-container rounded col-sm">
              {/* <Command ref={this.commandRef} survey={this.survey} /> */}
              <div className="row m-2">
          <p>
            <strong>
              Recording Study Progress : {this.state.index}/{this.state.text.length}
            </strong>
          </p>
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: this.state.progress + "%", color: "black" }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
        <div id="phrase" style={{fontSize:"22px"}}>
                {startText}
                {displayText}
                {nextText}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            {showStart && (
              <button
                className="btn btn-primary btn-lg"
                id="record"
                disabled={this.state.disabledStart}
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.start}
              >
                Start
              </button>
            )}
            {/* {showStop && (
              <button
                className="btn btn-danger btn-lg"
                id="stop"
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.stop}
              >
                Stop
              </button>
            )} */}
            {showUpload && (
              <button
                className="btn btn-success btn-lg"
                id="upload"
                disabled={this.state.disbaledNext}
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.upload}
              >
                Next
              </button>
            )}
            {showPause && (
              <button
                className="btn btn-danger btn-lg offset-lg-2"
                id="cancel"
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.pause}
                disabled={disablePause}
              >
                Pause Recording Study
              </button>
            )}
            {showResume && (
              <button
                className="btn btn-danger btn-lg offset-lg-2"
                id="resume"
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.resume}
                // disabled={disableCancel}
              >
                Resume Recording Study
              </button>
            )}
          </div>
          <div className="row m-2" id="recording" style={{display:disabledRecording?"block":"none", fontSize:"20px"}}><center>Recording...</center></div>
        </div>
        <div className="row m-4">
          {showAudio && (
            <div className="col text-center">
              <audio
                id="audio"
                autoPlay={this.state.autoplay}
                controls
                src={this.state.showOriginalAudio && this.state.audioData ? this.state.audioData.url : sound}
                onPlay={this.play1}
                style={{width:"50%"}}
              ></audio>
              <p id="audioplayertext" style={{fontSize:"22px"}}>
                <i>(Optional) Click to hear what you've recorded.</i>
              </p>
            </div>
          )}
        </div>
        <div className="row m-4">
          {showSurvey && (
            <div className="col text-center">
            
              {/* btn-primary */}
              <a
                href={googleFormLink}
                className="btn btn-lg text-center"
                id="survey"
                target="_blank"
                onClick={this.togglePopup.bind(this)}
                style={{ height: "100px", width: "25%", fontSize: "23px", backgroundColor:"#CB6C6B"}}
              >
                Skip the recording trials and jump to the survey
              </a>
              {/* {this.state.seen ? <PopUp toggle={this.togglePop} /> : null} */}
            </div>
            
          )}
           {this.state.showPopup ? 
          <Popup
            text='Thank you for participating in the study!'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
        </div>
      </div>
    );
  }
}

export default App;