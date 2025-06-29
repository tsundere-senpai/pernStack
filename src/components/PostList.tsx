import type { Post } from "../types";
import PostItem from "./PostItem";
import {  VStack } from "@chakra-ui/react";

interface PostListProps{
    posts: Post[];
}

const PostList = ({posts}:PostListProps) => {
 
  return (
    <VStack spacing={8} align="stretch">
        {posts.map((post)=>(
            <PostItem key={post.id} title={post.title} content={post.content ?? ''}/>
        ))}
    </VStack>
  );

};

export default PostList;
