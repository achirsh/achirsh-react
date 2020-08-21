import { requestIns } from "utils/request";
import { API_DEMO } from "config";
import { IPaged, IWorkOrder } from "models";

// get例子

interface IParams {

}

export async function getData(params: IParams): Promise<IPaged<IWorkOrder>> {
    const response = (await requestIns.get(
        `${API_DEMO}/url`,
        {
            params,
        },
    )).data;

    return response;
}
