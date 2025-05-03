import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function (_, { rejectWithValue }) {
    try {
      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };
      const addressObj = await getAddress(position);
      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

      return { position, address };
    } catch (error) {
      return rejectWithValue(
        'Failed to get Address. please make sure to fill this correctly',
      );
    }
  },
);

const savedData = localStorage.getItem('user');
const storedUser = savedData ? JSON.parse(savedData) : null;
const initialState = storedUser
  ? {
      user: {
        username: storedUser.username,
        phone: storedUser.phone,
        address: storedUser.address,
        position: storedUser.position,
      },
      status: 'idle',
      error: '',
    }
  : {
      user: {
        username: '',
        phone: '',
        address: '',
        position: {},
      },
      status: 'idle',
      error: '',
    };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.user.username = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    updateUser: {
      prepare(name, phone, address) {
        return { payload: { name, phone, address } };
      },
      reducer(state, action) {
        state.user.username = action.payload.name;
        state.user.phone = action.payload.phone;
        state.user.address = action.payload.address;
        state.error = '';
        state.status = 'idle';
        localStorage.setItem('user', JSON.stringify(action.payload));
      },
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.user.position = action.payload.position;
        state.user.address = action.payload.address;
        state.status = 'idle';
        state.error = '';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.user.address = '';
        state.error = action.payload;
      })
      .addMatcher(
        (action) => action.type.startsWith('user/'),
        (state) => {
          localStorage.setItem('user', JSON.stringify(state.user));
        },
      ),
});

export default userSlice.reducer;
export const { updateName, updateUser } = userSlice.actions;
export const getUser = (state) => state.user.user;
export const getStatus = (state) => state.user.status;
export const getError = (state) => state.user.error;
export { fetchAddress };
