import React, { useState, useRef, useMemo, useEffect } from "react";
import classNames from "classnames";

const DynamicSidebar = (props) => {
	const {
		children,
		className,
		innerRef,
		breakpoint,
		show,
		fixed,
		unfoldable,
		minimize,
		size,
		hideOnMobileClick,
		aside,
		colorScheme,
		overlaid,
		dropdownMode,
		onShowChange,
		onMinimizeChange,
		Context,
		...attributes
	} = props;

	const key = useState(Math.random().toString(36).substr(2))[0];

	const [isOpen, setIsOpen] = useState(show);
	const [openDropdown, setOpenDropdown] = useState();

	const node = useRef({}).current;
	const reference = (r) => {
		node.current = r;
		innerRef && innerRef(r);
	};

	const [minimized, setIsMinimized] = useState(minimize);
	useMemo(() => {
		setIsMinimized(minimize);
	}, [minimize]);

	const toggleMinimize = () => {
		setIsMinimized(!minimized);
		onMinimizeChange && onMinimizeChange(minimized);
	};

	useMemo(() => {
		setIsOpen(show);
	}, [show]);

	useEffect(() => {
		isOpen === true ? createBackdrop() : removeBackdrop();
		return () => removeBackdrop();
	}, [isOpen]);

	//methods
	const sidebarCloseListener = (e) => {
		if (
			document.getElementById(key + "backdrop") &&
			!node.current.contains(e.target)
		) {
			closeSidebar();
		}
	};

	const onKeydown = (e) => {
		e.key.includes("Esc") && isAutoclosable() && closeSidebar();
	};

	const createBackdrop = () => {
		const backdrop = document.createElement("div");
		if (overlaid) {
			document.addEventListener("click", sidebarCloseListener);
		} else {
			backdrop.addEventListener("click", closeSidebar);
		}
		document.addEventListener("keydown", onKeydown);
		backdrop.className = "c-sidebar-backdrop c-show";
		backdrop.id = key + "backdrop";
		document.body.appendChild(backdrop);
	};

	const removeBackdrop = () => {
		const backdrop = document.getElementById(key + "backdrop");
		if (backdrop) {
			document.removeEventListener("click", sidebarCloseListener);
			backdrop.removeEventListener("click", closeSidebar);
			document.removeEventListener("keydown", onKeydown);
			document.body.removeChild(backdrop);
		}
	};

	const closeSidebar = () => {
		if (typeof onShowChange === "function") {
			onShowChange(overlaid ? false : "responsive");
		} else {
			setIsOpen(overlaid ? false : "responsive");
		}
	};

	const isOnMobile = () => {
		return Boolean(
			window
				.getComputedStyle(node.current)
				.getPropertyValue("--is-mobile")
		);
	};

	const isAutoclosable = () => isOnMobile() || overlaid;

	const onSidebarClick = (e) => {
		const sidebarItemClicked = String(e.target.className).includes(
			"c-sidebar-nav-link"
		);
		if (sidebarItemClicked && hideOnMobileClick && isAutoclosable()) {
			closeSidebar();
		}
	};

	// render
	const haveResponsiveClass = breakpoint && isOpen === "responsive";
	const classes = classNames(
		"c-sidebar",
		colorScheme && `c-sidebar-${colorScheme}`,
		isOpen === true && "c-sidebar-show",
		haveResponsiveClass && `c-sidebar-${breakpoint}-show`,
		fixed && !overlaid && "c-sidebar-fixed",
		aside && "c-sidebar-right",
		minimized && !unfoldable && "c-sidebar-minimized",
		minimized && unfoldable && "c-sidebar-unfoldable",
		overlaid && "c-sidebar-overlaid",
		size && `c-sidebar-${size}`,
		className
	);

	return (
		<Context.Provider
			value={{
				dropdownMode,
				scrollbarExist: !minimized || unfoldable,
				toggleMinimize,
				openDropdown,
				setOpenDropdown,
			}}
		>
			<div
				className={classes}
				{...attributes}
				ref={reference}
				onClick={onSidebarClick}
			>
				{children}
			</div>
		</Context.Provider>
	);
};

export default DynamicSidebar;
