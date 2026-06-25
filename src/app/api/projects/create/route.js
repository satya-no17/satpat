import { pool } from "@/lib/db";
import { getUser } from "@/lib/auth";

export async function POST(request) {
    try {

        const user = await getUser()
         const user_id = user.id
        const { name } = await request.json()

        if (!name) {
            return Response.json(
                {
                    success: false,
                    message: "Project name required"
                },
                {
                    status: 400
                }
            );
        }
        const result = await pool.query(
            `INSERT INTO projects
      (user_id, name)
      VALUES ($1, $2)
      RETURNING *`,
            [user_id, name]
        );

        return Response.json(
            {
                success: true,
                project: result.rows[0]
            },
            {
                status: 201
            }
        );


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