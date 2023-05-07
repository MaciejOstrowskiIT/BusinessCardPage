import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

export const registerUser = (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const directoryPath = "./database";

        fs.readdir(directoryPath, function (err: any, files: any) {
            if (err) {
                return console.log("Unable to scan directory: " + err);
            } else {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const fileName = path.parse(file).name;
                    if (fileName === username) {
                        console.log("Username already exists");
                        return res
                            .status(400)
                            .json({ error: "Username already exists", code: 400 });
                    }
                }

                // hash password
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        console.log(err);
                        return res
                            .status(500)
                            .json({ error: "Internal Server Error", code: 500 });
                    }

                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) {
                            console.log(err);
                            return res
                                .status(500)
                                .json({ error: "Internal Server Error", code: 500 });
                        }

                        const users = JSON.stringify({ username, password: hash }) + "\n";
                        fs.writeFileSync(`database/${username}.json`, users);
                        return res
                            .status(200)
                            .json({ message: "User created successfully", code: 200 });
                    });
                });
            }
        });
    } catch (err: any) {
        console.log(err);
    }
};

module.exports = registerUser;
