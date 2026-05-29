import { ExchangeRateHeader, fetchExchangeRates } from "@/services/exchangeRate";
import { useGlobalSearchParams, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

function CustomHeader() {
    const pathname = usePathname();
    const params = useGlobalSearchParams<{
        currency_id?: string;
        currency_name_th?: string;
        currency_name_eng?: string;
    }>();
    const [exchangeHeader, setExchangeHeader] = useState<ExchangeRateHeader>();
    const lastUpdated = exchangeHeader?.last_updated as string | undefined;
    const formatted = lastUpdated
        ? new Date(lastUpdated).toLocaleDateString("th-TH", {
              day: "numeric",
              month: "short",
              year: "numeric",
          })
        : "";

    useEffect(() => {
        fetchExchangeRates()
            .then(({ dataHeader }) => {
                setExchangeHeader(dataHeader);
            })
            .catch((err) => console.error("fetch error", err));
    }, []);

    if (pathname === "/detail" && params?.currency_name_th) {
        return (
            <View className="flex">
                <Text className="text-black text-xl font-semibold" numberOfLines={1} style={{ width: 200 }}>
                    {params.currency_name_th}
                </Text>
                <Text className="text-slate-500" numberOfLines={1} style={{ width: 200 }}>
                    {params.currency_name_eng}
                </Text>
            </View>
        );
    }

    return (
        <View className="flex">
            <Text className="text-black text-xl font-semibold">อัตราแลกเปลี่ยน</Text>
            {formatted ? <Text className="text-black">อัปเดตล่าสุด {formatted}</Text> : null}
        </View>
    );
}

export default CustomHeader;
