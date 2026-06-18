import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function GET() {
    const cookiesStore = await cookies()

    const token = cookiesStore.get("token")?.value

    if (!token) {
        return Response.json(
            { message: 'unauthorized' },
            { status: 401 })
    }
    const user = jwt.verify(
        token,process.env.JWT_SC
    )

    return Response.json(user)
}