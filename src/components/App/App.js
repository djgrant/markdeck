import React, { Component } from 'react';
import Deck from '../Deck';
import Slide from '../Slide';
import { connect } from 'react-redux';
import { nextSlide, prevSlide } from './duck';
import Remarkable from 'remarkable';
import hljs from 'highlight.js';

const md = new Remarkable({
	html: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return '';
  }
});

const slidesHTML = window.slidesHTML;
const slides = md.render(slidesHTML).split('<hr>');

const LEFT_ARROW = 37;
const	RIGHT_ARROW = 39;

class Tree extends Component {
	constructor(props) {
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('click', this.handleClick);
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
		window.removeEventListener('click', this.handleClick);
	}

	handleClick(e) {
		const { currentSlide, nextSlide } = this.props;
		if (currentSlide < slides.length - 1) {
			this.props.nextSlide()
		}
	}

	handleKeyDown(e) {
		const { currentSlide, nextSlide, prevSlide } = this.props;
		switch (e.keyCode) {
			case RIGHT_ARROW:
				if (currentSlide < slides.length - 1) {
					this.props.nextSlide()
				}
				break;
			case LEFT_ARROW:
				if (currentSlide !== 0) {
					this.props.prevSlide();
				}
				break;
		}
	}

	render() {
		return (
			<div>
				<Deck currentSlide={this.props.currentSlide}>
					{this.renderSlides()}
				</Deck>
			</div>
		);
	}

	renderSlides() {
		return slides.map((slide, index) => {
			const slidesHTML = () => ({
				__html: slide
			});
			return (
				<Slide key={index}>
					<div dangerouslySetInnerHTML={slidesHTML()} />
				</Slide>
			);
		});
	}
}

const mapStateToProps = (state) => ({
	currentSlide: state.currentSlide
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	nextSlide: () => dispatch(nextSlide()),
	prevSlide: () => dispatch(prevSlide())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
