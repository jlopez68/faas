import express from 'express';
import { dirname, join } from "path";
import bodyParser from'body-parser';
import mongoose from 'mongoose';
import User from "./public/user.js";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(join(__dirname, "public")));

const mongo_uri = 'mongodb://127.0.0.1:27017/faesfarma';

try {
    const db =  mongoose.connect(mongo_uri);
    console.log("Connected to ");
  } catch (error) {
    console.error(error);
  }
  
  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
    
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose is disconnected");
  });
 
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