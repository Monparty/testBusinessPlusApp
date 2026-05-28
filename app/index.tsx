import { ScrollView, Text, View } from "react-native";
import Card from "./components/Card";

export default function Home() {
    return (
        <View className="flex-1 bg-white">
            <View className="flex flex-row justify-between items-center p-4">
                <Text className="text-slate-500 font-semibold">ประเทศ / สกุลเงิน</Text>
                <Text className="text-slate-500 font-semibold">บาท · เปลี่ยนแปลง</Text>
            </View>
            <ScrollView className="px-4 flex">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
                    <Card key={i} />
                ))}
            </ScrollView>
        </View>
    );
}
