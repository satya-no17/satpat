import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUser() {
    const cookieStore = await cookies();

    const token =
        cookieStore.get("token")?.value;

    if (!token) {
        throw new Error("Unauthorized");
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SC
        );

        const { iat, exp, ...user } = decoded;

        return user;
    } catch {
        throw new Error("Unauthorized");
    }
}