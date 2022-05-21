import express, {json} from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import chalk from "chalk";
import joi from "joi";
import {v4 as uuid} from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const app = express();

app.use(json());
app.use(cors());
dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.DB_URL);
await mongoClient.connect()
.then(() => {
    db = mongoClient.db(process.env.MONGO_DATABASE);
    console.log(chalk.bold.blue(`Contecado ao banco ${process.env.MONGO_DATABASE}`));
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

//POSTAR LISTA
app.post("/listas", async (req,res) => {
    const novaLista = req.body;
    try {
        const acharLista = await db.collection("listas").findOne({name: novaLista.name});
        if (!acharLista){
            await db.collection("listas").insertOne({
                name: novaLista.name,
                minAcertos: novaLista.minAcertos,
                questoes: novaLista.questoes
            });
            res.send("lista cadastrada com sucesso").status(201);
        } else {
            res.sendStatus(409);
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
});

//RETORNAR TODAS AS LISTAS
app.get("/listas", async (req,res) => {
    try {
        const listas = await db.collection("listas").find().toArray();
        res.send(listas);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
});

//RETORNAR LISTA ESPECÍFICA
app.get("/listas/:ID_LISTA", async (req, res)  => {
    const listaID = req.params.ID_LISTA;
    try {
        const lista = await db.collection("listas").findOne({_id: new ObjectId(listaID)});
        if (!lista){
            res.sendStatus(404);
            return;
        } else {
            res.send(lista);
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
});

const PORTA = process.env.PORT || 5000;
app.listen(PORTA, () => console.log(chalk.bold.green(`servidor online na porta ${PORTA}`)))