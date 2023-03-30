import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

import React, { useContext, useState } from "react";
import ChatBox from "../Components/ChatBox";
import axios from "axios";
import { ChatContext } from "../Context/chatContext";

const ChatPage = () => {
  const [msg, setMsg] = useState("");
  const toast = useToast();
  const { user, setChats } = useContext(ChatContext);

  const sendHandler = async () => {
    try {
      if (msg) {
        setChats({
          content: msg,
          user: { name: user.name },
          userId: user.id,
        });
        const config = {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        };
        const { data } = await axios.post(
          "/api/chat",
          {
            content: msg,
          },
          config
        );
        console.log(data);
      } else {
        toast({
          status: "warning",
          position: "top",
          description: "Enter some message",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        status: "error",
        position: "top",
        description: "Some error occured ",
        duration: 5000,
        isClosable: true,
      });
      console.log(e);
    }
  };

  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      h="95vh"
      w="100vw">
      <Box
        bg="blackAlpha.400"
        borderRadius={"lg"}
        overflowY="hidden"
        display={"flex"}
        flexDir="column"
        justifyContent={"flex-end"}
        py={1}
        px={3}
        alignItems="center"
        style={{ width: "90%", height: "90%" }}>
        <ChatBox />
        <FormControl
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendHandler();
            }
          }}>
          <InputGroup
            display="flex"
            alignItems={"center"}
            justifyContent="center"
            p={2}>
            <Input
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              bgColor="white"
              placeholder="Write your message..."
            />
            <InputRightElement mt={2}>
              <IconButton
                onClick={sendHandler}
                bgColor={"green.100"}
                icon={<ArrowRightIcon />}></IconButton>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ChatPage;
