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

export type ExchangeRateHeader = {
    report_name_th?: string;
    report_name_eng?: string;
    notice_th?: string;
    notice_eng?: string;
    timestamp?: string;
    [key: string]: unknown;
};

export type ExchangeRateResult = {
    dataDetail: ExchangeRate[];
    dataHeader: ExchangeRateHeader | undefined;
};

export async function fetchExchangeRates(
    startDate: Date = new Date(),
    endDate: Date = startDate,
): Promise<ExchangeRateResult> {
    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];

    const mockDate = "2026-05-28";

    const url =
        Platform.OS === "web"
            ? `/api/exchange-rate?start_period=${start}&end_period=${end}`
            : `https://gateway.api.bot.or.th/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=${start}&end_period=${end}`;

            // ? `/api/exchange-rate?start_period=${mockDate}&end_period=${mockDate}`
            // : `https://gateway.api.bot.or.th/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=${mockDate}&end_period=${mockDate}`;

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

    return {
        dataDetail: json?.result?.data?.data_detail ?? [],
        dataHeader: json?.result?.data?.data_header,
    };
}
