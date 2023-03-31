import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "../Context/chatContext";
import SingleGroup from "./SingleGroup";

const GroupSection = () => {
  const { group } = useContext(ChatContext);

  return (
    <Box
      bg="blackAlpha.400"
      borderRadius={"lg"}
      overflowY="hidden"
      display={"flex"}
      flexDir="column"
      justifyContent={"center"}
      my={8}
      ml={5}
      alignItems="center"
      style={{ width: "90%", height: "90%" }}>
      <Box
        display={"flex"}
        flexDir="column"
        p={5}
        bgColor={"whiteAlpha.500"}
        justifyContent={"flex-start"}
        id="blur"
        w="95%"
        borderRadius={"xl"}
        overflowY="scroll"
        h={"95%"}>
        {group && group.map((e) => <SingleGroup key={e.id} {...e} />)}
      </Box>
    </Box>
  );
};

export default GroupSection;
