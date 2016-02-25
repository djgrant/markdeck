import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';
import configureStore from './store/configureStore';
import './themes/normalize.css';
import './themes/styles.css';

const	store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
  document.getElementById('root')
);
