import hc_config from "../config/index.json";
import HCHttpClient from "./HttpClient";
import * as IBase from "../interfaces/interface";
import * as IHttpReq from "../interfaces/http_request.interface";
import * as IHttpRes from "../interfaces/http_response.interface";
import { BoxStatus, ItemStatus, LocationStatus, OrderStatus, SupplierStatus } from "src/types/enum";
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from "src/types/Constants";



class HCApi {
    hc_http_client: HCHttpClient

    constructor() {
        this.hc_http_client = new HCHttpClient();
    }



    public async ItemAdd(item: IBase.IHCItem): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.item_add, { ...item });
    }

    public async ItemUpdate(item: IBase.IHCItem): Promise<IHttpRes.IHCResponse> {
        return await this.SendPutRequest(hc_config.urls.item_update, { ...item });
    }

    public async ItemDetailGet(item_code: string): Promise<IHttpRes.IHCGetItemDetailRes> {
        return await this.SendGetRequest(hc_config.urls.item_detail_get, { item_code });
    }

    public async ItemListGet(text = "", status: ItemStatus[] = [], page_no = DEFAULT_PAGE_NO, page_size = DEFAULT_PAGE_SIZE): Promise<IHttpRes.IHCGetItemsRes> {
        return await this.SendGetRequest(hc_config.urls.item_list_get, { text, status, page_no, page_size });
    }




    public async SupplierAdd(supplier: IBase.IHCSupplier): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.supplier_add, { ...supplier });
    }

    public async SupplierUpdate(supplier: IBase.IHCSupplier): Promise<IHttpRes.IHCResponse> {
        return await this.SendPutRequest(hc_config.urls.supplier_update, { ...supplier });
    }

    public async SupplierDetailGet(supplier_code: string): Promise<IHttpRes.IHCGetSupplierDetailRes> {
        return await this.SendGetRequest(hc_config.urls.supplier_detail_get, { supplier_code });
    }

    public async SupplierListGet(text = "", status: SupplierStatus[] = [], page_no = DEFAULT_PAGE_NO, page_size = DEFAULT_PAGE_SIZE): Promise<IHttpRes.IHCGetSupplierRes> {
        return await this.SendGetRequest(hc_config.urls.supplier_list_get, { text, status, page_no, page_size });
    }



    public async LocationAdd(location: IBase.IHCLocation): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.location_add, { ...location });
    }

    public async LocationUpdate(location: IBase.IHCSupplier): Promise<IHttpRes.IHCResponse> {
        return await this.SendPutRequest(hc_config.urls.location_update, { ...location });
    }

    public async LocationDetailGet(location_code: string): Promise<IHttpRes.IHCGetLocationDetailRes> {
        return await this.SendGetRequest(hc_config.urls.location_detail_get, { location_code });
    }

    public async LocationListGet(text = "", status: LocationStatus[] = [], page_no = DEFAULT_PAGE_NO, page_size = DEFAULT_PAGE_SIZE): Promise<IHttpRes.IHCGetLocationRes> {
        return await this.SendGetRequest(hc_config.urls.location_list_get, { text, status, page_no, page_size });
    }



    public async BoxAdd(box: IBase.IHCBox): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.box_add, { ...box });
    }

    public async BoxUpdate(box: IBase.IHCBox): Promise<IHttpRes.IHCResponse> {
        return await this.SendPutRequest(hc_config.urls.box_update, { ...box });
    }

    public async BoxDetailGet(box_code: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.box_detail_get, { box_code });
    }

    public async BoxListGet(text = "", status: BoxStatus[] = [], page_no = DEFAULT_PAGE_NO, page_size = DEFAULT_PAGE_SIZE): Promise<IHttpRes.IHCGetBoxRes> {
        return await this.SendGetRequest(hc_config.urls.box_list_get, { text, status, page_no, page_size });
    }



    public async OrderTypeAdd(order_type_code: string, order_type_name: string, work_type: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_type_add, { order_type_code, order_type_name, work_type });
    }

    public async OrderTypeUpdate(order_type_code: string, order_type_name: string, work_type: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPutRequest(hc_config.urls.order_type_update, { order_type_code, order_type_name, work_type });
    }

    public async OrderTypeDetailGet(order_type_code: string): Promise<IHttpRes.IHCGetOderTypeDetailRes> {
        return await this.SendGetRequest(hc_config.urls.order_type_detail_get, { order_type_code });
    }



    public async PickStationAdd(pick_station_code: string, pick_station_status: string, wcs_task_code: string, box_code: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.pick_station_add, { pick_station_code, pick_station_status, wcs_task_code, box_coed: box_code });
    }

    public async PickStationUpdate(pick_station_code: string, pick_station_status: string, wcs_task_code: string, box_code: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPutRequest(hc_config.urls.pick_station_update, { pick_station_code, pick_station_status, wcs_task_code, box_coed: box_code });
    }

    public async PickStationDetailGet(pick_station_code: string): Promise<IHttpRes.IHCGetPickStationRes> {
        return await this.SendGetRequest(hc_config.urls.pick_station_get, { pick_station_code });
    }

    public async PickStationGetAll(): Promise<IHttpRes.IHCGetPickStationsRes> {
        return await this.SendGetRequest(hc_config.urls.pick_station_get_all, {});
    }



    public async OrderInboundQuickAdd(supplier_code: string, details: { item_code: string, quantity: number }[]): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_inbound_quick_add, { supplier_code, details });
    }

    public async OrderInboundAutoAllocateFull(order_code: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_inbound_auto_allocate_full, { order_code });
    }

    public async OrderInboundAutoAllocateList(order_list: { order_code: string, order_details: { order_detail_id: number, allocate_quantity: number }[] }[]): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_inbound_auto_allocate_list, order_list);
    }

    public async OrderInboundManualAllocateFull(order_code: string, box_code: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_inbound_manual_allocate_full, { order_code, box_code });
    }

    public async OrderInboundManualAllocateDetails(params: IHttpReq.IHCOrderInboundManaulAllocateDetailsReq): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_inbound_manual_allocate_details, params);
    }

    public async OrderInboundClose(order_code: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_inbound_close, { order_code });
    }

    public async OrderInboundDetailClose(order_code: string, order_detail_id: number): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_inbound_detail_close, { order_code, order_detail_id });
    }

    public async OrderInboundFind(item_code: string, supplier_code = "", order_statuses: OrderStatus[] = [
        OrderStatus.CREATED, OrderStatus.ACTIVATED, OrderStatus.PAUSED, OrderStatus.WORKING, OrderStatus.DONE
    ], page_no = DEFAULT_PAGE_NO, page_size = DEFAULT_PAGE_SIZE): Promise<IHttpRes.IHCGetInboundOrdersRes> {
        const params: object[] = [{ item_code, page_no, page_size }];
        if (supplier_code) { params.push({ supplier_code }); }
        order_statuses?.forEach(value => {
            params.push({ order_statuses: value });
        });

        return await this.SendGetRequest(hc_config.urls.order_inbound_find, params);
    }



    public async OrderOutboundQuickAdd(details: { supplier_code: string, item_code: string, quantity: number }[]): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_outbound_quick_add, { details });
    }

    public async OrderOutboundAutoAllocateFull(order_code: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_outbound_auto_allocate_full, { order_code });
    }

    public async OrderOutboundAutoAllocateDetails(order_code: string, order_details: { order_detail_id: number, allocate_quantity: number }[]): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_outbound_auto_allocate_details, { order_code, order_details });
    }

    public async OrderOutboundActivate(outbound_order_code: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_outbound_activate, { outbound_order_code });
    }

    public async OrderOutboundPause(outbound_order_code: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_outbound_pause, { outbound_order_code });
    }

    public async OrderOutboundClose(order_code: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_outbound_close, { order_code });
    }

    public async OrderOutboundDetailClose(order_code: string, order_detail_id: number): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.order_outbound_detail_close, { order_code, order_detail_id });
    }

    public async OrderOutboundFind(item_code: string, supplier_code = "", order_statuses: OrderStatus[] = [
        OrderStatus.CREATED, OrderStatus.ACTIVATED, OrderStatus.PAUSED, OrderStatus.WORKING, OrderStatus.DONE
    ], page_no = DEFAULT_PAGE_NO, page_size = DEFAULT_PAGE_SIZE): Promise<IHttpRes.IHCGetOutboundOrdersRes> {
        const params: object[] = [{ item_code, page_no, page_size }];
        if (supplier_code) { params.push({ supplier_code }); }
        order_statuses?.forEach(value => {
            params.push({ order_statuses: value });
        });

        return await this.SendGetRequest(hc_config.urls.order_outbound_find, params);
    }



    public async WorkbenchStartWork(): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.workbench_start_work, {});
    }

    public async WorkbenchStopWork(): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.workbench_stop_work, {});
    }

    public async WorbenchTaskDetailView(box_code: string): Promise<IHttpRes.IHCGetBoxDetailRes> {
        return await this.SendGetRequest(hc_config.urls.workbench_task_detail_view, { box_code });
    }

    public async WorkbenchTaskDetailConfirm(box_code: string, details: { item_code: string, box_region_id: number, actual_quantity: number }[]): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.workbench_task_detail_confirm, { box_code, details });
    }



    public async WmsTaskConfirm(task_code: string, quantity: number): Promise<IHttpRes.IHCGetWorkbenchWcsTasksRes> {
        return await this.SendPostRequest(hc_config.urls.wms_task_confirm, { task_code, quantity });
    }

    public async WmsTaskClose(task_code: string): Promise<IHttpRes.IHCGetWorkbenchWcsTasksRes> {
        return await this.SendPostRequest(hc_config.urls.wms_task_close, { task_code });
    }



    public async WcsTaskFind(wcs_task_statuses: number[] = [0]): Promise<IHttpRes.IHCGetWorkbenchWcsTasksRes> {
        const params: object[] = [];
        wcs_task_statuses?.forEach(value => {
            params.push({ wcs_task_statuses: value });
        });

        return await this.SendGetRequest(hc_config.urls.wcs_task_find, params);
    }

    public async WcsTaskActivate(sub_task_code: string): Promise<IHttpRes.IHCResponse> {
        return await this.SendPostRequest(hc_config.urls.wcs_task_activate, { sub_task_code });
    }



    public async InventoryFindEmptyBoxes(params: IHttpReq.IHCInventoryFindEmptyBoxesReq = {}): Promise<IHttpRes.IHCInventoryFindEmptyBoxesRes> {
        params.page_no = params.page_no || DEFAULT_PAGE_NO;
        params.page_size = params.page_size || DEFAULT_PAGE_SIZE;
        return await this.SendGetRequest(hc_config.urls.inventory_find_empty_boxes, params);
    }

    public async InventorySummaryListGet(item_code = "", page_no = DEFAULT_PAGE_NO, page_size = DEFAULT_PAGE_SIZE): Promise<IHttpRes.IHCInventorySummaryFindRes> {
        return await this.SendGetRequest(hc_config.urls.inventory_summary_find, { item_code, page_no, page_size });
    }

    public async InventoryBoxesListGet(item_code = "", box_code = "", page_no = DEFAULT_PAGE_NO, page_size = DEFAULT_PAGE_SIZE): Promise<IHttpRes.IHCInventoryBoxesFindRes> {
        return await this.SendGetRequest(hc_config.urls.inventory_boxes_find, { item_code, box_code, page_no, page_size });
    }

    public async InventoryItemsListGet(item_code = "", box_code = "", page_no = DEFAULT_PAGE_NO, page_size = DEFAULT_PAGE_SIZE): Promise<IHttpRes.IHCInventoryItemsFindRes> {
        return await this.SendGetRequest(hc_config.urls.inventory_item_find, { item_code, box_code, page_no, page_size });
    }



    /**
     * @description 向服务器发送HTTP GET请求，并同步返回结果
     * @param path 请求路径 
     * @param params 请求参数
     * @returns 
     */
    private async SendGetRequest(path: string, params: object | [] = {}): Promise<IHttpRes.IHCResponse> {
        let url = `${hc_config.wms_server.protocol}${hc_config.wms_server.host}:${hc_config.wms_server.port}${path}`;

        if (Boolean(hc_config.debug.enable) && Boolean(hc_config.debug.enable_proxy)) {
            url = `/api${path}`;
        }

        if (params) {
            url += "?";
            url += this.JoinGetParams(params);
        }

        return await this.hc_http_client.Get(url);
    }

    /**
     * @desc 拼接GET请求参数为queryString形式
     * @param params 请求参数
     * @returns 
     */
    private JoinGetParams(params: object | []): string {
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
    private async SendPostRequest(path: string, params: { [key: string]: any } = {}): Promise<IHttpRes.IHCResponse> {
        let url = `${hc_config.wms_server.protocol}${hc_config.wms_server.host}:${hc_config.wms_server.port}${path}`;

        if (hc_config.debug.enable && hc_config.debug.enable_proxy) {
            url = `/api${path}`;
        }

        return await this.hc_http_client.Post(url, params);
    }

    /**
     * @description 向服务器发送HTTP PUT请求，并同步返回结果
     * @param path 请求路径
     * @param params 请求参数
     * @returns 
     */
    private async SendPutRequest(path: string, params: { [key: string]: any } = {}): Promise<IHttpRes.IHCResponse> {
        let url = `${hc_config.wms_server.protocol}${hc_config.wms_server.host}:${hc_config.wms_server.port}${path}`;

        if (hc_config.debug.enable && hc_config.debug.enable_proxy) {
            url = `/api${path}`;
        }

        return await this.hc_http_client.Put(url, params);
    }
}


const api = new HCApi();

export default api