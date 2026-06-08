import { Pressable, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";

type FilterButtonProps = {
    title: string;
    active: boolean;
    onPress: () => void;
};

export default function FilterButton({title,active,onPress, }: FilterButtonProps) {
    const { theme } = useTheme();

    return (
        <Pressable
            onPress={onPress}
            style={{
                width:  320,
                paddingHorizontal: 8,
                paddingVertical: 8,
                borderRadius: 10,

                backgroundColor: active
                    ? theme.primary
                    : theme.card,
                
            }}
        >
            <Text
                style={{
                    color: active
                        ? "#fff"
                        : theme.text,

                    fontWeight: "600",
                }}
            >
                {title}
            </Text>
        </Pressable>
    );
}