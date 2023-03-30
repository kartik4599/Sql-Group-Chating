import React, { useContext } from "react";
import { Avatar, Box, Text, Tooltip } from "@chakra-ui/react";
import { ChatContext } from "../Context/chatContext";
const SingleChat = ({ content, user, userId }) => {
  const cxt = useContext(ChatContext);

  return (
    <Box
      display={"flex"}
      alignItems="center"
      w="100%"
      justifyContent={userId === cxt.user.id ? "end" : "start"}>
      {userId !== cxt.user.id && (
        <Tooltip label={user.name}>
          <Avatar size={"sm"} name={user.name}></Avatar>
        </Tooltip>
      )}
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
          {content}
        </Text>
      </Box>
    </Box>
  );
};

export default SingleChat;
