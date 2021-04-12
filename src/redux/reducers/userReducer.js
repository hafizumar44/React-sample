import { AUTHENTICATE, LOGOUT, UPDATE_USER_PROFILE } from "../types";

const initialState = {
  isLoggedIn: false,
  data: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE:
      return Object.assign({}, state, {
        isLoggedIn: true,
        data: { ...state.data, ...payload },
      });

    case UPDATE_USER_PROFILE:
      return Object.assign({}, state, {
        data: {
          ...state.data,
          ...payload,
        },
      });
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
