import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Flex as="nav" p={4} bg="gray.100" alignItems="center">
      <Box>
        <Heading as={RouterLink} to="/" size="md">
          Home
        </Heading>
      </Box>
      <Spacer />
      <Box>
        {!isAuthenticated && (
          <>
            <Button
              as={RouterLink}
              to="/login"
              colorScheme="teal"
              variant="ghost"
              mr={4}
            >
              Login
            </Button>
            <Button as={RouterLink} to="/register" colorScheme="teal">
              Register
            </Button>
          </>
        )}
        {isAuthenticated && <Button onClick={logout}>Logout</Button>}
      </Box>
    </Flex>
  );
};

export default Navbar;
