# Express Session with react app

> cookie handle: 
- dev(localhost,http) and production(nginx,https)
```ts
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
```