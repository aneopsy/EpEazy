import { createStore, applyMiddleware, combineReducers} from "redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import reducers from "./reducers";

const client = axios.create({
  baseURL: "https://intra.epitech.eu",
  responseType: "json"
});

const options = {
  returnRejectedPromiseOnError: true,
  interceptors: {
      request: [
          ({ getState, dispatch }, config) => {
            return config
          }
      ],
      response: [
      {
        success: ({ dispatch }, response) => {
          return response
        },
        error: ({ dispatch }, error) => {
          return Promise.reject(error)
        }
      }
    ]
  }
}

const loginPersistConfig = {
  key: 'Login',
  storage: storage,
  blacklist: ['isLoggingIn'],
};

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
 };

const reducer = combineReducers({...reducers, Login: persistReducer(loginPersistConfig, reducers.Login)});
const pReducer = persistReducer(persistConfig, reducer);

export const store = createStore(pReducer, composeWithDevTools(applyMiddleware(axiosMiddleware(client, options))));
export const persistor = persistStore(store);
persistor.purge()
