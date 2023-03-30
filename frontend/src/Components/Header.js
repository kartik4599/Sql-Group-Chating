import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "../Context/chatContext";

const Header = () => {
  const { setLogin } = useContext(ChatContext);

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100vw"}
      p="5px 10px"
      bg={"blackAlpha.600"}>
      <Text fontSize={"3xl"} color="white" fontFamily={"Ubuntu"}>
        Group Chat
      </Text>
      <Button
        onClick={() => {
          setLogin(false);
        }}
        colorScheme={"red"}
        display="flex"
        alignItems={"center"}
        justifyContent="space-between">
        <span style={{ margin: "0 10px" }}>Logout</span>
        <ArrowRightIcon />
      </Button>
    </Box>
  );
};

export default Header;
