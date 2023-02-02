import app from "index";
import supertest from "supertest";

describe("POST /fruits", () => {
    it("given a valid task it should return 201", async() => {
        const fruit = {
            name: "Laranja",
            price: 2
        }
        const resultado = await supertest(app).post("/fruits").send(fruit)

        expect(resultado.status).toEqual(201)
    });

    it("given a task with duplicate title it should return 409", async() => {
        const fruit = {
          name: 'Banana',
          price: 3,
        };

        const firstTry = await supertest(app).post("/fruits").send(fruit);
        expect(firstTry.status).toEqual(201); // a primeira inserção vai funcionar

        // se tentarmos criar uma task igual, deve retornar 409
        const secondTry = await supertest(app).post("/fruits").send(fruit);
        expect(secondTry.status).toEqual(409);
    });
});

describe("GET /fruits", () => {
    it("", async() => {
        const resultado = await supertest(app).get("/fruits");

        expect(resultado.status).toBe(200)

        expect(resultado.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
            ])
        )
    })
    
});

describe("GET /fruits/:id", () => {
    it("", async() => {
        const resultado = await supertest(app).get("/fruits/1");
        expect(resultado.body).toEqual(
            expect.objectContaining({
                id: 1,
                name: expect.any(String),
                price: expect.any(Number)
            })
        )
    })
})