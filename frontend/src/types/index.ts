export interface UserData {
    id: string;
    name: string;
    registration: string;
    schedule: string;
    location: string;
    sector: string;
    imgUrl: string;
}

export interface MonthlyData {
    date: Date;
    positiveCompTime: string;
    negativeCompTime: string;
    totalBalance?: string;
    monthBalance?: string;
}

export interface Annotation {
    firstPunch: string;
    secondPunch: string;
    thirdPunch: string;
    fourthPunch: string;
}

export interface Absence {
    date: Date;
    justification: string;
    isApproved?: boolean;
}

export interface FakeData {
    user: UserData;
    monthlyData: MonthlyData[];
    absences?: Absence[];
    hourPoints?: HourPoints[];
}

export interface HourPoints {
    date: Date;
    scaleId: string;
    annotation?: Annotation;
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