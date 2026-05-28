import React from "react";
import { Text, View } from "react-native";

function CustomHeader() {
    return (
        <View className="flex">
            <Text className="text-black text-xl font-semibold">อัตราแลกเปลี่ยน</Text>
            <Text className="text-black">อัปเดต 28 พ.ค. 2569</Text>
        </View>
    );
}

export default CustomHeader;
