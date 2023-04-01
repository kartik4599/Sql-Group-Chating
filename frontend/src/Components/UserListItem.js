import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "../Context/chatContext";

const UserListItem = ({
  you,
  user,
  handleFunction,
  adminId,
  removeUser,
  makeAdmin,
  removeAdmin,
}) => {
  const cxt = useContext(ChatContext);

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg={you ? "#72c368" : "#E8E8E8"}
      _hover={{ background: "#c79958", color: "white" }}
      w="100%"
      display={"flex"}
      alignItems="center"
      justifyContent={"space-between"}
      color={you ? "white" : "black"}
      px={3}
      py={2}
      mb={2}
      borderRadius="lg">
      <Box display={"flex"} alignItems="center" w={"50%"}>
        <Avatar
          mr={2}
          size="sm"
          cursor={"pointer"}
          name={user.name}
          src={user.pic}
        />
        <Box>
          <Box display={"flex"} justifyContent="space-between">
            {user.name && <Text>{user.name}</Text>}
            {adminId && adminId.includes(user.id) && (
              <Text color="red.400"> - Admin</Text>
            )}
          </Box>
          {user.email && (
            <Text fontSize="xs">
              <b>Email : </b>
              {user.email}
            </Text>
          )}
          {user.phoneNo && (
            <Text fontSize="xs">
              <b>Phone : </b>
              {user.phoneNo}
            </Text>
          )}
        </Box>
      </Box>
      {!you && adminId && adminId.includes(cxt.user.id) && (
        <Menu>
          <MenuButton as={Button} bgColor="blackAlpha.200">
            <HamburgerIcon />
          </MenuButton>
          <MenuList color="black">
            {adminId.includes(user.id) && (
              <MenuItem onClick={removeAdmin}>Remove as Group Admin</MenuItem>
            )}
            {!adminId.includes(user.id) && (
              <MenuItem onClick={makeAdmin}>Make a Group Admin</MenuItem>
            )}
            <MenuItem onClick={removeUser}>Remove User</MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};

export default UserListItem;
