import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres { 
  async listCars() {
    const cars = await sql`select * from cars`;
    return cars;
  }

  async createCar(car) {
    const id = randomUUID();
    console.log('id', id);
    const model = car.model;
    const color = car.color;
    const price = car.price;
    
    await sql`insert into cars (id, model, color, price)
    values (${id}, ${model}, ${color}, ${price})`
  }

  async updateCar(id, car) {
    const model = car.model;
    const color = car.color;
    const price = car.price;

    await sql`update carss set 
        model = ${model},
        color = ${color},
        price = ${price}
        where id = ${id}
    `;
  }

  async deleteCar(id) {
    await sql`delete from cars where id = ${id}`
  }

}