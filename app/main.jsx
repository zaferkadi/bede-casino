import 'babel-polyfill';
import React from 'react';
import {render } from 'react-dom';

import {addArticle} from './redux/actions.js';
import Root from './containers/Root.jsx';
//console.log(data);



render(
	<Root/>, 
	document.getElementById('app')
);