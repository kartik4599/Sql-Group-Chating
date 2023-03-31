import { Box } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import SingleChat from "./SingleChat";
import ScrollableFeed from "react-scrollable-feed";
import axios from "axios";

const ChatBox = () => {
  const { activeGroup, user } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  const interval = useRef();

  useEffect(() => {
    if (localStorage.getItem(activeGroup.id)) {
      setChats(JSON.parse(localStorage.getItem(activeGroup.id)));
    }
    interval.current = setInterval(getLiveChat, 1000);

    return () => {
      clearInterval(interval.current);
    };
    // getLiveChat();
  }, [activeGroup]);

  const getLiveChat = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.jwt}`,
      },
    };
    const { data } = await axios.get(`/api/chat/${activeGroup.id}`, config);
    setChats(data);
    if (data.length > 0) {
      let newIndex = 0;
      if (data.length > 15) newIndex = data.length - 15;
      let newMsg = [];
      for (let i = newIndex; i < data.length; i++) {
        newMsg.push(data[i]);
      }
      console.log(newMsg);
      localStorage.setItem(activeGroup.id, JSON.stringify(newMsg));
    }
  };

  return (
    <Box
      display={"flex"}
      flexDir="column"
      p={5}
      mt={3}
      bgColor={"whiteAlpha.500"}
      id="blur"
      w="100%"
      borderRadius={"xl"}
      overflowY="scroll"
      h={"100%"}>
      <Box
        display={"flex"}
        flexDir="column"
        justifyContent="flex-end"
        overflowY="scroll"
        h={"100%"}>
        {chats.length > 10 ? (
          <ScrollableFeed>
            {chats.map((e) => (
              <SingleChat key={e.id} {...e} />
            ))}
          </ScrollableFeed>
        ) : (
          chats.map((e) => <SingleChat key={e.id} {...e} />)
        )}
      </Box>
    </Box>
  );
};

export default ChatBox;
