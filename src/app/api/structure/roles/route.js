export async function GET() {
    return new Response(
        ["Full access", "No access", "Basic access"]
    )
}