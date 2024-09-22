import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const databasePostgres = new DatabasePostgres();

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

// ENDPOINTS (CRUD):

// CREATE
server.post('/cars', async (request, reply) => {
    const body = request.body;
    await databasePostgres.createCar(body);
    return reply.status(201).send();
});

// READ (Get all cars)
server.get('/cars', async () => {
    const cars = await databasePostgres.listCars();
    return cars;
});

// READ (Get a specific car by ID)
server.get('/cars/:id', async (request, reply) => {
    const carID = request.params.id;
    const car = await databasePostgres.getCarById(carID);
    if (!car) {
        return reply.status(404).send({ error: 'Car not found' });
    }
    return car;
});

// UPDATE
server.put('/cars/:id', async (request, reply) => {
    const carID = request.params.id;
    const body = request.body;
    await databasePostgres.updateCar(carID, body);
   
    return reply.status(204).send();
});

// DELETE
server.delete('/cars/:id', async (request, reply) => {
    const carID = request.params.id;
    const deleted = await databasePostgres.deleteCar(carID);

    if (!deleted) {
        return reply.status(404).send({ error: 'Car not found' });
    }

    return reply.status(204).send();
});

// Start server
server.listen({
    port: 3333
}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running at ${address}`);
});
