import { Text, View } from "react-native";

function CardDetail() {
    return (
        <View className="flex flex-row border-b border-slate-200" style={{ paddingVertical: 18 }}>
            <View className="flex flex-1 flex-row justify-between">
                <View>
                    <Text className="text-right font-semibold">28 พ.ค. 2569</Text>
                </View>
                <View className="flex flex-row gap-4">
                    <Text className="text-right font-semibold">36.4500</Text>
                    <Text className="text-right font-semibold">+0.1200</Text>
                </View>
            </View>
        </View>
    );
}

export default CardDetail;
