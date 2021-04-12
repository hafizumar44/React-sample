/* eslint-disable import/no-anonymous-default-export */
import {
  CLEAR_AVAILABLE_SLOTS,
  CLEAR_CONFIRMATION,
  CONFIRMED,
  SET_ALL_EVENT_TYPES,
  SET_AVAILABLE_SLOTS,
} from "../types";

const initialState = {
  eventTypes: [],
  confirmed: false,
  confirmation: {},
  slots: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALL_EVENT_TYPES:
      return Object.assign({}, state, { ...payload });
    case CONFIRMED:
      return Object.assign({}, state, {
        confirmed: true,
        confirmation: payload,
      });
    case CLEAR_CONFIRMATION:
      return Object.assign({}, state, {
        confimed: false,
        confimation: {},
      });
    case SET_AVAILABLE_SLOTS:
      return Object.assign({}, state, {
        slots: payload,
      });
    case CLEAR_AVAILABLE_SLOTS:
      return Object.assign({}, state, {
        slots: [],
      });
    default:
      return state;
  }
};
