const BOT_API_TOKEN =
    "eyJvcmciOiI2NzM1NzgwZWM4YzFlYjAwMDEyYTM3NzEiLCJpZCI6ImJhY2M0ZmQwZGIyMTQxOWY4NTg4MzUxZjUxMDJkMjA1IiwiaCI6Im11cm11cjEyOCJ9";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const start = url.searchParams.get("start_period") ?? "2017-06-30";
    const end = url.searchParams.get("end_period") ?? "2017-06-30";

    const upstream = `https://gateway.api.bot.or.th/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=${start}&end_period=${end}`;

    const res = await fetch(upstream, {
        headers: {
            "Content-Type": "application/json",
            "X-IBM-Client-Id": BOT_API_TOKEN,
            Authorization: BOT_API_TOKEN,
        },
    });

    if (!res.ok) {
        return Response.json(
            { error: "Upstream failed", status: res.status, body: await res.text() },
            { status: res.status },
        );
    }

    return Response.json(await res.json());
}
