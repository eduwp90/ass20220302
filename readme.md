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

The data used for testing is (CSV) :
```
client_id,date,amount,currency,commission_amount,commission_currency
42,2021-01-02,2000.00,EUR,0.05,EUR
1,2021-01-03,500.00,EUR,2.50,EUR
1,2021-01-04,499.00,EUR,2.50,EUR
1,2021-01-05,100.00,EUR,0.50,EUR
1,2021-01-06,1.00,EUR,0.03,EUR
1,2021-02-01,500.00,EUR,2.50,EUR
```
