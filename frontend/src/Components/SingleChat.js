import React, { useContext } from "react";
import { Avatar, Box, Image, Text, Tooltip } from "@chakra-ui/react";
import { ChatContext } from "../Context/chatContext";
const SingleChat = ({ content, user, userId, isImage }) => {
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
      {isImage ? (
        <Box bgColor={"whiteAlpha.400"} borderRadius={"lg"} my={1}>
          <Image src={content} w="150px" fit="contain" />
        </Box>
      ) : (
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
      )}
    </Box>
  );
};

export default SingleChat;
