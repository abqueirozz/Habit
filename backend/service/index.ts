import { z } from "zod";
import { prisma } from "./prisma";

  async function habits(habitInput:any) {
    const habitsBody = z.object({
      title: z.string(),
      week_days: z.array(z.number().max(6).min(0)),
    });

    const { title, week_days } = habitsBody.parse(habitInput);

    return await prisma.habit.create({
      data: {
        title,
        created_at: new Date(),
        week_days: {
          create: week_days.map((wd) => {
            return { week_day: wd };
          }),
        },
      },
    });
  };

  async function days (habitInput:any) {
    const daysParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = daysParams.parse(habitInput);
    date.setUTCHours(23, 59, 59, 999);

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        week_days: {
          some: {
            week_day: date.getDay(),
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: date,
      },
      include: {
        habits: true,
      },
    });

    const completedHabits = day?.habits.map((habit) => habit.habit_id) ?? [];

    return { possibleHabits, completedHabits };
  };

  async function updateByID (habitInput:any) {
    const idParam = z.object({
      id: z.string().uuid(),
    });

    const { id } = idParam.parse(habitInput);
    const today = new Date();
    today.setUTCHours(23, 59, 59, 999);

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });
    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
  };

  async function summary(params:any) {
    const summary = await prisma.$queryRaw`
    SELECT D.id, D.date,
    (SELECT cast(count(*) as FLOAT) FROM DayHabit DH WHERE DH.day_id = D.id) as completedHabits,
    (SELECT cast(count(*) as FLOAT) FROM HabitWeekDays HWD JOIN Habit H ON H.id = HWD.habit_id WHERE HWD.week_day = cast(strftime('%w',D.date/1000.0,'unixepoch') as INT) AND H.created_at <= D.date) as amount
     FROM Day D
    `;

    return summary;
  };

