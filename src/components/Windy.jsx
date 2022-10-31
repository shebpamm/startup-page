import React from "react";

class Windy extends React.Component {
  render() {
    return (
      <>
        <div className="sticky rounded-xl overflow-hidden h-80 border-0 dark:border-4 dark:border-pale">
          <iframe className="overflow-hidden flex bg-dim xs:hidden rounded-xl" width="505" height="320"
            src="https://embed.windy.com">
          </iframe>
        </div>
      </>
    );
  }
}

export default Windy
