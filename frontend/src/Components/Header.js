import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "../Context/chatContext";

const Header = () => {
  const { setLogin } = useContext(ChatContext);

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        p="5px 10px"
        bg={"whiteAlpha.700"}>
        <Text fontSize={"3xl"} fontFamily={"Ubuntu"}>
          Group Chat
        </Text>
        <div>
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
        </div>
      </Box>
    </>
  );
};

export default Header;
