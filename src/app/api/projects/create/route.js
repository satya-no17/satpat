import { pool } from "@/lib/db";
import { getUser } from "@/lib/auth";

export async function POST(request) {
    try {
        const user = await getUser();
        const user_id = user.id;
        const email = user.email

        const { name } = await request.json();

        if (!name?.trim()) {
            return Response.json(
                {
                    success: false,
                    message: "Project name required",
                },
                {
                    status: 400,
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

        const projectId = result.rows[0].id;

                // create blank chat

        pool.query(
            `INSERT INTO chats (created_by,project_id)
       VALUES ($1,$2)`,
            [email, projectId]
        ).catch(err => console.error(err));
        return Response.json(
            {
                success: true,
                project: result.rows[0],
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
                message: "server error",
            },
            {
                status: 500,
            }
        );
    }
}