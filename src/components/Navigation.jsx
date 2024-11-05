import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Flex as="nav" padding="4" bg="teal.500" color="white">
      <Box>
        <Link to="/">
          <Button colorScheme="grey" variant="outline">
            Home
          </Button>
        </Link>
        <Link to="/add-event">
          <Button colorScheme="grey" variant="outline" ml={4}>
            Add Event
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Navigation;
