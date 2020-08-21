export type WorkOrderState =
    "status1" // 例子状态1
    | "status1" // 例子状态2
    ;

/**
 * 接口/变量模型
 */
export interface IWorkOrder {
    id: string; // 主键ID
    status: WorkOrderState; // 状态
}

export interface IPage {
    total: number;
    size: number;
    page: number;
}

export interface IPaged<T> extends IPage {
    items: T[];
}