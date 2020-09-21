import React from "react";
import styles from "./index.module.css";

export type expandState = "default" | "expand" | "hidden";

interface IProps {
    expand: expandState;
    title?: string;
    headerRight?: React.ReactNode;
    onExpand?: (expand: expandState) => void;
    afterExpand?: () => void;
}

class Wrapper extends React.Component<IProps> {
    public onClickExpand(isExpanded: expandState) {
        this.props.onExpand && this.props.onExpand(isExpanded);

        setTimeout(() => {
            this.props.afterExpand && this.props.afterExpand();
        }, 400)
    }
    public render() {
        return <div className={styles.container}>
            <div className={styles.headerWrapper}>
                <div className={styles.header}>
                    <span className={styles.headerLeft}>
                        { this.props.onExpand &&
                            <img
                                src={require("static/imgs/panel/expand.png")}
                                onClick={() => {
                                    if (this.props.expand === "default") {
                                        this.onClickExpand("expand")
                                    } else if (this.props.expand === "expand") {
                                        this.onClickExpand("default")
                                    }
                                }}
                                alt="expand"
                            />
                        }
                        { this.props.title }
                    </span>
                    <div className={styles.headerRight}>
                        { this.props.headerRight }
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                {this.props.children}
            </div>
        </div>
    }
}

export default Wrapper;
