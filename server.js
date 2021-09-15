const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const fs = require("fs");
const qs = require("querystring");

const mysql = require('mysql2');
const session = require("express-session");
const MongoStore = require("connect-mongo");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "db1",
    password: "123456"
});

app.use(session({  
    secret:"test",
    name:"user",
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:"mongodb://localhost:27017/test"
    }),
    cookie:{
        maxAge: 300 * 1000,
    }
}));



app.get("/", (req,res) => {
    app.use("/resource", express.static("./resource"));
    app.use("/img", express.static("./img"))
    // app.use("/test1", express.static("test"));
    fs.readFile("./index.html", (err,data) => {
        if(err){
            res.status(404).send("page not found");
        }
        else{
            res.setHeader("Content-Type", "text/html");
            res.write(data);
            res.send();
        }
    });
});

app.get("/account", (req,res) => {
    if(req.session.user){
        console.log("already login");
        setTimeout(() => {
            io.emit("fail", "login", "(you had already login)");
        }, 1000);
    }
    fs.readFile("./resource/login.html", (err,data) => {
        if(err){
            res.status(404).send("page not found");
        }
        else{
            res.setHeader("Content-Type", "text/html");
            res.write(data);
            res.send();
        }
    });
});

app.get("/logout", (req, res) => {
    if(req.session.user){
        req.session.destroy();
        res.cookie("loginStatus", "false");
        console.log("logout");
        res.redirect("../");
    }
    else{
        setTimeout(() => {
            io.emit("fail", "logout", "(you not login yet.)");
        }, 1000);
        res.redirect("/account");
    }
});

app.post("/orderSubmit", (req,res) => {
    let body = [];
    
    req.on("data", (chunk) => {
        body.push(chunk);
    });

    req.on("end", () => {
        body = Buffer.concat(body).toString();
        body = qs.parse(body);
        console.log(body);
        io.emit("received");
        console.log("received");
        res.end();
    });
});

app.post("/login", (req,res) => {
    
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = Buffer.concat(body).toString();
        body = qs.parse(body);
        console.log(body);
        pool.execute("SELECT * FROM user WHERE user_name = ? AND user_password = ?", [body.username, body.password], (err, result) => {
            if(err) throw err;
            if(result.length != 0){
                req.session.user = body.username;
                res.cookie("loginStatus", "true", {
                    maxAge:600*1000
                });
                console.log("login");
                res.redirect("../");
                res.end();
            }
            else{
                res.redirect("./account");
                console.log('fail');
                setTimeout(() => {
                    io.emit("fail", "login");
                }, 1000);
                res.end();
            }
        });
    });
});

app.post("/register", (req,res) => {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = Buffer.concat(body).toString();
        body = qs.parse(body);
        console.log(body);
        
        pool.query("SELECT user_name FROM user WHERE user_name = ?", [body.username], (err, result) => {
            if(err) throw err;

            if(result.length > 0){
                // res.write("user had already used.")
                res.redirect("./account");
                console.log('fail username');
                setTimeout(() => {
                    io.emit("fail", 'register', "user had already used.");
                }, 1000);
                res.end();
            }
            else if(body.passwordConfirm !== body.password){
                // res.write("password not same.");
                res.redirect("./account");
                console.log("fail password");
                setTimeout(() => {
                    io.emit("fail", 'register', "password not same.");
                }, 1000);
                res.end();
            }
            else{
                pool.query("INSERT INTO user SET ?", {user_name:body.username, user_password:body.password}, (err, result) => {
                    if(err) throw err;
                    req.session.user = body.username;
                    res.cookie("loginStatus", "true", {
                        maxAge:600*1000
                    });
                    res.redirect("../")
                    res.end();
                });
            }
        });

        
    });
});


io.on("connection", (socket) => {
    console.log("user connected");
});


let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`listning at port:${port}`);
    console.log("----------------------------------------------------------------------------------");
});