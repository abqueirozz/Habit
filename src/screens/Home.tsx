import { View, Text, ScrollView, Alert } from "react-native";
import { Header } from "../components/Header";
import { HabitDay, HABIT_SIZE } from "../components/HabitDay";
import { generateCellsDays } from "../utils/generateCellsDays";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { api } from "../lib/axios";
import { useCallback, useState } from "react";
import Loading from "../components/Loading";
import dayjs from "dayjs";
import { store, keys} from "../lib/store";

const week_days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const { complementDays, dates } = generateCellsDays()

export function Home() {
    const { navigate } = useNavigation()
    const [isLoading, setIsLoading] = useState(true)
    const [summary, setSummary] = useState<SummaryType[] | null>(null)

    type SummaryType = {
        amount: number
        date: string
        id: string
        completedHabits: number
    }

    async function fecthSummary() {
        setIsLoading(true)
        try {
       

        } catch (error) {
            Alert.alert('Error', "Deu ruim")
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fecthSummary()
    }, []))

    return (
        <View className="bg-background flex-1 px-8 pt-16">
            <Header />
            <View className=" flex flex-row mt-6 mb-2">
                {
                    week_days.map((day, index) => (
                        <Text className="text-zinc-400 text-xl font-bold text-center mx-1" key={`${day}_${index}`}
                            style={{ width: HABIT_SIZE }}>
                            {day}</Text>
                    ))
                }
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {
                    summary ?
                        (
                            <View className="flex flex-wrap flex-row">
                                {
                                    dates.map((days) => {
                                        const dayInSummary = summary.find(sum => { return dayjs(days).isSame(sum.date, 'day') })

                                        return (<HabitDay amount={dayInSummary?.amount} date={days} completed={dayInSummary?.completedHabits} key={days.toString()}
                                            onPress={() => navigate('habit', { date: days.toISOString() })}
                                        />)
                                    })
                                }
                                {/* {
                            complementDays.map((_, index) => (
                                <View key={index} className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-700 opacity-40'
                                    style={{ width: HABIT_SIZE, height: HABIT_SIZE }} />
                            ))
                        } */}
                            </View>
                        )
                        :
                        <Loading />
                }

            </ScrollView>
        </View>
    )
}