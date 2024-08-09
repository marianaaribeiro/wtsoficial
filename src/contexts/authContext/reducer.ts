import { IInitialState } from "./IProps";
import { HANDLERS } from "./types";

const handlers = {
  [HANDLERS.INITIALIZE]: (state: IInitialState, action: any) => {
    const params = action.payload;

    return {
      ...state,
      listTheme: params.listTheme,
      locales: params.locales
    };
  },
  [HANDLERS.SIGN_IN]: (state: IInitialState, action: any) => {
    const params = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user: params.user,
      token: params.token,
      expirationDate: params.expirationDate,
      baseApi: params.baseApi,
      listTheme: params.listTheme,
      locales: params.locales
    };
  },
  [HANDLERS.SIGN_OUT]: (state: IInitialState) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      token: null,
      expirationDate: null,
    };
  },
  [HANDLERS.COMPANYID]: (state: IInitialState, action: any) => {
    const params = action.payload;

    return {
      ...state,
      companyIds: params.companyIds,
    };
  },
};

export const reducer = (state: IInitialState, action: any) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;