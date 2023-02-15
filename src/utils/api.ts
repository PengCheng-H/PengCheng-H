import HCHttpClient from "./http_client";
import config from "../config/index.json";
import { IHCHttpResponse } from "../types/interface";
import utils from ".";



class HCApi {
    hc_http_client: HCHttpClient

    constructor() {
        this.hc_http_client = new HCHttpClient();
    }

    /**
     * @description 模糊搜索物品列表
     * @param text 部分物品名称或编码
     * @returns 
     */
    public async GetItemByText(text: string): Promise<IHCHttpResponse> {
        if (!text) {
            return utils.CreateErrorRes();
        }

        return await this.SendGetRequest(config.api.item_get_by_text, { text: text });
    }

    /**
     * @description 请求服务器获取物品的详细信息
     * @param item_code 物品编码
     * @returns 
     */
    public async GetItemByCode(item_code: string): Promise<IHCHttpResponse> {
        if (!item_code) {
            return utils.CreateErrorRes();
        }

        return await this.SendGetRequest(config.api.item_get_by_code, { item_code });
    }

    /**
     * @description 请求服务器获取入库订单信息
     * @param item_code 物品编码
     * @param supplier_code 供应商/批次编码
     * @param order_statuses 期望查询的订单状态数组
     * @returns 
     */
    public async GetInboundOrder(item_code: string, supplier_code: string = "", order_statuses: number[] = [0]): Promise<IHCHttpResponse> {
        if (!item_code) {
            return utils.CreateErrorRes();
        }

        const params: object[] = [{ item_code }];
        if (supplier_code) { params.push({ supplier_code }); }
        order_statuses?.forEach(value => {
            params.push({ order_statuses: value });
        });

        return await this.SendGetRequest(config.api.inbound_order_get, params);
    }

    /**
     * @description 请求服务器获取出库订单信息 
     * @param item_code 物品编码
     * @param supplier_code 供应商/批次编码
     * @param order_statuses 期望查询的订单状态数组
     * @returns 
     */
    public async GetOutboundOrder(item_code: string, supplier_code: string = "", order_statuses: number[] = [0]): Promise<IHCHttpResponse> {
        if (!item_code) {
            return utils.CreateErrorRes();
        }

        const params: object[] = [{ item_code }];
        if (supplier_code) { params.push({ supplier_code }); }
        order_statuses?.forEach(value => {
            params.push({ order_statuses: value });
        });

        return await this.SendGetRequest(config.api.outbound_order_get, params);
    }

    /**
     * @description 请求服务器获取WCS任务信息
     * @param wcs_task_statuses 期望查询的任务状态数组
     * @returns 
     */
    public async GetWcsTask(wcs_task_statuses: number[] = [0]): Promise<IHCHttpResponse> {
        if (!wcs_task_statuses) {
            return utils.CreateErrorRes();
        }

        const params: object[] = [];
        wcs_task_statuses?.forEach(value => {
            params.push({ wcs_task_statuses: value });
        });

        return await this.SendGetRequest(config.api.wcs_task_get_by_states, params);
    }

    /**
     * @description 向服务器发送HTTP GET请求，并同步返回结果
     * @param path 请求路径 
     * @param params 请求参数
     * @returns 
     */
    private async SendGetRequest(path: string, params: {} | [] = {}): Promise<IHCHttpResponse> {
        let url = `${config.wms_server.protocol}${config.wms_server.host}:${config.wms_server.port}${path}`;

        if (Boolean(config.debug.enable) && Boolean(config.debug.enable_proxy)) {
            url = `${path}`;
        }

        if (params) {
            url += "?";
            url += this.JoinGetParams(params);
        }

        return await this.hc_http_client.SendGetRequest(url);
    }

    /**
     * @desc 拼接GET请求参数为queryString形式
     * @param params 请求参数
     * @returns 
     */
    private JoinGetParams(params: {} | []): string {
        let result = '';

        if (Array.isArray(params)) {
            Object.entries(params).forEach(([key, val], index, arr) => {
                const _value = Object(val);
                Object.entries(_value).forEach((_val, _key, arr) => {
                    result += `${_val[0]}=${_val[1]}&`;
                });
            });
        } else {
            Object.entries(params).forEach(([key, val], index, arr) => {
                result += `${key}=${val}&`;
            });
        }

        return result;
    }

    /**
     * @description 向服务器发送HTTP POST请求，并同步返回结果
     * @param path 请求路径
     * @param params 请求参数
     * @returns 
     */
    private async SendPostRequest(path: string, params: { [key: string]: any } = {}): Promise<IHCHttpResponse> {
        let url = `${config.wms_server.protocol}${config.wms_server.host}:${config.wms_server.port}${path}`;

        if (config.debug.enable && config.debug.enable_proxy) {
            url = `${path}`;
        }

        return await this.hc_http_client.SendPostRequest(path, params);
    }
}

export default new HCApi();