import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const flightsSlice = createSlice({
  name: 'flights',
  initialState: {
    data: [],
  },
  reducers: {},
});

export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async () => {
    const response = await axios.get(
      'https://5e5cf5eb97d2ea0014796f01.mockapi.io/api/v1/airport'
    );

    return response.data;
  }
);

export default flightsSlice.reducer;
