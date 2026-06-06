import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const JSON_SERVER_URL = 'http://localhost:5000'

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

export const login = createAsyncThunk(
  'login/access',
  async (credentials, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        email: credentials.email,
        password: credentials.password,
      });
      const response = await fetch(`${JSON_SERVER_URL}/users?${params}`);
      console.log("Dentro al login")

      if (!response.ok) {
        return rejectWithValue(`Request failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.length > 0) {
        console.log("Utente trovato")
        const user = data[0];
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } else {
        return rejectWithValue('Invalid email or password');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: getStoredUser(),
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      state.error = null;
    }
  },
  extraReducers : (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
}
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;