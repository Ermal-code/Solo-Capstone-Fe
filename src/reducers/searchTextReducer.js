export default function (state = {}, action) {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return action.payload;
    case "UNSET_SEARCH_TEXT":
      return "";
    default:
      return state;
  }
}
