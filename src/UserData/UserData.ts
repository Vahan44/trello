import {onAuthStateChanged, signOut, User} from 'firebase/auth'
import { auth } from '../firebase'

import {createSlice, PayloadAction} from "@reduxjs/toolkit"
interface Board {
    'To do': string[];
    'Doing': string[];
    'Done': string[];
  }
  
  interface Boards {
    [boardName: string]: Board;
  }


interface userState {
    user: User | null;
    workspaces: {
        [key: string]: {
        name: string,
        img: string,
        boards: Boards
    }
        
    }
}

const initialState: userState = {
    user : null,
    workspaces: {}
}

export const userSlice = createSlice({
    
    name: 'userData', 
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
})


export const workspacesSlice = createSlice({
    
    name: 'workspacesData', 
    initialState,
    reducers: {
        setWorkspaces: (state, action) => {
            state.workspaces = action.payload
        }
    },
})

export const {setUser} = userSlice.actions
export const { setWorkspaces } = workspacesSlice.actions;

export const userReducer = userSlice.reducer;
export const workspacesReducer = workspacesSlice.reducer;