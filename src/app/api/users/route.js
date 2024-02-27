import { userData } from "@/app/createGroup/constant";

export async function GET() {
    return new Response(userData)
}