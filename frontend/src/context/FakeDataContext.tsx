import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks";
import { v4 as uuidv4 } from 'uuid';

interface FakeContextData {
  data: Data[];
  users: UserData[];
  monthlyData: MonthlyDataFormatted[];
  absences: AbsenceDataFormatted[];
  selectedDate: Date;
  handleAddMonth: () => void;
  handleSubtractMonth: () => void;
  handleDeleteUser: (id: string) => void;
  handleChangeAbsenceApproval: ({ date, isApproved }: { date: string, isApproved: boolean }) => void;
}

interface FakeDataProviderProps {
  children: ReactNode;
}

interface UserData {
  id: string;
  name: string;
  registration: string;
  schedule: string;
  location: string;
}

interface MonthlyData {
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  positiveCompTime: string;
  negativeCompTime: string;
  totalBalance?: string;
  monthBalance?: string;
}

interface MonthlyDataFormatted extends Omit<MonthlyData, 'month'> {
  user: UserData;
}

interface AbsenceDataFormatted extends Absence {
  user: UserData;
}

interface Absence {
  date: string;
  justification: string;
  isApproved?: boolean;
}

interface Data {
  user: UserData;
  monthlyData: MonthlyData[];
  absences: Absence[];
}

export const FakeDataContext = createContext({} as FakeContextData);

export const FakeDataProvider = ({ children }: FakeDataProviderProps) => {
  const [data, setData] = useLocalStorage<Data[]>('data:zekron', [
    {
      user: {
        id: uuidv4(),
        name: 'Yuri Lopes Machado',
        registration: '000001',
        schedule: '1 - 08h-12h/13h-17h',
        location: 'Matriz - Criciúma/SC'
      },
      monthlyData: [
        {
          positiveCompTime: '08:00',
          negativeCompTime: '00:00',
          month: 11
        },
        {
          positiveCompTime: '01:00',
          negativeCompTime: '06:00',
          month: 12
        }
      ],
      absences: [
        {
          date: '05/12/2023',
          justification: 'Atestado Médico',
        },
        {
          date: '04/12/2023',
          justification: 'Atestado Médico',
          isApproved: true
        },
        {
          date: '01/12/2023',
          justification: 'Atestado Médico',
          isApproved: false
        }
      ]
    }
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Monthly Data

  const calculateMonthBalance = (positiveCompTime: string, negativeCompTime: string) => {
    const pos = positiveCompTime.split(':').reduce((acc, curr) => acc + Number(curr) * 60, 0)
    const neg = negativeCompTime.split(':').reduce((acc, curr) => acc + Number(curr) * 60, 0)

    const balance = pos - neg;
    return formatBalance(balance);
  }

  const formatBalance = (balance: number) => {
    if (balance === 0) return '00:00';

    const hours = Math.floor(balance / 60);
    const minutes = balance % 60;

    const hoursFormatted = hours > 0 ? String(hours).padStart(2, '0') : String(hours)[0] + String(hours).split('-')[1].padStart(2, '0');
    const minutesFormatted = String(minutes).padStart(2, '0');

    return `${hoursFormatted}:${minutesFormatted}`;
  }

  const calculateTotalBalance = (monthlyData: MonthlyData[], targetMonth: number) => {
    const balance = monthlyData.reduce((acc, curr) => {
      if (curr.month > targetMonth) return acc;

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
      const formattedMonthlyData: MonthlyData[] = monthlyData?.map(({ positiveCompTime, negativeCompTime, month, ...rest }) => {
        return {
          positiveCompTime,
          negativeCompTime,
          month,
          monthBalance: calculateMonthBalance(positiveCompTime, negativeCompTime),
          totalBalance: calculateTotalBalance(monthlyData, month),
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

  const users = data.map(({ user }) => user);

  const monthlyData: MonthlyDataFormatted[] = data.map(({ monthlyData, user }) => {
    return monthlyData.filter(({ month }) => {
      const selectedMonth = new Date(selectedDate).getMonth() + 1;
      return month === selectedMonth;
    }).map(item => {
      const formattedItem = {
        ...item,
        user
      }

      return formattedItem;
    })
  })[0];

  const absences: AbsenceDataFormatted[] =
    data
      .map(({ absences, user }) => {
        return absences.map(item => {
          const formattedItem = {
            ...item,
            user
          }

          return formattedItem;
        })
      })[0]
      .filter(({ date }) => {
        const selectedMonth = new Date(selectedDate).getMonth() + 1;
        const selectedYear = new Date(selectedDate).getFullYear();

        const [_, month, year] = date.split('/').map(item => Number(item));

        return month === selectedMonth && year === selectedYear;
      });

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

  const handleChangeAbsenceApproval = ({ date, isApproved }: { date: string, isApproved: boolean }) => {
    const newData = data.map(item => {
      const absence = item.absences.find(absence => absence.date === date);

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

  return <FakeDataContext.Provider value={{
    data,
    users,
    monthlyData,
    absences,
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