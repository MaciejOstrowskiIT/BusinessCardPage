import { Request, Response } from "express";
import fs from "fs";

const deletePost = (req: Request, res: Response) => {
    try {
        const { title } = req.params;
        const filePath = `./database/posts/${title}.json`;

        if (!fs.existsSync(filePath)) {
            console.log("Post does not exist");
            return res.status(404).json({ message: "Post not found", code: 404 });
        }

        fs.unlinkSync(filePath);
        console.log("Post deleted successfully");
        return res.status(200).json({ message: "Post deleted successfully", code: 200 });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", code: 500 });
    }
};

export default deletePost;
