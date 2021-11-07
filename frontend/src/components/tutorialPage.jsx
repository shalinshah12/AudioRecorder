import React, { Component } from "react";
import start from "../Start.png";
import stop from "../Stop.png";
import next from "../Next.png";

class Tutorial extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <nav class="navbar navbar-light" style={{backgroundColor:"#D9D9D9"}}>
          {/* <center><span class="navbar-brand mb-0 h1" > */}
          <span><center><h1 id="appname">Welcome to Audio Recorder Study</h1></center></span>  
          {/* </span></center> */}
        </nav>
        {/* <nav className="navbar navbar-light bg-light">
          <strong>
            {" "}
            <h1>Welcome to Audio Recorder App...</h1>
          </strong>
        </nav>
        <div className="row">
          <p>This Web App is used to record audio for voice command.</p>
        </div>
        <strong>
          Below are the screenshots displaying the steps to follow:
        </strong>
        <div className="row m-4 shadow-lg">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h4>
                <u>Step #1 : Start the Recording</u>
              </h4>
              <p>
                Click on <strong>Start</strong> button and after 1 second, read
                aloud the command being displayed.
              </p>
            </li>
          </ul>
          <img src={start} className="img-fluid" alt="Start" />
        </div>
        <div className="row m-4 shadow-lg">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h4>
                <u>Step #2 : Stop the Recording</u>
              </h4>
              <p>
                Click on <strong>Stop</strong> button after you have finished
                reading the command.
              </p>
            </li>
          </ul>
          <img src={stop} className="img-fluid" alt="stop" />
        </div>
        <div className="row m-4 shadow-lg">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h4>
                <u>Step #3 : Check the recording and proceed</u>
              </h4>
              <p>
                Use the playback option as highlighted in the image to hear the
                audio recorded. If you are satisified with the audio, click on{" "}
                <strong>Next</strong> and proceed with the next command or click
                on <strong>Cancel</strong> to retry reciting the command again.
              </p>
            </li>
          </ul>
          <img src={next} className="img-fluid" alt="next" />
        </div>
        <div className="row m-4 shadow-lg">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h4>
                <u>WarmUp Section</u>
              </h4> */}
              {/* <p>
                Click on <strong>Begin Trial</strong> to start the WarmUp
                section. This section will have 5 commands to record audio one
                by one. The progress bar will indicate the progress made and the
                count of the commands.
              </p> */}
            {/* </li> */}
          {/* </ul> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Tutorial;
