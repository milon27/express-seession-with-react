import express from 'express'
import expressSession from 'express-session'
import cors from 'cors'
import doenv from 'dotenv'

const FileStore = require('session-file-store')(expressSession);
doenv.config()

const app = express()

app.use(cors({ credentials: true, origin: true }))

const SessionCookie = process.env.NODE_ENV == "dev" ? {
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 60 * 24 * 2//2 day
} : {
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 60 * 24 * 2//2 day
}

app.set('trust proxy', 1) // trust first proxy
app.use(expressSession({
    name: "test-me-esc",
    secret: 'keyboard cat',
    store: new FileStore({}),
    resave: false,
    saveUninitialized: false,
    cookie: { ...SessionCookie } as any
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

const port = process.env.PORT || 2727
app.listen(port, () => console.log("running on port" + port))
