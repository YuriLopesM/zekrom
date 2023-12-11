import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks";
import dayjs from 'dayjs';

import { FakeData, HourPoints, MonthlyData, UserData, WarningType } from "../types";
import { useAuth } from "./AuthContext";

interface FakeContextData {
  data: FakeData[];
  users: UserData[];
  hourPoints: HourPointsFormatted[];
  selectedDate: Date;
  handleAddMonth: () => void;
  handleSubtractMonth: () => void;
  handleDeleteUser: (id: string) => void;
  handleChangeAbsenceApproval: ({ date, isApproved }: { date: Date, isApproved: boolean }) => void;
}

interface FakeDataProviderProps {
  children: ReactNode;
}

interface HourPointsFormatted extends HourPoints {
  user: UserData;
}

export const FakeDataContext = createContext({} as FakeContextData);

export const FakeDataProvider = ({ children }: FakeDataProviderProps) => {
  const { userList } = useAuth();

  const initialDataState = userList.map((user) => {
    const hourPoints = generateHourPoints(new Date())

    return {
      user,
      hourPoints,
      monthlyData: [
        {
          positiveCompTime: calculatePositiveHours(hourPoints, dayjs().toDate()),
          negativeCompTime: calculateNegativeHours(hourPoints, dayjs().toDate()),
          date: dayjs().toDate(),
        },
        {
          positiveCompTime: calculatePositiveHours(hourPoints, dayjs().toDate()),
          negativeCompTime: calculateNegativeHours(hourPoints, dayjs().toDate()),
          date: dayjs().subtract(1, 'month').toDate(),
        },
        {
          positiveCompTime: calculatePositiveHours(hourPoints, dayjs().toDate()),
          negativeCompTime: calculateNegativeHours(hourPoints, dayjs().toDate()),
          date: dayjs().subtract(2, 'month').toDate(),
        }
      ],
    }
  })

  const [data, setData] = useLocalStorage<FakeData[]>('data:zekron', initialDataState)
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // setData([
    //   {
    //     user: {
    //       id: userAuthenticated?.id || '09d1d186-ce25-4203-9464-5148b49a95bd',
    //       name: userAuthenticated?.name || 'Yuri Lopes Machado',
    //       registration: userAuthenticated?.registration || '000001',
    //       sector: userAuthenticated?.sector || 'Administração',
    //       schedule: userAuthenticated?.schedule || '1 - 08h-12h/13h-17h',
    //       location: userAuthenticated?.location || 'Matriz - Criciúma/SC'
    //     },
    //     monthlyData: [
    //       {
    //         positiveCompTime: '08:00',
    //         negativeCompTime: '00:00',
    //         date: dayjs().subtract(1, 'month').toDate(),
    //       },
    //       {
    //         positiveCompTime: '01:00',
    //         negativeCompTime: '06:00',
    //         date: dayjs().toDate(),
    //       }
    //     ],
    //     absences: [
    //       {
    //         date: dayjs('05/12/2023').toDate(),
    //         justification: 'Atestado Médico',
    //       },
    //       {
    //         date: dayjs('04/12/2023').toDate(),
    //         justification: 'Atestado Médico',
    //         isApproved: true
    //       },
    //       {
    //         date: dayjs('01/12/2023').toDate(),
    //         justification: 'Atestado Médico',
    //         isApproved: false
    //       }
    //     ]
    //   }
    // ])
  }, [])

  // Monthly Data

  const calculateMonthBalance = (positiveCompTime: string, negativeCompTime: string) => {
    const pos = positiveCompTime.split(':').reduce((acc, curr) => acc + Number(curr) * 60, 0)
    const neg = negativeCompTime.split(':').reduce((acc, curr) => acc + Number(curr) * 60, 0)

    const balance = pos - neg;
    return formatBalance(balance);
  }

  function formatBalance(balance: number) {
    if (balance === 0) return '00:00';

    const hours = Math.floor(balance / 60);
    const minutes = balance % 60;

    const hoursFormatted = hours > 0 ? String(hours).padStart(2, '0') : String(hours)[0] + String(hours).split('-')[1].padStart(2, '0');
    const minutesFormatted = String(minutes).padStart(2, '0');

    return `${hoursFormatted}:${minutesFormatted}`;
  }

  const calculateTotalBalance = (monthlyData: MonthlyData[], targetMonth: number) => {
    const balance = monthlyData.reduce((acc, curr) => {
      if (curr.date.getMonth() + 1 > targetMonth) return acc;

      const pos = curr.positiveCompTime.split(':').reduce((acc, curr) => acc + Number(curr) * 60, 0)
      const neg = curr.negativeCompTime.split(':').reduce((acc, curr) => acc + Number(curr) * 60, 0)

      return acc + (pos - neg);
    }, 0);

    return formatBalance(balance);
  }

  // Formatted Data
  useEffect(() => {
    if (!data || !!data[0].monthlyData[0].monthBalance) return;

    const formattedData = data.map(({ monthlyData, ...rest }) => {
      const formattedMonthlyData: MonthlyData[] = monthlyData?.map(({ positiveCompTime, negativeCompTime, date, ...rest }) => {
        return {
          positiveCompTime,
          negativeCompTime,
          date,
          monthBalance: calculateMonthBalance(positiveCompTime, negativeCompTime),
          totalBalance: calculateTotalBalance(monthlyData, date.getMonth() + 1),
          ...rest
        }
      })

      return {
        ...rest,
        monthlyData: formattedMonthlyData
      }
    });

    setData(formattedData);
  }, [data])

  const filterBySelectedDate: <T extends { date: Date }>(data: T[]) => T[] = (data) => {
    return data.filter((item) => {
      const date = dayjs(selectedDate).toDate();
      const itemDate = dayjs(item.date).toDate();

      return date.getMonth() === itemDate.getMonth() && date.getFullYear() === itemDate.getFullYear();
    })
  }

  const users = data.map(({ user }) => user);

  const hourPoints: HourPointsFormatted[] = data.map(({ hourPoints, user }) => {
    if (!hourPoints) return [];

    const filteredHourPoints = filterBySelectedDate(hourPoints);

    return filteredHourPoints.map(item => {
      const formattedItem = {
        ...item,
        user
      }

      return formattedItem;
    })
  })[0];

  // Date Controller
  const handleAddMonth = () => {
    const newDate = new Date(selectedDate.setMonth(selectedDate.getMonth() + 1));
    setSelectedDate(newDate);
  }

  const handleSubtractMonth = () => {
    const newDate = new Date(selectedDate.setMonth(selectedDate.getMonth() - 1));
    setSelectedDate(newDate);
  }

  // Users

  const handleDeleteUser = (id: string) => {
    const hasConfirmed = confirm('Deseja realmente excluir este usuário?')

    if (!hasConfirmed) return;

    const newData = data.filter(item => item.user.id !== id);

    setData(newData);
  }

  // Absences
  const handleChangeAbsenceApproval = ({ date, isApproved }: { date: Date, isApproved: boolean }) => {
    const newData = data.map(item => {
      const absence = item.absences?.find(absence => absence.date === date);

      if (!absence) return item;

      if (isApproved === absence.isApproved) {
        const hasConfirmed = confirm('Deseja retirar a aprovação/desaprovação desta ausência?');

        if (!hasConfirmed) return item;

        absence.isApproved = undefined;
        return item;
      }

      absence.isApproved = isApproved;

      const hasConfirmed = confirm(`Deseja realmente ${isApproved ? 'aprovar' : 'desaprovar'} esta ausência?`);

      if (!hasConfirmed) {
        absence.isApproved = undefined;
        return item;
      }

      return item;
    })

    setData(newData);
  }

  // Hour Points
  useEffect(() => {
    const newHours = generateHourPoints(selectedDate);

    if (!newHours) return;

    const newData = data.map(item => {
      if (item.hourPoints) {
        const hasHourPointOnSelectedMonth = item.hourPoints.find(hourPoint => {
          const hourPointMonth = new Date(hourPoint.date).getMonth();
          const selectedMonth = new Date(selectedDate).getMonth();

          return hourPointMonth === selectedMonth;
        });

        if (hasHourPointOnSelectedMonth) return item;


        return {
          ...item,
          hourPoints: [...item.hourPoints, ...newHours]
        }
      };

      return {
        ...item,
        hourPoints: newHours,
      }
    })

    setData(newData);
  }, [selectedDate])

  function generateHourPoints(selectedDate: Date) {
    const today = dayjs().hour(0).minute(0).second(0).toDate();
    const lastDayOfMonth = dayjs(selectedDate).endOf('month').hour(0).minute(0).second(0).toDate();

    if (
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    ) {
      const hourPoints = recursiveCreateHourPoint(today, '1');
      return hourPoints;
    }

    if (
      selectedDate.getMonth() < today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    ) {
      const hourPoints = recursiveCreateHourPoint(lastDayOfMonth, '1');
      return hourPoints;
    }
  }

  function recursiveCreateHourPoint(date: Date, scaleId: string): HourPoints[] {
    const firstDayOfMonth = dayjs(date).startOf('month').toDate();

    const hourPoint = {
      date,
      scaleId,
      annotation: [] as string[],
      situations: [
        {
          hour: '08:00',
          description: 'Crédito BH',
          status: 'wrong' as 'wrong' | 'normal' | undefined
        }
      ],
      warnings: [
        {
          description: 'Pendente',
          type: WarningType.NEUTRAL
        }
      ]
    }

    const newDate = dayjs(date).subtract(1, 'day').hour(0).minute(0).second(0).toDate();
    if (newDate <= firstDayOfMonth) {
      return [hourPoint]
    }

    return [hourPoint, ...recursiveCreateHourPoint(newDate, scaleId)];
  }

  function calculateNegativeHours(hourPoints?: HourPoints[], date?: Date) {
    if (!hourPoints) return '00:00';
    if (!date) date = dayjs().toDate()

    const negativeHours = hourPoints?.reduce((acc, curr) => {
      if (curr.situations && curr.situations[0].status === 'wrong' && dayjs(curr.date).month() === dayjs(date).month() && dayjs(curr.date).year() === dayjs(date).year()) {
        return acc + curr.situations[0].hour.split(':').reduce((acc, curr) => acc + Number(curr) * 60, 0);
      }

      return acc;
    }, 0);

    return formatBalance(negativeHours);
  }

  function calculatePositiveHours(hourPoints?: HourPoints[], date?: Date) {
    if (!hourPoints) return '00:00';
    if (!date) date = dayjs().toDate()

    const positiveHours = hourPoints?.reduce((acc, curr) => {
      if (curr.situations && curr.situations[0].status === 'normal' && dayjs(curr.date).month() === dayjs(date).month() && dayjs(curr.date).year() === dayjs(date).year()) {
        return acc + curr.situations[0].hour.split(':').reduce((acc, curr) => acc + Number(curr) * 60, 0);
      }

      return acc;
    }, 0);

    return formatBalance(positiveHours);
  }

  return <FakeDataContext.Provider value={{
    data,
    users,
    hourPoints,
    selectedDate,
    handleAddMonth,
    handleSubtractMonth,
    handleDeleteUser,
    handleChangeAbsenceApproval
  }}>{children}</FakeDataContext.Provider>;
};

export const useFakeData = () => {
  return useContext(FakeDataContext);
};