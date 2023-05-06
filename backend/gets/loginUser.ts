import fs from "fs";
import path from "path";
import {Request, Response} from "express";

export const loginUser = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const data: string = JSON.stringify({ username, password }) + "\n";
    const users = JSON.parse(data)
    const directoryPath = './database'

    let userFound: boolean = false;

    fs.readdir(directoryPath, function (err: any, files: any) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        else {
            let filePromises = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                const fileName = path.parse(file).name;
                if (fileName === username) {
                    console.log("Username found");
                    userFound = true;

                    filePromises.push(
                        new Promise((resolve, reject) => {
                            fs.readFile(`database/${username}.json`, function (err: any, data: any) {
                                if (err) return reject(err);
                                const obj = JSON.parse(data);
                                const passwordLoaded = obj.password;
                                if (passwordLoaded === users.password) {
                                    console.log("Password correct");
                                    return resolve("");
                                } else {
                                    return reject(new Error("Incorrect password"));
                                }
                            });
                        })
                    );
                }
            }

            Promise.all(filePromises)
                .then(() => {
                    if (userFound) {
                        return res.status(200).json({ message: "Password correct", code: 200 });
                    } else {
                        return res.status(400).json({ message: "Username does not exists", code: 400 });
                    }
                })
                .catch((err) => {
                    return res.status(400).json({ message: err.message, code: 400 });
                });
        }
    });
};

module.exports = loginUser;
