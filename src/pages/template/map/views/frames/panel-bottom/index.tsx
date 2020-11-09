import React from "react";
import { connect } from "react-redux";
import { IPanelBottom } from "models/map";
import styles from "./index.module.css";

interface IProps {

}

interface StateProps {
    panelBottom: IPanelBottom;
}

interface DispatchProps {

}

class BottomPanel extends React.Component<IProps & StateProps & DispatchProps> {
    public render() {
        const { panelBottom } = this.props;
        const { isExpanded, content } = panelBottom;

        return <div className={isExpanded ? styles.containerExpanded : styles.container}>
            { content }
        </div>
    }
}

export default connect(
    (state: any) => {
        return {
            panelBottom: state.panelBottom
        }
    },
    () => {
        return {}
    }
)(BottomPanel)