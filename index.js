const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

const PORT = 8000;
app.listen(PORT, ()=> {
    console.log("app is running at port", PORT);
})
