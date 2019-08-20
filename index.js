const express = require("express");
//express exports a function

const server = express();
//Tells to express use json
server.use(express.json());

const users = ["Diego", "Diully", "Alfredo"];

/**It is a middleware */
server.use((req, res, next) => {
  console.log(
    `It is a global middleware - Request received using ${req.method}`
  );
  return next();
});

const checkUserExists = (req, res, next) => {
  if (!req.body.name)
    return res.status(400).json({ error: "User name is required" });

  return next();
};

const checkUserInArray = (req, res, next) => {
  if (!users[req.params.index])
    return res.status(400).json({ error: "User not found" });

  return next();
};
/**
 * Query params =>  ?name=diego => req.query
 * Route params => /users/125 => req.params
 * Request body => Data coming from Post or PUT (usually) =>
 *
 * res.send() => To send a plain text return
 * res.json({}) => To send an object
 */

server.get("/test/:id", (req, res) => {
  const { name } = req.query;
  const { id } = req.params;

  res.json({ message: `Your name is ${name} and your ID is ${id}` });
});

server.get("/users", (req, res) => {
  res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  res.json(users[index]);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  res.json(users);
});

server.put("/users/:index", checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;
  res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  //returns a 200 code status
  res.send();
});
//localhost:3000/test
server.listen(3000);
