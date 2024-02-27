import { structureData } from "@/app/createGroup/constant";

export async function GET() {
    return new Response(
        structureData
    )
}