import * as React from "react";
import * as echarts from "echarts";


interface yAxisConfig  { max?: number; interval?: number }

interface SeriesConfig {
    legend: string;
    data: number[];                            
    color: string[];
}

export default class extends React.Component<{
    stack?: boolean, // 两个柱体是否重合
    legend?: string[],
    xData: string[],
    yAxis?: [yAxisConfig, yAxisConfig],
    lineSeries: SeriesConfig[];
    barSeries: SeriesConfig[];
    rotate?: any;
    margin?: any;
    xAxisStyle?: any;
    interval?: any;
    legendShow?: boolean;
    itemStyle?: any;
    yAxisStyle?: any;
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
        const { yAxis, lineSeries, barSeries, xData, stack, rotate, margin, xAxisStyle, interval,
            legendShow, itemStyle, yAxisStyle }=this.props;
        let series: any[]=[];
        const yAxisConfig = {
            type: "value",
            min: 0,
            minInterval: 1,
            axisLabel: {
                color: "#3BB7FF",
                fontSize: yAxisStyle && yAxisStyle.font ? yAxisStyle.font : 8,
                lineHeight: yAxisStyle && yAxisStyle.line ? yAxisStyle.line : 11,
                margin: margin && margin.yAxis ? margin.yAxis : 8
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(16, 35, 158, 0.5)",
                },
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        };
        lineSeries.forEach((item,index) => {
             series.push({
                name: item.legend,
                data: item.data,
                type: "line",
                itemStyle: {
                    color: item.color[0],
                },
                yAxisIndex: 1,
                symbol: "none",
                barWidth: 1,
                lineStyle:{
                    color: item.color[0]
                }
            })
        });
        barSeries.map((item,index) => {
            series.push({
               name: item.legend,
               data: item.data,
               type: "bar",
               yAxisIndex: 0,
               itemStyle: {
                   barBorderRadius: stack ? undefined : [25, 25, 0, 0],
                   color:new echarts.graphic.LinearGradient(
                       0, 0, 0, 1,
                       [
                           {offset: 0, color: item.color[0]},
                           {offset: 1, color: item.color[1]},
                       ]
                   )
               },
               stack: stack ? "one" : undefined,
               symbol: "none",
               barMaxWidth: 10,
            //    barGap: "30%",
           })
       })
         
        const option = {
            legend: {
                data: lineSeries.map(o => o.legend).concat(barSeries.map(o => o.legend)).map(item=>{
                    return {
                        name:item,
                        icon:"circle",
                    }
                }),
                itemHeight: itemStyle && itemStyle.height ? itemStyle.height : 4,
                itemWidth: itemStyle && itemStyle.width ? itemStyle.width : 4,
                show: legendShow ? legendShow : false,
                textStyle:{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.4)"
                },  
                right: 8,
                top: 30
            },
            xAxis: {
                axisTick:{
                    show:false,     
                },
                axisLabel:{
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
                data: xData,
            },
            yAxis: [
                { ...yAxisConfig },
                { ...yAxisConfig, max: yAxis && yAxis[1] && yAxis[1].max },
            ],
            grid: {
                left: 10,
                right: 10,
                bottom: 10,
                containLabel: true,
            },
            series,
        };
        this.chart.setOption(option);
    }

    public render() {
        return <div ref={this.containerRef} style={{ height: "100%" }}>
            <div ref={this.chartRef} style={{ height: "100%" }} />
        </div>
    }
}