# Getting started

- Navigate to `./client` and run `npm i`
- Navigate to `./server` and run `npm i`
- Create a `.env` in `./server` with the following structure:

```shell
PORT=server port
API_VERSION=v1
MONGODB_URI=
MONGODB_URI_TEST=
```


- In `./server` start the backend in dev mode with `npm run dev`
- In `./client` start the website in dev mode with `npm run dev`

# Testing

- In `./server` start the backend testing with `npm run test`
- In `./client` start the website testing with `npx cypress open`
