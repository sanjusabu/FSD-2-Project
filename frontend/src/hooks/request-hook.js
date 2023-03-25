import { useState, useCallback, useContext } from "react";
// import ErrorModal from '../Design/UIElements/ErrorModal';
import { AuthContext } from "../context/auth-context";

export const useRequest = () => {
  const authCtx = useContext(AuthContext);

  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState();
  const [exists, setExists] = useState(false);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setisLoading(true);
      if (!headers["csrf-token"] || !headers.Cookie) {
        headers.Cookie = `_csrf=${authCtx.csrfToken}`;
        headers["csrf-token"] = authCtx.csrfToken;
      } else if (headers.Cookie) {
        headers.Cookie = `${headers.Cookie}; _csrf=${authCtx.csrfToken}`;
      }
      try {
        const response = await fetch(url, {
          credentials: "include",
          method,
          body,
          headers,
        });
        const responseData = await response.json();
        if (!response.ok) {
          console.log(responseData);
          setisError(responseData);
          setExists(true);
          throw new Error(responseData.message);
        }

        setisLoading(false);
        return responseData;
      } catch (err) {
        if (err.message.startsWith("Unexpected token")) {
          console.error("Error parsing response as JSON:", err.message);
        }
        setExists(true);
        setisError(err.message);
        setisLoading(false);
        throw err;
      }
    },
    [authCtx.csrfToken]
  );

  const clearError = () => {
    setExists(false);
    setisError(null);
  };

  return { isLoading, isError, sendRequest, clearError, exists };
};
