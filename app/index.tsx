import { ExchangeRate, ExchangeRateHeader, fetchExchangeRates } from "@/services/exchangeRate";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Card from "./components/Card";

export default function Home() {
    const [exchangeData, setExchangeData] = useState<ExchangeRate[]>([]);
    const [exchangeHeader, setExchangeHeader] = useState<ExchangeRateHeader>();

    useEffect(() => {
        fetchExchangeRates()
            .then(({ dataDetail, dataHeader }) => {
                setExchangeData(dataDetail);
                setExchangeHeader(dataHeader);
            })
            .catch((err) => console.error("fetch error", err));
    }, []);
    // https://claude.ai/chat/818c604e-88d5-433a-9f19-4853af06ec1c

    return (
        <View className="flex-1 bg-white">
            <View className="flex flex-row justify-between items-center p-4">
                <Text className="text-slate-500 font-semibold">ประเทศ / สกุลเงิน</Text>
                <Text className="text-slate-500 font-semibold">บาท · เปลี่ยนแปลง</Text>
            </View>
            {exchangeHeader?.timestamp && (
                <Text className="px-4 pb-2 text-xs text-slate-400">อัปเดต: {exchangeHeader.timestamp}</Text>
            )}
            <ScrollView className="px-4 flex" contentContainerStyle={{ paddingBottom: 60 }}>
                {exchangeData.map((item, index) => (
                    <Card key={index} data={item} />
                ))}
            </ScrollView>
        </View>
    );
}
