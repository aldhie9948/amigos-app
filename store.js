import { configureStore } from '@reduxjs/toolkit';
import konsolReducer from './reducers/konsolReducer';
import menuReducer from './reducers/menuReducer';
import laporanReducer from './reducers/laporanReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    konsol: konsolReducer,
    menu: menuReducer,
    laporan: laporanReducer,
    user: userReducer,
  },
});

export default store;
