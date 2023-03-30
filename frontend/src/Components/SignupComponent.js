import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const SignupComponent = () => {
  const [loading, setLoading] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const toast = useToast();

  const submitHandler = async () => {
    console.table({ name, email, phone, password });
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        phoneNo: phone,
        password,
      });

      if (data.msg === "Success") {
        toast({
          status: "success",
          position: "top",
          title: "Account Created Succesfully",
          isClosable: true,
          duration: 5000,
        });
      } else if (data.msg === "User allready exist") {
        toast({
          status: "warning",
          position: "top",
          title: "User Allready exist",
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeContent={"Enter Your Name"}
          bgColor={"blackAlpha.500"}
          color="white"
          onChange={(e) => {
            setName(e.target.value);
          }}></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          bgColor={"blackAlpha.500"}
          color="white"
          placeContent={"Enter Your Email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="ph" isRequired>
        <FormLabel>Phone No</FormLabel>
        <Input
          type="tel"
          placeContent={"Enter Your Phone No"}
          bgColor={"blackAlpha.500"}
          color="white"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type={"password"}
          bgColor={"blackAlpha.500"}
          color="white"
          placeContent={"Enter Your Password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <Button
        colorScheme="yellow"
        width={"100%"}
        style={{ marginTop: 15 }}
        isLoading={loading}
        onClick={submitHandler}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignupComponent;
