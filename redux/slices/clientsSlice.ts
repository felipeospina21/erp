import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, deleteDoc, updateDoc, addDoc } from "firebase/firestore/lite";
// import type { Firestore } from "firebase/firestore";
import { RootState } from "../store";

export interface CreateClientParams {
  db: any;
  newClientData: Client;
}

export interface UpdateClientParams {
  db: any;
  clientId: string;
  updatedClientData?: any;
}
export interface Client {
  id?: string;
  addres1: string;
  addres2?: string;
  city: string;
  department: string;
  discount: number | undefined;
  idNumber: string;
  idType: string;
  name: string;
}
export interface ClientsState {
  list: Client[];
  newClient: Client;
  status: null | string;
}
const initialState: ClientsState = {
  list: [],
  newClient: {
    id: "",
    addres1: "",
    addres2: undefined,
    city: "",
    department: "",
    discount: undefined,
    idNumber: "",
    idType: "",
    name: "",
  },
  status: null,
};

export const getClients = createAsyncThunk<any[] , any, { state: RootState }>(
  "clients/getClients",
  async (db) => {
    const clientsColl = collection(db, "clients");
    return getDocs(clientsColl)
      .then((snapshot) => snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      .then((clients) => clients);
  }
);

export const createClient = createAsyncThunk<Client[] | undefined, CreateClientParams, { state: RootState }>(
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

export const updateClient = createAsyncThunk<Client[] | undefined, UpdateClientParams, { state: RootState }>(
  "clients/updateClient",
  async (paramsObj, { getState }) => {
    const { db, clientId, updatedClientData } = paramsObj;
    const { clients } = getState();
    const clientsColl = collection(db, "clients");
    const docRef = doc(clientsColl, clientId);
    try {
      await updateDoc(docRef, updatedClientData);
      const updatedDoc = clients.list.filter((doc) => doc.id === clientId)[0];
      const updatedClientList = clients.list.map((client) => {
        if (client.id === updatedDoc.id) {
          client = { ...client, ...updatedClientData };
          return client;
        }
        return client;
      });
      return updatedClientList;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteClient = createAsyncThunk<Client[] | undefined, UpdateClientParams, { state: RootState }>(
  "clients/deleteClient",
  async (paramsObj, { getState }) => {
    const { db, clientId } = paramsObj;
    const { clients } = getState();
    const newClientsList = [...clients.list];
    const clientsColl = collection(db, "clients");
    const docRef = doc(clientsColl, clientId);
    try {
      await deleteDoc(docRef);
      const clientIdx = newClientsList.findIndex((element) => element.id === clientId);
      newClientsList.splice(clientIdx, 1);
      return newClientsList;
    } catch (error) {
      console.log(error);
    }
    return;
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    newClientData: (state, action) => {
      return {
        ...state,
        newClient: { ...state.newClient, ...action.payload },
      };
    },
    resetNewClientData: (state) => {
      return {
        ...state,
        newClient: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(createClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createClient.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload ?? [];
      })
      .addCase(deleteClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteClient.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload ?? [];
      })
      .addCase(updateClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateClient.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload ?? [];
      });
  },
});

export const { newClientData, resetNewClientData } = clientsSlice.actions;
export const selectClients = (state: RootState): ClientsState => state.clients;
export default clientsSlice.reducer;
