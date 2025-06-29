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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to register new user");
      }
      navigate("/login");
      setEmail("");
      setPassword("");
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
          <Input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
            <InputGroup>
          <FormLabel>Password</FormLabel>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <IconButton
            variant="ghost"
            aria-label={show ? "Hide password" : "Show password"}
            icon={show ? <ViewOffIcon /> : <ViewIcon />}
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
          Register
        </Button>
      </VStack>
    </Box>
  );
};
export default RegisterPage;
