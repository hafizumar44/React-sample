import React, { useEffect } from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Appbar from "./components/Appbar";
import LandingPage from "./pages/Landing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Home from "./pages/Home";
import AlmostThere from "./pages/AlmostThere";
import EventTypes from "./pages/EventTypes";
import CreateEventType from "./pages/CreateEventType";
import { useSelector } from "react-redux";
import axios from "axios";
import OwnerProfile from "./pages/OwnerProfile";
import Event from "./pages/Event";
import ConfirmedEvent from "./pages/AppointmentConfirmed";
import OAuthCallback from "./pages/OAuthCallback";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";

const NotFound = () => {
  return <h1 style={{ textAlign: "center" }}>Not Found</h1>;
};

const Layout = ({ children }) => {
  return (
    <>
      <Appbar />
      {children}
    </>
  );
};

function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = useSelector((state) => state.User.isLoggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  const User = useSelector((state) => state.User);
  useEffect(() => {
    if (User.isLoggedIn) {
      axios.defaults.headers.common["Authorization"] =
        "Token " + User.data.token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [User]);

  return (
    <>
      {/* <Appbar /> */}
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <PrivateRoute exact path="/almost-there">
          <Layout>
            <AlmostThere />
          </Layout>
        </PrivateRoute>
        <PrivateRoute exact path="/event-types">
          <Layout>
            <EventTypes />
          </Layout>
        </PrivateRoute>
        <PrivateRoute exact path="/create-event-type">
          <Layout>
            <CreateEventType />
          </Layout>
        </PrivateRoute>
        <PrivateRoute exact path="/home">
          <Layout>
            <Home />
          </Layout>
        </PrivateRoute>
        <PrivateRoute exact path="/settings">
          <Layout>
            <Settings />
          </Layout>
        </PrivateRoute>
        <PrivateRoute exact path="/edit-profile">
          <Layout>
            <EditProfile />
          </Layout>
        </PrivateRoute>
        <Route exact path="/confirmed">
          <Layout>
            <ConfirmedEvent />
          </Layout>
        </Route>
        <Route exact path="/privacy">
          <Layout>
            <PrivacyPolicy />
          </Layout>
        </Route>
        <Route exact path="/404">
          <Layout>
            <NotFound />
          </Layout>
        </Route>
        <Route exact path="/oauth/callback">
          <Layout>
            <OAuthCallback />
          </Layout>
        </Route>
        <Route exact path="/:username">
          <Layout>
            <OwnerProfile />
          </Layout>
        </Route>
        <Route exact path="/:username/:slug">
          <Layout>
            <Event />
          </Layout>
        </Route>
        <Route>
          <Layout>
            <NotFound />
          </Layout>
        </Route>
      </Switch>
    </>
  );
}
