import React from 'react';
import micicon from "../microphone2.png";


class AudioVisualiser extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    componentDidUpdate() {
        this.visualize();
    }

    visualize() {
        const { audioData } = this.props;

        const canvas = this.canvas.current;
        const HEIGHT = canvas.height;
        const WIDTH = canvas.width;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = "#D9D9D9";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";

        ctx.beginPath();

        let sliceWidth = WIDTH * 1.0 / audioData.length;
        let x = 0;

        for (let i = 0, len = audioData.length; i < len; i++) {
            let v = audioData[i] / 128.0;
            let y = v * HEIGHT / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.lineTo(WIDTH, HEIGHT / 2);
        ctx.stroke();
    }

    render() {
        return (
            <div className="row m-2" id="recording" style={{ fontSize: "20px" }}>
                <center>
                    <img src={micicon} style={{ width: "4%", marginRight: "10px", marginBottom: "-5px" }} />
                    <canvas ref={this.canvas} width="300" height="50" style={{ marginBottom: "-20px" }} />
                </center>
            </div>
        )
    }
}

export default AudioVisualiser;