import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // your slices
  },
});

export default store; // ✅ default export
