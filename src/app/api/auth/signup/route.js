import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";

export async function POST(req) {
    try {
        const { name, email, password } = req.json()
        if (!name || !email || !password) {
            return Response.json(
                { message: "invalid params" },
                { status: 400 }
            )
        }
        //checking user
        const ExistingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (ExistingUser.rows.length > 0) {
            return Response.json(
                { message: 'user already exist' },
                { status: 401 }
            )
        }

        //hashing 
        const hashPassword = await bcrypt.hash(password, 10)

        //user insertion
        const result = await pool.query(`INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, credits`,
            [name, email, hashPassword])

        return Response.json(
            {
                success: true,
                user: result.rows[0]
            },
            { status: 201 }
        )
    } catch (error) {
        console.error(error)

        return Response.json(
            { status: 500 },
            {
                success: false,
                message: 'server Error'
            }
        )
    }


}