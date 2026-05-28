import { ExchangeRate, fetchExchangeRates } from "@/services/exchangeRate";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import CardDetail from "./components/CardDetail";

type DetailParams = {
    currency_id?: string;
    currency_name_th?: string;
    currency_name_eng?: string;
    buying_sight?: string;
    buying_transfer?: string;
    mid_rate?: string;
    selling?: string;
    period?: string;
};

function Detail() {
    const params = useLocalSearchParams<DetailParams>();
    const [history, setHistory] = useState<ExchangeRate[]>([]);
    const dataChart = history?.map((item) => ({ value: Number(item?.buying_sight) }));

    const formatted = params.period
        ? new Date(params.period).toLocaleDateString("th-TH", {
              day: "numeric",
              month: "short",
              year: "numeric",
          })
        : "";

    useEffect(() => {
        if (!params.currency_id) return;

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 6);

        fetchExchangeRates(startDate, endDate)
            .then(({ dataDetail }) => {
                const filtered = dataDetail
                    .filter((item) => item.currency_id === params.currency_id)
                    .sort((a, b) => (a.period > b.period ? -1 : 1));
                setHistory(filtered);
            })
            .catch((err) => console.error("fetch history error", err));
    }, [params.currency_id]);

    return (
        <View className="flex-1 bg-white">
            <View className="flex flex-row p-4">
                <Text className="text-slate-500 font-semibold">อัตราแลกเปลี่ยน · {formatted || "วันนี้"}</Text>
            </View>
            <ScrollView className="px-4 flex" contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={{ marginBottom: 4 }}>
                    <View className="flex-1 flex-row gap-4 items-end" style={{ marginBottom: 6 }}>
                        <Text className="text-black font-semibold" style={{ fontSize: 48 }}>
                            {params.buying_sight ?? "-"}
                            <Text className="text-slate-500 font-medium px-4" style={{ fontSize: 14 }}>
                                บาท
                            </Text>
                        </Text>
                    </View>
                    <View
                        className="bg-green-100 rounded-full mb-4"
                        style={{
                            alignSelf: "flex-start",
                            paddingHorizontal: 18,
                            paddingVertical: 4,
                            backgroundColor: "#dcfce7",
                        }}
                    >
                        <Text className="font-semibold" style={{ color: "#166534" }}>
                            1 {params.currency_id} · ขาย ฿{params.selling ?? "-"}
                        </Text>
                    </View>
                </View>
                <LineChart data={dataChart} areaChart width={300} />
                <View style={{ paddingVertical: 6 }}>
                    <Text className="text-slate-500 font-semibold">ข้อมูลย้อนหลัง 7 วัน</Text>
                    <Text className="text-slate-500" style={{ fontSize: 12, marginTop: 4 }}>
                        * API ไม่มีข้อมูลวันหยุด ผลลัพธ์อาจน้อยกว่า 7 แถว
                    </Text>
                </View>
                {history.map((item, idx) => {
                    const current = parseFloat(item.buying_sight);
                    const prev = history[idx + 1] ? parseFloat(history[idx + 1].buying_sight) : undefined;
                    const change =
                        prev !== undefined && !Number.isNaN(current) && !Number.isNaN(prev)
                            ? current - prev
                            : undefined;
                    return (
                        <CardDetail key={item.period} period={item.period} rate={item.buying_sight} change={change} />
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default Detail;
