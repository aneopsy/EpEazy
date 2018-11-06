import { GET_PLANNING } from "./reducer";

export function getPlanning(start, end) {
  return {
    type: GET_PLANNING,
    payload: {
      request: {
        url: `planning/load?format=json&start=${start}&end=${end}`,
        timeout: 30000
      }
    }
  };
}
