import {GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"


interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}


export const signInWithEmailPassword = createAsyncThunk(
    'user.signinWithMailPassword',
    async ([email, password]: string[]) => {

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)


        console.log(userCredential);
        const userData: User = {
            uid:  userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            photoURL: userCredential.user.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW6M4NWghKPuAh1lEjThjCMcdSp9cn029guiwej3QjFg&s'
        }
        localStorage.setItem('userData', JSON.stringify(userData))

        return userData;
        
        } catch (error) {
            console.log(error)
        }
      

       
         

    }
    )

    export const signUpWithMailPassword = createAsyncThunk(
        'user.signUpWithMailPassword',
        async ([email, password, nicname]: string[]) => {
            createUserWithEmailAndPassword(auth, email, password)
              .then(async (userCredential) => {

                

                await updateProfile(userCredential.user, { displayName: nicname });
                console.log(userCredential);
                
              })
              .catch((error) => {
                console.log(error);
              });
            }
    )
export const loginWithGoogle = createAsyncThunk(
    'user/loginWithGoogle',
    async (_, { rejectWithValue }) => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            const userData: User = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
            }
            localStorage.setItem('userData', JSON.stringify(userData))

            return userData;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            } else {
                rejectWithValue('My Error message');
            }
        }
    }
)


export const loginWithGithub = createAsyncThunk(
    "user/signinWithGithub",
        async (_, { rejectWithValue }) => {
            try {
                const GithubProvider = new GithubAuthProvider();
                const result = await signInWithPopup(auth, GithubProvider);
                
                const userData: User = {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                }
                localStorage.setItem('userData', JSON.stringify(userData))
                return userData;
            } catch (error) {
                if (error instanceof Error) {
                    return rejectWithValue(error.message)
                } else {
                    rejectWithValue('My Error message');
                }
            }
        }
    )
    
    // export const unsubscribe = createAsyncThunk(
    //     'user/unsubscribe',
    //     async () => {
    //         onAuthStateChanged(auth, currentUser => {

    //             return currentUser
    //           })
    //     }
    // )


  
export const handleSingOut = createAsyncThunk(
    "user/handleSignout",
    async () => {
            localStorage.removeItem("userData")

    }
) 


export const autoLogIn = createAsyncThunk(
    "user/autoLogin",
    async () => {
        let userData = JSON.parse(localStorage.getItem("userData") || 'null');
        if (!userData){
            return null
        }
        return userData
    }
)
interface State {
    loading: boolean,
    error: string | null,
    profile: User | null
}

const initialState: State = {
    loading: false,
    error: null,
    profile: JSON.parse(localStorage.getItem('userData') || 'null')
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [signInWithEmailPassword.pending as any]: (state, action) => {
            state.loading = true;
        },
        [signInWithEmailPassword.fulfilled as any]: (state, action) => {
            state.loading = false;
            state.profile = action.payload;
            
        },
        [signInWithEmailPassword.rejected as any]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [handleSingOut.fulfilled as any]: (state) => {
            state.profile = null
        },
        [autoLogIn.fulfilled as any]: (state, action) => {
            state.profile = action.payload;
        },
        [loginWithGoogle.pending as any]: (state) => {
            state.loading = true;
        },
        [loginWithGoogle.fulfilled as any]: (state, action) => {
            state.loading = false;
            state.profile = action.payload;
         },
        [loginWithGoogle.rejected as any]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [loginWithGithub.pending as any]: (state) => {
            state.loading = true;
        },
        [loginWithGithub.fulfilled as any]: (state, action) => {
            state.loading = false;
            state.profile = action.payload;
         },
        [loginWithGithub.rejected as any]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
    }
})

export default userSlice.reducer;