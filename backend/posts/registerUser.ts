import fs from "fs";
import path from "path";
import {Request, Response} from "express";


export const registerUser = (req : Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const data = JSON.stringify( {username, password}) + "\n";
        const users = JSON.parse(data)
        const directoryPath = './database'

        fs.readdir(directoryPath, function (err:any, files:any) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            else
            {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i]
                    const fileName = path.parse(file).name;
                    if(fileName === username)
                    {
                        console.log("Username already exists");
                        return res.status(400).json({ error: "Username already exists", code: 400 });
                    }
                }
                fs.writeFileSync(`database/${username}.json`, JSON.stringify(users));
                return res.status(200).json({ message: "User created successfully", code: 200 });
            }
        });
    }
    catch (err:any) {
        console.log(err);
    }
}

module.exports = registerUser;