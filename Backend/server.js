const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

//connecting to our database
const db = mysql.createConnection({
    host: "bakermuseum.mysql.database.azure.com",
    user: 'mrbaker',
    password: 'Meowmeow!!!',
    database: 'BakerMuseumDatabase'
})

app.get('/', (re, res)=>{
    return res.json("From backend side");
});

app.get('/employees', (req, res)=>{ //will add in more queries later. For now get one working until we get more pages up that require them
    const sql = "SELECT * FROM Employees";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

//listening on port 8081, will change later
app.listen(8081, ()=>{
    console.log("listening");
});