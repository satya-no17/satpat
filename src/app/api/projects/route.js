import { pool } from "@/lib/db"
import { getUser } from "@/lib/auth"
export async function GET() {
    try {
        const user_id = await getUser()

        if (!user_id) {
            return Response.json(
                {
                    message: 'user name required'
                },
                {
                    status: 400
                }
            )
        }
        const res = await pool.query(
            `SELECT (name) FROM projects WHERE user_id = $1`, [user_id]
        )
        if (res.rows.length === 0) {
            return Response.json(
                {
                    "success": true,
                    "projects": []
                },
                {
                    status: 200
                }
            )
        }
        return Response.json(
            {
                success: true,
                message: 'all projects',
                projects: res.rows

            },
            { status: 200 }
        )

    } catch (error) {
        console.error(error)
        return Response.json(
            {
                success: false,
                message: 'server error'
            },
            {
                status: 500
            }
        )
    }
}