import { Request, Response } from "express";
import fs from "fs";

export const addNewPost = (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const directoryPath = "./database/posts";

        fs.readdir(directoryPath, function (err: any, files: any) {
            if (err) {
                return console.log("Unable to scan directory: " + err);
            } else {
                const post = JSON.stringify({ title, content }) + "\n";
                if(files.includes(`${title}.json`)) return (res.status(400).json({ message: "Post already exists", code: 400 }), console.log("Post already exists"))
                fs.writeFileSync(`database/posts/${title}.json`, post);
                return res.status(200).json({ message: "Post created successfully", code: 200 });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = addNewPost;