import dayjs from 'dayjs'
import { TouchableOpacity, Dimensions, TouchableOpacityProps } from 'react-native'
import clsx from 'clsx'

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5
const DAY_MARGIN_BETWEEN = 8

export const HABIT_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface HabitDayProps extends TouchableOpacityProps {
    amount?: number
    completed?: number
    date: Date
}
export function HabitDay({ amount = 0, completed = 0, date, ...rest }: HabitDayProps) {
    const percentageCompleted = amount > 0 ? Math.round(100 * completed / amount) : 0

    const today = dayjs().startOf('day').toDate()
    return (
        <TouchableOpacity {...rest}
            style={{ width: HABIT_SIZE, height: HABIT_SIZE }}
            activeOpacity={0.7}
            className={clsx('rounded-lg border-2 m-1 ',
                {
                    [' bg-zinc-900  border-zinc-700']: percentageCompleted == 0,
                    [' bg-violet-900  border-violet-700']: percentageCompleted == 100,
                    [' bg-violet-700  border-violet-500']: percentageCompleted < 100 && percentageCompleted >= 80,
                    [' bg-violet-600  border-violet-400']: percentageCompleted < 80 && percentageCompleted >= 60,
                    [' bg-violet-500  border-violet-300']: percentageCompleted < 60 && percentageCompleted >= 40,
                    [' bg-violet-400  border-violet-200']: percentageCompleted < 40 && percentageCompleted >= 20,
                    [' bg-violet-300  border-violet-100']: percentageCompleted < 20 && percentageCompleted > 0,
                    [' border-white']: dayjs(date).isSame(today),
                })}
        >

        </TouchableOpacity>
    )
}