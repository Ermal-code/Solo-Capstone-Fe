import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer";
import searchTextReducer from "../reducers/searchTextReducer";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  user: null,
  searchText: "",
};

const allReducers = combineReducers({
  user: userReducer,
  searchText: searchTextReducer,
});

export default function configureStore() {
  return createStore(
    allReducers,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  );
}
