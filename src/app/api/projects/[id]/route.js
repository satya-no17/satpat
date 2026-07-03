import { pool } from "@/lib/db";
import { getUser } from "@/lib/auth";


export async function GET(_, { params }) {

    try {
        const user_id = await getUser()
        const {id} = await params

        console.log("Fetching project - user_id:", user_id, "project id:", id)

        const res = await pool.query(
            `SELECT name,chats,code FROM projects
       WHERE id = $1`,
            [id]
        )
        console.log("Query result rows:", res.rows[0])
        
        if (res.rows.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "Project not found",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json(
            {
                success: true,
                project: res.rows[0],
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error)
        return Response.json(
            {
                success: false,
                message: "server error"
            },
            { status: 500 }
        )

    }
}
export async function PUT(req, { params }) {

    try {
        const user = await getUser()
        const { id } = await params

        const { content, name,chats } = await req.json();
        console.log(content, name,chats)
        const result = await pool.query(
            `UPDATE projects
       SET code = $1,
           name = $2,
            chats=$3,
           updated_at = NOW()
       WHERE id = $4
       AND user_id = $5
       RETURNING *`,
            [content, name,JSON.stringify(chats), id, user.id]
        );

        if (result.rows.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "Project not found",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json(
            {
                success: true,
                project: result.rows[0],
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error(error)
        return Response.json(
            {
                success: false,
                message: "server error"
            },
            { status: 500 }
        )
    }
}


export async function DELETE(_, { params }) {
    try {
        const user_id = await getUser()
        const { id } = await params

        const result = await pool.query(
            `DELETE FROM projects
       WHERE id = $1
       AND user_id = $2
       RETURNING *`,
            [id, user_id]
        )
        if (result.rows.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "Project not found",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Project deleted",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error)
        return Response.json(
            {
                success: false,
                message: "server error"
            },
            { status: 500 }
        )
    }
}

