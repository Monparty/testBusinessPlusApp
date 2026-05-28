import { Platform } from "react-native";

const BOT_API_TOKEN =
    "eyJvcmciOiI2NzM1NzgwZWM4YzFlYjAwMDEyYTM3NzEiLCJpZCI6ImJhY2M0ZmQwZGIyMTQxOWY4NTg4MzUxZjUxMDJkMjA1IiwiaCI6Im11cm11cjEyOCJ9";

export type ExchangeRate = {
    buying_sight: string;
    buying_transfer: string;
    currency_id: string;
    currency_name_eng: string;
    currency_name_th: string;
    mid_rate: string;
    period: string;
    selling: string;
};

export async function fetchExchangeRates(date: Date = new Date()): Promise<ExchangeRate[]> {
    const day = date.toISOString().split("T")[0];

    const url =
        Platform.OS === "web"
            ? `/api/exchange-rate?start_period=${day}&end_period=${day}`
            : `https://gateway.api.bot.or.th/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=${day}&end_period=${day}`;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: BOT_API_TOKEN,
    };
    if (Platform.OS !== "web") {
        headers["X-IBM-Client-Id"] = BOT_API_TOKEN;
    }

    const response = await fetch(url, { headers });
    if (!response.ok) {
        throw new Error(`Exchange rate fetch failed: ${response.status}`);
    }

    const json = await response.json();
    return json?.result?.data?.data_detail ?? [];
}
