import { ExchangeRate, fetchExchangeRates } from "@/services/exchangeRate";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Card from "./components/Card";

export default function Home() {
    const [exchangeData, setExchangeData] = useState<ExchangeRate[]>([]);
    useEffect(() => {
        fetchExchangeRates()
            .then(setExchangeData)
            .catch((err) => console.error("fetch error", err));
    }, []);

    return (
        <View className="flex-1 bg-white">
            <View className="flex flex-row justify-between items-center p-4">
                <Text className="text-slate-500 font-semibold">ประเทศ / สกุลเงิน</Text>
                <Text className="text-slate-500 font-semibold">บาท · เปลี่ยนแปลง</Text>
            </View>
            <ScrollView className="px-4 flex">
                {exchangeData.map((item, index) => (
                    <Card key={index} data={item} />
                ))}
            </ScrollView>
        </View>
    );
}
