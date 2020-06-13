import express from "express"
import morgan from "morgan"
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import postRoutes from "./resources/posts/post.routes"
import AuthRouter  from "./utils/auth.route"


const app = express()


app.use(morgan("dev"))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))


// routes
app.use("/auth", AuthRouter)
app.use('/api/posts', postRoutes)


export const start = async (port) => {
    try {
        
        app.listen(port, () => {
            console.log(`REST API on http://localhost:${port}/api`)
        })
    } catch (e) {
        console.error(e)
    }
}