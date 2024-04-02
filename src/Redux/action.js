const initialState = {
  loading: null,
  data: null,
  error: null,
  status: null,
  message: null,
};

export const RegistrationActionTypes = {
  REGISTRATION: "REGISTRATION",
  REGISTRATION_REQUEST: "REGISTRATION_REQUEST",
  REGISTRATION_ERROR: "REGISTRATION_ERROR",
  REGISTRATION_RESPONSE: "REGISTRATION_RESPONSE",
};

export function RegistrationReducer(state = initialState, action) {
  switch (action.type) {
    // case RegistrationActionTypes?.REGISTRATION:
    //   return {};
    case RegistrationActionTypes?.REGISTRATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        data: action.payload,
        status: RegistrationActionTypes?.REGISTRATION_REQUEST,
      };

    case RegistrationActionTypes?.REGISTRATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: action.payload,
        status: RegistrationActionTypes?.REGISTRATION_ERROR,
      };
    case RegistrationActionTypes?.REGISTRATION_RESPONSE:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
        status: RegistrationActionTypes?.REGISTRATION_RESPONSE,
      };
    default:
      return initialState;
  }
}

const intialValue = {
  loading: null,
  data: null,
  error: null,
  status: null,
  message: null,
};

export const LogInTypes = {
  LOGIN: "LOGIN",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGIN_RESPONSE: "LOGIN_RESPONSE",
};

export function LogInReducers(state = intialValue, action) {
  switch (action.type) {
    case LogInTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        data: action.payload,
        status: LogInTypes?.LOGIN_REQUEST,
      };
    case LogInTypes.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        data: action.payload,
        status: LogInTypes?.LOGIN_ERROR,
      };
    case LogInTypes.LOGIN_RESPONSE:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
        status: LogInTypes?.LOGIN_RESPONSE,
      };
    default:
      return intialValue;
  }
}
