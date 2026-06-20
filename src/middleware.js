// import jwt from 'jsonwebtoken'
// import { cookies } from 'next/headers'

// export async function GET() {
//     const cookiesStore = await cookies()

//     const token = cookiesStore.get("token")?.value

//     if (!token) {
//         return Response.json(
//             { message: 'unauthorized' },
//             { status: 401 })
//     }
//     try {
//         const user = jwt.verify(
//             token,
//             process.env.JWT_SC
//         );

//         return Response.json(user);

//     } catch {
//         return Response.json(
//             { message: "invalid token" },
//             { status: 401 }
//         );
//     }
// }

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.next();
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SC);
    return NextResponse.next();
  } catch {
    return NextResponse.json({ message: "invalid token" }, { status: 401 });
  }
}


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/projects/:path*"
  ]
};