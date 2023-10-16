import React, { useEffect } from "react";

const SquareRedirect = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const requestData = {
        client_id: process.env.REACT_APP_SQUARE_CLIENT_ID,
        code,
        redirect_uri: process.env.REACT_APP_SQUARE_REDIRECT_URI,
        client_secret: process.env.REACT_APP_SQUARE_CLIENT_SECRET,
        grant_type: "authorization_code",
        scopes: [
          "ITEM_READ",
          "ITEM_WRITE",
          "INVENTORY_READ",
          "INVENTORY_WRITE",
          "ORDERS_READ",
          "ORDERS_WRITE",
          "PAYMENTS_READ",
          "PAYMENTS_WRITE",
          "INVOICES_READ",
          "INVOICES_WRITE",
        ],
      };

      fetch(`${process.env.REACT_APP_SQUARE_BASE_URL}/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data -->", JSON.stringify(data));
          localStorage.removeItem("square_hackathon_token");
          localStorage.setItem("square_hackathon_token", JSON.stringify(data));
        })
        .catch((error) => {
          console.log("error in square redirect -->", error);
        });
    }
  }, []);
  return <div>SquareRedirect</div>;
};

export default SquareRedirect;
