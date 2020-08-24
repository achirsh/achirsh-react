import * as React from "react";
import * as echarts from "echarts";
import { SeriesItem } from "../index";
import { div, sub, mul, add } from "utils/func";

export default class extends React.Component<{ colors: string[]; series: SeriesItem[]}, {}> {
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

    public draw = () => {
        const { series = [], colors } = this.props;

        const total = series.reduce((a, b) => add(a, b.value), 0);
        const max = Math.max(...series.map(o => o.value));
        const circle = div(max, 8) * 12;

        const option = {
            grid: {
                left: 0,
                right: 30,
                containLabel: true,
            },
            legend: {
                orient : 'vertical',
                x : this.containerRef.current.offsetWidth / 2,
                y : 11,
                itemGap: 2,
                itemWidth: 8,
                itemHeight: 6,
                textStyle:{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.4)"
    
                },
                formatter: (name: any) => {
                    const item = series.filter(o => o.name === name)[0];
                    if (item) {
                        return `${name} ${Number(item.value).toFixed(2)}%`
                    } else {
                        return "";
                    }
                },
                data: series.map(o => ({name: o.name, icon: "circle"})),
            },
            series: series.map((o, idx) => ({
                name: o.name,
                type: "pie",
                clockWise: false,
                radius : [`${68 - idx * 6}%`, `${74 - idx * 6}%`],
                label: { show: false },
                labelLine: { show: false },
                itemStyle : {
                    color: colors[idx],
                },
                data:[
                    {
                        value: o.value,
                        name: o.name,
                    },
                    {
                        value: sub(circle, o.value),
                        name: 'invisible',
                        itemStyle : {
                            color: "transparent",
                        },
                    }
                ]
            })),
        };
        this.chart.setOption(option);                 
    }

    public render() {
        return <div ref={this.containerRef} style={{height: "100%"}}>
            <div ref={this.chartRef} style={{height: "100%"}} />
        </div>
    }
}
