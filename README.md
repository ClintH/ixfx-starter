This is an [ixfx](https://clinth.github.io/ixfx-docs/) starter project for using Node.js and NPM to help run sketches.

## Organisation

Make sketches under the `src` folder. Typescript files are compiled when using one of the npm scripts listed below. DO NOT edit files in the `docs` directory: these are produced from `src`.

ixfx can be referenced in a sketch with something like:

```js
// eg. src/data/point-tracker/script.ts
import { Points } from "../../ixfx/geometry.js";
```

In the above example, the script is two levels deep (`data/pointer-tracker`), so we need two `../` to go up enough levels.

## Getting started

Install pre-requisites the first time you download the repository:

```
npm install
```

After that, use `npm run start`. This will watch TS, HTML, CSS and JS files for changes, automatically building them to the `docs` folder.

```
npm run start
```

It will also copy ixfx from `node_modules` so it's consumable on the front-end.

By default it starts Five Server to make your code accessible in the browser and automatically reload when there are changes.

## Websockets

You can use the provided simple websocket server. Instead of starting with `npm run start`, use:

```
npm run start-ws
```

Instead of using Five Server like `npm run start`, it will use a Node.js webserver. You will have to manually refresh the browser when you make changes to the code.

## Building

Build to `docs` folder. This compiles TS to JS and copies HTML, CSS and JS from `src` to `docs`, as well as including a copy of ixfx.

```
npm run build
```


Clean: deletes `docs` folder

```
npm run clean
```
