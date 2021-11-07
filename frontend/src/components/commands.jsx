import React, { Component } from "react";
import axios from "axios";

/*
	Read a text file and out put the content.
	
	Example Usage:
	var myTxt = require("./myTxt.txt");
	...
	<TextFileReader
		txt={myTxt}
	/>
 */
class Command extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: [],
      index: 0,
      currentText: "",
      endOfCommands: false,
      progress: 0,
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
  render() {
    const { currentText, endOfCommands, progress } = this.state;

    let displayText;

    if (endOfCommands) {
      displayText = (
        <div
          className="text-white m-2 rounded text-center bg-success"
          style={{ height: "100px" }}
        >
          <h1>Thank You for recording data!</h1>
        </div>
      );
    } else {
      displayText = (
        <div
          className="text-black m-2 rounded"
          style={{ height: "100px" }}
          key={currentText}
        >
          <h1 className="text-center">{currentText}</h1>
        </div>
      );
    }

    return (
      <div>
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
        <div id="phrase">
          <p>
              <strong>
                Click the START button and speak the following phrase
              </strong>
          </p>
          {displayText}
          <p>
              <strong>
                After speaking click NEXT to move to the next phrase.
              </strong>
          </p>
        </div>
      </div>
    );
  }
}

export default Command;
