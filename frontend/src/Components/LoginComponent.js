import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const LoginComponent = () => {
  const [loading, setLoading] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const toast = useToast();

  const submitHandler = async () => {
    console.table({ email, password });
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (data.msg === "Success") {
        toast({
          status: "success",
          position: "top",
          title: "Logged-In",
          isClosable: true,
          duration: 5000,
        });
      } else {
        toast({
          status: "warning",
          position: "top",
          title: data.msg,
          isClosable: true,
          duration: 5000,
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        status: "error",
        position: "top",
        title: "Error Occured",
        isClosable: true,
        duration: 5000,
      });
    }
    setLoading(false);
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeContent={"Enter Your Email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type={"password"}
          placeContent={"Enter Your Password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <Button
        colorScheme="yellow"
        width={"100%"}
        isLoading={loading}
        style={{ marginTop: 15 }}
        onClick={submitHandler}>
        Log In
      </Button>
    </VStack>
  );
};

export default LoginComponent;
