import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";

const persistConfig = {
	key: "OB",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
