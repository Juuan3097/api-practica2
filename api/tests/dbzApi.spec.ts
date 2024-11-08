import { test, APIRequestContext, request } from "@playwright/test";
import { GetApi } from "../pom/pages/getPage";
import { GetAPIChecker } from "../pom/checker/getChecker";
let apiRequestContext: APIRequestContext;

test.describe("DBZ Api Testing", () => {
  test.beforeAll(async ({}) => {
    apiRequestContext = await request.newContext({
      baseURL: "https://dragonball-api.com/api/",
    });
  });
  test("get Planets", { tag: "@API" }, async ({}) => {
    const getApi = new GetApi(apiRequestContext);
    const getChecker = new GetAPIChecker(apiRequestContext);
    const endpoint = process.env.API_PLANETS!;
    const getPlanet = await getApi.getAPI(endpoint);
    const status = await getPlanet.apiResponse;
    const body = await getPlanet.body;
    const items = body.items;
    console.log("Body: ");
    console.log(items);
    await getChecker.validatePlanetSchema(items);
  });
  test("get Planets with characters by ID", { tag: "@API" }, async ({}) => {
    const getApi = new GetApi(apiRequestContext);
    const getChecker = new GetAPIChecker(apiRequestContext);
    const endpoint = process.env.API_PLANETS_WC_ID!;
    const id = process.env.API_PLANETS_ID!;
    const endpointID = endpoint + id;
    const getPlanet = await getApi.getAPI(endpointID);
    const status = await getPlanet.apiResponse;
    const body = await getPlanet.body;
    const characters = body.characters;
    console.log("Status:");
    console.log(status);
    console.log("Body");
    console.log(body);
    await getChecker.validatePlanetSchema(body);
    await getChecker.validateCharacters(characters);
  });
  test("get Planets without characters by ID", { tag: "@API" }, async ({}) => {
    const getApi = new GetApi(apiRequestContext);
    const getChecker = new GetAPIChecker(apiRequestContext);
    const endpoint = process.env.API_PLANETS_WOC_ID!;
    const id = process.env.API_PLANETS_ID!;
    const endpointID = endpoint + id;
    const getPlanet = await getApi.getAPI(endpointID);
    const status = await getPlanet.apiResponse;
    const body = await getPlanet.body;
    const characters = body.characters;
    console.log("Status:");
    console.log(status);
    console.log("Body");
    console.log(body);
    await getChecker.validatePlanetSchema(body);
    await getChecker.validateCharacters(characters);
  });
  test("get Characters", { tag: "@API" }, async ({}) => {
    const getApi = new GetApi(apiRequestContext);
    const getChecker = new GetAPIChecker(apiRequestContext);
    const endpoint = process.env.API_CHARACTERS!;
    const getCharacters = await getApi.getAPI(endpoint);
    const status = await getCharacters.apiResponse;
    const body = await getCharacters.body;
    const items = body.items;
    console.log("Items: ");
    console.log(items);
    await getChecker.validateCharacters(items);
  });
  test.only(
    "get Characters with transformation by Id",
    { tag: "@API" },
    async ({}) => {
      const getApi = new GetApi(apiRequestContext);
      const getChecker = new GetAPIChecker(apiRequestContext);
      const endpoint = process.env.API_CHARACTERS_WT_ID!;
      const id = process.env.API_CHARACTERS_ID!;
      const endpointID = endpoint + id;
      const getPlanet = await getApi.getAPI(endpointID);
      const status = await getPlanet.apiResponse;
      const body = await getPlanet.body;
      const transformations = body.transformations;
      await getChecker.validateCharacter(body);
      await getChecker.validateTransformation(transformations);
    }
  );
  test(
    "get Characters without transformation by Id",
    { tag: "@API" },
    async ({}) => {
      const getApi = new GetApi(apiRequestContext);
      const getChecker = new GetAPIChecker(apiRequestContext);
      const endpoint = process.env.API_CHARACTERS_WOT_ID!;
      const id = process.env.API_CHARACTERS_ID!;
      const endpointID = endpoint + id;
      const getPlanet = await getApi.getAPI(endpointID);
      const status = await getPlanet.apiResponse;
      const body = await getPlanet.body;
      const transformations = body.transformations;
      await getChecker.validateCharacter(body);
      await getChecker.validateTransformation(transformations);
    }
  );
});
