// const os = require('os');

// let totalMemory = os.totalmem()
// let freeMemory = os.freemem()

// console.log(`totalMemory ${totalMemory}`);
// console.log("freeMemory " + freeMemory);



const fs = require('fs');

// const files = fs.readdirSync('./');

// console.log("files", files);

const filesAsync = fs.readdir('./', function (err, files) {
    if (err) console.log("err", err);
    else console.log("Result", files);
})