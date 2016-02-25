import React, { Component } from 'react';
import './slide.css';

export default class Slide extends Component {
	render() {
		return (
			<div className='Slide'>
				<div className='Slide-content'>
					{this.props.children}
				</div>
			</div>
		);
	}
}
