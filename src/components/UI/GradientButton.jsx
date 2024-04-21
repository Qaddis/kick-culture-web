import PropTypes from "prop-types";
import classes from "./GradientButton.module.css";

const Button = ({ children, style, onClick, title }) => {
	return (
		<button
			title={title}
			className={classes.button}
			style={style}
			onClick={() => onClick()}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.any,
	style: PropTypes.object,
	onClick: PropTypes.func,
	title: PropTypes.string,
};

export default Button;
