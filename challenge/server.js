const express = require("express");
const { home } = require("./templates.js");

const server = express();

const posts = [];

server.get("/", (req, res) => {
  const body = home(posts);
  res.send(body);
});

server.post("/", express.urlencoded({ extended: false }), (req, res) => {
  const nickname = req.body.nickname;
  const message = req.body.message;
  const created = Date.now();

  const nicknameError = true
  const msgError = true

  if (nickname === "" && message === "") {
    res.status(400).send(home(posts, nicknameError, msgError))
  } else if (nickname == "") {
    res.status(400).send(home(posts, nicknameError, false))
  } else if (message == "") {
    res.status(400).send(home(posts, false, msgError))
  } else {
    posts.push({ nickname, message, created });
    res.redirect("/")
  }
});

module.exports = server;
