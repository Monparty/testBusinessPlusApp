import { Text, View } from "react-native";

type CardDetailProps = {
    period: string;
    rate: string;
    change?: number;
};

function formatThaiDate(period: string) {
    const d = new Date(period);
    if (Number.isNaN(d.getTime())) return period;
    return d.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function CardDetail({ period, rate, change }: CardDetailProps) {
    const hasChange = typeof change === "number" && !Number.isNaN(change);
    const changeText = hasChange
        ? `${change >= 0 ? "+" : ""}${change.toFixed(4)}`
        : "-";
    const changeColor = !hasChange
        ? "text-slate-400"
        : change >= 0
            ? "text-green-600"
            : "text-red-600";

    return (
        <View className="flex flex-row border-b border-slate-200" style={{ paddingVertical: 18 }}>
            <View className="flex flex-1 flex-row justify-between">
                <View>
                    <Text className="text-right font-semibold">{formatThaiDate(period)}</Text>
                </View>
                <View className="flex flex-row gap-4">
                    <Text className="text-right font-semibold">{rate}</Text>
                    <Text className={`text-right font-semibold ${changeColor}`}>{changeText}</Text>
                </View>
            </View>
        </View>
    );
}

export default CardDetail;
