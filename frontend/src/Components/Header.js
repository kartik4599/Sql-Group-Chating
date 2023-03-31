import { AddIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "../Context/chatContext";
import GroupModal from "./GroupModal";

const Header = () => {
  const { setLogin, isLogin, setGroup } = useContext(ChatContext);

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
      {isLogin && (
        <Box display={"flex"}>
          <GroupModal>
            <Button
              colorScheme={"green"}
              display="flex"
              size={{ base: "sm", md: "md" }}
              mx={2}
              alignItems={"center"}
              justifyContent="space-between">
              <span style={{ margin: "0 10px" }}>Create Group</span>
              <AddIcon />
            </Button>
          </GroupModal>
          <Button
            onClick={() => {
              setLogin(false);
            }}
            colorScheme={"red"}
            size={{ base: "sm", md: "md" }}
            display="flex"
            alignItems={"center"}
            justifyContent="space-between">
            <span style={{ margin: "0 10px" }}>Logout</span>
            <ArrowRightIcon />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
