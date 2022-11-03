import React from "react";

function daysInMonth(date) {
  return new Date(date.getFullYear(),
    date.getMonth() + 1,
    0).getDate();
}

export default class MiniCalendar extends React.Component {
  constructor(props) {
    super(props)

    const date = new Date();
    const day = date.getDay().toString().padStart(2, '0');
    // const month = date.getMonth().toString().padStart(2, '0'); // Number version
    const month = date.toLocaleString('en-US', { month: 'short' }); // Letter version

    console.log(daysInMonth(date))

    this.state = {
      date: date,
      day: day,
      month: month,
      title: `${month} ${day}`
    }
  }

  render() {
    return (
      <div className="p-5 bg-accent2 flex flex-col justify-between items-center h-full rounded-xl">
        <h6 className="text-light font-bold font-sans">{this.state.title}</h6>
        <div className="grid grid-cols-7 gap-2 [&>*]:h-2 [&>*]:w-2 [&>*]:aspect-h-1 [&>*]:bg-light">
          {(() => {
            let d = [];

            for (let i = 1; i <= daysInMonth(this.state.date); i++) {
              if (i === this.state.date.getDay()) d.push(<div className="!bg-accent4"> </div>)
              else d.push(<div> </div>);
            }
            return d;
          })()}
        </div>
      </div>
    )
  };
}
