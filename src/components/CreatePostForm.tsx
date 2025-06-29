import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import type { Post } from "../types";
import { getAuthHeaders } from "../api";

interface createPostFormProps {
  onPostCreated: (newPost: Post) => void;
}

const createPostForm = ({ onPostCreated }: createPostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) {
        throw new Error("Failed to create new post");
      }
      const newPost = await response.json();
      onPostCreated(newPost);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box p={8} borderWidth={1} borderRadius="md" boxShadow="lg" maxW="md" w="100%" bg="white">
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Content</FormLabel>
          <Textarea
            value={content ?? ""}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormControl>
        <Button
          isLoading={isSubmitting}
          colorScheme="blue"
          type="submit"
          width="full"
        >
          Create Post
        </Button>
      </VStack>
    </Box>
  );
};

export default createPostForm;
