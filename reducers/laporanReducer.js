import { createSlice } from "@reduxjs/toolkit";
import laporanService from "../services/laporanService";

const laporanSlice = createSlice({
  name: "laporan",
  initialState: [],
  reducers: {
    setLaporan: (state, action) => {
      return action.payload;
    },
    addLaporan: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export default laporanSlice.reducer;
export const { setLaporan, addLaporan } = laporanSlice.actions;

export const initLaporan = () => {
  return async (dispatch) => {
    const res = await laporanService.get();
    dispatch(setLaporan(res));
  };
};

export const saveLaporan = (obj) => {
  return async (dispatch) => {
    const res = await laporanService.save(obj);
    dispatch(addLaporan(res));
  };
};
