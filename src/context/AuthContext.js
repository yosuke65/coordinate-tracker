import createDataContext from "./createDataContext";
import trackerApi from "../api/trackerApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "sign_up":
      return { errorMessage: "", token: action.payload };
    case "sign_in":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "sign_out":
      return { token: null, errorMessage:'' };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({
        type: "sign_in",
        payload: token,
      });
      navigate("TrackList");
    } else {
      navigate("SignUp");
    }
  };
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

//const signUp = (parameter) =>  async (parameter) => {
const signUp =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      console.log(`e:${email} p:${password}`);
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "sign_up", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: `Err: ${err.message}`,
      });
    }
  };

const signIn = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: `Err: ${err.message}`,
      });
    }
  };
};

const signOut = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "sign_out" });
  navigate('loginFlow')
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signIn, signOut, signUp, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: "" }
);
