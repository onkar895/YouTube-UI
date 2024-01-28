import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: 'search',
  initialState: {

  },
  reducers: {
    cacheResults: (state, action) => {
      // Using Object.assign to merge the current state with the payload just like spread in ES6
      // state = {...state, ...action.payload}
      state = Object.assign(state, action.payload)
    }
  }
})

export const { cacheResults } = searchSlice.actions
export default searchSlice.reducer