import React, { Component } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import "audio-react-recorder/dist/index.css";
import App from "../App";
import sound from '../500-milliseconds-of-silence.mp3';

class Trial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: [
        "open the browser",
        "print out",
        "play a song",
        "restart computer",
        "close the browser",
      ],
      index: 0,
      currentText: "",
      endOfCommands: false,
      progress: 0,
      showStart: true,
      showStop: false,
      showUpload: false,
      showJump: true,
      disablePause: true,
      showPause: true,
      showAudio: true,
      completeTrial: true,
      showReal:false,
      // showPause:false,
      showResume:false,
      disabledStart: false,
      disbaledNext: false,
      // disabledPause: false,
      disbaledResume: false,
      disbalePhrase: false,
      autoplay:false,
      disabledStart: false,
      showOriginalAudio: false,
      disabledRecording: false,
    };
  }

  componentDidMount() {
    var text = this.state.text;
    this.setState({
      currentText: text[0],
    });
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
      this.complete();
    } else {
      this.setState({
        index: index,
        currentText: text[index],
        progress: progress,
      });
    }
  }

  complete = () => {
    this.setState({
      showStart: false,
      showPause: false,
      showAudio: false,
      showUpload: false,
      completeTrial: true,
      disbaledNext: true,
    });
  };

  start = () => {
    // recordingstate = document.getElementById("recording").style.display
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
      showUpload: true,
      showPause:true,
      disablePause: false,
      showOriginalAudio: false,
      autoplay: false,
      disabledRecording: true,
    }, function(){
      this.start();
    });
    
    var data = this.state.audioData;
    // console.log(data.blob.size)
    this.incrementCommand();
    var command_name = this.state.currentText;
    console.log(command_name);
    console.log("This is data url : ", data?.url);
    //this.sendToServer(data.url, command_name, userId);
    this.testFun();
    console.log("onStop: audio data", data);
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
      showResume: false,
      showStart: true,
      // showStop: true,
      showUpload: false,
      disbaledNext:false,
      disabledStart: false,
      showPause:true,
      disbalePhrase: false,
      disabledRecording: false,
      autoplay:false,
    });
  };


  onStop= (data) => {
    console.log("onstop"+data)
    console.log("audio data onstop", this.state.audioData)
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

  closenext = () => {
    this.setState({
      showUpload:false,
    })
  }

  testFun = () => {
    console.log("Sent blob to server.");
  };

  loadRealApp = () => {
    this.props.real();
  };

  retry = () => {
    var text = this.state.text;
    this.setState({
      text: [
        "open the browser",
        "print out",
        "play a song",
        "restart computer",
        "close the browser",
      ],
      index: 0,
      currentText: text[0],
      endOfCommands: false,
      progress: 0,
      recordState: null,
      audioData: sound,
      showStart: true,
      showStop: false,
      showUpload: false,
      disablePause: true,
      showPause: true,
      showAudio: true,
      completeTrial: false,
      showResume:false,
      disbaledNext:false,
      disbalePhrase:false,
      autoplay: false,
      disabledStart: false,
      showOriginalAudio: false,
      disabledRecording: true,
    });
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
      disablePause,
      showPause,
      showAudio,
      completeTrial,
      showResume,
      disbaledNext,
      disbalePhrase,
      autoplay,
      disabledStart,
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
    if (showUpload && this.state.index< this.state.text.length) {
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
          // disabled={this.state.disbalePhrase}
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
          {/* <h2 className="text-center">After clicking on the resume, re-record the phrase.</h2> */}
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
          style={{ height: "100px", paddingTop: "20px" }}
        >
          <h1>Warm Up Completed</h1>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div hidden>
              <AudioReactRecorder state={recordState} onStop={this.onStop} />
            </div>

            <div className="command-container rounded col-sm">
              <div className="row m-2">
                <p>
                  <strong>
                    Warmup Progress : {this.state.index}/{this.state.text.length}
                  </strong>
                </p>
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{
                      width: this.state.progress + "%",
                      color: "black",
                    }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div id="phrase" style={{fontSize:"22px"}}>
                {/* <p>
                    <strong>
                      Click the START button and speak the following phrase
                    </strong>
                </p> */}
                {startText}
                {displayText}
                {nextText}
                {/* <p>
                    <strong>
                      After speaking, click NEXT to move to the next phrase.
                    </strong>
                </p> */}
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
                {console.log("start")}
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
            {showUpload && (this.state.index< this.state.text.length) && (
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
                Pause Study
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
                Resume Study
              </button>
            )}
          </div>
          <div className="row m-2" id="recording" style={{display:(disabledRecording && this.state.index< this.state.text.length)?"block":"none", fontSize:"20px"}}><center>Recording...</center></div>
        </div>
        <div className="row m-2">
          {showAudio && (
            <div className="text-center" id="audioplayer" style={{ marginTop: "20px"}}>
              
              <audio
                id="audio"
                autoPlay={this.state.autoplay}
                controls
                src={this.state.showOriginalAudio && this.state.audioData ? this.state.audioData.url : sound}
                onPlay={this.play1}
                style={{width:"50%"}}
              ></audio>
              {/* {console.log("inside audio", this.state.audioData)} */}
              <p style={{fontSize:"22px"}}>
                <i>(Optional) Click to hear what you've recorded.</i>
              </p>
            </div>
          )}
        </div>
        {/* <div className="row m-4">
          {completeTrial && (
            <div className="col text-center">
              <button
                className="btn btn-primary btn-lg"
                id="retry"
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.retry}
              >
                Retry WarmUp
              </button>
              <button
                className="btn btn-primary btn-lg offset-lg-2"
                id="real"
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.loadRealApp}
              >
                Start Real Experiment
              </button>
            </div>
          )}
        </div> */}
        <div className="row">
          {completeTrial && (
            <div className="text-center">
              {/* btn-primary */}
              <button
                className="btn btn-lg"
                id="real"
                style={{ height: "95px", width: "25%", fontSize: "27px", marginTop:"15px"}}
                onClick={this.loadRealApp}
              >
                Begin Recording Study
                </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Trial;
