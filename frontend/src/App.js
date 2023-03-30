import { useContext } from "react";
import "./App.css";
import Header from "./Components/Header";
import { ChatContext } from "./Context/chatContext";
import ChatPage from "./Pages/ChatPage";
import Login from "./Pages/Login";

function App() {
  const cxt = useContext(ChatContext);

  return (
    <div className="App">
      <Header />
      {!cxt.isLogin && <Login />}
      {cxt.isLogin && <ChatPage />}
    </div>
  );
}

export default App;
