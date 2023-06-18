import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SearchContextProvider } from "./context/SearchContext";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store,persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    {/* <AuthContextProvider> */}
    <SearchContextProvider>

      <App />
      
    </SearchContextProvider>
    {/* </AuthContextProvider> */}
    </PersistGate>
    </Provider>
  </React.StrictMode>,
);

