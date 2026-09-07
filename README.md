# Pokedex App

Aplicación web tipo Pokédex desarrollada en equipo con Express + TypeScript para el backend, React para el frontend y PokéAPI como fuente de datos. Se ejecutará localmente o en red privada.

## Objetivo

La aplicación permitirá buscar Pokémon y visualizar su identificador, nombre, imagen y tipos. El backend consumirá PokéAPI y devolverá únicamente datos reformados, no la respuesta completa de la API externa.

## Endpoints principales

### Buscar un Pokémon

```http
GET /api/pokemon/:nombre
```

Ejemplo: `GET /api/pokemon/pikachu`

Respuesta esperada:

```json
{
  "id": 25,
  "nombre": "pikachu",
  "imagen": "https://...",
  "tipos": ["electric"]
}
```

Si el Pokémon no existe, el servidor debe responder con código `404`:

```json
{
  "error": "No lo encontré"
}
```

### Listar Pokémon

```http
GET /api/pokemon?limit=20
```

Devuelve una lista de nombres de Pokémon. El parámetro `limit` es opcional (por defecto `20`, máximo `100`).

Respuesta esperada (`200`):

```json
{
  "limit": 20,
  "pokemon": ["bulbasaur", "ivysaur", "venusaur", "..."]
}
```

Si `limit` no es un número entero, o está fuera del rango permitido (1-100), responde `400`:

```json
{
  "error": "El parámetro limit debe ser un entero entre 1 y 100."
}
```

### Verificar estado del servidor

```http
GET /api/health
```

Sirve para comprobar que el backend está funcionando.

Respuesta esperada (`200`):

```json
{
  "status": "ok"
}
```

### Códigos de error generales

| Código | Cuándo ocurre | Ejemplo de respuesta |
|--------|---------------|------------------------|
| `400` | El parámetro `limit` es inválido o está fuera de rango | `{ "error": "El parámetro limit debe ser un entero entre 1 y 100." }` |
| `404` | El Pokémon buscado no existe, o la ruta no existe | `{ "error": "No lo encontré" }` |
| `502` | PokéAPI respondió con un error inesperado | `{ "error": "PokéAPI no pudo procesar la solicitud." }` |
| `503` | No se pudo conectar con PokéAPI | `{ "error": "No fue posible conectar con PokéAPI." }` |

## Integrantes y responsabilidades

### Richi — Backend: endpoint principal

1. Crear la estructura base del proyecto con Express y TypeScript.
2. Configurar `tsconfig.json`.
3. Configurar scripts básicos como `npm run dev` y `npm run check`.
4. Implementar `GET /api/pokemon/:nombre`.
5. Crear interfaces o tipos para los datos recibidos desde PokéAPI.
6. Reformar la respuesta para devolver únicamente `id`, `nombre`, `imagen` y `tipos`.
7. Validar nombres vacíos o inválidos.
8. Manejar Pokémon inexistentes con respuesta `404`.
9. Manejar errores de conexión con PokéAPI.
10. Documentar pruebas manuales realizadas en el README.

Rama sugerida: `feature/backend-pokemon-detail`

### Martin Sierra — Backend: endpoints complementarios y errores

1. Implementar `GET /api/pokemon?limit=20`.
2. Validar el parámetro `limit`.
3. Establecer un límite máximo permitido para evitar solicitudes excesivas.
4. Crear rutas y controladores separados del endpoint principal.
5. Implementar un middleware global de manejo de errores.
6. Configurar CORS para permitir el consumo desde el frontend local o en red privada.
7. Implementar `GET /api/health`.
8. Documentar endpoints, códigos HTTP y ejemplos de respuestas JSON.

Rama sugerida: `feature/backend-pokemon-list`

### Javier Gregorio — Frontend: búsqueda y ficha de Pokémon

1. Crear el proyecto React y su estructura inicial de carpetas.
2. Diseñar el layout principal de la Pokédex.
3. Crear un campo de búsqueda con validación básica.
4. Conectar el buscador con `GET /api/pokemon/:nombre`.
5. Crear el componente `PokemonCard`.
6. Mostrar imagen, ID, nombre y tipos del Pokémon.
7. Mostrar un indicador de carga mientras se consulta la API.
8. Mostrar un mensaje claro cuando el Pokémon no exista.
9. Mostrar un mensaje cuando exista un error de conexión.

Rama sugerida: `feature/frontend-search-card`

### Luis Samayoa — Frontend: catálogo y diseño visual

1. Consumir `GET /api/pokemon?limit=20`.
2. Crear una cuadrícula o lista de Pokémon.
3. Permitir seleccionar un Pokémon del listado.
4. Al seleccionar un Pokémon, cargar su información detallada.
5. Crear estilos visuales para los tipos Pokémon.
6. Adaptar el diseño a pantallas de celular y escritorio.
7. Crear un estado vacío cuando no existan resultados.
8. Añadir un botón o mecanismo para recargar la lista.
9. Revisar accesibilidad básica: etiquetas, contraste, navegación con teclado y textos alternativos para imágenes.

