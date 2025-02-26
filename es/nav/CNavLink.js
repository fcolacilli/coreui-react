import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useContext, useState, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CLink from '../link/CLink';
import { Context } from '../tabs/CTabs';

var getIndex = function getIndex(el) {
  return Array.from(el.parentNode.children).indexOf(el);
};

var getState = function getState(_ref) {
  var el = _ref.current;
  var hasSiblings = el.parentElement.childNodes.length > 1;
  return el.dataset.tab || getIndex(hasSiblings ? el : el.parentElement);
};

var CNavLink = function CNavLink(props) {
  var innerRef = props.innerRef,
      className = props.className,
      onClick = props.onClick,
      rest = _objectWithoutPropertiesLoose(props, ["innerRef", "className", "onClick"]);

  var tabState = useContext(Context);
  var actTab = (tabState || {}).active;
  var ref = /*#__PURE__*/createRef();
  innerRef && innerRef(ref);

  var _useState = useState(),
      active = _useState[0],
      setActive = _useState[1];

  useEffect(function () {
    typeof actTab !== 'undefined' && setActive(getState(ref) === actTab);
  }, [actTab]);

  var click = function click(e) {
    onClick && onClick(e);
    tabState && tabState.setActiveTab(getState(ref));
  };

  return /*#__PURE__*/React.createElement(CLink, _extends({
    active: active
  }, rest, {
    innerRef: ref,
    onClick: click,
    className: ['nav-link', className]
  }));
};

CNavLink.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onClick: PropTypes.func
};
export default CNavLink;