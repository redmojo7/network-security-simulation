const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/execute', (req, res) => {
    const cmd = req.query.cmd;
    const target = req.query.target;
    if (!cmd || !target) {
        res.status(400).send('Missing required parameters');
        return;
    }
    console.log(`Parameters: cmd="${cmd}", target="${target}"`);
    const exec = require('child_process').exec;
    const pingCmd = `ping -c 1 ${target}`;
    console.log(`Executing command: ${pingCmd}`);
    exec(pingCmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send(`Error executing command: ${error}`);
        } else {
            res.send(`Ping output: ${stdout}`);
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/')
});