import { EntityValue } from "@/app/createGroup/constant";

export async function GET(req, {params}) {
  return new Response(EntityValue[params.structure_name])
}