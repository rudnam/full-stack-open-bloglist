# full-stack-open-bloglist

Bloglist app created as part of the [Full Stack Open](https://fullstackopen.com/en/) course

## Dev

Install dependencies

```shell
cd full-stack-open-bloglist
npm install && cd frontend && npm install
```

Create an `.env` file based on `.env.example`

```shell
### .env
MONGODB_URI=mongodb+srv://<username>:<password>@<clustername>.4pwonvk.mongodb.net/<collection>?retryWrites=true&w=majority
TEST_MONGODB_URI=mongodb+srv://<username>:<password>@<clustername>.4pwonvk.mongodb.net/<collection>?retryWrites=true&w=majority
PORT=3001
SECRET=secretString
```

Start backend

```shell
cd full-stack-open-bloglist
npm run start
```

Run another terminal and start frontend

```shell
cd full-stack-open-bloglist/frontend
npm run start
```

View the application at http://localhost:3000/.

### Credentials for testing

| Username   | Password     |
| ---------- | ------------ |
| testuser   | helloworld   |
| seconduser | goodbyeworld |

test
