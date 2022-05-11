import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./action";

const initState = {
  loading: false,
  error: false,
  isAuthenticated: false,
  token: "",
  username: "",
};

export const loginReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_LOADING:
      return { ...store, loading: true };

    case LOGIN_SUCCESS:
      return {
        ...store,
        error: false,
        loading: false,
        isAuthenticated: true,
        token: payload.token,
        username: payload.username,
      };

    case LOGIN_FAILURE:
      return {
        ...store,
        error: true,
        loading: false,
        isAuthenticated: false,
        token: "",
        username: "",
      };
    case LOGOUT:
      return {
        ...initState,
      };
    default:
      return store;
  }
};
