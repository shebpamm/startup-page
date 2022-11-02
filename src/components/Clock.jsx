import React from "react";
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

class ClockTile extends React.Component {
  constructor(props) {
    super(props);
    this.updateDate = this.updateDate.bind(this);

    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      tileSize: 0,
      date: new Date().toLocaleTimeString(),
      day: this.days[new Date().getDay()],
      month: this.months[new Date().getMonth()],
      options: {
        border: true,
        borderColor: "#2e2e2e",
        baseColor: "#17a2b8",
        centerColor: "#459cff",
        centerBorderColor: "#ffffff",
        handColors: {
          second: "#d81c7a",
          minute: "#ffffff",
          hour: "#ffffff"
        },
      },
    }
    this.interval = setInterval(this.updateDate, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    const tileSize = this.divElement.clientHeight;
    console.log(tileSize)
    this.setState({ ...this.state, tileSize: tileSize });
  }

  updateDate() {
    this.setState({
      date: new Date().toLocaleTimeString(),
      day: this.days[new Date().getDay()],
      month: this.months[new Date().getMonth()]
    });
  }

  render() {

    return (
      <div ref={(divElement) => { this.divElement = divElement }} className="h-full w-full flex justify-center items-center">
        <Clock
          size={this.state.tileSize * 0.8}
          value={new Date()}
          renderSecondHand={false}
          renderMinuteMarks={false}
          renderHourMarks={false}
        />
      </div>
    );
  }
}

export default ClockTile
