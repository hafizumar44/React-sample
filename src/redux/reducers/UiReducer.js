import { SET_SUBMITTING, SET_LOADING, UNSET_LOADING, SUCCESS } from "../types";

const initialState = {
  loading: false,
  isSubmitting: false,
  success: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return Object.assign({}, state, {
        loading: true,
      });
    case UNSET_LOADING:
      return Object.assign({}, state, {
        loading: false,
      });
    case SET_SUBMITTING:
      return Object.assign({}, state, {
        isSubmitting: payload,
      });
    case SUCCESS:
      return Object.assign({}, state, {
        success: payload,
      });
    default:
      return state;
  }
};
