import { useEffect, ReactNode, useCallback } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATION_Y = -SCREEN_HEIGHT + 50
const MIN_TRANSLATION_Y = -SCREEN_HEIGHT / 8

interface BottomSheetProps {
    children?: ReactNode
}

export const BottomSheet = ({ children }: BottomSheetProps) => {
    const TY = useSharedValue(0)
    const context = useSharedValue({ y: 0 })

    const srollTo = useCallback((dimension: number) => {
        'worklet';
        TY.value = withSpring(dimension, { damping: 50 })
    }, [])

    const gesture = Gesture.Pan().onStart(() => {
        context.value = { y: TY.value }
    })
        .onUpdate((event) => {
            TY.value = event.translationY + context.value.y
            TY.value = Math.max(TY.value, MAX_TRANSLATION_Y)
            //TY.value = Math.min(TY.value, MIN_TRANSLATION_Y)
        })
        .onEnd(() => {
            if (TY.value <= MAX_TRANSLATION_Y) {
                srollTo(-SCREEN_HEIGHT + 100)
            } else if (TY.value > MIN_TRANSLATION_Y) {
                srollTo(MIN_TRANSLATION_Y)
            }
        })

    const bottomSheetAnim = useAnimatedStyle(() => ({
        transform: [{
            translateY: TY.value
        }]
    }))

    useEffect(() => {
        srollTo(MIN_TRANSLATION_Y)
    })
    return (
        <GestureDetector gesture={gesture}>

            <Animated.View style={[style.bottomSheetContainer, bottomSheetAnim]} className="bg-[#252525] w-screen">
                <View className="bg-slate-100 self-center w-1/5 h-2 rounded mt-5" />
                <View className="flex-1">
                    {children}
                </View>
            </Animated.View>
        </GestureDetector>
    )
}

const style = StyleSheet.create({
    bottomSheetContainer: {
        position: 'absolute',
        height: SCREEN_HEIGHT,
        top: SCREEN_HEIGHT,
        borderRadius: 25,
    },
})