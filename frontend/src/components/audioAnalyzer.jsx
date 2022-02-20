import React from 'react';
import AudioVisualiser from './audioVisualiser';

class AudioAnalyZer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            audioData: new Uint8Array(0)
        };
    }

    componentDidMount() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.src = this.audioContext.createMediaStreamSource(this.props.audio);
        this.src.connect(this.analyser);
        this.refId = requestAnimationFrame(() => this.tick());
    }

    tick() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        this.setState({ audioData: this.dataArray });
        this.refId = requestAnimationFrame(() => this.tick());
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.refId);
        this.analyser.disconnect();
        this.src.disconnect();
    }

    render() {
        return <AudioVisualiser audioData={this.state.audioData} />;
    }
}

export default AudioAnalyZer;