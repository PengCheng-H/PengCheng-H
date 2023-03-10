import hc_utils from ".";
import hc_config from "../config/index.json";
import HCHttpClient from "./http_client";
import * as IBase from "../types/interface";
import * as IHttpRes from "../types/http_response.interface";



class HCApi {
    hc_http_client: HCHttpClient

    constructor() {
        this.hc_http_client = new HCHttpClient();
    }



    public async AddItem(item: IBase.IHCItem): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.item_add, { ...item });
    }

    public async UodateItem(item: IBase.IHCItem): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.item_update, { ...item });
    }

    public async GetItems(text: string): Promise<IHttpRes.IHCGetItemsRes> {
        if (!text) { return hc_utils.CreateErrorRes(); }
        return await this.SendGetRequest(hc_config.api.item_list_get, { text, page_no: 1, page_size: 200 });
    }

    public async GetItemDetail(item_code: string): Promise<IHttpRes.IHCGetItemDetailRes> {
        return await this.SendGetRequest(hc_config.api.item_detail_get, { item_code });
    }



    public async AddSupplier(supplier: IBase.IHCSupplier): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.supplier_add, { ...supplier });
    }

    public async UodateSupplier(supplier: IBase.IHCSupplier): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.supplier_update, { ...supplier });
    }

    public async GetSuppliers(text: string): Promise<IHttpRes.IHCGetSupplierRes> {
        if (!text) { return hc_utils.CreateErrorRes(); }
        return await this.SendGetRequest(hc_config.api.supplier_list_get, { text });
    }

    public async GetSupplierDetail(supplier_code: string): Promise<IHttpRes.IHCGetSupplierDetailRes> {
        return await this.SendGetRequest(hc_config.api.supplier_detail_get, { supplier_code });
    }



    public async AddLocation(location: IBase.IHCLocation): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.location_add, { ...location });
    }

    public async UodateLocation(location: IBase.IHCSupplier): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.location_update, { ...location });
    }

    public async GetLocationDetail(location_code: string): Promise<IHttpRes.IHCGetLocationDetailRes> {
        if (!location_code) { return hc_utils.CreateErrorRes(); }
        return await this.SendGetRequest(hc_config.api.location_detail_get, { location_code });
    }



    public async AddBox(box: IBase.IHCBox): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.box_add, { ...box });
    }

    public async UodateBox(box: IBase.IHCBox): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.box_update, { ...box });
    }

    public async GetBoxDetail(box_code: string): Promise<IHttpRes.IHCGetBoxDetailRes> {
        if (!box_code) { return hc_utils.CreateErrorRes(); }
        return await this.SendGetRequest(hc_config.api.box_detail_get, { box_code });
    }



    public async AddOderType(order_type_code: string, order_type_name: string, work_type: string): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.order_type_add, { order_type_code, order_type_name, work_type });
    }

    public async UpdateOrderType(order_type_code: string, order_type_name: string, work_type: string): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.order_type_update, { order_type_code, order_type_name, work_type });
    }

    public async GetOrderTypeDetail(order_type_code: string): Promise<IHttpRes.IHCGetOderTypeDetailRes> {
        if (!order_type_code) { return hc_utils.CreateErrorRes(); }
        return await this.SendGetRequest(hc_config.api.order_type_detail_get, { order_type_code });
    }



    public async AddPickStation(pick_station_code: string, pick_station_status: string, wcs_task_code: string, box_code: string): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.pick_station_add, { pick_station_code, pick_station_status, wcs_task_code, box_coed: box_code });
    }

    public async UpdatePickStation(pick_station_code: string, pick_station_status: string, wcs_task_code: string, box_code: string): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.pick_station_update, { pick_station_code, pick_station_status, wcs_task_code, box_coed: box_code });
    }

    public async GetPickStation(pick_station_code: string): Promise<IHttpRes.IHCGetPickStationRes> {
        if (!pick_station_code) { return hc_utils.CreateErrorRes(); }
        return await this.SendGetRequest(hc_config.api.pick_station_get, { pick_station_code });
    }

    public async GetPickAllStation(): Promise<IHttpRes.IHCGetPickStationsRes> {
        return await this.SendGetRequest(hc_config.api.pick_station_get_all, {});
    }



    public async QuickAddInboundOrder(supplier_code: string, details: { item_code: string, quantity: number }[]): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.inbound_order_quick_add, { supplier_code, details });
    }

    public async AllocateInboundOrder(order_code: string): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.inbound_order_allocate, { order_code });
    }

    public async AllocateWorkbenchInboundOrder(order_list: { order_code: string, order_details: { order_detail_id: number, allocate_quantity: number }[] }[]): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.inbound_order_workbench_allocate, order_list);
    }

    public async GetInboundOrders(item_code: string, supplier_code: string = "", order_statuses: number[] = [0]): Promise<IHttpRes.IHCGetInboundOrdersRes> {
        if (!item_code) { return hc_utils.CreateErrorRes(); }

        const params: object[] = [{ item_code }];
        if (supplier_code) { params.push({ supplier_code }); }
        order_statuses?.forEach(value => {
            params.push({ order_statuses: value });
        });

        return await this.SendGetRequest(hc_config.api.inbound_order_get, params);
    }



    public async QuickAddOutboundOrder(details: { supplier_code: string, item_code: string, quantity: number }[]): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.outbound_order_quick_add, { details });
    }

    public async AllocateOutboundOrder(order_code: string): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.outbound_order_allocate, { order_code });
    }

    public async AllocateWorkbenchOutboundOrder(order_code: string, order_details: { order_detail_id: number, allocate_quantity: number }[]): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.outbound_order_workbench_allocate, { order_code, order_details });
    }

    public async ActivateOutboundOrder(outbound_order_code: string): Promise<IHttpRes.HttpResponse> {
        // return await this.SendPostRequest(config.api.outbound_order_activate, outbound_order_code);
        return await this.SendPostRequest(hc_config.api.outbound_order_activate, { outbound_order_code });
    }

    public async GetOutboundOrders(item_code: string, supplier_code: string = "", order_statuses: number[] = [0]): Promise<IHttpRes.IHCGetOutboundOrdersRes> {
        if (!item_code) { return hc_utils.CreateErrorRes(); }

        const params: object[] = [{ item_code }];
        if (supplier_code) { params.push({ supplier_code }); }
        order_statuses?.forEach(value => {
            params.push({ order_statuses: value });
        });

        return await this.SendGetRequest(hc_config.api.outbound_order_get, params);
    }



    public async ConfirmTask(task_code: string, quantity: number): Promise<IHttpRes.IHCGetWorkbenchWcsTasksRes> {
        return await this.SendPostRequest(hc_config.api.wms_task_confirm, { task_code, quantity });
    }



    public async GetWorkbenchWcsTasks(wcs_task_statuses: number[] = [0]): Promise<IHttpRes.IHCGetWorkbenchWcsTasksRes> {
        if (!wcs_task_statuses) { return hc_utils.CreateErrorRes(); }

        const params: object[] = [];
        wcs_task_statuses?.forEach(value => {
            params.push({ wcs_task_statuses: value });
        });

        return await this.SendGetRequest(hc_config.api.wcs_workbench_task_get, params);
    }

    public async ActivateWcsTask(sub_task_code: string): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.wcs_task_activate, { sub_task_code });
    }

    public async ActivateWorkbenchWcsTask(): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.wcs_workbench_task_activate, {});
    }

    public async FinishWorkbenchWcsTask(box_code: string, details: { item_code: string, box_region_id: number, actual_quantity: number }[]): Promise<IHttpRes.HttpResponse> {
        return await this.SendPostRequest(hc_config.api.wcs_workbench_task_finish, { box_code, details });
    }



    public async GetPickStationDetail(pick_station_code: string): Promise<IHttpRes.HttpResponse> {
        if (!pick_station_code) { return hc_utils.CreateErrorRes(); }
        return await this.SendGetRequest(hc_config.api.pick_station_detail_get, { pick_station_code });
    }



    /**
     * @description 向服务器发送HTTP GET请求，并同步返回结果
     * @param path 请求路径 
     * @param params 请求参数
     * @returns 
     */
    private async SendGetRequest(path: string, params: {} | [] = {}): Promise<IHttpRes.HttpResponse> {
        let url = `${hc_config.wms_server.protocol}${hc_config.wms_server.host}:${hc_config.wms_server.port}${path}`;

        if (Boolean(hc_config.debug.enable) && Boolean(hc_config.debug.enable_proxy)) {
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
    private async SendPostRequest(path: string, params: { [key: string]: any } = {}): Promise<IHttpRes.HttpResponse> {
        let url = `${hc_config.wms_server.protocol}${hc_config.wms_server.host}:${hc_config.wms_server.port}${path}`;

        if (hc_config.debug.enable && hc_config.debug.enable_proxy) {
            url = path;
        }

        return await this.hc_http_client.SendPostRequest(url, params);
    }
}



export default new HCApi();