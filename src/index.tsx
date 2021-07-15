import React from "react";
import ReactDOM from "react-dom";
import Pages from "pages";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducers } from "utils/redux";
import "./styles/index.css";
import "./styles/map.css";
import "./styles/common.css";

const store = createStore(reducers, {}, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())

class App extends React.Component<{}, { preLoading: boolean }> {
    public state = {
        preLoading: false,
    };

    public componentDidMount() {
        this.setState({ preLoading: false })
    }

    public render() {
        if (this.state.preLoading) {
            return null;
        }

        return <Provider store={store}>
            <Pages />
        </Provider>
    }
}

ReactDOM.render(<App />, document.getElementById("root"));