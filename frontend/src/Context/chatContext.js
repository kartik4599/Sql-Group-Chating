import { createContext, useEffect, useReducer } from "react";

export const ChatContext = createContext({
  isLogin: false,
  setLogin: (action) => {},
});

const ContextProvider = ({ children }) => {
  const defaultContext = {
    isLogin: false,
  };

  const contextReducer = (state, action) => {
    if (action.type === "setLogin") {
      return {
        isLogin: true,
      };
    }

    if (action.type === "setLogout") {
      return {
        isLogin: false,
      };
    }

    return defaultContext;
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      loginHandler(true);
    }
  }, []);

  const [contextState, dispatchContext] = useReducer(
    contextReducer,
    defaultContext
  );

  const loginHandler = (action) => {
    if (action) {
      dispatchContext({ type: "setLogin" });
    } else {
      dispatchContext({ type: "setLogout" });
    }
  };

  const cxt = {
    isLogin: contextState.isLogin,
    setLogin: loginHandler,
  };

  return <ChatContext.Provider value={cxt}>{children}</ChatContext.Provider>;
};

export default ContextProvider;
