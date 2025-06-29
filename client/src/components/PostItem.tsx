import { Box, Heading, Text } from "@chakra-ui/react";

interface PostItemProps {
  title: string;
  content?: string;
}

const PostItem = ({ title, content }: PostItemProps) => {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      w="full"
      transition="background-color 0.3s ease-in-out, transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)"
      _hover={{
        backgroundColor: "red.100",
        cursor: "pointer",
        transform: "translateY(-4px)",
        boxShadow: "lg",
        dropShadow: "lg",
      }}
    >
      <Heading fontSize="xl">{title}</Heading>
      {content && <Text mt={4}>{content}</Text>}
    </Box>
  );
};

export default PostItem;
