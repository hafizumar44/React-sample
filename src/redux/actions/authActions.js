import axios from "axios";
import SwAlert from "../../components/SwAlert";
import { LOGOUT, AUTHENTICATE, UPDATE_USER_PROFILE } from "../types";
import { getProfile } from "./userActions";

export const googleSignup = (tokenId, history) => (dispatch) => {
  axios
    .post("/v1/users/google-login/", { auth_code: tokenId })
    .then((res) => {
      // return console.log(res);
      dispatch({
        type: AUTHENTICATE,
        payload: res.data,
      });

      axios.defaults.headers.common["Authorization"] =
        "Token " + res.data.token;
      // Redirect to home screen (upcoming event screen if the user already set company details)
      // else to update company details screen
      if (res.data.userprofile.availability_model !== null) {
        history.push("/home");
      } else {
        history.push("/almost-there");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logout = (history) => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  history.push("/");
  // axios
  // 	.delete("/v1/users/logout/")
  // 	.then(() => {
  // 		dispatch({
  // 			type: LOGOUT,
  // 		});
  // 		history.push("/");
  // 	})
  // 	.catch((err) => {
  // 		console.log(err.response);
  // 	});
};

export const updateWelcomeMessage = (welcome_message) => (
  dispatch,
  getState
) => {
  axios
    .patch(
      "/v1/users/profile/",
      {
        userprofile: {
          welcome_message,
        },
      },
      {
        headers: {
          Authorization: `Token ${getState().User.data.token}`,
        },
      }
    )
    .then((res) => {
      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const checkAvailability = (
  username,
  setLoading,
  token,
  setUsernameAvailability
) => {
  setLoading(true);
  axios
    .get("/v1/users/username-availability", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        username,
      },
    })
    .then((res) => {
      setUsernameAvailability(true);
      console.log(res.data);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      // console.log(err.response)
      setUsernameAvailability(false);
    });
};

//
export const authenticateZoom = (authCode, history) => (dispatch, getState) => {
  return axios
    .post(
      `/v1/users/zoom-authentication/`,
      {
        zoom_auth_code: authCode,
      },
      {
        headers: {
          Authorization: `Token ${getState().User.data?.token}`,
        },
      }
    )
    .then((res) => {
      if (res.data["Zoom Authentication"]) {
        dispatch(getProfile());
        return SwAlert.fire({
          title: 'Success',
          text: 'Connected with Zoom successfully.',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          history.push('/create-event-type')
        })
      }
    })
    .catch((err) => {
      console.log(err.response);
    });
};
