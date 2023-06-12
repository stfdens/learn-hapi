const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 9000,
    });

    server.route(routes);

    await server.start();
    console.log(`server runing on ${server.info.uri}`);
};

init();