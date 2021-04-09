import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import classNames from "classnames";
import { Context } from "./CDropdown";
import { createPopper } from "@popperjs/core";

const DynamicDropdownMenu = (props) => {
	const { className, show, placement, modifiers, innerRef, ...rest } = props;

	const { reference, isOpen, setIsOpen, setPlacement } = useContext(Context);
	const [popperElement, setPopperElement] = useState(null);
	const [popper, setPopper] = useState(null);

	innerRef && innerRef(popperElement);

	useEffect(() => {
		setIsOpen(show);
		setPlacement(placement);
	}, [show, placement]);

	const classes = classNames(className, "dropdown-menu", {
		show: isOpen,
	});

	useLayoutEffect(() => {
		if (!reference) {
			return;
		}
		setPopper(
			createPopper(reference, popperElement, {
				placement,
				modifiers: modifiers || [],
			})
		);

		return () => {
			if (popper) {
				popper.destroy();
			}
		};
	}, [isOpen]);

	const checkClose = (e) => {
		if ([reference, popperElement].every((el) => !el.contains(e.target))) {
			setIsOpen(false);
		}
	};

	const onKeypress = (e) => e.keyCode == "27" && setIsOpen(false);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("click", checkClose);
			document.addEventListener("keydown", onKeypress);
		}
		return () => {
			document.removeEventListener("click", checkClose);
			document.removeEventListener("keydown", onKeypress);
		};
	}, [isOpen]);

	return (
		<div
			className={classes}
			ref={setPopperElement}
			role="menu"
			aria-hidden={!isOpen}
			{...rest}
		/>
	);
};

export default DynamicDropdownMenu;
