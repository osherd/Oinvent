import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loggerMiddleware } from '../middleware/logger';
import { rootReducer } from '../reducer/root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [ 'auth' ]
};
const persistedReducer = persistReducer( persistConfig, rootReducer );
const composedEnhance = ( process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose;
const middleWare = [ process.env.NODE_ENV !== 'production' && loggerMiddleware ].filter( Boolean );
const composedEnhancers = composedEnhance( applyMiddleware( ...middleWare ) );

export const store = createStore( persistedReducer, undefined, composedEnhancers );
export const persistore = persistStore( store );
