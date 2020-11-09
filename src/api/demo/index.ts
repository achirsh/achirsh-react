import { requestIns } from "utils/request";
import { API_DEMO } from "config";
import { Paged, IWorkOrder } from "models";

// get例子

interface IParams {

}

export async function getData(params: IParams): Promise<Paged<IWorkOrder>> {
    const response = (await requestIns.get(
        `${API_DEMO}/report/auth/api/v1/auth/apps`,
        {
            params,
        },
    )).data;

    return response;
}
