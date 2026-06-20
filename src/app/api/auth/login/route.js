import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'


export async function POST(req) {
    try {
        const { email, password } = await req.json()
        if (!email || !password) {
            return Response.json(
                { message: 'invalid params' },
                { status: 400 }
            )
        }


        //getting data from db to comapre
        const data = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email]
        )

        if (data.rows.length === 0) {
            return Response.json(
                { message: "invalid credential" },
                { status: 401 }
            )
        }

        // comparing 

        const user = data.rows[0]

        const isMatch = await bcrypt.compare(
            password, user.password
        )
        if (!isMatch) {
            return Response.json(
                { message: "invalid password" },
                { status: 401 }
            )
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SC,
            { expiresIn: '7d' }
        )

        const response = Response.json(
            {
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    credits: user.credits
                }
            },
            { status: 200 }
        )

        response.headers.set(
            "Set-Cookie", `token=${token}; HttpOnly ;Path=/;Max-Age=604800;SameSite=Strict`
        )

        return response
    } catch (error) {
        console.error(error)
        return Response.json(
            {
                success: false,
                message: 'server Error'
            },
            { status: 500 },

        )
    }

}