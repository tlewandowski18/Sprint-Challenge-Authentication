const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

afterAll(async () => {
    await db.seed.run()
    await db.destroy()
})


describe("user register tests", () => {
    it("POST /api/auth/register incomplete request body", async () => {
        const data = {username: "tlewando"}
        const res = await supertest(server).post("/api/auth/register").send(data)
        expect(res.statusCode).toBe(404)
    })

    it("POST /api/auth/register", async () => {
        const data = {username: "tlewando", password: "hello"}
        const res = await supertest(server).post("/api/auth/register").send(data)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("tlewando")
    })

    it("POST /api/auth/register username taken", async () => {
        const data = {username: "tlewando", password: "hello"}
        const res = await supertest(server).post("/api/auth/register").send(data)
        expect(res.statusCode).toBe(409)
    })

})

describe("user login tests", () => {
    it("POST /api/auth/login invalid password", async () => {
        const data = {username: "tlewando", password: "hell"}
        const res = await supertest(server).post("/api/auth/login").send(data)
        expect(res.statusCode).toBe(401)
    })

    it("POST /api/auth/login", async () => {
        const data = {username: "tlewando", password: "hello"}
        const res = await supertest(server).post("/api/auth/login").send(data)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Welcome tlewando")
    })
})