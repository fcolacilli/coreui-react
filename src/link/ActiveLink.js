import React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";

const ActiveLink = ({
	children,
	className,
	activeClassName = "active",
	disabled = false,
	...props
}) => {
	const { asPath } = useRouter();

	// pages/index.js will be matched via props.href
	// pages/about.js will be matched via props.href
	// pages/[slug].js will be matched via props.as
	const cname =
		(asPath === props.href || asPath === props.as) && !disabled
			? [className, activeClassName].join(" ")
			: className;

	return disabled ? (
		<span className={cname}>{children}</span>
	) : (
		<Link {...props}>
			<a className={cname}>{children}</a>
		</Link>
	);
};

ActiveLink.propTypes = {
	activeClassName: PropTypes.string,
};

export default ActiveLink;
