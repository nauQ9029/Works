import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuizQuestions = createAsyncThunk('quiz/fetchQuestions', async () => {
  const response = await axios.get('http://localhost:3001/questions');
  return response.data;
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: [],
    userAnswers: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    setUserAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.userAnswers[questionId] = answer;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUserAnswer } = quizSlice.actions;
export default quizSlice.reducer;