import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const ChatContext = createContext({
  isLogin: false,
  setLogin: (action) => {},
  user: {},
  chats: [],
  setChats: (chat) => {},
});

const ContextProvider = ({ children }) => {
  const defaultContext = {
    isLogin: false,
    user: {},
    chats: [],
  };

  const contextReducer = (state, action) => {
    if (action.type === "setLogin") {
      return {
        isLogin: true,
        user: action.user,
        chats: state.chats,
      };
    }

    if (action.type === "setLogout") {
      return {
        isLogin: false,
        user: {},
        chats: [],
      };
    }

    if (action.type === "addChats") {
      return {
        isLogin: state.isLogin,
        user: state.user,
        chats: action.data,
      };
    }
    if (action.type === "addSingleChat") {
      return {
        isLogin: state.isLogin,
        user: state.user,
        chats: [...state.chats, action.data],
      };
    }
    return defaultContext;
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      loginHandler(true, JSON.parse(localStorage.getItem("user")));
    }
    getChats();
  }, []);

  const [contextState, dispatchContext] = useReducer(
    contextReducer,
    defaultContext
  );

  const getChats = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      if (data.length > 0) {
        chatHandler(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loginHandler = (action, user) => {
    if (action) {
      dispatchContext({ type: "setLogin", user });
    } else {
      dispatchContext({ type: "setLogout" });
      localStorage.removeItem("user");
    }
  };

  // console.log([].length);

  const chatHandler = (data) => {
    if (data.length) {
      dispatchContext({ type: "addChats", data });
    } else {
      dispatchContext({ type: "addSingleChat", data });
    }
  };

  const cxt = {
    isLogin: contextState.isLogin,
    setLogin: loginHandler,
    user: contextState.user,
    chats: contextState.chats,
    setChats: chatHandler,
  };

  return <ChatContext.Provider value={cxt}>{children}</ChatContext.Provider>;
};

export default ContextProvider;
