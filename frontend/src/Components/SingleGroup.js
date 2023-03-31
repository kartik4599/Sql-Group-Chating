import { Box, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "../Context/chatContext";

const SingleGroup = (props) => {
  const { setActiveGroup } = useContext(ChatContext);

  return (
    <Box
      w={"100%"}
      p={2}
      bgColor="whiteAlpha.600"
      display={"flex"}
      my={2}
      onClick={() => {
        setActiveGroup(props);
      }}
      borderRadius="lg"
      alignItems="center">
      <Text fontFamily={"Ubuntu"} fontWeight="bold" fontSize={"20px"}>
        {props.name}
      </Text>
    </Box>
  );
};

export default SingleGroup;
