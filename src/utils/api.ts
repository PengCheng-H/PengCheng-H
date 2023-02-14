import HCHttpClient from "./http_client";
import config from "../config/index.json";
import { IHCHttpResponse } from "../types/interface";
import utils from ".";



class HCApi {
    hc_http_client: HCHttpClient

    constructor() {
        this.hc_http_client = new HCHttpClient();
    }

    public GetItemByCode(item_code: string): object {
        if (!item_code) {
            return {};
        }

        return this.SendGetRequest(config.api.item_get_by_code, { item_code });
    }

    /**
     * @description 请求服务器获取入库订单信息
     * @param item_code 物品编码
     * @param supplier_code 供应商/批次编码
     * @param order_statuses 期望查询的订单状态数组
     * @returns 
     */
    public GetInboundOrder(item_code: string, supplier_code: string = "", order_statuses: number[] = [0]): IHCHttpResponse {
        if (!item_code) {
            return utils.CreateErrorRes();
        }

        const params: object[] = [{ item_code }];
        if (supplier_code) { params.push({ supplier_code }); }
        order_statuses?.forEach(value => {
            params.push({ order_statuses: value });
        });

        return this.SendGetRequest(config.api.inbound_order_get, params);
    }

    /**
     * @description 请求服务器获取出库订单信息 
     * @param item_code 物品编码
     * @param supplier_code 供应商/批次编码
     * @param order_statuses 期望查询的订单状态数组
     * @returns 
     */
    public GetOutboundOrder(item_code: string, supplier_code: string = "", order_statuses: number[] = [0]): IHCHttpResponse {
        if (!item_code) {
            return utils.CreateErrorRes();
        }

        const params: object[] = [{ item_code }];
        if (supplier_code) { params.push({ supplier_code }); }
        order_statuses?.forEach(value => {
            params.push({ order_statuses: value });
        });

        return this.SendGetRequest(config.api.outbound_order_get, params);
    }

    /**
     * @description 请求服务器获取WCS任务信息
     * @param wcs_task_statuses 期望查询的任务状态数组
     * @returns 
     */
    public GetWcsTask(wcs_task_statuses: number[] = [0]): IHCHttpResponse {
        if (!wcs_task_statuses) {
            return utils.CreateErrorRes();
        }

        const params: object[] = [];
        wcs_task_statuses?.forEach(value => {
            params.push({ wcs_task_statuses: value });
        });

        return this.SendGetRequest(config.api.wcs_task_get_by_states, params);
    }

    private SendGetRequest(api: string, params: any = {}) {
        let url = `${api}`;

        if (params) {
            url += "?";
            url += this.JoinGetParams(params);
        }

        return this.hc_http_client.SendGetRequest(url);
    }

    private JoinGetParams(params: any): string {
        let result = '';

        Object.entries(params).forEach(([key, val], index, arr) => {
            const _value = Object(val);
            Object.entries(_value).forEach((_val, _key, arr) => {
                result += `${_val[0]}=${_val[1]}&`;
            });
        });

        return result;
    }

    private SendPostRequest(api: string, data: { [key: string]: any } = {}) {
        let url = `${config.wms_server.protocol}${config.wms_server.host}:${config.wms_server.port}${api}`;

        return this.hc_http_client.SendPostRequest(url, data);
    }
}

export default new HCApi();