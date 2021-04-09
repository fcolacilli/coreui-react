import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";

var ActiveLink = function ActiveLink(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$activeClassName = _ref.activeClassName,
      activeClassName = _ref$activeClassName === void 0 ? "active" : _ref$activeClassName,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "className", "activeClassName", "disabled"]);

  var _useRouter = useRouter(),
      asPath = _useRouter.asPath; // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as


  var cname = (asPath === props.href || asPath === props.as) && !disabled ? [className, activeClassName].join(" ") : className;
  return disabled ? /*#__PURE__*/React.createElement("span", {
    className: cname
  }, children) : /*#__PURE__*/React.createElement(Link, props, /*#__PURE__*/React.createElement("a", {
    className: cname
  }, children));
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string
};
export default ActiveLink;