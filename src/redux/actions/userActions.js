import Axios from "axios";
import { SET_SUBMITTING, SUCCESS, UPDATE_USER_PROFILE } from "../types";

export const updateProfile = (data, history, goBack) => (dispatch) => {
  dispatch({
    type: SET_SUBMITTING,
    payload: true,
  });
  return Axios.patch("/v1/users/profile/", data)
    .then((res) => {
      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: res.data,
      });
      dispatch({
        type: SET_SUBMITTING,
        payload: false,
      });
      dispatch({
        type: SUCCESS,
        payload: true,
      });
      if (goBack) {
        goBack();
      } else if (history) {
        history.push("/home");
      }
    })
    .catch((err) => {
      dispatch({
        type: SET_SUBMITTING,
        payload: false,
      });
      console.log(err.response);
    });
};

export const getProfile = () => (dispatch, getState) => {
  return Axios.get("/v1/users/profile/", {
    headers: {
      Authorization: `Token ${getState().User.data?.token}`,
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: res.data,
      });

      // history.push("/home");
    })
    .catch((err) => {
      console.log(err.response);
    });
};
