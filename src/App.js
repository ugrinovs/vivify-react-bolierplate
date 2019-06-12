import React from 'react';
import {Router} from 'react-router-dom';

import history from './redux/history';
import {mainRoutes} from './components/Routes/routes';
import MainRoutes from './components/Routes/MainRoutes';
import Navbar from './components/Navigation/Navbar';

function App() {
	return (
		<Router history={history}>
			<Navbar routes={mainRoutes} />
			<MainRoutes routes={mainRoutes} isAuthenticated={true}/>
		</Router>
	);
}

export default App;
