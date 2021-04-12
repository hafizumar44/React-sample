import Axios from "axios";
import slugify from "slugify";
import { CLEAR_AVAILABLE_SLOTS, SET_AVAILABLE_SLOTS } from "../types";

export const getEvent = (slug, setEvent, setLoading, history) => (dispatch) => {
  dispatch({
    type: CLEAR_AVAILABLE_SLOTS,
  });
  setLoading(true);
  Axios.get("/v1/events/event-type", {
    params: {
      slug,
    },
  })
    .then((res) => {
      return res;
    })
    .then((res) => {
      setEvent(res.data);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      history.push("/404");
    });
};

export const createEventType = (args) => (dispatch) => {
  const {
    values,
    startTime,
    endTime,
    availability,
    setAlert,
    setLoading,
    history,
    actions,
  } = args;
  let data = { ...values };
  if (data.cancellation_policy === "null") {
    data.cancellation_policy = null;
  }
  data.availability_model = availability;
  data.availability_model.appointment_duration = values.appointment_duration;

  data.slug = slugify(data.name) + "-" + Math.random().toString(36).slice(2);

  delete data.appointment_duration;
  delete data.availability_model.startTime;
  delete data.availability_model.endTime;

  let weekdays = data.availability_model.weekdays.map((day) => {
    return {
      start_time: startTime,
      end_time: endTime,
      day,
    };
  });
  data.availability_model.weekdays = [...weekdays];
  Axios.post("/v1/events/event-type/action/", data)
    .then((res) => {
      console.log(res);
      setAlert(true);
      actions.setSubmitting(false);
      setLoading(false);
      history.push("/event-types");
    })
    .catch((err) => {
      setLoading(false);
      console.log(err.response);
      actions.setSubmitting(false);
    });
};

export const getAvailableSlots = (date, id) => (dispatch) => {
  Axios.post("/v1/events/get-slots/", { date, event_type: id })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_AVAILABLE_SLOTS,
        payload: res.data.slots,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const createAppointment = (
  data,
  forwardData,
  setSubmitting,
  history
) => (dispatch) => {
  Axios.post("/v1/events/get-appointment/", data)
    .then((res) => {
      setSubmitting(false);
      const location = {
        pathname: "/confirmed",
        state: { confirmed: true, ...forwardData, ...res.data },
      };
      history.push(location);
      setSubmitting(false);
    })
    .catch((err) => console.log(err.response));
};
