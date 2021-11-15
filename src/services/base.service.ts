import axios, { AxiosRequestConfig } from 'axios';
import { repository } from './repository';

export type PaginationQuery = {
  page: number;
  per_page: number;
  sort_by: 'created_at' | 'updated_at';
  sort_order: 'asc' | 'desc';
};

const defaultQuery: PaginationQuery = {
  page: 1,
  per_page: 10,
  sort_by: 'created_at',
  sort_order: 'desc',
};

export class BaseRepository<RequestType, ResponseType> {
  resource: string = '';
  _repository = repository;

  async get(): Promise<ResponseType[]> {
    return (await this._repository.get(`${this.resource} `)).data;
  }

  async getWithPagination(query: Partial<PaginationQuery>): Promise<ResponseType[]> {
    return (await this._repository.get(`${this.resource}/${objToQuery({ ...defaultQuery, ...query })}`)).data;
  }

  async getOne(id: string): Promise<ResponseType> {
    return (await this._repository.get(`${this.resource}/${id}`)).data;
  }

  async getWithCustomQuery(obj: Object): Promise<ResponseType[]> {
    return (await this._repository.get(`${this.resource}${objToQuery(obj)}`)).data;
  }

  async create(body: RequestType): Promise<any> {
    return (await this._repository.post(`${this.resource}`, body)).data;
  }

  async update(id: string, data: RequestType): Promise<any> {
    return (await this._repository.put(`${this.resource}/${id}`, data)).data;
  }

  async delete(id: string): Promise<any> {
    return (await this._repository.delete(`${this.resource}/${id}`)).data;
  }

  async customRequest(config: AxiosRequestConfig<any>): Promise<any> {
    return axios(config);
  }
}

// HElper function
const objToQuery = (obj: any): string => {
  return new URLSearchParams(obj).toString();
};
