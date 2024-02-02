/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { Provider } from "react-redux";

import "./index.css";
import { App } from "./App";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HMSRoomProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HMSRoomProvider>
  </BrowserRouter>
);
