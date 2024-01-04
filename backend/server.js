const http = require('http');
const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize(process.env.DB_URL)

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write('<h1>Hello, Node.js HTTP Server!</h1>');
    res.end();
});

const dbTry = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

dbTry();

const port = 3001;

server.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`);
});