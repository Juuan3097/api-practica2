import { expect, APIRequestContext, APIResponse } from "@playwright/test";
import { z } from "zod";

export class GetAPIChecker {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async validateOkResponse(apiResponse: APIResponse) {
    expect(await apiResponse).toBeOK();
  }

  async validateNotOkResponse(apiResponse: APIResponse) {
    expect(await apiResponse).not.toBeOK();
  }

  async validatePlanetSchema(bodyElement: object) {
    if (Array.isArray(bodyElement)) {
      const bodyResponse = z
        .object({
          id: z.number(),
          name: z.string(),
          isDestroyed: z.boolean(),
          description: z.string(),
          image: z.string(),
          deletedAt: z.null(),
          characters: z.object({}).array().optional(),
        })
        .array();
      await bodyResponse.parse(bodyElement);
    } else {
      const bodyResponse = z.object({
        id: z.number(),
        name: z.string(),
        isDestroyed: z.boolean(),
        description: z.string(),
        image: z.string(),
        deletedAt: z.null(),
        characters: z.object({}).array().optional(),
      });
      await bodyResponse.parse(bodyElement);
    }
  }

  async validateCharacters(characters: []) {
    if (characters.length === 0) {
      console.log("No characters found");
    } else {
      const characterSchema = z
        .object({
          id: z.number(),
          name: z.string(),
          ki: z.string(),
          maxKi: z.string(),
          race: z.string(),
          gender: z.string(),
          description: z.string(),
          image: z.string(),
          affiliation: z.string(),
          deletedAt: z.null(),
        })
        .array();
      await characterSchema.parse(characters);
    }
  }

  async validateCharacter(characters: []) {
    if (characters.length === 0) {
      console.log("No characters found");
    } else {
      const characterSchema = z.object({
        id: z.number(),
        name: z.string(),
        ki: z.string(),
        maxKi: z.string(),
        race: z.string(),
        gender: z.string(),
        description: z.string(),
        image: z.string(),
        affiliation: z.string(),
        deletedAt: z.null(),
        originPlanet: z.object({
          id: z.number(),
          name: z.string(),
          isDestroyed: z.boolean(),
          description: z.string(),
          image: z.string(),
          deletedAt: z.null(),
        }),
        transformation: z.object({}).array().optional(),
      });
      await characterSchema.parse(characters);
    }
  }

  async validateTransformation(transformation: []) {
    if (transformation.length === 0) {
      console.log("This character does not have any transformation");
    } else {
      const transformationSchema = z
        .object({
          id: z.number(),
          name: z.string(),
          image: z.string(),
          ki: z.string(),
          deletedAt: z.null(),
        })
        .array();
      await transformationSchema.parse(transformation);
    }
  }
}
