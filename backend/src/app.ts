import Fastify from 'fastify';
import {bootstrap} from 'fastify-decorators';
import {resolve} from 'path'
import cors from '@fastify/cors'
import fastifyIO from "fastify-socket.io";
function createServer() {
    const app = Fastify({
        logger: true
    });
    app.register(bootstrap, {
        directory: resolve(__dirname, `controllers`),
        mask: /./,
    })
    app.register(cors)
    app.register(fastifyIO);
    app.setErrorHandler((error, req, res) => {
        req.log.error(error.toString());
        res.send({error});
    });

    return app;
}

export default createServer;
