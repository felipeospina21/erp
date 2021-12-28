import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc, addDoc } from "firebase/firestore/lite";

const initialState = {
  list: [],
  status: null,
};

export const getClients = createAsyncThunk("clients/getClients", async db => {
  const clientsColl = collection(db, "clients");
  return getDocs(clientsColl)
    .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    .then(clients => clients);
});

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (paramsObj, { getState }) => {
    const { clients } = getState();
    const newClientsList = [...clients.list];
    const { db, clientObj } = paramsObj;
    const clientsColl = collection(db, "clients");
    try {
      const newDoc = await addDoc(clientsColl, clientObj);
      newClientsList.push({ ...clientObj, id: newDoc.id });
      return newClientsList;
    } catch (error) {
      console.log(error);
    }
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getClients.pending, state => {
        state.status = "loading";
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(createClient.pending, state => {
        state.status = "loading";
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      });
  },
});

export const { extraReducers } = clientsSlice.actions;
export default clientsSlice.reducer;
