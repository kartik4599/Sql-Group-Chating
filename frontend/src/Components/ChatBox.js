import { Box, IconButton, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import SingleChat from "./SingleChat";
import ScrollableFeed from "react-scrollable-feed";
import axios from "axios";
import { ArrowBackIcon, ArrowLeftIcon, SettingsIcon } from "@chakra-ui/icons";
import GroupModal from "./GroupModal";
import SettingModal from "./SettingModal";
import io from "socket.io-client";

const ChatBox = ({ recivedMsg }) => {
  const { activeGroup, user, setActiveGroup } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (localStorage.getItem(activeGroup.id)) {
      setChats(JSON.parse(localStorage.getItem(activeGroup.id)));
    }
    getLiveChat();
  }, [activeGroup]);

  useEffect(() => {
    if (recivedMsg) {
      console.log(recivedMsg);
      setChats([...chats, recivedMsg]);
    }
  }, [recivedMsg]);

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
      localStorage.setItem(activeGroup.id, JSON.stringify(newMsg));
    }
  };

  return (
    <>
      <Box
        bgColor={"whiteAlpha.500"}
        display="flex"
        w="100%"
        h="50px"
        borderRadius={"lg"}
        justifyContent={"space-between"}>
        <Box display={"flex"} alignItems="center">
          <IconButton
            onClick={() => {
              setActiveGroup(null);
            }}>
            <ArrowLeftIcon />
          </IconButton>
          <Text px={2} fontFamily="Ubuntu" fontSize={"20px"} fontWeight="bold">
            {activeGroup.name}
          </Text>
        </Box>
        <SettingModal>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </SettingModal>
      </Box>
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
    </>
  );
};

export default ChatBox;
