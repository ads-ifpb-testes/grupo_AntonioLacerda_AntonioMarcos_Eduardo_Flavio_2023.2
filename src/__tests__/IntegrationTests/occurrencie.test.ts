import supertest from 'supertest';
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';
import app from '../../app';
import { IUserWithoutPassword } from '../../dtos/UserDTO';
import { createUser, deleteUser } from '../../services/userServices';

const user = {
    name: 'teste',
    email: 'teste18@email.com',
    password: '123456'
};

let dbOccurrence: any

let newUser: IUserWithoutPassword;
let token: string;

beforeAll(async () => {
    const tempUser = (await createUser(user));
    newUser = tempUser.user;
    token = tempUser.token;
});

describe('Occurrence Routes', () => {
    describe('create occurrence', () => {
        it('should create occurrence', async () => {
            const occurrence = {
                userId: newUser._id,
                title: 'title',
                type: 'Outro',
                date: '2021-05-05',
                time: '12:00',
                location: {
                    type: 'Point',
                    coordinates: [
                        -46.57421,
                        -21.785741
                    ]
                },
                public: true
            };

            const response = await supertest(app)
                .post('/ocurrency')
                .set('Authorization', `Bearer ${token}`)
                .send(occurrence);

            dbOccurrence = response.body;

            expect(response.status).toBe(201);
        });
    });

    describe('get public occurrences', () => {
        it('should get public occurrences', async () => {
            const response = await supertest(app)
                .get('/ocurrency/public')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(response.status).toBe(200);
        });
    });

    describe('update occurrence', () => {
        it('should update occurrence', async () => {
            const response = await supertest(app)
                .put(`/ocurrency/${dbOccurrence._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(response.status).toBe(200);
        });
    });

    describe('delete occurrence', () => {
        it('should delete occurrence', async () => {
            const response = await supertest(app)
                .delete(`/ocurrency/${dbOccurrence._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send();
            expect(response.status).toBe(204);
        });
    });
});

afterAll(async () => {
    await deleteUser(user.email);
});
