import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

//component - CoreUI / CDropdownMenu

const DynamicDropdownMenu = dynamic(() => import("./_DynamicDropdownMenu.js"), {
	ssr: false,
});

const CDropdownMenu = (props) => {
	return (
		<React.Fragment>
			<DynamicDropdownMenu {...props} />
		</React.Fragment>
	);
};

CDropdownMenu.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array,
		PropTypes.object,
	]),
	//
	innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	modifiers: PropTypes.array,
	show: PropTypes.bool,
	placement: PropTypes.oneOf([
		"",
		"top-end",
		"top",
		"top-start",
		"bottom-end",
		"bottom",
		"bottom-start",
		"right-start",
		"right",
		"right-end",
		"left-start",
		"left",
		"left-end",
	]),
};

CDropdownMenu.defaultProps = {
	placement: "bottom-start",
};

export default CDropdownMenu;
