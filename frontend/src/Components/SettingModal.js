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
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";

const SettingModal = ({ children }) => {
  const { user, setGroup, activeGroup } = useContext(ChatContext);
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
      const searchData = data.resultUser.filter((e) => {
        if (e.id === user.id) return false;
        let isThere = true;
        activeGroup.users.forEach((u) => {
          if (u.id === e.id) isThere = false;
          return;
        });
        return isThere;
      });
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

  const addUser = async (u) => {
    console.log(u);
    try {
      console.log(u);
      const config = {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      };
      const { data } = await axios.post(
        `/api/group/addUser`,
        {
          groupId: activeGroup.id,
          userId: u.id,
        },
        config
      );

      toast({
        status: "success",
        description: "Added User",
        duration: "3000",
        isClosable: true,
        position: "top",
      });
      setGroup(null, true);
      onClose();

      console.log(data);
    } catch (e) {
      console.log(e);
      toast({
        status: "error",
        description: "Error Occured",
        duration: "3000",
        isClosable: true,
      });
    }
  };

  const makeAdmin = async (u) => {
    console.log(u);
    try {
      console.log(u);
      const config = {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      };
      const { data } = await axios.post(
        `/api/group/addAdmin`,
        {
          groupId: activeGroup.id,
          userId: u.id,
        },
        config
      );
      if (data.msg === "Success") {
        toast({
          status: "success",
          description: "Made Admin",
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
      toast({
        status: "error",
        description: "Error Occured",
        duration: "3000",
        isClosable: true,
      });
    }
  };

  const removeAdmin = async (u) => {
    console.log(u);
    try {
      console.log(u);
      const config = {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      };
      const { data } = await axios.post(
        `/api/group/removeAdmin`,
        {
          groupId: activeGroup.id,
          userId: u.id,
        },
        config
      );
      if (data.msg === "Success") {
        toast({
          status: "success",
          description: "Made Admin",
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
      toast({
        status: "error",
        description: "Error Occured",
        duration: "3000",
        isClosable: true,
      });
    }
  };

  const removeUser = async (u) => {
    try {
      console.log(u);
      const config = {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      };
      const { data } = await axios.post(
        `/api/group/removeUser`,
        {
          groupId: activeGroup.id,
          userId: u.id,
        },
        config
      );
      if (data.msg === "Success") {
        toast({
          status: "success",
          description: "Removed User",
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
      toast({
        status: "error",
        description: "Error Occured",
        duration: "3000",
        isClosable: true,
      });
    }
  };

  const submitHandler = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      };
      const { data } = await axios.post(
        `/api/group/removeUser`,
        {
          groupId: activeGroup.id,
          userId: user.id,
        },
        config
      );
      if (data.msg === "Success") {
        toast({
          status: "success",
          description: "Removed User",
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
            Group Information
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir="column" alignItems={"center"}>
            <Box
              display={"flex"}
              w={"100%"}
              flexWrap="wrap"
              justifyContent="left"
              m={3}>
              <Text>Group Members</Text>
              {activeGroup.users.map((e) => {
                return (
                  <UserListItem
                    user={e}
                    adminId={activeGroup.admin}
                    you={e.id === user.id}
                    key={e.id}
                    removeUser={removeUser.bind(null, e)}
                    makeAdmin={makeAdmin.bind(null, e)}
                    removeAdmin={removeAdmin.bind(null, e)}
                  />
                );
              })}
            </Box>
            {activeGroup.admin.includes(user.id) && (
              <>
                <FormControl>
                  <Input
                    placeholder="Add Users"
                    mb={1}
                    onChange={(e) => {
                      searchHandler(e.target.value);
                    }}
                  />
                </FormControl>
                {loading && <Spinner color="blue" size={"lg"} />}
                {searchResult.slice(0, 4).map((user) => {
                  return (
                    <UserListItem
                      user={user}
                      handleFunction={addUser.bind(null, user)}
                      key={user.id}
                    />
                  );
                })}
              </>
            )}
          </ModalBody>
          (
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={submitHandler}>
              Leave Group
            </Button>
          </ModalFooter>
          )
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SettingModal;
