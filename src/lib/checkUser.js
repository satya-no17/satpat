import { getUser } from "./auth";


export async function checkUser() {
    try {
    return await getUser();
  } catch {
    return null;
  }
}