import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUser() {
    const cookieStore = await cookies();

    const token =
        cookieStore.get("token")?.value;

    if (!token) {
        throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SC
    );

    return decoded.id;
}