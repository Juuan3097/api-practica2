import { APIRequestContext } from "@playwright/test";

export class GetApi{
    request: APIRequestContext;

    constructor(request: APIRequestContext) {
      this.request = request;
    }
  
    async getAPI(endpoint: string) {
      const apiResponse = await this.request.get(`${endpoint}`);
      const body = await apiResponse.json();
      
      return { apiResponse, body };
    }
}