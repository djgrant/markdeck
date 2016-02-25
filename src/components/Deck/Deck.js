import React, { Component, Children, PropTypes } from 'react';
import './deck.css';

export default class Deck extends Component {

	render() {
		const { children, currentSlide } = this.props;

		return (
			<div className='Deck'>
				<div className='Deck-container'
					 style={{
					   width: `${Children.count(children) * 100}vw`,
					   transform: `translate(${-currentSlide * 100}vw, 0)`,
					   transition: 'all .25s ease-out'
             	}}>
					{Children.map(children, this.wrapChild)}
				</div>
			</div>
		);
	}

	wrapChild(slide) {
		return (
			<div className='Deck-item'>
				{slide}
			</div>
		);
	}
}

Deck.propTypes =  {
	currentSlide: React.PropTypes.number.isRequired
};
