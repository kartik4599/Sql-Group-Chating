import {
  Box,
  FormControl,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowRightIcon, AttachmentIcon } from "@chakra-ui/icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import ChatBox from "../Components/ChatBox";
import axios from "axios";
import { ChatContext } from "../Context/chatContext";
import GroupSection from "../Components/GroupSection";
import bird from "../assets/bird.svg";
import photo from "../assets/photo.svg";
import io from "socket.io-client";
import { useDropzone } from "react-dropzone";

const ENDPOINT = "http://localhost:5000/";
let socket;

const ChatPage = () => {
  const [msg, setMsg] = useState("");
  const [newMsg, setNewMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [fileSelect, setFileSelect] = useState(false);
  const [groupId, setGroupId] = useState(false);
  const { user, activeGroup } = useContext(ChatContext);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
  }, []);

  useEffect(() => {
    socket.emit("join group", activeGroup);

    if (activeGroup) {
      setGroupId(activeGroup.id);
    }
  }, [activeGroup]);

  useEffect(() => {
    socket.on("msg recived", (newMsg) => {
      setNewMsg(newMsg.chat);
      console.log(newMsg.chat);
      // console.log(chats);
    });
  });

  const onDrop = (acceptFile) => {
    uploadImageHandler(acceptFile[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadImageHandler = async (image) => {
    try {
      console.log(activeGroup, user);
      if (image.type === "image/jpeg" || image.type === "image/png") {
        setLoading(true);
        const postdata = new FormData();
        postdata.append("file", image);
        postdata.append("upload_preset", "chatbox");
        let imgData = await axios.post(
          "https://api.cloudinary.com/v1_1/dv7krzlua/image/upload",
          postdata
        );

        console.log(imgData.data.url, activeGroup);

        const config = {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        };

        let { data } = await axios.post(
          "/api/chat",
          {
            content: imgData.data.url,
            groupId: activeGroup.id,
            isImage: true,
          },
          config
        );

        socket.emit("new Msg", data);
        console.log(data);

        setLoading(false);
        setFileSelect(false);
      } else {
        toast({
          status: "warning",
          position: "top",
          description: "Select Proper file",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        fileSelect(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendHandler = async () => {
    try {
      if (msg) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        };
        const { data } = await axios.post(
          "/api/chat",
          {
            content: msg,
            groupId: activeGroup.id,
          },
          config
        );
        socket.emit("new Msg", data);
        console.log(data);
        setMsg("");
      } else {
        toast({
          status: "warning",
          position: "top",
          description: "Enter some message",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        status: "error",
        position: "top",
        description: "Some error occured ",
        duration: 5000,
        isClosable: true,
      });
      console.log(e);
    }
  };

  return (
    <Box h="92vh" display={"flex"}>
      <Box
        w={{ base: "100%", md: "35%" }}
        display={{ base: activeGroup ? "none" : "flex", md: "flex" }}
        h={"92vh"}>
        <GroupSection />
      </Box>
      <Box
        display={{ base: activeGroup ? "flex" : "none", md: "flex" }}
        alignItems="center"
        justifyContent={"center"}
        h="92vh"
        w={{ base: "100%", md: "75%" }}>
        <Box
          bg="blackAlpha.400"
          borderRadius={"lg"}
          overflowY="hidden"
          display={"flex"}
          flexDir="column"
          justifyContent={"flex-end"}
          py={1}
          px={3}
          alignItems="center"
          style={{ width: "90%", height: "90%" }}>
          {activeGroup ? (
            <>
              {fileSelect ? (
                <Box
                  display="flex"
                  h="100%"
                  w="100%"
                  m={10}
                  justifyContent={"center"}
                  flexDir={"column"}
                  id="blur"
                  borderRadius={"lg"}
                  {...getRootProps()}
                  bgColor="whiteAlpha.500"
                  alignItems="center">
                  <Box
                    w={"70%"}
                    display="flex"
                    justifyContent={"center"}
                    alignItems="center">
                    {loading ? (
                      <Spinner size={"xl"} color="green" />
                    ) : (
                      <>
                        <Image src={photo} h="140px" fit="contain" />
                        <Input
                          type="File"
                          accept="image/*"
                          {...getInputProps()}
                        />
                        <Text
                          fontSize={"22px"}
                          fontFamily="Ubuntu"
                          fontWeight={"bold"}
                          color={"beige"}>
                          Drag 'n' drop some files here, or click to select
                          files
                        </Text>
                      </>
                    )}
                  </Box>
                </Box>
              ) : (
                <ChatBox recivedMsg={newMsg} />
              )}

              <FormControl
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendHandler();
                  }
                }}>
                <InputGroup
                  display="flex"
                  alignItems={"center"}
                  justifyContent="center"
                  p={2}>
                  <Input
                    value={msg}
                    onChange={(e) => {
                      setMsg(e.target.value);
                    }}
                    bgColor="white"
                    // w={"50%"}
                    placeholder="Write your message..."
                  />
                  <InputRightElement mt={2} mr={5}>
                    <IconButton
                      mr={1}
                      onClick={() => {
                        setFileSelect(!fileSelect);
                      }}
                      bgColor={"blue.200"}
                      icon={<AttachmentIcon />}
                    />
                    <IconButton
                      onClick={sendHandler}
                      bgColor={"green.100"}
                      icon={<ArrowRightIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </>
          ) : (
            <Box
              display="flex"
              h="100%"
              justifyContent={"center"}
              flexDir={"column"}
              alignItems="center">
              <Box w={"70%"}>
                <Image src={bird} />
                <Text
                  mt={5}
                  fontFamily="Work sans"
                  fontWeight={"bold"}
                  fontSize={26}
                  color="white">
                  Click on a user to start chatting
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
