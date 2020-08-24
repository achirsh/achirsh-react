import * as React from "react";
import * as echarts from "echarts";
import { SeriesItem } from "../index";
import styles from "../index.module.css";
import { number } from "prop-types";

interface bStyle {
    font: number,
    line: number
}

export default class extends React.Component<{
    colors: string[];
    series: SeriesItem[];
    name: string,
    bStyle?: bStyle,
    cStyle?: bStyle,
    lengendStyle?: any,
}, {}> {
    private containerRef: any;
    private chartRef: any;
    private chart: any;

    constructor(props: any) {
        super(props);
        this.containerRef = React.createRef();
        this.chartRef = React.createRef();
    }

    public componentDidMount() {
        this.chart = echarts.init(this.chartRef.current);
        this.draw();
    }

    public componentDidUpdate() {
        this.draw();
    }

    public draw() {
        const { colors = [], series = [], name, bStyle, cStyle } = this.props;
        const option = {
            series: [
                {
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '50%'],
                    label: {
                        normal: {
                            position: 'center',
                            formatter: '{c|{c}}\n{b|{b}}',
                            rich: {
                                b: {
                                    color: "rgba(255, 255, 255, .6)",
                                    fontSize: bStyle && bStyle.font ? bStyle.font : 14,
                                    lineHeight: bStyle && bStyle.line ? bStyle.line : 44,
                                    fontFamily: 'GenShinGothic-Monospace-Regular'
                                },
                                c: {
                                    color: "#C3E5F9",
                                    fontWeight: 500,
                                    fontSize: cStyle && cStyle.font ? cStyle.font : 23,
                                    lineHeight: cStyle && cStyle.line ? cStyle.line : 28,
                                    fontFamily: 'HelveticaNeue-Medium'
                                },
                            },
                        }
                    },
                    data: [{
                        name,
                        value: series.reduce((a, b) => a + b.value, 0),
                        itemStyle: {
                            color: "transparent",
                        },
                    }],
                },
                {
                    type: 'pie',
                    radius: ['66%', '74%'],
                    label: {
                        show: false,
                    },
                    data: series.map((o: any, idx) => {
                        o["itemStyle"] = {
                            color: colors[idx],
                        }
                        return o;
                    }),
                }
            ]
        };

        this.chart.setOption(option);
    }

    public render() {
        return <div ref={this.containerRef} style={{ height: "100%", display: 'flex' }}>
            <div style={{ height: "100%", width: '180px' }} >
                <div ref={this.chartRef} style={{ height: "100%" }} />
            </div>
            <div style={{ height: "100%", position: "relative" }} >
                {/* {this.renderLegend()} */}
                {this.legendRender()}
            </div>
        </div>
    }

    private legendRender = () => {
        const { colors = [], series = [], lengendStyle } = this.props;
        const total = series.reduce((a, b) => a + b.value, 0);
        return <div style={{ height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ display: 'flex', marginBottom: '35px' }}>
                {
                    series.map((o, idx) => {
                        if (idx <= 1) {
                            return <div style = {{ marginLeft: '66px' }} key={idx}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className={styles.legendMarker} style={{
                                        width: '6px',
                                        height:'6px',
                                        background: colors[idx]
                                    }}/>
                                    <div style={{
                                        color: 'rgba(255, 255, 255, 0.3)',
                                        marginLeft: '5px',
                                        fontFamily: 'GenShinGothic-Monospace-Regular',
                                        fontSize: lengendStyle && lengendStyle.font ? lengendStyle.font : '12px'
                                    }}>{o.name}</div>
                                </div>
                                <div style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: lengendStyle && lengendStyle.font1 ? lengendStyle.font1 : '16px',
                                    lineHeight: lengendStyle && lengendStyle.line1 ? lengendStyle.line1 : '19px',
                                    marginTop: '2px'
                                }}>{(o.value > 0 ? o.value / total * 100 : 0).toFixed(2)}%</div>
                            </div>
                        }
                    })
                }
            </div>
            <div style={{ display: 'flex' }}>
                {
                    series.map((o, idx) => {
                        if (idx > 1 && idx <= 3) {
                            return <div style = {{ marginLeft: '66px' }} key={idx}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className={styles.legendMarker} style={{ 
                                        background: colors[idx],
                                        width: '6px',
                                        height: '6px', 
                                    }} />
                                    <div style={{
                                        color: 'rgba(255, 255, 255, 0.3)',
                                        marginLeft: '5px',
                                        fontFamily: 'GenShinGothic-Monospace-Regular',
                                        fontSize: lengendStyle && lengendStyle.font ? lengendStyle.font : '12px'
                                    }}>{o.name}</div>
                                </div>
                                <div style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: lengendStyle && lengendStyle.font1 ? lengendStyle.font1 : '16px',
                                    lineHeight: lengendStyle && lengendStyle.line1 ? lengendStyle.line1 : '19px',
                                    marginTop: '2px'
                                }}>{(o.value > 0 ? o.value / total * 100 : 0).toFixed(2)}%</div>
                            </div>
                        }
                    })
                }
            </div>
        </div>
    }

    private renderLegend = () => {
        const { colors = [], series = [], lengendStyle } = this.props;
        const total = series.reduce((a, b) => a + b.value, 0);
        return <div className={styles.legendContainer} >
            <table>
                <tbody style={{
                    display: 'flex'
                }}>
                    {series.map((o, idx) => <tr key={idx} className={styles.legend} style={{
                        lineHeight: lengendStyle && lengendStyle.line ? lengendStyle.line : '17px',
                        fontSize: lengendStyle && lengendStyle.font ? lengendStyle.font : '12px'
                    }}>
                        <td style={{ display: 'flex', alignItems: 'center' }}>
                            <span className={styles.legendMarker} style={{ background: colors[idx] }} />
                            <span className={styles.legendName} style={{
                                color: 'rgba(255, 255, 255, 0.3)',
                                marginLeft: '5px'
                            }}>{o.name}</span>
                        </td>
                        <td>
                            <span className={styles.legendPercent} style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: lengendStyle && lengendStyle.font1 ? lengendStyle.font1 : '16px',
                                lineHeight: lengendStyle && lengendStyle.line1 ? lengendStyle.line1 : '19px'
                            }}>{(o.value > 0 ? o.value / total * 100 : 0).toFixed(2)}%</span>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>;
    }
}
