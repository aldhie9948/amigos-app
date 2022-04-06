import { createSlice } from "@reduxjs/toolkit";
import konsoleService from "../services/konsoleService";

const compare = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const konsolSlice = createSlice({
  name: "konsol",
  initialState: [],
  reducers: {
    setKonsol: (state, action) => {
      return action.payload.sort(compare);
    },
    addKonsol: (state, action) => {
      return [...state, action.payload].sort(compare);
    },
    removeKonsol: (state, action) => {
      const newKonsolState = state.filter((f) => f.id !== action.payload.id);
      return newKonsolState.sort(compare);
    },
    updateKonsol: (state, action) => {
      const newState = state.filter((f) => f.id !== action.payload.id);
      return [...newState, action.payload].sort(compare);
    },
  },
});

export default konsolSlice.reducer;
export const { setKonsol, addKonsol, removeKonsol, updateKonsol } =
  konsolSlice.actions;

export const initKonsol = () => {
  return async (dispatch) => {
    const response = await konsoleService.get();
    const sorted = response.sort(compare);
    dispatch(setKonsol(sorted));
  };
};

export const addUnit = (obj) => {
  return async (dispatch) => {
    const response = await konsoleService.save(obj);
    dispatch(addKonsol(response));
  };
};

export const deleteUnit = (id) => {
  return async (dispatch) => {
    const response = await konsoleService.remove(id);
    dispatch(removeKonsol(response));
  };
};

export const playUnit = (obj = {}) => {
  return async (dispatch) => {
    const response = await konsoleService.edit(obj);
    dispatch(updateKonsol(response));
  };
};
