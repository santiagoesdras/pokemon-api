import { Router } from "express";
import {
  getPokemonByName,
  getPokemonList,
  getServerHealth,
} from "../controllers/pokemon.controller.js";

export const pokemonRouter = Router();

pokemonRouter.get("/health", getServerHealth);
pokemonRouter.get("/pokemon", getPokemonList);
pokemonRouter.get("/pokemon/:nombre", getPokemonByName);
