import { ExchangeRate } from "@/services/exchangeRate";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

type CardProps = {
    data: ExchangeRate;
};

function Card({ data }: CardProps) {
    return (
        <Pressable onLongPress={() => router.push("/detail")}>
            <View className="flex flex-row border-b border-slate-200" style={{ paddingVertical: 14 }}>
                <View className="flex-1 flex-row items-center gap-4">
                    <View className="h-14 w-14 bg-gray-200 rounded-full flex items-center justify-center">
                        <Text className="font-semibold" style={{ fontSize: 12 }}>
                            {data?.currency_id}
                        </Text>
                    </View>
                    <View>
                        <Text className="font-semibold">{data?.currency_name_th}</Text>
                        <Text style={{ fontSize: 12, marginTop: 4 }}>{data?.currency_name_eng}</Text>
                    </View>
                </View>
                <View className="flex justify-center">
                    <View className="flex items-end justify-end">
                        <Text className="text-right font-semibold">1 {data?.currency_id}</Text>
                        <Text className="text-right text-green-500">฿{data?.buying_sight}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default Card;
