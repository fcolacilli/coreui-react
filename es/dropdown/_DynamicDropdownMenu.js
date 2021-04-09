import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import classNames from "classnames";
import { Context } from "./CDropdown";
import { createPopper } from "@popperjs/core";

var DynamicDropdownMenu = function DynamicDropdownMenu(props) {
  var className = props.className,
      show = props.show,
      placement = props.placement,
      modifiers = props.modifiers,
      innerRef = props.innerRef,
      rest = _objectWithoutPropertiesLoose(props, ["className", "show", "placement", "modifiers", "innerRef"]);

  var _useContext = useContext(Context),
      reference = _useContext.reference,
      isOpen = _useContext.isOpen,
      setIsOpen = _useContext.setIsOpen,
      setPlacement = _useContext.setPlacement;

  var _useState = useState(null),
      popperElement = _useState[0],
      setPopperElement = _useState[1];

  var _useState2 = useState(null),
      popper = _useState2[0],
      setPopper = _useState2[1];

  innerRef && innerRef(popperElement);
  useEffect(function () {
    setIsOpen(show);
    setPlacement(placement);
  }, [show, placement]);
  var classes = classNames(className, "dropdown-menu", {
    show: isOpen
  });
  useLayoutEffect(function () {
    if (!reference) {
      return;
    }

    setPopper(createPopper(reference, popperElement, {
      placement: placement,
      modifiers: modifiers || []
    }));
    return function () {
      if (popper) {
        popper.destroy();
      }
    };
  }, [isOpen]);

  var checkClose = function checkClose(e) {
    if ([reference, popperElement].every(function (el) {
      return !el.contains(e.target);
    })) {
      setIsOpen(false);
    }
  };

  var onKeypress = function onKeypress(e) {
    return e.keyCode == "27" && setIsOpen(false);
  };

  useEffect(function () {
    if (isOpen) {
      document.addEventListener("click", checkClose);
      document.addEventListener("keydown", onKeypress);
    }

    return function () {
      document.removeEventListener("click", checkClose);
      document.removeEventListener("keydown", onKeypress);
    };
  }, [isOpen]);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes,
    ref: setPopperElement,
    role: "menu",
    "aria-hidden": !isOpen
  }, rest));
};

export default DynamicDropdownMenu;