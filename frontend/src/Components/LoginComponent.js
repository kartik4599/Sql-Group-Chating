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

const LoginComponent = () => {
  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeContent={"Enter Your Email"}
          onChange={(e) => {
            // setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={"password"}
            // type={show ? "" : "password"}
            placeContent={"Enter Your Password"}
            onChange={(e) => {
              //   setPassword(e.target.value);
            }}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              h={"1.75rem"}
              size={"sm"}
              onClick={() => {
                // setShow(!show);
              }}>
              {/* {show ? "Hide" : "Show"} */}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="yellow"
        width={"100%"}
        // isLoading={loading}
        style={{ marginTop: 15 }}
        // onClick={submitHandler}
      >
        Log In
      </Button>
    </VStack>
  );
};

export default LoginComponent;
