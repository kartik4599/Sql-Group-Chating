import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import LoginComponent from "../Components/LoginComponent";
import SignupComponent from "../Components/SignupComponent";

const Login = () => {
  return (
    <Container maxW="container.md" centerContent fontFamily={"Ubuntu"}>
      <Box
        d="flex"
        justifyContent="center"
        backgroundColor={"whiteAlpha.700"}
        borderRadius={"5"}
        width={"100%"}
        margin={"40px 0px 10px 0"}
        borderWidth={"1px"}
        p={3}>
        <Text fontSize={"3xl"}>Chat-Box</Text>
      </Box>
      <Box
        d="flex"
        justifyContent="center"
        backgroundColor={"whiteAlpha.700"}
        borderRadius={"5"}
        width={"100%"}
        borderWidth={"1px"}
        p={3}>
        <Tabs variant="soft-rounded" colorScheme="yellow">
          <TabList>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginComponent />
            </TabPanel>
            <TabPanel>
              <SignupComponent />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Login;
