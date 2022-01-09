import express from 'express';
import cors from 'cors';

import usersRouter from './routers/users.router';
import lotsRouter from './routers/lots.router';
import authRouter from './routers/authorize.router';
import categoriesRouter from './routers/categories.router';

// import checkToken from './middlewares/check-token';

async function startServer() {
    const app = express();

    app.use(cors());

    app.use('/uploads/avatars', express.static('uploads/avatars'));
    app.use('/uploads/lots', express.static('uploads/lots'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/auth', authRouter);

    // app.use(checkToken);

    app.use('/users', usersRouter);
    app.use('/lots', lotsRouter);
    app.use('/categories', categoriesRouter);

    app.listen(3001, () => {
        console.log('Application started on port 3001!');
    });
}

startServer();
