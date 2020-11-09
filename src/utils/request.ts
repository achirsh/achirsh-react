import axios from "axios";
import { isDevelopment } from "config";

export const requestIns = axios.create();

requestIns.interceptors.request.use(
    async config => {
        let token: string = "";
        try {
            // 可以在这里设置token
        } catch (error) {
            // if (isDevelopment) {  // 在开发环境取配置的token
            //     try {
            //         const data = require("config/develop");
            //         token = data.token;

            //     } catch (error) {
            //         //
            //     }
            // }
        }

        if (token) {
            /* tslint:disable:no-string-literal */
            // config.headers["Authorization"] = token;
        }

        config.headers["Authorization"] = '5e18942c-6c12-4b25-ae86-04ee63db0235';
        config.headers["signature"] = 'c927318a01b9255a29e16ab501701467'

        return config;
    },
);

requestIns.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        if (error.response.status === 401) {
            // token失效的时候可以在这里退出登陆
            return Promise.reject(error);
        }
        return Promise.reject(error);
    },
);