import React from 'react'
import { ISituation } from "models/map"
import styles from './index.module.css'
import * as Features from "../features";

interface IProps {
    situation: ISituation;
}

interface IState {
    expandStates: Features.Wrapper.expandState[];
}

export default class extends React.Component<IProps, IState> {
    public state: IState = {
        expandStates: []
    }

    public componentDidMount() {
        const { situation } = this.props;
        const esArry = new Array(situation.panels.length);
        esArry.fill("default");

        this.setState({ expandStates: esArry });
    }
    onExpand(idx: number, expand: Features.Wrapper.expandState) {
        const expandStates = this.state.expandStates;
        
        if (expand === "expand") {
            expandStates.fill("default");
            expandStates[idx] = "expand";
        } else if (expand === "default") {
            expandStates.fill("default");
        }

        this.setState({ expandStates });
    }
    public render() {
        const { situation } = this.props;
        const { expandStates } = this.state;

        const panels = situation.panels;
        const panelsCount = panels.length;

        if (panelsCount <= 0) {
            return null;
        }

        const margin = panelsCount === 2 ? "0 62px" : panelsCount === 3 ? "0 40px" : "0 84px";
        const subWidth = `calc(100% / ${panelsCount} - ${(panelsCount - 1) * 20 / panelsCount}px)`;
        const hasExpanded = !!expandStates.find(x => x === "expand");

        return <div className={styles.panelsWrapper} style={{ margin }}>
                <div className={styles.panels}>
                {
                    panels.map((panel, idx) => {
                        const isExpanded = expandStates[idx] === "expand";
                        return <div
                            key={idx}
                            className={styles.panel}
                            style={{
                                width: hasExpanded ? isExpanded ? "100%" : 0 : subWidth,
                                marginRight: hasExpanded ? 0 : (idx !== panelsCount - 1) ? "20px": 0
                            }}
                        >
                            <Features.FeaturePanel
                                panelType={panel}
                                expand={this.state.expandStates[idx]}
                                onExpand={(expand: any) => this.onExpand(idx, expand)}
                            />
                        </div>
                    })
                }
            </div>
        </div>
    }
}