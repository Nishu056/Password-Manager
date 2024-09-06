const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Password = require('./model/Passwords');
const UserModel = require('./model/User');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/password')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "secret123", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post("/savePassword",authenticateToken, (req, res) => {
    Password.create({...req.body , userId: req.user.id})
        .then(passwords => res.json(passwords))
        .catch(err => res.json(err))
})

app.get('/getPassword',authenticateToken,(req,res)=>{
    Password.find({userId: req.user.id})
    .then(passwords => res.json(passwords))
    .catch(err=>req.json(err))
})

app.delete('/deletePassword/:id',authenticateToken,(req,res)=>{
    const id = req.params.id;
    Password.findByIdAndDelete({ _id: id ,userId: req.user.id})
    .then(passwords => res.json(passwords))
    .catch(err=>req.json(err))
})

app.put('/updatePassword/:id', authenticateToken,(req, res) => {
    const id = req.params.id;
    Password.findByIdAndUpdate(
        { _id: id, userId: req.user.id },
        { ...req.body },
        { new: true }
    )
        .then(passwords => res.json(passwords))
        .catch(err => res.json(err));
});


app.post("/signup", async (req, res) => {
    const encPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = encPassword
    await UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    UserModel.findOne({ email: req.body.email })
        .then(users => {
            if (!users) {
                return res.status(404).json({ message: 'User not found' });
            }

            return bcrypt.compare(req.body.password, users.password)
                .then(ValidPassword => {
                    if (!ValidPassword) {
                        return res.status(401).json({ message: 'Invalid credentials' });
                    }
                    const token = jwt.sign({ id: users._id, email: users.email }, "secret123");
                    res.json({ token });
                });
        })
        .catch(err => res.json(err))
});


app.listen(3002, () => {
    console.log("Server is Running")
})
