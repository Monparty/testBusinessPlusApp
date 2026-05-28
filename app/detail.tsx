import React from "react";
import { ScrollView, Text, View } from "react-native";
import CardDetail from "./components/CardDetail";

function detail() {
    return (
        <View className="flex-1 bg-white">
            <View className="flex flex-row p-4">
                <Text className="text-slate-500 font-semibold py-4">อัตราแลกเปลี่ยน · วันนี้</Text>
            </View>
            <ScrollView className="px-4 flex">
                <View style={{ marginBottom: 4 }}>
                    <View className="flex-1 flex-row gap-4 items-end" style={{ marginBottom: 6 }}>
                        <Text className="text-black font-semibold" style={{ fontSize: 48 }}>
                            36.4500
                            <Text className="text-slate-500 font-medium px-4" style={{ fontSize: 14 }}>
                                บาท
                            </Text>
                        </Text>
                    </View>
                    <View
                        className="bg-green-100 rounded-full"
                        style={{
                            alignSelf: "flex-start",
                            paddingHorizontal: 18,
                            paddingVertical: 4,
                            backgroundColor: "#dcfce7",
                        }}
                    >
                        <Text className="font-semibold" style={{ color: "#166534" }}>
                            +0.1700 · +0.47% 7 วัน
                        </Text>
                    </View>
                </View>
                <Text className="text-slate-500 font-semibold" style={{ paddingVertical: 14 }}>
                    ย้อนหลัง 7 วัน
                </Text>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
                    <CardDetail key={i} />
                ))}
            </ScrollView>
        </View>
    );
}

export default detail;
