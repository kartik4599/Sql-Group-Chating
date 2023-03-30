import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

import React from "react";
import ChatBox from "../Components/ChatBox";

const ChatPage = () => {
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      h="100vh"
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
        <FormControl>
          <InputGroup
            display="flex"
            alignItems={"center"}
            justifyContent="center"
            p={2}>
            <Input
              bgColor="white"
              placeholder="Write your message..."
            />
            <InputRightElement mt={2}>
              <IconButton
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
