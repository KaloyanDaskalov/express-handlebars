const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const db = require('./models/query');

const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');
// app.enable('view cache');

app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const search = req.query.search.toLowerCase();
    const from = Number(req.query.from) || 1;
    const to = Number(req.query.to) || 6;

    const allCubs = await db.getAll();
    const cubs = Object.keys(allCubs)
        .map(key => {
            return { id: key, ...allCubs[key] }
        })
        .filter(cube => cube.name.toLowerCase().includes(search) && Number(cube.difficultyLevel) >= from && Number(cube.difficultyLevel) <= to);

    res.render('index', { cubs });
});

app.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const cub = await db.getOne(id);

    res.render('details', { title: 'Cub Details', id, ...cub });
});

app.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const cub = await db.getOne(id);

    res.render('edit', { title: 'Edit Cube', id, ...cub });
});

app.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const cubs = await db.getAll(id);
    cubs[id] = req.body;
    await db.save(cubs);

    res.redirect('/details/' + id);
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    db.add(req.body);
    res.redirect('/');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

app.all('*', (req, res) => {
    res.render('404');
})

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));

