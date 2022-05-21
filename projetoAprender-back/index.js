import express, {json} from "express";
import cors from "cors";
import chalk from "chalk";
import joi from "joi";
import { ObjectId } from "mongodb";
import {v4 as uuid} from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

const app = express();

app.use(json());
app.use(cors());
dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.DB_URL);
await mongoClient.connect()
.then(() => {
    db = mongoClient.db("aprenderDB");
    console.log(chalk.bold.blue("Contecado ao banco aprenderDB"));
})
.catch(err => {
    console.log(chalk.bold.red("Erro ao conectar com o banco"), err);

})

app.post("/signup", async (req, res) => {
    const {name, email, senha} = req.body;

    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        senha: joi.string().required(),
        checkSenha: joi.ref("senha")
    });

    const validate = signUpSchema.validate(req.body);
    if (validate.error) return res.sendStatus(400);

    try {
        const validate_email = await db.collection("users").findOne({email});
        if (validate_email) return res.sendStatus(409);

        const SALT = 10;
        await db.collection("users").insertOne({
            name, 
            email, 
            senha: bcrypt.hashSync(senha, SALT)
        });  
        return res.status(201).send("Cadastrado com Sucesso");

    } catch (err) {
        return res.sendStatus(500);
    }
});

app.post("/login", async (req, res) => {

    const loginSchema = joi.object({
        email: joi.string().email().required(),
        senha: joi.string().required()
    });

    const validate = loginSchema.validate(req.body);
    if (validate.error) return res.sendStatus(400);

    try {
        const user = await db.collection("users").findOne({email: req.body.email});
        if (!user) return res.sendStatus(404);

        if (user && bcrypt.compareSync(req.body.senha, user.senha)) {
            const token = uuid();
            await db.collection("sessions").insertOne({token, userId: user._id});
            return res.status(201).send({token, name: user.name});
        }
        return res.sendStatus(404);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

app.delete("/logout", async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(403);

    try {
        const session = await db.collection("sessions").deleteOne({token: token});
        res.status(200).send(session);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

app.post("/doneLists", async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);
    const {listId} = req.body;

    try {
        const session = await db.collection("sessions").findOne({token: token});
        if (!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({_id: session.userId});
        if (!user) return res.sendStatus(401);

        const {doneLists} = user;
        if (doneLists) {
            const product = await db.collection("user").findOne({userId: user._id, doneLists: ObjectId(listId)});
            if (product) return res.sendStatus(409);

            await db.collection("user").updateOne(
                {userId: user._id}, 
                {$push:{doneLists: {...req.body}}}
            );
            return res.sendStatus(201);

        } else {
            const new_doneLists = await db.collection("user").updateOne(
                {userId: user._id}, 
                {$set: {doneLists: new Array({...req.body})}}
            );
            return res.status(201).send(new_doneLists);
        }

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }    
});

app.get("/statistics", async (req,res) => {

});

const PORTA = process.env.PORT || 5000;
app.listen(PORTA, () => console.log(chalk.bold.green(`servidor online na porta ${PORTA}`)))