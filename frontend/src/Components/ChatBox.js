import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "../Context/chatContext";
import SingleChat from "./SingleChat";
import ScrollableFeed from "react-scrollable-feed";

const ChatBox = () => {
  const { chats } = useContext(ChatContext);
  return (
    <Box
      display={"flex"}
      flexDir="column"
      p={5}
      mt={3}
      bgColor={"whiteAlpha.500"}
      w="100%"
      borderRadius={"2xl"}
      overflowY="scroll"
      h={"100%"}>
      <Box
        display={"flex"}
        flexDir="column"
        justifyContent="flex-end"
        overflowY="scroll"
        h={"100%"}>
        {chats.length > 10 ? (
          <ScrollableFeed>
            {chats.map((e) => (
              <SingleChat key={e.id} {...e} />
            ))}
          </ScrollableFeed>
        ) : (
          chats.map((e) => <SingleChat key={e.id} {...e} />)
        )}
      </Box>
    </Box>
  );
};

export default ChatBox;
