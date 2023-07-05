import express from 'express';
import { dirname, join } from "path";
import bodyParser from'body-parser';
import mongoose from 'mongoose';
import User from "./public/user.js";
import { fileURLToPath } from "url";
import { MONGODB_URI, PORT } from "./config.js";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(join(__dirname, "public")));

app.set("port", PORT);
 
app.post('/register', async (req, res) => {
    const {name, email, celular} = req.body;
    const newUser = new User({name, email, celular});
    newUser.pagina = "asma";
    await newUser.save();
    res.redirect("/");
});

app.listen(4000, () => {
    console.log('server started');
})

export default app;