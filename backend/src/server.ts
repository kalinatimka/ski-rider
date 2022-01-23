import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import usersRouter from './routers/users.router';
import lotsRouter from './routers/lots.router';
import authRouter from './routers/authorize.router';
import categoriesRouter from './routers/categories.router';
import db from './data-access/database';
import DBBid from './db-models/bid.model';
import BidService from './services/bid.service';

// import checkToken from './middlewares/check-token';

async function startServer() {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);

    io.on('connection', (socket) => {
        socket.on('join-auction', (lot) => {
            socket.join(lot.idLot);
            socket.broadcast.to(lot.idLot).emit('user-joined');
        });

        socket.on('makeBid', async (bid) => {
            const { idLot, idUser, price } = bid;

            // логика по проверке ставки в транзакции
            const dbBid: DBBid = await db.transaction(async () => {
                const bidService = new BidService();

                const bidWithoutUser = await bidService.addBid(idUser, idLot, price);
                return await bidService.getBid(bidWithoutUser.getDataValue('idBid'));
            });

            if (dbBid) {
                io.in(idLot).emit('getBid', dbBid);
            }
        });
    });

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

    server.listen(3001, () => {
        console.log('Application started on port 3001!');
    });
}

startServer();
