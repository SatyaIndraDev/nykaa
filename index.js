const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/user.route");
const { postRouter } = require("./Routes/post.route");


const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/products", postRouter);







app.listen(8080, async() => {
    try{
     await connection;
     console.log("Connected to the DB");
     console.log("Running at 8080 port");
    }catch(err){
        console.log(err);
    }
})