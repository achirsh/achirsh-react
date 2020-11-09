import React from 'react';
import { connect } from "react-redux";
import styles from "./index.module.css";
import * as Action from "redux/actions"
import { situations } from "config";
import { ISituation, IPanelBottom, IPanelRight, IPanelCenter } from "models/map";

const {
    storeActiveSituation, 
    clearActiveSituation,
    controlPanelBottom, 
    controlPanelRight, 
    controlPanelCenter
} = {
    ...Action.Situation,
    ...Action.Panel
}

interface IProps {

}

interface StateProps {
    activeSituation: any;
}

interface DispatchProps {
    storeActiveSituation: (situation: ISituation) => void;
    clearActiveSituation: () => void;
    controlPanelBottom: (panel: IPanelBottom) => void;
    controlPanelRight: (panel: IPanelRight) => void;
    controlPanelCenter: (panel: IPanelCenter) => void;
}

interface IState {

}

class Header extends React.Component<IProps & StateProps & DispatchProps, IState> {

    public componentDidMount() {

    }

    public onClickSituation = (situation: ISituation) => {
        const activeSituation = this.props.activeSituation || {};
        if (activeSituation.label === situation.label) {
            this.props.clearActiveSituation();
            this.props.controlPanelBottom({ isExpanded: false });
            this.props.controlPanelRight({ isExpanded: false });
            this.props.controlPanelCenter({ isExpanded: false })
        } else {
            this.props.storeActiveSituation(situation);

            setTimeout(() => {
                this.props.controlPanelBottom({ isExpanded: true })
                this.props.controlPanelRight({ isExpanded: true, content: null })
                this.props.controlPanelCenter({ isExpanded: true })
            }, 100)
        }
    }

    public render() {
        const leftSituations = situations.slice(0, 2);
        const rightSituations = situations.slice(2, 4);

        const activeSituation = this.props.activeSituation || {};

        return <div className={styles.container}>
            <div className={styles.weather}></div>
            <div className={styles.menusWrapper}>
                <div className={styles.menus}>
                    <div className={styles.menuItemWrapper}>
                        {leftSituations.map(situation =>
                            <Situation key={situation.label} side="left" activeSituation={activeSituation} situation={situation} onClick={this.onClickSituation} />
                        )}
                    </div>
                    {/* <div className={styles.title}>
                        <img src={require("static/imgs/header/logo.png")} alt="logo" />
                    </div> */}
                    <div className={styles.menuItemWrapper}>
                        {rightSituations.map(situation =>
                            <Situation key={situation.label} side="right" activeSituation={activeSituation} situation={situation} onClick={this.onClickSituation} />
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.actions}></div>
        </div>
    }
}

class Situation extends React.Component<{
    activeSituation: ISituation,
    situation: ISituation,
    side: "left" | "right",
    onClick: (situation: ISituation) => void,
}> {
    public render() {
        const { activeSituation, situation, side } = this.props

        const actived = activeSituation.label === situation.label;

        return <span
            key={situation.label}
            className={actived ?
                side === "left" ? styles.menuItemLeftActive : styles.menuItemRightActive :
                side === "left" ? styles.menuItemLeft : styles.menuItemRight
            }
            onClick={() => this.props.onClick(situation)}
        >
            <img src={require("static/imgs/header/" + (actived ? `${situation.icon}-active` : situation.icon) + ".png")} alt="icon" />
            {situation.label}
        </span>
    }
}

export default connect(
    (state: any) => {
        return {
            activeSituation: state.activeSituation,
        }
    },
    (dispatch) => {
        return {
            storeActiveSituation: (situation: ISituation) => dispatch(storeActiveSituation(situation)),
            clearActiveSituation: () => dispatch(clearActiveSituation()),
            controlPanelBottom: (panel: IPanelBottom) => dispatch(controlPanelBottom(panel)),
            controlPanelRight: (panel: IPanelRight) => dispatch(controlPanelRight(panel)),
            controlPanelCenter: (panel: IPanelCenter) => dispatch(controlPanelCenter(panel))
        }
    }
)(Header)