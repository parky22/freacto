import axios from 'axios';

// constants
const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER';
const CLEAR_LOGGED_IN_USER = 'CLEAR_LOGGED_IN_USER';

// sync action creators
export const setLoggedInUser = (foundUser) => ({
  type: SET_LOGGEDIN_USER,
  foundUser
});

export const clearLoggedInUser = () => ({
  type: CLEAR_LOGGED_IN_USER
});


// async action creators
export const findOrCreateUser = userDetails => dispatch => {
  return axios.post('/api/user', userDetails)
  .then(res => res.data)
  .then(foundUser => {
    dispatch(setLoggedInUser(foundUser));
  });
};

// login reducer
const reducer = (state = {}, { type, foundUser }) => {
  switch (type) {
    case SET_LOGGEDIN_USER:
      return foundUser;
    case CLEAR_LOGGED_IN_USER:
      return {};
    default:
      return state;
  }
};

export default reducer;
