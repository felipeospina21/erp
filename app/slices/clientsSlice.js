import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc, addDoc } from "firebase/firestore/lite";

const initialState = {
  list: [],
  newClient: {},
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
    const { db, newClientData } = paramsObj;
    const { clients } = getState();
    const newClientsList = [...clients.list];
    const clientsColl = collection(db, "clients");
    try {
      const newDoc = await addDoc(clientsColl, newClientData);
      newClientsList.push({ ...newClientData, id: newDoc.id });
      return newClientsList;
    } catch (error) {
      console.log(error);
    }
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    createNewClient: (state, action) => {
      // const {payload} = action
      return {
        ...state,
        newClient: {...state.newClient, ...action.payload},
      };
    },
  },
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
      .addCase(createClient.rejected, state => {
        state.status = "rejected";
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      });
  },
});

export const { extraReducers, createNewClient } = clientsSlice.actions;
export default clientsSlice.reducer;
