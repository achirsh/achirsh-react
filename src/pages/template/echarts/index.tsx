import React from 'react';
import styles from './index.module.css';
import { ChartGraph } from 'components'

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
            {name: '节点1', x: 0, y: 0}, 
            {name: '节点2', x: 100, y: 200}, 
            {name: '节点3', x: 200, y: 350},
            {name: '节点4', x: 400, y: 400}
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
        return this.commonRender('柱状图',
            null)
    }

    public render() {
        return <div className={styles.container}>
            {this.graphRender()}
            {this.barRender()}
        </div>
    }
}