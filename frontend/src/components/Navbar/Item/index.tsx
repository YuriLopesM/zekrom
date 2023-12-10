import { ElementType } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from './styles.module.scss';

export interface ItemProps {
    title: string;
    path: string;
    roles?: string[];
    icon: ElementType;
}

export const Item = ({
    title,
    path,
    icon: Icon
}: ItemProps) => {
    const { pathname } = useLocation();

    return (
        <li
            className={styles.item}
        >
            <Link 
                to={path} 
                className={`${path === pathname ? styles.isActive : null}`}
                aria-description={title}
            >
                <Icon />
            </Link>
        </li>
    )

}