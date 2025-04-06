
/**
 * This is the service that invokees Restful endpoints for Advocate resources
 */
export const AdvocatesAPI = {
  search: async function (q: string) {
    try {

      const response = await fetch(`/api/advocates?q=${q}`);
      const responseJson = await response.json();
      return responseJson.data;
    } catch (e: any) {
      throw e;
    }
  },
};
