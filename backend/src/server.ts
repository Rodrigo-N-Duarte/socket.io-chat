import createServer from './app';
import {Server} from "socket.io";

const PORT = process.env.PORT || 3000;
const server = createServer();

server.listen(+PORT,  (err, host) => {
    if (err) throw err;
    console.log(`🚀 Server listening on ${host}`);
});

server.ready().then(() => {
    const io = new Server( {
        cors: {
            origin: '*',
        },
    });
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('message', (data) => {
            console.log('Message received:', data);
            io.emit('message', data);
        });
    });
})
