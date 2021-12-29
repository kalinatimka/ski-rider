import express from 'express';
import cors from 'cors';

import usersRouter from './routers/users.router';
import lotsRouter from './routers/lots.router';

async function startServer() {
    const app = express();

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/users', usersRouter);
    app.use('/lots', lotsRouter);

    app.listen(3001, () => {
        console.log('Application started on port 3001!');
    });
}

startServer();
