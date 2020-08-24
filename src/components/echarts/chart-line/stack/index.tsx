/**
 * 折线图-stack
 */

import * as React from "react";
import * as echarts from "echarts";

interface legend {
    name: string,
    textStyle: {}
}

interface series {
    name: string,
    type: string,
    stack: string,
    symbol: string,
    symbolSize: number,
    // itemStyle: {
    //     normal: {
    //         color: string,
    //         lineStyle: {
    //             color: string
    //         },
    //     }
    // },
    smooth: boolean,
    data: number[]
}

export default class extends React.Component<{
    xData: string[],
    yData: any[],
    legendFont?: number,
    xAxisFont?: number,
    yAxisFont?: number,
    interval?: any,
    itemStyle?: any,
    areaStyle?: any,
    legendShow?: any,
    gridBottom?: any,
    rotate?: any,
    margin?: any,
    xAxisStyle?: any,
    yAxisStyle?: any
}, {}> {
    private containerRef: any;
    private chartRef: any;
    private chart: any;

    public state = {
        initSeries: {
            name: '',
            type: 'line',
            stack: '',
            symbol: 'circle',
            symbolSize: 0,
            itemStyle: {
                normal: {
                    color: '',
                    lineStyle: {
                        color: ''
                    },
                }
            },
            data: []
        }
    }

    constructor(props: any) {
        super(props);
        this.containerRef = React.createRef();
        this.chartRef = React.createRef();
    }

    private series: any[] = [];

    public componentDidMount() {
        this.chart = echarts.init(this.chartRef.current);
        this.draw()
    }

    public componentDidUpdate() {
        this.series = [];
        this.draw()
    }

    public draw() {
        const { yData = [], xData = [], legendFont = 10, xAxisFont = 8, gridBottom, xAxisStyle, yAxisStyle,
            yAxisFont = 8, interval = null, itemStyle, areaStyle, legendShow, rotate, margin } = this.props;
        let visualMap: any = []
        let colors: any = []
        if (yData.length > 0) {
            yData.map(n => {
                this.series.push({
                    name: n.name,
                    type: 'line',
                    stack: n.name,
                    symbol: 'circle',
                    symbolSize: 0,
                    smooth: true,
                    data: n.data,
                    areaStyle: areaStyle ? {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                              0,
                              0,
                              0,
                              1,
                              [
                                {
                                  offset: 0,
                                  color: n.areaColor[0],
                                },
                                {
                                  offset: 1,
                                  color: n.areaColor[1],
                                },
                              ],
                              false
                            ),
                        }
                    } : null,
                })
                visualMap.push({ // 设置渐变
                    show: false,
                    type: 'continuous',
                    seriesIndex: 0,
                    dimension: 0,
                    min: 0,
                    max: xData.length - 1,
                    inRange: {
                        color: [n.lineColor[1], n.lineColor[0]],
                    }
                })
                colors.push(n.lineColor[1])
            })
        }
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            color: colors,
            legend: {
                data: yData.map(item => {
                    return {
                        name: item.name,
                        icon: "circle",
                    }
                }),
                show: legendShow ? legendShow : false,
                itemHeight: itemStyle && itemStyle.height ? itemStyle.height : 4,
                itemWidth: itemStyle && itemStyle.width ? itemStyle.width : 4,
                textStyle:{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.4)"
                },                
                right: 8,
                top: 30
            },
            grid: {
                right: 10,
                left: 10,
                borderColor: "transparent",
                bottom: gridBottom || 10,
                containLabel: true,
            },
            xAxis: {
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    align: "right",
                    rotate: rotate ? rotate: 0, // x轴label旋转角度
                    margin: margin && margin.xAxis ? margin.xAxis : 8,
                    color: "#3BB7FF",
                    fontFamily: 'GenShinGothic-Monospace-Regular',
                    fontSize: xAxisStyle && xAxisStyle.font ? xAxisStyle.font : 8,
                    lineHeight: xAxisStyle && xAxisStyle.line ? xAxisStyle.line : 12,
                    interval: interval,
                },
                axisLine: {
                    width: 0,
                    lineStyle: {
                        color: "rgba(16, 35, 158, 0.5)",
                    },
                },
                boundaryGap: false,// 坐标两边留白策略
                data: xData
            },
            yAxis: {
                min: 0,
                axisLabel: {
                    color: "#3BB7FF",
                    fontSize: yAxisStyle && yAxisStyle.font ? yAxisStyle.font : 8,
                    lineHeight: yAxisStyle && yAxisStyle.line ? yAxisStyle.line : 11,
                    margin: margin && margin.yAxis ? margin.yAxis : 8
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(16, 35, 158, 0.5)",
                    },
                },
            },
            series: this.series,
            visualMap: visualMap,
        };

        this.chart.setOption(option);
    }

    public render() {
        return (
            <div ref={this.containerRef} style={{ height: "100%" }}>
                <div ref={this.chartRef} style={{ height: "100%" }} />
            </div>
        );
    }
}
