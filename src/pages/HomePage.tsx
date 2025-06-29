import {Text, Box, Spinner, Heading, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CreatePostForm from "../components/CreatePostForm";
import PostList from "../components/PostList";
import type { Post } from "../types";

const HomePage =()=>{
    const [posts, setPosts] = useState<Post[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError("Failed to fetch posts");
        console.error("Fetch failed", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);
  const handlePostCreated=(newPost:Post)=>{
    setPosts([newPost,...posts]);
  }
  if (isLoading) {
    return (
      <Box textAlign="center">
        <Spinner size="xl" />
        <Text>Loading posts...</Text>
      </Box>
    );
  }
  if (error) {
    return <Heading color="red.500">Error: {error}</Heading>;
  }
  return (
  <Box maxW="container.md" mx="auto" py={10} px={4}>
    <Heading as="h1" mb={6} textAlign="center">
      Posts
    </Heading>
    <VStack spacing={8} align="stretch" w="full">
      <CreatePostForm onPostCreated={handlePostCreated}/>
      <PostList posts={posts}/>
    </VStack>
  </Box>
);

}

export default HomePage;