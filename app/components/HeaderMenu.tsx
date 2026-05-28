import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

export default function HeaderMenu() {
    const [open, setOpen] = useState(false);

    const go = (path: string) => {
        setOpen(false);
        router.push(path as never);
    };

    return (
        <>
            <Pressable onPress={() => setOpen(true)} hitSlop={10}>
                <View style={{ marginRight: 20 }}>
                    <Ionicons name="menu" size={28} color="black" />
                </View>
            </Pressable>

            <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
                <Pressable onPress={() => setOpen(false)} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.15)" }}>
                    <View
                        style={{
                            position: "absolute",
                            top: 60,
                            right: 12,
                            backgroundColor: "white",
                            borderRadius: 10,
                            paddingVertical: 6,
                            minWidth: 180,
                            shadowColor: "#000",
                            shadowOpacity: 0.15,
                            shadowRadius: 12,
                            shadowOffset: { width: 0, height: 4 },
                            elevation: 6,
                        }}
                    >
                        <MenuItem icon="log-out-outline" label="Exit" onPress={() => go("/logout")} danger />
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

function MenuItem({
    icon,
    label,
    onPress,
    danger,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
    danger?: boolean;
}) {
    const color = danger ? "#dc2626" : "#111";
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 12,
                gap: 12,
                backgroundColor: pressed ? "#f3f4f6" : "transparent",
            })}
        >
            <Ionicons name={icon} size={20} color={color} />
            <Text style={{ color, fontSize: 15 }}>{label}</Text>
        </Pressable>
    );
}
