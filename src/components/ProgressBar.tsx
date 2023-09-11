import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface ProgressBarProps {
    PBValue: number
}

export function ProgressBar({ PBValue = 0 }: ProgressBarProps) {
    const sharedProgress = useSharedValue(PBValue)
    const style = useAnimatedStyle(() => {
        return {
            width: `${sharedProgress.value}%`
        }
    })

    useEffect(() => {
        sharedProgress.value = withTiming(PBValue)
    }, [PBValue])

    return (
        <View className="w-full rounded-md bg-zinc-700 mt-4">
            <Animated.View className="h-3 rounded-md bg-violet-600"
                style={style} />
        </View>
    )
}