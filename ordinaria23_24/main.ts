//Examen Ordinario 2023/2024
//Carlos Javier Acevedo Cutillas

//import para cargar el fichero de entorno .env
import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";
//import para trabajar con la base de datos
import mongoose from "mongoose";
//import para trabajar con apollo
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
//import para los tipos de datos, queries y mutations
import {typeDefs} from "./gql/schema.ts";
import {Query} from "./resolvers/query.ts";
import {Mutation} from "./resolvers/mutation.ts";

//cargamos el fichero de entorno .env con la URI de la base de datos

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if(!MONGO_URL){
  console.log("No mongo URL found");
  Deno.exit(1);
}

try {
  await mongoose.connect(MONGO_URL);
  console.log("Conexión exitosa a MongoDB");
} catch (error){
  console.error("Error al conectar a MongoDB:", error);
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
});

const {url} = await startStandaloneServer(server);
console.info(`Server ready at ${url}`);/*
const url= "https://api.api-ninjas.com/v1/validatephone?number=+34606836371";
const response = await fetch(url,{
  headers:{
    'X-Api-Key': 'woAbEJKgkh3OUyTOtSDtaw==dl7GWvZrfYajkd1u'
    }});
    if(response.status !== 200){
      throw new Error("Invalid phone number")
    }
    const pais = await response.json();
console.log(pais["country"]);*/