/* eslint-disable no-undef */
import *as auth from '../auth'
import jwt from 'jsonwebtoken'
import env from "dotenv"
import { User } from "../../db/models"

env.config()

let user;
const userdetails = {
    email: "john@g.com",
    password: "324ewwrhfverjhwe345"
}



describe("testing authentication", () => {
    beforeAll(async () => {
        user = await User.create(userdetails)
    })
    test("generate auth token", () => {
        const token = auth.newToken(user)
        expect(user.dataValues.id).toBe(jwt.decode(token).id)
    })
    // test("")
})
