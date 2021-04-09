import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic"; //component - CoreUI / CDropdownMenu

var DynamicDropdownMenu = dynamic(function () {
  return import("./_DynamicDropdownMenu.js");
}, {
  ssr: false
});

var CDropdownMenu = function CDropdownMenu(props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DynamicDropdownMenu, props));
};

CDropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  modifiers: PropTypes.array,
  show: PropTypes.bool,
  placement: PropTypes.oneOf(["", "top-end", "top", "top-start", "bottom-end", "bottom", "bottom-start", "right-start", "right", "right-end", "left-start", "left", "left-end"])
};
CDropdownMenu.defaultProps = {
  placement: "bottom-start"
};
export default CDropdownMenu;