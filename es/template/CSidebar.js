import _extends from "@babel/runtime/helpers/esm/extends";
import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
export var Context = /*#__PURE__*/React.createContext({});
var DynamicSidebar = dynamic(function () {
  return import("./_DynamicSidebar.js");
}, {
  ssr: false
}); //component - CoreUI / CSidebar

var CSidebar = function CSidebar(props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DynamicSidebar, _extends({}, props, {
    Context: Context
  })));
};

CSidebar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
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
  dropdownMode: PropTypes.oneOf(["", "openActive", "close", "closeInactive", "noAction"]),
  onShowChange: PropTypes.func,
  onMinimizeChange: PropTypes.func
};
CSidebar.defaultProps = {
  fixed: true,
  breakpoint: "lg",
  show: "responsive",
  hideOnMobileClick: true,
  colorScheme: "dark"
};
export default CSidebar;