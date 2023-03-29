import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const SignupComponent = () => {
  return (
    <VStack spacing={"5px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeContent={"Enter Your Name"}
          onChange={(e) => {
            //   setName(e.target.value);
          }}></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeContent={"Enter Your Email"}
          onChange={(e) => {
            //   setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="ph" isRequired>
        <FormLabel>Phone No</FormLabel>
        <Input
          type="tel"
          placeContent={"Enter Your Phone No"}
          onChange={(e) => {
            //   setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          //   type={show ? "" : "password"}
          placeContent={"Enter Your Password"}
          onChange={(e) => {
            // setPassword(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="confpassword" isRequired>
        <FormLabel>Conform Password</FormLabel>
        <Input
          //   type={show ? "text" : "password"}
          placeContent={"Enter Your Password"}
          onChange={(e) => {
            // setConfPassword(e.target.value);
          }}
        />
      </FormControl>
      {/* <FormControl id="pic">
        <FormLabel>Add Your Picture</FormLabel>
        <Input
          type="File"
          accept="image/*"
          placeContent={"Enter Your Email"}
          onChange={(e) => {
            //   postDetails(e.target.files[0]);
          }}
        />
      </FormControl> */}
      <Button
        colorScheme="yellow"
        width={"100%"}
        style={{ marginTop: 15 }}
        //   isLoading={loading}
        //   onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignupComponent;
