import { createStore, combineReducers } from 'redux';
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['runnings']
};

const rootReducer = combineReducers({
    reducer: persistReducer(persistConfig, reducer)
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);