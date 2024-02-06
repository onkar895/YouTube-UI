import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT } from "./constants";

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: []
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.splice(LIVE_CHAT_COUNT, 1)
      state.messages.unshift(action.payload)
      // updates the state by pushing the payload property of the action object into the messages array in the state.
    },
  },
})
// Overall, this reducer function handles the action of adding a new message to the state. When dispatched, it appends the new message to the existing list of messages in the state.

export const { addMessage } = chatSlice.actions
export default chatSlice.reducer