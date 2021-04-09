import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from "react";
import PropTypes from "prop-types"; // import classNames from "classnames";
// import { NavLink } from "react-router-dom";

import ActiveLink from "./ActiveLink"; //component - CoreUI / CLink

var CLink = function CLink(props) {
  var className = props.className,
      innerRef = props.innerRef,
      active = props.active,
      _props$activeClassNam = props.activeClassName,
      activeClassName = _props$activeClassNam === void 0 ? "active" : _props$activeClassNam,
      href = props.href,
      onClick = props.onClick,
      disabled = props.disabled,
      rest = _objectWithoutPropertiesLoose(props, ["className", "innerRef", "active", "activeClassName", "href", "onClick", "disabled"]);

  var to = rest ? rest.to : null;

  var click = function click(e) {
    if (!href && !to || href === "#") {
      e.preventDefault();
    }

    !disabled && onClick && onClick(e);
  }; // render
  // const classes = classNames(
  // 	active && "active",
  // 	disabled && "disabled",
  // 	className
  // );


  return to ?
  /*#__PURE__*/
  // <NavLink {...rest} className={classes} onClick={click} ref={innerRef} />
  React.createElement(ActiveLink, _extends({}, rest, {
    className: className,
    activeClassName: activeClassName,
    disabled: disabled,
    href: to,
    ref: innerRef
  })) : /*#__PURE__*/React.createElement("a", _extends({
    href: href || "#",
    className: className,
    rel: rest.target === "_blank" ? "noopener norefferer" : null
  }, rest, {
    onClick: click,
    ref: innerRef
  }));
};

CLink.propTypes = {
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  active: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  // ...NavLink.propTypes,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func])
}; // CLink.sortAttributes = (attributesToSort) => {
//   const attributes = {}
//   const linkProps = {}
//   Object.entries(attributesToSort || {}).forEach(([key, value]) => {
//     if (Object.keys(CLink.propTypes).includes(key)) {
//       linkProps[key] = value
//     } else {
//       attributes[key] = value
//     }
//   })
//   return { linkProps, attributes }
// }

export default CLink;