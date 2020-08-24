import * as React from "react";
import * as echarts from "echarts";


interface yAxisConfig {
    unit: string                   // 坐标单位             
}

interface SeriesConfig {
    name: string,
    data: any[],
    color: [string, string]
}



export default class extends React.Component<{
    overlay: boolean // 两个柱体是否重合
    legend: string[],
    xData: string[] | number[],
    yAxisConfig?: yAxisConfig,
    dataSeries: any[],
    interval?: any,
    rotate?: any,
    xAxisFont?: number,
    yAxisFont?: number,
    margin?: any,
    legendFont?: number,
    itemStyle?: any,
    legendTop?: string,
    barWidth?: number,
    yAxisMax?: number,
}, {

    }> {
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
        const { yAxisConfig, dataSeries, xData, legend, overlay, interval = 0, rotate = 0, xAxisFont = 8, yAxisFont = 8, margin, legendFont, itemStyle, legendTop, barWidth, yAxisMax } = this.props;
        let echartsLegend = {};
        let xAxis = {};
        let yAxis = {};
        let series: any[] = [];
        xAxis = {
            type: 'category',
            data: xData,
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: interval ? interval : 0,
                rotate: rotate ? rotate: 0,
                lineHeight: 12,
                margin: margin && margin.xAxis ? margin.xAxis : 8,
                textStyle: {
                    color: '#3BB7FF',
                    fontSize: xAxisFont ? xAxisFont : 8,
                    fontFamily: 'Helvetica-Bold,Helvetica'
                }
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: 'rgba(255, 255, 255, 0.4)',
                    width: '0'
                }
            }
        };
        yAxis = {
            name: "",
            axisLine: {
                show: false
            },
            max: yAxisMax ? yAxisMax : 100,
            axisLabel: {
                formatter: yAxisConfig&&yAxisConfig.unit ? `{value}${yAxisConfig.unit}` : `{value}`,
                lineHeight: 12,
                margin: margin && margin.yAxis ? margin.yAxis : 8,
                textStyle: {
                    color: '#3BB7FF',
                    fontSize: yAxisFont ? yAxisFont : 8,
                    fontFamily: 'Helvetica-Bold,Helvetica'
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(16, 35, 158, 0.5)"
                }
            },
            axisTick: {
                show: false
            }
        }
        dataSeries.map((item, index) => {
            series.push({
                name: item.name,
                data: item.data,
                type: "bar",
                itemStyle: {
                    show: true,
                    barBorderRadius: overlay ? undefined : [5, 5, 5, 5],
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: item.color[0] },
                            { offset: 1, color: item.color[1] },
                        ]
                    ),
                    borderColor: "#01B0FF",
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: item.clickColor[0] },
                                { offset: 1, color: item.clickColor[1] },
                            ]
                        ),
                    }
                },
                barWidth: barWidth ? barWidth : 7,
            })
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        overlay ? series[0].barGap = "-100%" : undefined;
        echartsLegend = {
            data: legend.map(item => {
                return {
                    name: item,
                    icon: "circle",
                }
            }),
            itemHeight: itemStyle && itemStyle.height ? itemStyle.height : 4,
            itemWidth: itemStyle && itemStyle.width ? itemStyle.width : 4,
            textStyle: {
                fontSize: legendFont ? legendFont : 10,
                fontWeight: 400,
                color: "rgba(255,255,255,0.4)",
                fontFamily: 'GenShinGothic-Monospace-Regular'
            },
            right: "0",
            top: legendTop ? legendTop : '30px'
        }
        const option = {
            legend: echartsLegend,
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                    // shadowStyle: {
                    //     color: "rgba(29, 57, 196, 0.3)",
                    // }
                }
            },
            xAxis,
            yAxis,
            grid: {
                left: '0',
                right: '0',
                bottom: '0',
                containLabel: true,
            },
            series
        };
        this.chart.setOption(option);

        this.chart.on("click", async (params: any) => {
            //
        })
    }

    public render() {
        return <div ref={this.containerRef} style={{ height: "100%" }}>
            <div ref={this.chartRef} style={{ height: "100%" }} />
        </div>
    }
}