import express from 'express'
import expressSession from 'express-session'
import cors from 'cors'
var FileStore = require('session-file-store')(expressSession);

const app = express()

app.use(cors({ credentials: true, origin: true }))

app.set('trust proxy', 1) // trust first proxy
app.use(expressSession({
    secret: 'keyboard cat',
    store: new FileStore({}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 60 * 24 * 2//2 day
    }
}))

app.get('/', (req, res) => {
    res.send({
        count: req.session.count
    })
})

app.post('/', (req, res) => {
    req.session.count = (req.session.count || 0) + 1;
    res.send({
        count: req.session.count
    })
})

app.listen(2727, () => console.log("running"))