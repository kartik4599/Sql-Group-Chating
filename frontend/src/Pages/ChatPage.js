import {
  Box,
  FormControl,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import ChatBox from "../Components/ChatBox";
import axios from "axios";
import { ChatContext } from "../Context/chatContext";
import GroupSection from "../Components/GroupSection";
import bird from "../assets/bird.svg";

const ChatPage = () => {
  const [msg, setMsg] = useState("");
  const toast = useToast();
  const { user, setChats, activeGroup } = useContext(ChatContext);

  const sendHandler = async () => {
    try {
      if (msg) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        };
        const { data } = await axios.post(
          "/api/chat",
          {
            content: msg,
            groupId: activeGroup.id,
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
    <Box h="92vh" display={"flex"}>
      <Box
        w={{ base: "100%", md: "35%" }}
        display={{ base: activeGroup ? "none" : "flex", md: "flex" }}
        h={"92vh"}>
        <GroupSection />
      </Box>
      <Box
        display={{ base: activeGroup ? "flex" : "none", md: "flex" }}
        alignItems="center"
        justifyContent={"center"}
        h="92vh"
        w={{ base: "100%", md: "75%" }}>
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
          {activeGroup ? (
            <>
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
            </>
          ) : (
            <Box
              display="flex"
              h="100%"
              justifyContent={"center"}
              flexDir={"column"}
              alignItems="center">
              <Box w={"70%"}>
                <Image src={bird} />
                <Text
                  mt={5}
                  fontFamily="Work sans"
                  fontWeight={"bold"}
                  fontSize={26}
                  color="white">
                  Click on a user to start chatting
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
