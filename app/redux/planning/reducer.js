export const GET_PLANNING = "GET_PLANNING";
export const GET_PLANNING_SUCCESS = "GET_PLANNING_SUCCESS";
export const GET_PLANNING_FAIL = "GET_PLANNING_FAIL";

export default function reducer(
  state = {
    planning: []
  },
  action
) {
  switch (action.type) {
    case GET_PLANNING:
      return {
        ...state,
        loading: true
      };
    case GET_PLANNING_SUCCESS: {
      return {
        ...state,
        loading: false,
        planning: action.payload.data
      };
    }
    case GET_PLANNING_FAIL:
      return {
        ...state,
        loading: false,
        error: "Error while fetching notification message"
      };
    default:
      return state;
  }
}
