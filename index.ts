import axios from 'axios';

interface FetchFromAPIRepository {
    getTotal(): Promise<number>;
    getAll(): Promise<any>;
}

class EasyBrokerDataSource implements FetchFromAPIRepository {
    public async getTotal(): Promise<number> {
        let page = 1;
        let instance = await this.getAxiosInstance();
        let data = await instance.get(`https://api.stagingeb.com/v1/properties?page=${page}&limit=20`);
        return data.data.pagination.total
    }
    public async getAll(): Promise<any> {
        let i = 1;
        let titles = [];
        let instance = await this.getAxiosInstance();
        let data = await instance.get(`https://api.stagingeb.com/v1/properties?page=${i}&limit=20`);
        
        for(let j = 0; j < data.data.content.length; j++){
            titles.push(data.data.content[j].title)
        }
        
        while(data.data.pagination.next_page != null){
            data = await instance.get(data.data.pagination.next_page)
            for(let j = 0; j < data.data.content.length; j++){
                titles.push(data.data.content[j].title)
            }
        }
        return titles;
    }
    private async getAxiosInstance(){
        return axios.create({
            headers: {
                'X-Authorization': 'l7u502p8v46ba3ppgvj5y2aad50lb9'
            }
        });
    }
}

export default EasyBrokerDataSource;