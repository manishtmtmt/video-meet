import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";

const baseUrl = import.meta.env.VITE_100MS_BASE_URL;
const authToken = import.meta.env.VITE_100MS_AUTH_TOKEN;
const templateId = import.meta.env.VITE_100MS_TEMPLATE_ID;

const initialState = {
  isLoading: { createRoom: false, retrieveRoomCode: false },
  error: null,
  createRoomResponse: null,
  retrieveRoomCodeResponse: null,
};

export const createRoom = createAsyncThunk("api/createRoom", async () => {
  try {
    const { data } = await axios({
      url: `${baseUrl}v2/rooms`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      data: {
        name: `new-room-${uuidV4()}`,
        description: "This is a simple description for the room.",
        template_id: templateId,
      },
    });
    return data;
  } catch (error) {
    console.log("ERROR while creating room", error);
    throw new Error(error.message);
  }
});

export const retrieveRoomCode = createAsyncThunk(
  "api/getRoomCode",
  async (roomId) => {
    try {
      const { data } = await axios({
        url: `${baseUrl}v2/room-codes/room/${roomId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      console.log("ERROR while retrieving room codes", error);
      throw new Error(error.message);
    }
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRoom.pending, (state) => {
      state.isLoading.createRoom = true;
    });
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.isLoading.createRoom = false;
      state.createRoomResponse = action.payload;
      state.error = null;
    });
    builder.addCase(createRoom.rejected, (state, action) => {
      state.isLoading.createRoom = false;
      state.error = action.error.message;
    });
    builder.addCase(retrieveRoomCode.pending, (state) => {
      state.isLoading.retrieveRoomCode = true;
    });
    builder.addCase(retrieveRoomCode.fulfilled, (state, action) => {
      state.isLoading.retrieveRoomCode = false;
      state.retrieveRoomCodeResponse = action.payload;
      state.error = null;
    });
    builder.addCase(retrieveRoomCode.rejected, (state, action) => {
      state.isLoading.retrieveRoomCode = false;
      state.error = action.error.message;
    });
  },
});

export default roomSlice.reducer;
