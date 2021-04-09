import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

export const Context = React.createContext({});

const DynamicSidebar = dynamic(() => import("./_DynamicSidebar.js"), {
	ssr: false,
});

//component - CoreUI / CSidebar
const CSidebar = (props) => {
	return (
		<React.Fragment>
			<DynamicSidebar {...props} Context={Context} />
		</React.Fragment>
	);
};

CSidebar.propTypes = {
	children: PropTypes.node,
	className: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array,
		PropTypes.object,
	]),
	innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	fixed: PropTypes.bool,
	unfoldable: PropTypes.bool,
	overlaid: PropTypes.bool,
	breakpoint: PropTypes.oneOf([false, "", "sm", "md", "lg", "xl", "xxl"]),
	minimize: PropTypes.bool,
	show: PropTypes.oneOf(["", true, false, "responsive"]),
	size: PropTypes.oneOf(["", "sm", "lg", "xl"]),
	hideOnMobileClick: PropTypes.bool,
	aside: PropTypes.bool,
	colorScheme: PropTypes.string,
	dropdownMode: PropTypes.oneOf([
		"",
		"openActive",
		"close",
		"closeInactive",
		"noAction",
	]),
	onShowChange: PropTypes.func,
	onMinimizeChange: PropTypes.func,
};

CSidebar.defaultProps = {
	fixed: true,
	breakpoint: "lg",
	show: "responsive",
	hideOnMobileClick: true,
	colorScheme: "dark",
};

export default CSidebar;
