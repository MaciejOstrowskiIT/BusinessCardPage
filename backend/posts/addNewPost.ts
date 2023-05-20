import { Request, Response } from "express";
import fs from "fs";

export const addNewPost = (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const directoryPath = "./database/posts";

        fs.readdir(directoryPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
            if (err) {
                console.error("Unable to scan directory: ", err);
                return res.status(500).json({ message: "Internal server error", code: 500 });
            }

            const postExists = files.includes(`${title}.json`);
            if (postExists) {
                console.log("Post already exists");
                return res.status(400).json({ message: "Post already exists", code: 400 });
            }

            const post = JSON.stringify({ title, content }) + "\n";
            fs.writeFileSync(`database/posts/${title}.json`, post);
            console.log("Post created successfully");
            return res.status(200).json({ message: "Post created successfully", code: 200 });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", code: 500 });
    }
};

module.exports = addNewPost;
