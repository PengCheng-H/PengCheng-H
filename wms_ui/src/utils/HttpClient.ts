export default class HCHttpClient {
    public Get(url: string): Promise<any> {
        return fetch(url, { method: 'GET', })
            .then(res => res.json());
    }

    public Post(url: string, params?: any): Promise<any> {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json());
    }

    public Put(url: string, params?: any): Promise<any> {
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json());
    }
}