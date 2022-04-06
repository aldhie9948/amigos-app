import { createSlice } from "@reduxjs/toolkit";
import menuService from "../services/menuService";

const menuSlice = createSlice({
  name: "menu",
  initialState: [],
  reducers: {
    setMenu: (state, action) => {
      return action.payload;
    },
    addMenu: (state, action) => {
      return [...state, action.payload];
    },
    removeMenu: (state, action) => {
      const deletedMenu = state.filter((f) => f.id !== action.payload.id);
      return deletedMenu;
    },
    editMenu: (state, action) => {
      const updatedMenu = state.filter((f) => f.id !== action.payload.id);
      return [...updatedMenu, action.payload];
    },
  },
});

export default menuSlice.reducer;
export const { setMenu, addMenu, removeMenu, editMenu } = menuSlice.actions;

export const initMenuList = () => {
  return async (dispatch) => {
    const response = await menuService.get();
    dispatch(setMenu(response));
  };
};

export const createMenu = (menu) => {
  return async (dispatch) => {
    const response = await menuService.save(menu);
    dispatch(addMenu(response));
  };
};

export const deleteMenu = (id) => {
  return async (dispatch) => {
    const response = await menuService.remove(id);
    dispatch(removeMenu(response));
  };
};

export const updateMenu = (menu) => {
  return async (dispatch) => {
    const response = await menuService.update(menu);
    dispatch(editMenu(response));
  };
};
