

import { useAuth } from '../../context/AuthContext';

import {
    CalendarIcon,
    FileTextIcon,
    SettingsIcon,
    UserIcon
} from '../Icons';
import { Item, ItemProps } from './Item';

import styles from './styles.module.scss';

export const Navbar = ({

}) => {
    const { user } = useAuth();

    const links: ItemProps[] = [{
        title: 'Dashboard',
        path: '/dashboard',
        roles: ['admin', 'user'],
        icon: CalendarIcon
    }, {
        title: 'Users',
        path: '/user-managment',
        roles: ['admin'],
        icon: UserIcon
    }, {
        title: 'Monthly Report',
        path: '/monthly-report',
        roles: ['admin'],
        icon: FileTextIcon
    }, {
        title: 'Global Settings',
        path: '/global-settings',
        roles: ['admin'],
        icon: SettingsIcon
    }]

    const visibleLinks = links.filter(link => link.roles?.includes(user?.role ?? 'user'));

    return (
        <>
            {
                visibleLinks.length > 1 && (
                    <menu className={styles.menu}>
                        {
                            visibleLinks.map(link => (
                                <Item
                                    key={link.path}
                                    title={link.title}
                                    path={link.path}
                                    icon={link.icon}
                                />
                            ))
                        }
                    </menu>
                )
            }
        </>
    )
}