import React from "react";
import ReactDOM from "react-dom";
import Pages from "pages";
import "./styles/index.css";

class App extends React.Component<{}, { preLoading: boolean }> {
    public state = {
        preLoading: false,
    };

    public render() {
        if (this.state.preLoading) {
            return null;
        }

        return <Pages />;
    }
}

ReactDOM.render(<App />, document.getElementById("root"));