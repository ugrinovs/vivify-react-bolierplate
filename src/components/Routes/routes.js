import {HOME_PAGE_PATH, LOGIN_PAGE_PATH, TEST_PAGE_PATH} from '../../constants/constants';
import HomePage from '../../pages/HomePage';
import NestedRoutes from './NestedRoutes';
import TestPage from '../../pages/TestPage';
import Login from '../Auth/Login';

export const nestedRoutes = [
	{
		path: TEST_PAGE_PATH,
		exact: true,
		authRequired: true,
		component: TestPage,
	},
	{
		path: HOME_PAGE_PATH,
		exact: true,
		authRequired: true,
		component: HomePage,
	}
];

export const mainRoutes = [
	{
		path: LOGIN_PAGE_PATH,
		exact: true,
		authRequired: true,
		component: Login,
	},
	{
		path: HOME_PAGE_PATH,
		authRequired: true,
		component: NestedRoutes,
		additionalProps: {routes: nestedRoutes}
	},
];
