import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

let store;

if (window.navigator.userAgent.includes("Chrome")) {
  store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middleware)
    )
  );
} else {
  store = createStore(rootReducer, compose(applyMiddleware(...middleware)));
}

export default store;