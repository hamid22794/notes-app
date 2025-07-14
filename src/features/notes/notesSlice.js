import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  searchTerm: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push({
        id: Date.now(),
        title: action.payload.title,
      });
    },
    editNote: (state, action) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index].title = action.payload.title;
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    clearNotes: (state) => {
      state.notes = [];
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addNote, editNote, deleteNote, clearNotes, setSearchTerm } = notesSlice.actions;
export default notesSlice.reducer;