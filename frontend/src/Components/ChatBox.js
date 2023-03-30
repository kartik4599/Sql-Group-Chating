import { Box } from "@chakra-ui/react";
import React from "react";
import SingleChat from "./SingleChat";

const ChatBox = () => {
  return (
    <Box
      display={"flex"}
      flexDir="column"
      p={5}
      mt={3}
      bgColor={"whiteAlpha.500"}
      justifyContent="flex-end"
      w="100%"
      borderRadius={"2xl"}
      h={"100%"}>
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
