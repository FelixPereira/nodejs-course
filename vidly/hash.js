const bcrypt = require('bcrypt');

const pw1 = "123";
const pw2 = "123";

async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashed1 = await bcrypt.hash(pw1, salt);
  const hashed2 = await bcrypt.hash(pw2, salt);
  console.log(salt);
  console.log(hashed1);
  console.log(hashed2);
} 

run();