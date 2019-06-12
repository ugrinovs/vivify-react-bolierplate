import { createBrowserHistory } from 'history';

/**
 * Keep history throughout the application in sync.
 * This is needed so we can share history between redux-saga and react-router.
 * This export should be used to navigate from saga (e.g. history.push('/user'))
 * and react-router will pick up the change.
 */
export default createBrowserHistory();
