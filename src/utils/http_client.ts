export default class HCHttpClient {
    public SendGetRequest(url: string): any {
        return fetch(url, {
            method: 'GET',
        }).then(res => res.json());
    }

    public SendPostRequest(url: string, params?: any): any {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(params)
        }).then(res => res.json());
    }
}