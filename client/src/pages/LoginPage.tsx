import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [show, setShow] = useState(true);
  const handleToggle = () => setShow(!show);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      console.log(response);
      const data = await response.json();
      login(data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box p={8} borderWidth={1} borderRadius="md" boxShadow="lg">
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <FormControl isRequired>
            
          <FormLabel>Email</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
            <InputGroup>
          <Input
            type={show?"text":"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <IconButton
            variant="ghost"
            aria-label={show? "Hide password":"Show password"}
            icon={show ? <ViewOffIcon/>:<ViewIcon/>}
            onClick={handleToggle}
            />
            </InputGroup>
        </FormControl>
        <Button
          isLoading={isSubmitting}
          colorScheme="red"
          type="submit"
          width="full"
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
};
export default LoginPage;
