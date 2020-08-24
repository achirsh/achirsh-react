import React from 'react';
import styles from './index.module.css';
import { ChartGraph, ChartBar, ChartLine, ChartPie, ChartMix, ChartGauge } from 'components'

export default class extends React.Component<{}, {}> {

    public comonTitle(value: String) {
        return <div className={styles.title}>
            {value}
        </div>
    }

    public commonRender(title: String, children: any) {
        return <div className={styles['chart-render']}>
            {this.comonTitle(title)}
            <div className={styles['chart-item']}>
                {children}
            </div>
        </div>
    }

    // 热力图
    public graphRender() {
        const GraphData = [
            { name: '节点1', x: 0, y: 0 },
            { name: '节点2', x: 100, y: 200 },
            { name: '节点3', x: 200, y: 350 },
            { name: '节点4', x: 400, y: 400 }
        ]
        const GraphLink = [
            {
                source: '节点1',
                target: '节点2',
                symbolSize: [5, 20],
                lineStyle: {
                    width: 5,
                    curveness: 0.2,
                    color: '#ffb400'
                }
            },
            {
                source: '节点2',
                target: '节点3',
                symbolSize: [5, 20],
                lineStyle: {
                    width: 5,
                    curveness: 0.2,
                    color: '#ffb400'
                }
            }
        ]
        return this.commonRender('关系图',
            <ChartGraph.Graph
                GraphData={GraphData}
                GraphLink={GraphLink}
            />)
    }

    // 柱状图
    public barRender() {
        const xData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        const dataSeries = [
            { name: '蒸发量', data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3], color: ["#00E2FD", "#006BC4"] },
            { name: '降水量', data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3], color: ["#6460FF", "#BF1AFF"] }
        ]
        const legend = ["蒸发量", "降水量"]
        return this.commonRender('柱状图',
            <ChartBar.Simple
                overlay={false}
                xData={xData}
                dataSeries={dataSeries}
                legend={legend}
            ></ChartBar.Simple>)
    }

    // 合计柱图
    public waterFallRender() {
        const xData = ['总费用', '房租', '水电费', '交通费', '伙食费', '日用品数']
        const legend = { name: ["总单数", "各项占比"], color: ["#1990FF", "#1990FF"] }
        const yData = { data: [2900, 1200, 300, 200, 900, 300], color: ["#00E2FDFF", "#006BC4FF"] }
        return this.commonRender('合计柱图',
            <ChartBar.Waterfall
                legend={legend}
                xData={xData}
                yData={yData}
            />)
    }

    // 折线图
    public lineStack() {
        return this.commonRender('折线图',
            <ChartLine.Stack
                xData={["10-01", "10-02", "10-03", "10-04"]}
                legendShow={true}
                yData={
                    [
                        {
                            lineColor: ["rgba(51, 200, 253, 1)", "rgba(20, 23, 253 , 1)"],
                            data: [100, 200, 500, 200, 400],
                            name: '上周周期'
                        },
                        {
                            lineColor: ["rgba(236, 238,145 , 1)", "rgba(247, 164, 72, 1)"],
                            data: [500, 100, 500, 150, 180],
                            name: '昨日'
                        },
                        {
                            lineColor: ["rgba(223, 254, 129, 1)", "rgba(1, 254, 102, 1)"],
                            data: [800, 300, 100, 200, 400],
                            name: '当日'
                        }
                    ]
                } />)
    }

    // 面积图
    public lineArea() {
        return this.commonRender('面积图',
            <ChartLine.Stack
                areaStyle={true}
                xData={["10-01", "10-02", "10-03", "10-04"]}
                yData={[{
                    lineColor: ["#00E2FD", "#006BC4"],
                    areaColor: ['rgba(26, 108, 255, 0.4)', 'rgba(26, 108, 255, 0.02)'],
                    data: [100, 200, 500, 200, 400],
                }]} />)
    }

    // 饼图-轮播甜甜圈
    public pieDoughnut() {
        return this.commonRender('饼图-轮播甜甜圈', 
            <ChartPie.Doughnut
                colors={["#1A91FF", "#096DD9", "#003A8C", "#0050B3", "#002766"]}
                series={[
                    {name: "现金支付", value: 1900},
                    {name: "线上支付宝", value: 470},
                    {name: "线上微信", value: 430},
                    {name: "线下支付宝", value: 480},
                    {name: "线下微信", value: 460},
                ]} />)
    }

    // 饼图-嵌套
    public pieNested() {
        return this.commonRender('饼图-嵌套', 
            <ChartPie.Nested
                colors={["#1A6CFF", "#096DD9", "#722ED1", "#531DAB"]}
                series={[
                    {name: "垃圾处理费", value: 1700},
                    {name: "物业费", value: 997},
                    {name: "门禁卡费", value: 800},
                    {name: "装修押金", value: 676},
                ]} />)
    }

    // 饼图-甜甜圈+示例
    public pieLegend() {
        return this.commonRender('', <ChartPie.Legend 
            name="设备巡检总数"
            colors={["#1A91FF", "#096DD9", "#0050B3", "#003A83"]}
            series={[
                {name: "现金支付", value: 120},
                {name: "线上支付宝", value: 30},
                {name: "线上微信", value: 25},
                {name: "线下支付宝", value: 25},
            ]} />)
    }

    // 混合柱图
    public mixLineBar() {
        return this.commonRender('混合柱图', <ChartMix.LineBar
                xData={['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']}
                yAxis={[{}, {}]}
                lineSeries={[
                    {
                        legend: "蒸发量",
                        color: ["#00E2FD", "#006BC4"],
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 200, 200, 32.6, 20.0, 6.4, 3.3]
                    }
                ]}
                barSeries={[
                    {
                        legend: "降水量",
                        color: ["#6460FF", "#BF1AFF"],
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    },
                    {
                        legend: "平均温度",
                        color: ["#00B4FF", "#00B4FF"],
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]}
            />)
    }

    // 仪表盘
    public guageGuage() {
        return this.commonRender('仪表盘', <ChartGauge.Guage
            xData={[{ value: 50, name: '健康度' }]} 
            min = {0}
            max = {50}    
        />)
    }

    public render() {
        return <div className={styles.container}>
            {this.graphRender()}
            {this.barRender()}
            {this.waterFallRender()}
            {this.lineStack()}
            {this.lineArea()}
            {this.pieDoughnut()}
            {this.pieNested()}
            {this.pieLegend()}
            {this.mixLineBar()}
            {this.guageGuage()}
        </div>
    }
}