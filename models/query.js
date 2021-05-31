const fs = require('fs/promises');
const uniqid = require('uniqid');

const dbPath = './config/database.json';

function getAll() {
    return fs.readFile(dbPath)
        .then(data => JSON.parse(data))
        .catch(console.error) ?? {};
}

function getOne(id) {
    return this.getAll()
        .then(data => data[id]);
}

function add(cube) {
    this.getAll()
        .then(data =>
            fs.writeFile(dbPath, JSON.stringify({ [uniqid()]: cube, ...data }, null, 2))
                .catch(console.log));
}

function save(data) {
    fs.writeFile(dbPath, JSON.stringify(data, null, 2))
        .catch(console.log);
}

module.exports = {
    getAll,
    getOne,
    add,
    save
}

