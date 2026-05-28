import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

function logout() {
    return (
        <View className="flex-1 items-center flex justify-center" style={{ backgroundColor: "black", gap: 30 }}>
            <Text style={{ color: "white" }}>ปิดโปรแกรมแล้ว</Text>
            <Text style={{ color: "white" }}>Program terminated</Text>
            <Pressable
                onPress={() => router.push("/")}
                className="p-4 rounded-full border"
                style={{ borderColor: "white" }}
            >
                <Text style={{ color: "white" }}>เปิดโปรแกรมอีกครั้ง</Text>
            </Pressable>
        </View>
    );
}

export default logout;
