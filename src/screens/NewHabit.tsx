import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { FormEvent, createRef, useState } from "react";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";
import { store , keys} from "../lib/store";
import { useNavigation } from "@react-navigation/native";
interface FormInterface {
    title: string
    week_days: number[]
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function NewHabit() {
    const [title, setTitle] = useState<string>('')
    const [days, setDays] = useState<number[]>([])
    const { navigate } = useNavigation()


    function handleCheckDay(day: number) {
        if (days.includes(day)) {
            setDays(prev => prev.filter((checkbox) => checkbox !== day))
        } else {
            setDays(prev => [...prev, day])
        }
    }

    function createNewHabit() {

        try {
            if (title.trim().length === 0 || days.length === 0) {
                Alert.alert('Ops','falta campos para serem preenchidos')
                return;
            }
    
            const newHabit: FormInterface = {
                title,
                week_days: days
            }
            api.post('habits', newHabit)
            //store.set(keys.HABITS, newHabit)
            Alert.alert('Sucesso','Novo hábito criado')
            navigate('home')
        } catch (error) {
            Alert.alert('Ops','erro no servidor')
            console.log(error)
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <BackButton />
                <Text className="mt-6 text-white font-extrabold text-3xl">What is your habit?</Text>
                <TextInput
                    onChangeText={setTitle}
                    value={title}
                    placeholder="What you going to do?"
                    placeholderTextColor={colors.zinc[400]}
                    className="h-12 pl-4 rounded-lg my-3 border border-zinc-700 bg-zinc-800 text-white focus:border-2 focus:border-green-500"
                />
                <Text className="my-3 text-white font-bold text-base">How often?</Text>
                {
                    daysOfWeek.map((day, index) => (
                        <CheckBox title={day} key={day}
                            onPress={() => handleCheckDay(index)}
                            checked={days.includes(index)} />
                    ))
                }
                <TouchableOpacity onPress={createNewHabit}
                    className="w-full h-14 flex-row items-center justify-center bg-green-700 rounded-md mt-6"
                    activeOpacity={0.7}
                >
                    <Text className="ml-2 font-semibold text-base text-white">Confirm</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}