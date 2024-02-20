import React, { useEffect, useState } from "react";

import { LOCAL_STORAGE_KEYS } from "./data/constants";
import { getDataFromLocalStorage } from "./data/utils";
import "./App.css";
import Header from "./component/Header";
import Body from "./component/Body";
import Footer from "./component/Footer";
import { DeviceContext } from "./data/context";

function App() {
  const [userQuery, setUserInput] = useState("");
  const [deviceData, setDeviceData] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [queriesList, setQueriesList] = useState(
    getDataFromLocalStorage(LOCAL_STORAGE_KEYS.ALB_GAL_QUERIES, [])
  );

  const handleInputChange = (ele) => {
    setUserInput(ele);
    if (ele.length > 3) {
      const QueriesList = getDataFromLocalStorage(
        LOCAL_STORAGE_KEYS.ALB_GAL_QUERIES,
        []
      );
      if (!QueriesList.includes(ele)) {
        QueriesList.push(ele);
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.ALB_GAL_QUERIES,
          JSON.stringify(QueriesList)
        );
        setQueriesList(QueriesList);
      }
    }
  };

  useEffect(() => {
    const handleResizeListener = (event) => {
      let timer;
      return (event) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          setDeviceData({
            width: event.target.innerWidth,
            height: event.target.innerHeight,
          });
        }, 700);
      };
    };
    window.addEventListener("resize", handleResizeListener());

    return () => {
      window.removeEventListener("resize", handleResizeListener);
    };
  }, []);

  return (
    <DeviceContext.Provider value={deviceData}>
      <Header handleInputChange={handleInputChange} queriesList={queriesList} />
      <Body query={userQuery} />
      <Footer />
    </DeviceContext.Provider>
  );
}

export default App;
