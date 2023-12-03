import { ActionsButton } from "../ActionsButton";
import { HourNote } from "../HourNote";
import { SituationText, ISituation } from "../SituationText";
import { IWarning, WarningTag } from "../WarningTag";

import styles from "./styles.module.scss"

export interface HourPointProps {
    date: Date;
    scaleId: string;
    annotation?: string;
    situations?: ISituation[];
    warnings?: IWarning[];
}

export const HourPoint = ({
    date,
    scaleId,
    annotation,
    situations,
    warnings
}: HourPointProps) => {
    const formattedDate = date.toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'numeric'
    });

    const dayOfWeek = date.toLocaleString('pt-BR', {
        weekday: 'short'
    });

    const handleActionsClick = () => {
        console.log('Clicou em ações');
    }

    return (
        <div className={styles.hourPointContainer}>
            <div className={styles.date}>
                <p>{formattedDate} <span>{dayOfWeek}</span></p>
            </div>
            <div>
                <p>{scaleId}</p>
            </div>
            <div>
                <HourNote text={annotation} />	
            </div>
            <div className={styles.situationContainer}>
                {
                    situations?.map(situation => {
                        return (
                            <SituationText 
                                hour={situation.hour}
                                description={situation.description}
                                status={situation.status}
                                key={situation.hour}
                            />
                        )
                    })
                }
            </div>
            <div>
                {
                    warnings?.map(warning => {
                        return <WarningTag 
                                    type={warning.type} 
                                    description={warning.description} 
                                    key={warning.description}
                                />
                    })
                }
            </div>
            <div>
                <ActionsButton onClick={handleActionsClick}>Ações</ActionsButton>
            </div>
        </div>
    )
}