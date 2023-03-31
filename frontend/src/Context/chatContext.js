import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const ChatContext = createContext({
  isLogin: false,
  setLogin: (action) => {},
  user: {},
  group: null,
  setGroup: (data, action) => {},
  activeGroup: {},
  setActiveGroup: (group) => {},
});

const ContextProvider = ({ children }) => {
  const defaultContext = {
    isLogin: false,
    user: {},
    group: null,
    activeGroup: null,
  };

  const contextReducer = (state, action) => {
    if (action.type === "setLogin") {
      return {
        isLogin: true,
        user: action.user,
        group: state.group,
        activeGroup: state.activeGroup,
      };
    }

    if (action.type === "setLogout") {
      return {
        isLogin: false,
        user: {},
        group: null,
        activeGroup: null,
      };
    }
    if (action.type === "setGroup") {
      return {
        isLogin: state.isLogin,
        user: state.user,
        group: action.data,
        activeGroup: state.activeGroup,
      };
    }
    if (action.type === "activeGroup") {
      return {
        isLogin: state.isLogin,
        user: state.user,
        group: state.group,
        activeGroup: action.data,
      };
    }
    // if (action.type === "addSingleChat") {
    //   return {
    //     isLogin: state.isLogin,
    //     user: state.user,
    //     group: [...state.chats, action.data],
    //   };
    // }
    return defaultContext;
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      loginHandler(true, JSON.parse(localStorage.getItem("user")));
    }
    if (localStorage.getItem("group")) {
      groupHandler(JSON.parse(localStorage.getItem("group")));
    }
    getGroup();
  }, []);

  const [contextState, dispatchContext] = useReducer(
    contextReducer,
    defaultContext
  );

  const getGroup = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      const config = {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      };
      const { data } = await axios.get("/api/group", config);
      localStorage.setItem("group", JSON.stringify(data));
      groupHandler(data, false);
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

  const groupHandler = async (data, single) => {
    if (single) {
      getGroup();
    } else {
      dispatchContext({ type: "setGroup", data });
    }
  };

  const activeGroupHandler = (group) => {
    if (group) {
      dispatchContext({ type: "activeGroup", data: group });
    }
  };

  const cxt = {
    isLogin: contextState.isLogin,
    setLogin: loginHandler,
    user: contextState.user,
    group: contextState.group,
    setGroup: groupHandler,
    activeGroup: contextState.activeGroup,
    setActiveGroup: activeGroupHandler,
  };

  return <ChatContext.Provider value={cxt}>{children}</ChatContext.Provider>;
};

export default ContextProvider;
