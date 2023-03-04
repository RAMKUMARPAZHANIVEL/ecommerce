import {combineReducers} from 'redux'
import { createStore,applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';

import cartReducer from './reducers/cartReducer'
import userReducer from './reducers/userReducer'
import AuthReducer from './reducers/authReducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const store = createStore(combineReducers({
  cart : cartReducer,
  user : userReducer,
  auth : AuthReducer
}))
 
const rootReducer = combineReducers({

})

const persistConfig = {
   key: 'root',
   storage,
 }
  
 const persistedReducer = persistReducer(persistConfig, rootReducer)
  
//  const store = createStore(
//    persistedReducer,
//    composeWithDevTools()
//  )
//  export const persistor = persistStore(store);


export default store;