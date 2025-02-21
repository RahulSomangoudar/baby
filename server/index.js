const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()

// Update the origin URL: remove the trailing slash
app.use(cors({
    origin: ["https://baby-front-nine.vercel.app"], // No trailing slash
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(express.json());

mongoose.connect('mongodb+srv://test:test123@cluster0.6yzt7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.get("/", (req, res) => {
    res.json("Hello");
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already have an account");
            } else {
                RegisterModel.create({ name: name, email: email, password: password })
                    .then(result => res.json(result))
                    .catch(err => res.json(err));
            }
        }).catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server is Running");
});
