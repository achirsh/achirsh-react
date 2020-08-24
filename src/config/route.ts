import HomePage from "pages/home";
import ChartPage from "pages/template/echarts"

const defaultRoutes = [
    { path: "/", component: HomePage }
];

const chartRoutes = [
    { path: "/template/chart", component: ChartPage }
]

export const routes = [
    ...defaultRoutes,
    ...chartRoutes
];