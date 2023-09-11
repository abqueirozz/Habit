import { useRoute, useNavigation } from "@react-navigation/native";
import { ScrollView, View, Text, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import Loading from "../components/Loading";
import { keys, store } from "../lib/store";

interface HabitProps {
    date: string
}
interface dayInfoResponse {
    possibleHabits: {
        title: string
        created_at: string
        id: string
    }[]

    completedHabits: string[]
}
export function Habit() {
    const [isLoading, setIsLoading] = useState(true)
    const [dayInfo, setDayInfo] = useState<dayInfoResponse>()
    const [completedHabits, setCompletedHabits] = useState<string[]>([])

    const { navigate } = useNavigation()
    const route = useRoute()
    const { date } = route.params as HabitProps

    const percentageCompleted = dayInfo?.possibleHabits.length ?
        Math.round(100 * completedHabits.length / dayInfo!.possibleHabits.length)
        : 0

    const parseDate = dayjs(date)
    const DOW = parseDate.format('dddd')
    const DM = parseDate.format('DD / MM')
    const isToday = dayjs(date).isAfter(new Date().setUTCHours(0, 0, 0, 0))


    async function fetchListHabits() {
        try {
            setIsLoading(true)
            //const data = await store.get(keys.HABITS)
            const { data } = await api.get<dayInfoResponse>('/days', {
                params: { date }
            })

            setDayInfo(data)
            setCompletedHabits(data.completedHabits)

        } catch (error) {
            console.log(error)
            Alert.alert('OPS', 'Server Error')
        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleToggleHabit(habitId: string) {
        try {
            await api.patch(`/habits/${habitId}/toogle`)
            if (completedHabits.includes(habitId)) {
                setCompletedHabits(prev => prev.filter(id => id !== habitId))
            } else {
                setCompletedHabits(prev => [...prev, habitId])
            }
        } catch (error) {
            console.log(error)
            Alert.alert('OPS', 'Server Error')
        }
    }

    useEffect(() => {
        fetchListHabits()
    }, [])

    if (isLoading) {
        return (<Loading />)
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <BackButton />
                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">{DOW}</Text>
                <Text className="text-white font-extrabold text-3xl">{DM}</Text>
                <ProgressBar PBValue={percentageCompleted} />
                <View className="mt-6">
                    {
                        dayInfo?.possibleHabits.length ?
                            (
                                dayInfo?.possibleHabits.map(el => (
                                    <CheckBox key={el.id} title={el.title}
                                        checked={completedHabits.includes(el.id)}
                                        onPress={() => handleToggleHabit(el.id)}
                                        disabled={!isToday} />
                                ))
                            )
                            : (
                                <View className="flex-1 justify-center items-center">
                                    <Text className="text-white text-xl font-bold mb-2">
                                        You don't have any habits.
                                    </Text>
                                    <Text className="text-violet-500 text-lg font-semibold underline active:text-violet-300"
                                        onPress={() => navigate('new')}>
                                        Try to create some clickinh here.
                                    </Text>
                                </View>
                            )

                    }
                </View>
                {
                    !isToday && (
                        <Text className="text-red-600 text-lg text-center">You can't update past dates</Text>
                    )
                }
            </ScrollView>
        </View>
    )
}