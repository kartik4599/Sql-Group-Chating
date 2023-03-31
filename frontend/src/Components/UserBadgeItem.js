import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";

const UserBadgeItem = ({ user, handlerFunction }) => {
  return (
    <Box
      px={2}
      fontSize={12}
      background="red.500"
      color={"white"}
      py={1}
      borderRadius="lg"
      m={1}
      cursor="pointer"
      onClick={handlerFunction}
      alignItems="center"
      mb={2}>
      {user.name}
      <CloseIcon ml={2} boxSize="2" />
    </Box>
  );
};

export default UserBadgeItem;
