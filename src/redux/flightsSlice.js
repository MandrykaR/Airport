import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async () => {
    const response = await axios.get(
      'https://5e5cf5eb97d2ea0014796f01.mockapi.io/api/v1/airport'
    );

    return response.data;
  }
);

const flightsSlice = createSlice({
  name: 'flights',
  initialState: {
    data: [],
    loadingStatus: 'idle',
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loadingStatus = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default flightsSlice.reducer;
