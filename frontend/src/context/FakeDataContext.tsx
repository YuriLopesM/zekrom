import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks";
import dayjs from 'dayjs';

import { Annotation, FakeData, HourPoints, MonthlyData, UserData, WarningType } from "../types";
import { useAuth } from "./AuthContext";

interface FakeContextData {
  data: FakeData[];
  users: UserData[];
  hourPoints: HourPointsFormatted[];
  selectedDate: Date;
  isModalOpen: boolean;
  newAnnotation?: NewAnnotation;
  handleAddMonth: () => void;
  handleSubtractMonth: () => void;
  handleDeleteUser: (id: string) => void;
  handleChangeAbsenceApproval: ({ date, isApproved }: { date: Date, isApproved: boolean }) => void;
  handleOpenAnnotationModal: (date: Date) => void;
  handleCloseAnnotationModal: () => void;
  handleAddPunchValue: (punch: string, value: string) => void;
  handleAddNewAnnotation: () => void;
}

interface NewAnnotation extends Annotation {
  date: Date;
}

interface FakeDataProviderProps {
  children: ReactNode;
}

interface HourPointsFormatted extends HourPoints {
  user: UserData;
}

export const FakeDataContext = createContext({} as FakeContextData);

export const FakeDataProvider = ({ children }: FakeDataProviderProps) => {
  const { userList, user: userAuthenticated } = useAuth();

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
        }
      ],
    }
  })

  const [data, setData] = useLocalStorage<FakeData[]>('data:zekron', initialDataState)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);

  const [newAnnotation, setNewAnnotation] = useState<NewAnnotation>({} as NewAnnotation);

  const handleOpenAnnotationModal = (date: Date) => {
    setModalOpen(true);
    setNewAnnotation({
      date,
      firstPunch: '',
      secondPunch: '',
      thirdPunch: '',
      fourthPunch: '',
    })
  }

  const handleCloseAnnotationModal = () => {
    setModalOpen(false);
    setNewAnnotation({} as NewAnnotation)
  }

  const handleAddPunchValue = (punch: string, value: string) => {
    setNewAnnotation(prev => ({
      ...prev as Annotation,
      date: prev.date,
      [punch]: value
    }))
  }

  const handleAddNewAnnotation = () => {
    if (!newAnnotation) return;

    const annotation: Annotation = {
      firstPunch: newAnnotation.firstPunch,
      secondPunch: newAnnotation.secondPunch,
      thirdPunch: newAnnotation.thirdPunch,
      fourthPunch: newAnnotation.fourthPunch,
    }

    if (Object.values(annotation).some(note => note === '')) return alert('Preencha todos os campos!')

    const newData = data.map(item => {
      if (item.user.id !== userAuthenticated?.id) return item;

      const newHourPoints = item.hourPoints?.map(hourPoint => {
        if (dayjs(hourPoint.date).isSame(dayjs(newAnnotation.date), 'day')) {
          const firstInterval = calculateDiffTime(newAnnotation.firstPunch, newAnnotation.secondPunch)
          const secondInterval = calculateDiffTime(newAnnotation.thirdPunch, newAnnotation.fourthPunch)
          const hoursWorking = firstInterval + secondInterval;

          const EIGHT_HOURS_IN_MINUTES = 480;

          if (hoursWorking > EIGHT_HOURS_IN_MINUTES) {
            return {
              ...hourPoint,
              annotation,
              situations: [
                {
                  hour: formatBalance(EIGHT_HOURS_IN_MINUTES),
                  description: 'Trabalhando',
                  status: 'normal' as 'wrong' | 'normal' | undefined
                },
                {
                  hour: formatBalance(hoursWorking - EIGHT_HOURS_IN_MINUTES),
                  description: 'Crédito BH',
                  status: 'normal' as 'wrong' | 'normal' | undefined
                }
              ],
              warnings: [
                {
                  description: 'Enviado',
                  type: WarningType.POSITIVE
                }
              ]
            }
          }

          return {
            ...hourPoint,
            annotation,
            situations: [
              {
                hour: formatBalance(hoursWorking),
                description: 'Trabalhando',
                status: 'normal' as 'normal' | 'wrong' | undefined
              }
            ],
            warnings: [
              {
                description: 'Enviado',
                type: WarningType.POSITIVE
              }
            ]
          }
        }

        return hourPoint;
      })
      return {
        ...item,
        hourPoints: newHourPoints,
        monthlyData: item.monthlyData?.map(monthlyData => {
          if (dayjs(monthlyData.date).isSame(dayjs(newAnnotation.date), 'month')) {
            const positiveCompTime = calculatePositiveHours(newHourPoints, monthlyData.date);
            const negativeCompTime = calculateNegativeHours(newHourPoints, monthlyData.date);
            const monthBalance = calculateMonthBalance(positiveCompTime, negativeCompTime);

            const totalBalance =
              dayjs(monthlyData.date).isSame(dayjs(new Date()), 'month')
                ? monthBalance
                : monthlyData.totalBalance
                  ? formatBalance(transformTimeTextToMinutes(monthBalance) + transformTimeTextToMinutes(monthlyData.totalBalance))
                  : monthBalance;

            return {
              ...monthlyData,
              positiveCompTime,
              negativeCompTime,
              monthBalance,
              totalBalance
            }
          }

          return monthlyData;
        })
      }
    })

    setData(newData);
    alert('Anotação inserida com sucesso!');
    handleCloseAnnotationModal();
  }

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
    const pos = transformTimeTextToMinutes(positiveCompTime)
    const neg = transformTimeTextToMinutes(negativeCompTime)

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
    if (!data || !!data[0].monthlyData[0].totalBalance) return;

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

    if (dayjs(selectedDate).isBefore(today, 'month')) return;

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

    const isNotExpired = dayjs(date).diff(new Date(), 'day') > -7
    const hourPoint = {
      date,
      scaleId,
      annotation: {} as Annotation,
      situations: [
        {
          hour: '08:00',
          description: 'Débito BH',
          status: 'wrong' as 'wrong' | 'normal' | undefined
        }
      ],
      warnings: [
        {
          description: isNotExpired ? 'Pendente' : 'Bloqueado',
          type: isNotExpired ? WarningType.NEUTRAL : WarningType.NEGATIVE
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

    const debitHours = hourPoints.map(hourPoint => hourPoint.situations?.filter(situation => situation.description === 'Débito BH')).flat().reduce((acc, curr) => {
      if (curr) {
        return acc + transformTimeTextToMinutes(curr.hour);
      }

      return acc;
    }, 0);

    return formatBalance(debitHours);
  }

  function calculatePositiveHours(hourPoints?: HourPoints[], date?: Date) {
    if (!hourPoints) return '00:00';
    if (!date) date = dayjs().toDate()

    const creditHours = hourPoints.map(hourPoint => hourPoint.situations?.filter(situation => situation.description === 'Crédito BH')).flat().reduce((acc, curr) => {
      if (curr) {
        return acc + transformTimeTextToMinutes(curr.hour);
      }

      return acc;
    }, 0);

    return formatBalance(creditHours);
  }

  function calculateDiffTime(fromTime: string, toTime: string) {
    const [hoursFromTime, minutesFromTime] = fromTime.split(':');
    const [hoursToTime, minutesToTime] = toTime.split(':');

    const diffTime = dayjs().hour(+hoursToTime).minute(+minutesToTime).diff(dayjs().hour(+hoursFromTime).minute(+minutesFromTime), 'minute');

    return diffTime;
  }

  function transformTimeTextToMinutes(time: string) {
    const [hours, minutes] = time.split(':');

    return Number(hours) * 60 + Number(minutes);
  }

  return <FakeDataContext.Provider value={{
    data,
    users,
    hourPoints,
    selectedDate,
    isModalOpen,
    newAnnotation,
    handleAddMonth,
    handleSubtractMonth,
    handleDeleteUser,
    handleChangeAbsenceApproval,
    handleOpenAnnotationModal,
    handleCloseAnnotationModal,
    handleAddPunchValue,
    handleAddNewAnnotation
  }}>{children}</FakeDataContext.Provider>;
};

export const useFakeData = () => {
  return useContext(FakeDataContext);
};