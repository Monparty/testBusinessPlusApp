import "./global.css";

import { Stack } from "expo-router";
import CustomHeader from "./components/CustomHeader";
import HeaderMenu from "./components/HeaderMenu";

export default function Layout() {
    // rnfes
    return (
        <Stack
            screenOptions={{
                animation: "slide_from_right",
                headerStyle: {
                    backgroundColor: "white",
                },
                headerTitle: () => <CustomHeader />,
                headerRight: () => <HeaderMenu />,
            }}
        />
    );
}
