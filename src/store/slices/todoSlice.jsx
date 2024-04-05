import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload)
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter(item => action.payload !== item.id)
    },
    editTodo: (state, action) => {
      state.list = state.list.map((item) => {
        if(action.payload.id === item.id){
          item.title = action.payload.title
        }
        return item
      })
    },
    changeChecked: (state, action) => {
      state.list = state.list.map((item) => {
        if(action.payload === item.id){
          item.status = !item.status
        }
        return item
      })
    },
  },
})

export const { addTodo, deleteTodo, editTodo, changeChecked } = todoSlice.actions

export default todoSlice.reducer