import React from "react";
import api from "api";

export default class extends React.Component<{}, {}> {

    public componentDidMount() {

    }

    // 接口请求
    public async getData() {
        try {
            const data = await api.demo.getData({ a: 1 })
        } catch (err) {
            // 接口请求错误处理
        }
    }

    public render() {
        return <div>Hello world</div>
    }
}