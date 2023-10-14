import { actions } from "./consts";
export const initialState = {
  sellerDetails: {},
  isSellerLoggedIn: false,
};

const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.SELLER_LOGIN:
      console.log("payload in login -->", payload);
      return {
        ...state,
        sellerDetails: { name: "Abcd Efgh", city: "Montreal" },
        isSellerLoggedIn: true,
      };

    case actions.SELLER_LOGOUT:
      console.log("payload in logout -->", payload);
      return { ...state, sellerDetails: {}, isSellerLoggedIn: false };

    default:
      return state;
  }
};

export default authReducer;
