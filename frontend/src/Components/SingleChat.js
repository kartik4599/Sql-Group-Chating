import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";
const SingleChat = () => {
  return (
    <Box display={"flex"} alignItems="center" w="100%" justifyContent={"start"}>
      <Avatar size={"sm"} name="kartik mendu"></Avatar>
      <Box
        bgColor={"yellow.300"}
        w={"fit-content"}
        my={2}
        px={4}
        mx={1}
        py={1}
        borderRadius="lg">
        <Text
          fontFamily={"Delicious Handrawn"}
          fontSize="18px"
          fontWeight={"medium"}>
          How are you...
        </Text>
      </Box>
    </Box>
  );
};

export default SingleChat;
