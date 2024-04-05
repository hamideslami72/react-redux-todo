import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [
      {
        "title": "title 1",
        "status": false,
        "id": "1"
      },
  ],
  },
  reducers: {
    addTodo: (state, action) => {
      state.value.push(action.payload)
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTodo } = todoSlice.actions

export default todoSlice.reducer