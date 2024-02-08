import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import searchSlice from './searchSlice';
import chatSlice from './chatSlice';
import CategorySlice from './CategorySlice';

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
    chat: chatSlice,
    category: CategorySlice,
  },
})

export default store