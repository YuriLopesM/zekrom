// import { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { useLocalStorage } from ".";

// interface UserData {
//     id: string;
//     name: string;
//     registration: string;
//     schedule: string;
//     location: string;
// }

// interface MonthlyData {
//     month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
//     positiveCompTime: string;
//     negativeCompTime: string;
//     totalBalance?: string;
//     monthBalance?: string;
// }

// interface MonthlyDataFormatted extends Omit<MonthlyData, 'month'> {
//     user: UserData;
// }

// interface Absence {
//     date: string;
//     reason: string;
//     isApproved: boolean;
// }

// interface Data {
//     user: UserData;
//     monthlyData: MonthlyData[];
//     absences: Absence[];
// }

// export function useFakeData() {
//     const [data, setData] = useLocalStorage<Data[]>('data:zekron', [
//         {
//             user: {
//                 id: uuidv4(),
//                 name: 'Yuri Lopes Machado',
//                 registration: '000001',
//                 schedule: '1 - 08h-12h/13h-17h',
//                 location: 'Matriz - Criciúma/SC'
//             },
//             monthlyData: [
//                 {
//                     positiveCompTime: '08:00',
//                     negativeCompTime: '00:00',
//                     month: 11
//                 },
//                 {
//                     positiveCompTime: '01:00',
//                     negativeCompTime: '06:00',
//                     month: 12
//                 }
//             ],
//             absences: [
//                 {
//                     date: '05/09',
//                     reason: 'Atestado Médico',
//                     isApproved: true
//                 }
//             ]
//         }
//     ]);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [formattedMonthlyData, setFormattedMonthlyData] = useState<MonthlyDataFormatted[]>([]);
//     const [globalSettings, setGlobalSettings] = useLocalStorage<any>('global-settings:zekron', {});

//     // Monthly Data

//     const calculateMonthBalance = (positiveCompTime: string, negativeCompTime: string) => {
//         const pos = positiveCompTime.split(':').reduce((acc, curr) => acc + Number(curr) * 60, 0)
//         const neg = negativeCompTime.split(':').reduce((acc, curr) => acc + Number(curr) * 60, 0)

//         const balance = pos - neg;
//         return formatBalance(balance);
//     }

//     const formatBalance = (balance: number) => {
//         if (balance === 0) return '00:00';

//         const hours = Math.floor(balance / 60);
//         const minutes = balance % 60;

//         const hoursFormatted = hours > 0 ? String(hours).padStart(2, '0') : String(hours)[0] + String(hours).split('-')[1].padStart(2, '0');
//         const minutesFormatted = String(minutes).padStart(2, '0');

//         return `${hoursFormatted}:${minutesFormatted}`;
//     }

//     const calculateTotalBalance = (monthlyData: MonthlyData[], targetMonth: number) => {
//         const balance = monthlyData.reduce((acc, curr) => {
//             if (curr.month > targetMonth) return acc;

//             const pos = curr.positiveCompTime.split(':').reduce((acc, curr) => acc + Number(curr) * 60, 0)
//             const neg = curr.negativeCompTime.split(':').reduce((acc, curr) => acc + Number(curr) * 60, 0)

//             return acc + (pos - neg);
//         }, 0);

//         return formatBalance(balance);
//     }

//     // Formatted Data
//     useEffect(() => {
//         if (!data || !!data[0].monthlyData[0].monthBalance) return;

//         const formattedData = data.map(({ monthlyData, ...rest }) => {
//             const formattedMonthlyData: MonthlyData[] = monthlyData?.map(({ positiveCompTime, negativeCompTime, month, ...rest }) => {
//                 return {
//                     positiveCompTime,
//                     negativeCompTime,
//                     month,
//                     monthBalance: calculateMonthBalance(positiveCompTime, negativeCompTime),
//                     totalBalance: calculateTotalBalance(monthlyData, month),
//                     ...rest
//                 }
//             })

//             return {
//                 ...rest,
//                 monthlyData: formattedMonthlyData
//             }
//         });

//         setData(formattedData);
//     }, [data])

//     useEffect(() => {
//         const monthlyData: MonthlyDataFormatted[] = data.map(({ monthlyData, user }) => {
//             return monthlyData.filter(({ month }) => {
//                 const selectedMonth = new Date(selectedDate).getMonth() + 1;
//                 return month === selectedMonth;
//             }).map(item => {
//                 const formattedItem = {
//                     ...item,
//                     user
//                 }
    
//                 return formattedItem;
//             })
//         })[0];

//         setFormattedMonthlyData(monthlyData);
//     }, [data])

//     const users = data.map(({ user }) => user);

//     // Date Controller
//     const handleAddMonth = () => {
//         const newDate = new Date(selectedDate.setMonth(selectedDate.getMonth() + 1));
//         setSelectedDate(newDate);
//     }

//     const handleSubtractMonth = () => {
//         const newDate = new Date(selectedDate.setMonth(selectedDate.getMonth() - 1));
//         setSelectedDate(newDate);
//     }

//     // Users

//     const handleDeleteUser = (id: string) => {
//         const hasConfirmed = confirm('Deseja realmente excluir este usuário?')

//         if (!hasConfirmed) return;

//         const newData = data.filter(item => item.user.id !== id);

//         setData(newData);
//     }

//     return {
//         data,
//         monthlyData: formattedMonthlyData,
//         users,
//         selectedDate,
//         handleAddMonth,
//         handleSubtractMonth,
//         handleDeleteUser
//     }
// }