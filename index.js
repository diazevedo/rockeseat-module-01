const express = require("express");
//express exports a function

const server = express();
/**
 * Query params =>  ?name=diego => req.query
 * Route params => /users/125 => req.params
 * Request body => Data coming from Post or PUT (usually)
 *
 * res.send() => To send a plain text return
 * res.json({}) => To send an object
 */
server.get("/test/:id", (req, res) => {
  const { name } = req.query;
  const { id } = req.params;

  res.json({ message: `Your name is ${name} and your ID is ${id}` });
});

//localhost:3000/test
server.listen(3000);
