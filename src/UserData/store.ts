// import { configureStore } from "@reduxjs/toolkit";
// import UserReducer from './UserData'
// export const store = configureStore({
//     reducer: UserReducer
// })


// export type RootState = ReturnType<typeof store.getState>


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer, workspacesReducer } from './UserSlice';

const rootReducer = combineReducers({
    user: userReducer,
    workspaces: workspacesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
