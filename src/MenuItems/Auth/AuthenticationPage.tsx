
import { TypeOfMenuPages } from '../index';
import CottageIcon from '@mui/icons-material/Cottage';

const icons = { CottageIcon };

export const Auth: TypeOfMenuPages = {
    id: 'auth',
    title: 'Auth',
    // caption: 'Auth Caption',
    type: 'group',
    url: "",
    children: [
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.CottageIcon,
            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/login',
                    target: true
                }
            ]
        }
    ]
};
