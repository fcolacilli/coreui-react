import React /*, { Children }*/ from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";

const ActiveLink = ({
	children,
	activeClassName = "active",
	disabled = false,
	...props
}) => {
	const { asPath } = useRouter();
	// // const child = Children.only(children);
	// const childClassName = child.props.className || "";

	// pages/index.js will be matched via props.href
	// pages/about.js will be matched via props.href
	// pages/[slug].js will be matched via props.as
	const isActive =
		(asPath === props.href || asPath === props.as) && !disabled
			? activeClassName
			: "";

	return disabled ? (
		<span>
			{/* {React.cloneElement(child, {
				className: className || null,
			})} */}
			{children}
		</span>
	) : (
		<Link {...props} className={isActive}>
			{/* {React.cloneElement(child, {
				className: className || null,
			})} */}
			{children}
		</Link>
	);
};

ActiveLink.propTypes = {
	activeClassName: PropTypes.string,
};

export default ActiveLink;
