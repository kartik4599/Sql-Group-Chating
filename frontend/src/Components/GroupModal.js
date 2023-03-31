import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";

const GroupModal = ({ children }) => {
  const { user, setGroup } = useContext(ChatContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const toast = useToast();

  const searchHandler = async (query) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      };
      const { data } = await axios.get(
        `/api/auth/user?search=${query}`,
        config
      );
      const searchData = data.resultUser.filter((e) => e.id !== user.id);
      setSearchResult(searchData);
      console.log(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast({
        status: "error",
        description: "Error Occured",
        duration: "3000",
        isClosable: true,
      });
    }
  };

  const addUserHandler = (user) => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const deleteHandler = (user) => {
    setSelectedUsers(selectedUsers.filter((e) => e.id !== user.id));
  };

  const submitHandler = async () => {
    try {
      if (!groupChatName) {
        toast({
          status: "warning",
          description: "Enter Name",
          duration: "3000",
          isClosable: true,
          position: "top",
        });
        return;
      }
      if (!selectedUsers.length > 0) {
        toast({
          status: "warning",
          description: "Select User",
          duration: "3000",
          isClosable: true,
          position: "top",
        });
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      };
      let users = selectedUsers.map((e) => e.id);
      users.push(user.id);
      users = JSON.stringify(users);
      const { data } = await axios.post(
        `/api/group`,
        {
          name: groupChatName,
          users,
        },
        config
      );
      if (data.msg === "Success") {
        toast({
          status: "success",
          description: "Group Created",
          duration: "3000",
          isClosable: true,
          position: "top",
        });
        setGroup(null, true);
        onClose();
      }
      console.log(data);
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast({
        status: "error",
        description: "Error Occured",
        duration: "3000",
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <span onClick={onOpen}>{children}</span>
      {/* {children} */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily="Ubuntu"
            display={"flex"}
            justifyContent="center">
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir="column" alignItems={"center"}>
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => {
                  setGroupChatName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={1}
                onChange={(e) => {
                  searchHandler(e.target.value);
                }}
              />
            </FormControl>
            <Box
              display={"flex"}
              w={"100%"}
              flexWrap="wrap"
              justifyContent="left"
              m={3}>
              {selectedUsers.map((user) => {
                return (
                  <UserBadgeItem
                    user={user}
                    key={user.id}
                    handlerFunction={deleteHandler.bind(null, user)}
                  />
                );
              })}
            </Box>
            {loading && <Spinner color="blue" size={"lg"} />}

            {searchResult.slice(0, 4).map((user) => {
              return (
                <UserListItem
                  user={user}
                  handleFunction={addUserHandler.bind(null, user)}
                  key={user.id}
                />
              );
            })}

            {/* Selected User */}
            {/* render Users */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={submitHandler}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GroupModal;
