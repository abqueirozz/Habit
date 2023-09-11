import { View, ScrollView, Text, TextInput, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface CheckBoxPros extends TouchableOpacityProps {
    title: string
    checked?: boolean
}

export function CheckBox({ checked, title, ...rest }: CheckBoxPros) {
    return (
        <TouchableOpacity {...rest} className=" flex-row mb-2 items-center" activeOpacity={0.7}>
            {
                checked ?
                    <Animated.View
                        className="h-8 bg-green-700 rounded-lg items-center justify-center"
                        entering={ZoomIn}
                        exiting={ZoomOut}>
                        <Feather
                            name='check'
                            size={32}
                            color={colors.zinc[300]}
                        />
                    </Animated.View>
                    :
                    <View className="h-8 w-8 bg-zinc-800 border border-zinc-600 rounded-lg items-center justify-center" />
            }
            <Text className="text-white text-base ml-3 font-semibold">
                {title}
            </Text>
        </TouchableOpacity>
    )
}