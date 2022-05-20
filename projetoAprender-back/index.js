import express, {json} from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import chalk from "chalk";
import dotenv from 'dotenv';

const app = express();

app.use(json());
app.use(cors());

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);
let promise = mongoClient.connect();
promise.then(() => {
  db = mongoClient.db((process.env.MONGO_DATABASE));
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

app.listen(5000, () => console.log(chalk.bold.green("servidor online na porta 5000")))