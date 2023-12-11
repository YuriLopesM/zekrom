export interface UserData {
    id: string;
    name: string;
    registration: string;
    schedule: string;
    location: string;
}

export interface MonthlyData {
    month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    positiveCompTime: string;
    negativeCompTime: string;
    totalBalance?: string;
    monthBalance?: string;
}

export interface Absence {
    date: string;
    justification: string;
    isApproved?: boolean;
}

export interface FakeData {
    user: UserData;
    monthlyData: MonthlyData[];
    absences: Absence[];
    hourPoints?: HourPoints[];
}

export interface HourPoints {
    date: Date;
    scaleId: string;
    annotation?: string;
    situations?: ISituation[];
    warnings?: IWarning[];
}

export interface ISituation {
    description: string;
    hour: string;
    status?: 'normal' | 'wrong';
}

export interface IWarning {
    description: string;
    type?: WarningType;
}

export enum WarningType {
    POSITIVE = 'positive',
    NEGATIVE = 'negative',
    NEUTRAL = 'neutral',
}