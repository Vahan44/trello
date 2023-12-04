import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { BoardType, State } from "./stateInterface";

export const fetchPosts = createAsyncThunk("blog/fetchPosts", async () => {
  const querySnapshot = await getDocs(collection(db, "boards"));

  return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
});

export const fetchPost = createAsyncThunk(
  "blog/fetchPost",
  async (id: string) => {
    const postRef = doc(db, "boards", id);
    const postSnapshot = await getDoc(postRef);
    if (postSnapshot.exists()) {

      return { id: postSnapshot.id, ...postSnapshot.data() };
    } else {
      throw new Error("Boards not found");
    }
  }
);

export const createPost = createAsyncThunk(
  "blog/createPost",
  async (postData: any) => {
    const docRef = await addDoc(collection(db, "boards"), postData);
    return { id: docRef.id, ...postData };
  }
);

export const updatePost = createAsyncThunk(
  "blog/updatePost",
  async ({ id, newBoard }: { id: string; newBoard: any }) => {
    const postRef = doc(db, "boards", id);
    await updateDoc(postRef, {board: newBoard});
    return { id, newBoard };
  }
);

export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (id: any) => {
    const postRef = doc(db, "boards", id);
    await deleteDoc(postRef);
    return id;
  }
);






const initialState: State = {
  loading: false,
  error: false,
  boards: []

}

export const boardsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending as any]: (state) => {
      state.loading = true;
    },
    [fetchPosts.fulfilled as any]: (state, action) => {
      state.loading = false;
      state.boards = action.payload;
    },
    [fetchPosts.rejected as any]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [fetchPost.pending as any]: (state) => {
      state.loading = true;
    },
    [fetchPost.fulfilled as any]: (state, action) => {
      state.loading = false
      const existsPost = state.boards.find(
        (board: any) => board.id === action.payload.id
      );

      if (!existsPost) {
        state.boards.push(action.payload);
      }
    },
    [fetchPost.rejected as any]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [createPost.pending as any]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled as any]: (state, action) => {
      state.loading = false;
      state.boards.push(action.payload as any);
    },
    [createPost.rejected as any]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [updatePost.pending as any]: (state) => {
      state.loading = true;
    },
    [updatePost.fulfilled as any]: (state, action) => {
      state.loading = false;
      const index = state.boards.findIndex(
        (post: any) => post.id === action.payload.id
      );

      if (index !== -1) {
        state.boards[index] = {id: action.payload.id, board: action.payload.newBoard};
      }
    },
    [updatePost.rejected as any]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [deletePost.pending as any]: (state) => {
      state.loading = true;
    },
    [deletePost.fulfilled as any]: (state, action) => {
      state.loading = false;
      state.boards = state.boards.filter(
        (post: any) => post.id !== action.payload
      );
    },
    [deletePost.rejected as any]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  }
})

export default boardsSlice.reducer;