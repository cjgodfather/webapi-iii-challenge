// code away!
const server = require("./server.js");

const port = process.env.port || 4000;

server.listen(port, () => {
  console.log(`\n* Server Running on ${port} *\n`);
});
