import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const JIKAN_API_URL = 'https://api.jikan.moe/v4';
const JSON_SERVER_URL = 'http://localhost:5000';

export const fetchallAnime = createAsyncThunk(
  'anime/allAnime',
    async ({ page = 1, q = '' }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${JIKAN_API_URL}/anime?page=${page}&q=${encodeURIComponent(q)}&limit=24`
            );
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
  }
);

export const fetchsingleAnime = createAsyncThunk(
  'anime/singleAnime',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${JIKAN_API_URL}/anime/${id}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            console.log("API funziona!", data)
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
  }
);

export const fetchFeaturedAnime = createAsyncThunk(
    'anime/featuredAnime',
    async (userId , { rejectWithValue }) => {
        try {
            const response = await fetch(`${JSON_SERVER_URL}/featured`);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            const data = response.json()
            console.log("Fetch funziona!", data)
            return data;
        } catch (err) {
            console.error(err);
        }
        });
    
export const animeSlice = createSlice({
  name: 'anime',
  initialState: {
    allAnime: {data : [], pagination : {}},
    currentAnime : null,
    loading : false,
    error: null,
    featuredAnime: [],
  },

  reducers: {},
  extraReducers : (builder) => {
    builder

        //per lista anime totali
        .addCase(fetchallAnime.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchallAnime.fulfilled, (state, action) => {
            state.loading = false;
            state.allAnime = action.payload;
        })

        .addCase(fetchallAnime.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //per anime selezionato
        .addCase(fetchsingleAnime.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchsingleAnime.fulfilled, (state, action) => {
            state.loading = false;
            state.currentAnime = action.payload.data;
        })

        .addCase(fetchsingleAnime.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        //per la categoria featured
        .addCase(fetchFeaturedAnime.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchFeaturedAnime.fulfilled, (state, action) => {
            state.loading = false;
            state.featuredAnime = action.payload;
        })

        .addCase(fetchFeaturedAnime.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
  }
  },
);

  
export default animeSlice.reducer;