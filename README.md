# Api-Delivery
Api e Análise, connected to the Delivery project (postgresql database, nodemaler, jsonwebtoken, variable security with .env and bank data manipulation)




## Details

### in production

|routers|type|path|details|access|
|-------|----|----|-------|------|
|users|POST|http://localhost:3000/users/news|news Register|public|
|users|POST|http://localhost:3000/users/login|access user account|public|
|users|POST|http://localhost:3000/register/user/addAddress|to add address user|private|
