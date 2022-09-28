import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    personalInfo: {},
    favoritePoke: {},
    isPersonalInfoDone: false,
    isPersonalInfoSaved: false,
    isFavPokeDone: false,
  },
  reducers: {
    updatePersonalInfo: (state, action) => {
      const { firstName, lastName, phoneNumber, address, email } =
        action.payload;
      state.personalInfo.firstName = firstName || '';
      state.personalInfo.lastName = lastName || '';
      state.personalInfo.phoneNumber = phoneNumber || '';
      state.personalInfo.address = address || '';
      state.personalInfo.email = email || '';
      state.isPersonalInfoSaved = true;
      state.isPersonalInfoDone = false;
      localStorage.setItem('userRegistrationState', JSON.stringify(state));
    },
    setPersonalInfoDone: (state, action) => {
      state.isPersonalInfoDone = true;
      localStorage.setItem('userRegistrationState', JSON.stringify(state));
    },
    updateFavoritePoke: (state, action) => {
      state.favoritePoke = action.payload;
      localStorage.setItem('userRegistrationState', JSON.stringify(state));
    },
    setFavPokeDone: (state, action) => {
      state.isFavPokeDone = action.payload;
    },
    flashSavedUserState: (state, action) => {
      state.personalInfo = action.payload.personalInfo;
      state.favoritePoke = action.payload.favoritePoke;
      state.isPersonalInfoDone = action.payload.isPersonalInfoDone;
      state.isFavPokeDone = action.payload.isFavPokeDone;
      state.isPersonalInfoSaved = action.payload.isPersonalInfoSaved;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updatePersonalInfo,
  updateFavoritePoke,
  setPersonalInfoDone,
  setFavPokeDone,
  flashSavedUserState,
} = userSlice.actions;

export default userSlice.reducer;
