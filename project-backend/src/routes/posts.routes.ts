import { Router,Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware,AuthRequest } from "../middleware/auth.middleware";
const router=Router();
const prisma=new PrismaClient();


router.get("/", async (req: Request, res: Response) => {
  const allPost = await prisma.post.findMany();
  res.status(200).json(allPost);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: `Failed to retrieve post with id ${id}` });
  }
});

router.post("/",authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }
    const userId=req.user!.userId;
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId:userId,
      },
    });
    res.status(201).json(newPost);
    return;
  } catch (err) {
    console.error("Failed to post", err);
    res.status(500).json({ error: "Unable to create post" });
    return;
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = Number(id);
  const { title, content } = req.body;
  if (!id || isNaN(numericId) || numericId < 0) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  try {
    if (!title) {
      res.status(404).json({ error: "Title is required" });
      return;
    }
    const updatedPost = await prisma.post.update({
      where: { id: numericId },
      data: { title, content },
    });
    res.status(200).json(updatedPost);
    return;
  } catch (error) {
    console.error(`Failed to update post`, error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = Number(id);
  if (!id || isNaN(numericId) || numericId < 0) {
    res.status(400).json({ error: `invalid id` });
    return;
  }
  try {
    const post=await prisma.post.findUnique({
      where:{id:numericId}
    });
    if(!post){
      res.status(404).json({error:`Not found`});
      return;
    }
    const deletePost = await prisma.post.delete({
      where: { id: numericId }
    });
    res.status(200).json({ message: `Post deleted successfully`, Post: deletePost });
    return;
  } catch (error) {
    console.error("Failed to delete post", error);
    res.status(500).json({ error: "Internal Server error" });
    return;
  }
});
export default router;