Rama sugerida: `feature/frontend-catalog-ui`

### Esdras — Backend complementario, integración y administración Git

1. Crear y configurar el repositorio.
2. Crear `.gitignore`.
3. Crear y mantener el README.
4. Definir las reglas de ramas y Pull Requests.
5. Definir el contrato compartido entre backend y frontend.
6. Configurar variables de entorno y URLs para conectar React con Express.
7. Integrar frontend y backend.
8. Resolver problemas de CORS o configuración.
9. Revisar Pull Requests antes de integrarlos.
10. Resolver conflictos de Git cuando sea necesario.
11. Integrar cambios aprobados a la rama `develop`.
12. Implementar correcciones necesarias durante las pruebas.
13. Realizar pruebas finales de búsqueda, listado, errores y diseño responsive.
14. Completar la matriz de decisión de Express y la documentación final.

Rama sugerida: `feature/integration-config`

## Reglas de Git

```text
main     → versión final y estable del proyecto
develop  → rama donde se integran los cambios aprobados
```

**Está prohibido hacer `push` directo a `main` o a `develop`.**

Todo cambio debe realizarse en una rama propia y enviarse mediante un Pull Request:

```text
feature/... → Pull Request → develop → Pull Request final → main
```

## Guía básica para subir cambios

### 1. Descargar cambios recientes

Antes de comenzar a trabajar:

```bash
git checkout develop
git pull origin develop
```

### 2. Crear una rama para la tarea

Cada integrante debe crear una rama desde `develop`.

```bash
git checkout -b feature/nombre-de-la-tarea
```

Ejemplo:

```bash
git checkout -b feature/backend-pokemon-detail
```

### 3. Verificar cambios realizados

```bash
git status
```

### 4. Agregar archivos modificados

```bash
git add .
```

### 5. Crear un commit

El mensaje debe describir claramente el cambio realizado.

```bash
git commit -m "feat: agrega búsqueda de pokemon por nombre"
```

Otros ejemplos:

```bash
git commit -m "feat: agrega listado de pokemon"
git commit -m "fix: maneja error 404 de pokemon inexistente"
git commit -m "style: mejora diseño responsive del catalogo"
```

### 6. Subir la rama al repositorio

```bash
git push origin feature/nombre-de-la-tarea
```

Ejemplo:

```bash
git push origin feature/frontend-search-card
```

### 7. Crear Pull Request

En GitHub:

1. Abrir el repositorio.
2. Crear un Pull Request.
3. Elegir `develop` como rama destino.
4. Explicar brevemente qué se realizó.
5. Esperar revisión antes de hacer merge.

### 8. Después de que el Pull Request sea aprobado

No hacer merge por cuenta propia, salvo que Esdras lo indique. Después de que los cambios hayan sido integrados, actualizar la rama local:

```bash
git checkout develop
git pull origin develop
```

## Checklist antes de enviar un Pull Request

- [ ] Mi funcionalidad funciona localmente.
- [ ] No subí archivos innecesarios como `node_modules`.
- [ ] Mi código corresponde únicamente a mi tarea.
- [ ] Probé los casos principales y los errores básicos.
- [ ] Mi commit tiene un mensaje claro.
- [ ] Mi Pull Request apunta a `develop`, nunca directamente a `main`.
- [ ] No hice push directo a `develop` ni a `main`.

## Estructura mínima funcional del backend

```text
src/
├─ controllers/
│  └─ pokemon.controller.ts   # Consulta PokéAPI y reforma las respuestas
├─ middlewares/
│  └─ error-handler.ts        # Errores controlados y rutas inexistentes
├─ routes/
│  └─ pokemon.routes.ts       # Define los endpoints
└─ server.ts                  # Inicia Express, CORS y el servidor
```

También se incluyen:

- `package.json`: dependencias y comandos del proyecto.
- `tsconfig.json`: configuración de TypeScript.
- `.gitignore`: evita subir `node_modules`, archivos de entorno y compilados.

## Requisitos para ejecutar el backend

- Node.js 18 o superior, ya que se usa `fetch` nativo.
- Conexión a internet para que el backend pueda consultar PokéAPI.

## Instalación y ejecución local

Desde la carpeta del backend, instalar dependencias una sola vez:

```bash
npm install
```

Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

Para comprobar tipos de TypeScript sin iniciar el servidor:

```bash
npm run check
```

## Pruebas rápidas

Con el servidor encendido, abrir estas direcciones en el navegador:

```text
http://localhost:3000/api/health
http://localhost:3000/api/pokemon/pikachu
http://localhost:3000/api/pokemon?limit=20
http://localhost:3000/api/pokemon/pikachuXYZ
```

El último ejemplo debe responder un `404` con el mensaje `No lo encontré`.

## Configuración opcional

El backend usa el puerto `3000` por defecto. Si se necesita cambiarlo, configurar la variable de entorno `PORT`.

Para restringir el origen permitido por CORS, configurar `CORS_ORIGIN`. Si no se define, permite solicitudes desde cualquier origen durante el desarrollo local.
