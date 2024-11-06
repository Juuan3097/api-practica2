import { test, APIRequestContext, request } from "@playwright/test";
import { GetApi } from "../pom/pages/getPage";
let apiRequestContext: APIRequestContext;

test.describe("DBZ Api Testing", () => {
  test.beforeAll(async ({}) => {
    apiRequestContext = await request.newContext({
      baseURL: "https://dragonball-api.com/api",
    });
  });
  test("Primer API", { tag: "@API" }, async ({}) => {
    const getApi = new GetApi(apiRequestContext);
    const endpoint = process.env.API_CHARACTERS!;
    const getPlanet = await getApi.getAPI(endpoint);
    const status = await getPlanet.apiResponse;
    const body = await getPlanet.body;
    console.log("Status:");
    console.log(status);
    console.log("Body:");
    console.log(body);
  });
});
