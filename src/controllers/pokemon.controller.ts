import type { Request, Response } from "express";
import { AppError } from "../middlewares/error-handler.js";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

type PokeApiPokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  types: Array<{
    type: { name: string };
  }>;
};

type PokeApiList = {
  results: Array<{ name: string }>;
};

function readLimit(value: unknown): number {
  if (value === undefined) return DEFAULT_LIMIT;

  const limit = Number(value);
  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_LIMIT) {
    throw new AppError(400, `El parámetro limit debe ser un entero entre 1 y ${MAX_LIMIT}.`);
  }

  return limit;
}

async function fetchFromPokeApi<T>(path: string): Promise<T> {
  let response: globalThis.Response;

  try {
    response = await fetch(`${POKEAPI_BASE_URL}${path}`);
  } catch {
    throw new AppError(503, "No fue posible conectar con PokéAPI.");
  }

  if (response.status === 404) {
    throw new AppError(404, "No lo encontré");
  }

  if (!response.ok) {
    throw new AppError(502, "PokéAPI no pudo procesar la solicitud.");
  }

  return response.json() as Promise<T>;
}

export async function getPokemonByName(req: Request, res: Response): Promise<void> {
  const rawName = req.params.nombre;
  const nombre = typeof rawName === "string" ? rawName.trim().toLowerCase() : "";

  if (!nombre) {
    throw new AppError(400, "Debe indicar un nombre de Pokémon.");
  }

  const pokemon = await fetchFromPokeApi<PokeApiPokemon>(`/pokemon/${encodeURIComponent(nombre)}`);

  res.json({
    id: pokemon.id,
    nombre: pokemon.name,
    imagen: pokemon.sprites.other?.["official-artwork"]?.front_default ?? pokemon.sprites.front_default,
    tipos: pokemon.types.map((item) => item.type.name),
  });
}

export async function getPokemonList(req: Request, res: Response): Promise<void> {
  const limit = readLimit(req.query.limit);
  const data = await fetchFromPokeApi<PokeApiList>(`/pokemon?limit=${limit}`);

  res.json({
    limit,
    pokemon: data.results.map((item) => item.name),
  });
}

export function getServerHealth(_req: Request, res: Response): void {
  res.json({ status: "ok" });
}
