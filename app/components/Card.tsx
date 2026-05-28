import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

function Card() {
    return (
        <Pressable onPress={() => router.push("/detail")}>
            <View className="flex flex-row border-b border-slate-200" style={{ paddingVertical: 14 }}>
                <View className="flex-1 flex-row items-center gap-4">
                    <View className="h-14 w-14 bg-gray-200 rounded-full" />
                    <View>
                        <Text className="font-semibold">ไทย</Text>
                        <Text>ดอลลา</Text>
                    </View>
                </View>
                <View className="flex justify-center">
                    <View className="flex items-end justify-end">
                        <Text className="text-right font-semibold">3.63</Text>
                        <Text className="text-right text-green-500">+0.1231</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default Card;
