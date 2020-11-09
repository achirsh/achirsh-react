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

export interface Paged<T> {
    page: number;
    size: number;
    total: number;
    items: T[];
}

