import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React
/*, { Children }*/
from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";

var ActiveLink = function ActiveLink(_ref) {
  var children = _ref.children,
      _ref$activeClassName = _ref.activeClassName,
      activeClassName = _ref$activeClassName === void 0 ? "active" : _ref$activeClassName,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "activeClassName", "disabled"]);

  var _useRouter = useRouter(),
      asPath = _useRouter.asPath; // // const child = Children.only(children);
  // const childClassName = child.props.className || "";
  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as


  var isActive = (asPath === props.href || asPath === props.as) && !disabled ? activeClassName : "";
  return disabled ? /*#__PURE__*/React.createElement("span", null, children) : /*#__PURE__*/React.createElement(Link, _extends({}, props, {
    className: isActive
  }), children);
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string
};
export default ActiveLink;