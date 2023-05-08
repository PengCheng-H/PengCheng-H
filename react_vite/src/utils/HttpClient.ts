export default class HCHttpClient {
    public SendGetRequest(url: string): Promise<any> {
        return fetch(url, { method: 'GET', })
            .then(res => res.json());
    }

    public SendPostRequest(url: string, params?: any): Promise<any> {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json());
    }
}