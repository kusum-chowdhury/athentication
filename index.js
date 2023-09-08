const express = require('express');
const app = express();
const auth = require("./routes/authRoutes");
const {connectDB} = require("./config/db");

connectDB();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1", auth);
const PORT = 8000;
app.listen(PORT, ()=> {
    console.log("app is running at port", PORT);
})
