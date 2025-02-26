/* eslint-disable no-unused-vars */
//applyMiddleware e funkcija od Redux shto ovozmozuva da rabotis so middleware 3rd party bibilopteki
//vo ovoj proekt rabotis so Redux thunk
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";

//Devtools
import { composeWithDevTools } from "redux-devtools-extension";

import accountReducer from "./features/account/accountSlice.js";
import customerReducer from "./features/customers/customerSlice.js";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//Bez thunk i dev tools
// const store = createStore(rootReducer);

//So thunk i Bez devtools
// const store = createStore(rootReducer, applyMiddleware(thunk));

//So devtools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
