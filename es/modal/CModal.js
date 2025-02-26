import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
export var Context = /*#__PURE__*/React.createContext({});

var getTransitionClass = function getTransitionClass(s) {
  return s === 'entering' ? 'd-block' : s === 'entered' ? 'show d-block' : s === 'exiting' ? 'd-block' : '';
}; //animation fixes introduced thanks to Sirlordt
//component - CoreUI / CModal


var CModal = function CModal(props) {
  var _classNames, _classNames2, _classNames3;

  var innerRef = props.innerRef,
      show = props.show,
      centered = props.centered,
      size = props.size,
      color = props.color,
      borderColor = props.borderColor,
      fade = props.fade,
      backdrop = props.backdrop,
      closeOnBackdrop = props.closeOnBackdrop,
      onOpened = props.onOpened,
      onClosed = props.onClosed,
      addContentClass = props.addContentClass,
      onClose = props.onClose,
      className = props.className,
      scrollable = props.scrollable,
      attributes = _objectWithoutPropertiesLoose(props, ["innerRef", "show", "centered", "size", "color", "borderColor", "fade", "backdrop", "closeOnBackdrop", "onOpened", "onClosed", "addContentClass", "onClose", "className", "scrollable"]);

  var _useState = useState(false),
      isOpen = _useState[0],
      setIsOpen = _useState[1];

  var _useState2 = useState(false),
      modalTrigger = _useState2[0],
      setModalTrigger = _useState2[1];

  var modalClick = function modalClick(e) {
    return e.target.dataset.modal && closeOnBackdrop && close();
  };

  useEffect(function () {
    setIsOpen(show);
  }, [show]);

  var onKeypress = function onKeypress(e) {
    return e.keyCode == '27' && close();
  };

  useEffect(function () {
    isOpen && document.addEventListener('keydown', onKeypress);
    return function () {
      return document.removeEventListener('keydown', onKeypress);
    };
  }, [isOpen]);

  var close = function close() {
    onClose && onClose();
    setIsOpen(false);
  };

  var onEntered = function onEntered() {
    setModalTrigger(document.querySelector(':focus'));
    nodeRef.current.focus();
    onOpened && onOpened();
  };

  var onExited = function onExited() {
    modalTrigger && modalTrigger.focus();
    onClosed && onClosed();
  };

  var modalClasses = classNames('modal overflow-auto fade', (_classNames = {}, _classNames["modal-" + color] = color, _classNames), className);
  var dialogClasses = classNames('modal-dialog', (_classNames2 = {
    'modal-dialog-scrollable': scrollable,
    'modal-dialog-centered': centered
  }, _classNames2["modal-" + size] = size, _classNames2));
  var contentClasses = classNames('modal-content', (_classNames3 = {}, _classNames3["border-" + borderColor] = borderColor, _classNames3), addContentClass);
  var backdropClasses = classNames({
    'modal-backdrop': true,
    'fade': fade,
    'show': isOpen || fade
  });
  var nodeRef = useRef(null);
  return /*#__PURE__*/React.createElement("div", {
    onClick: modalClick
  }, /*#__PURE__*/React.createElement(Transition, {
    in: Boolean(isOpen),
    onEntered: onEntered,
    onExited: onExited,
    timeout: fade ? 150 : 0,
    nodeRef: nodeRef
  }, function (status) {
    var transitionClass = getTransitionClass(status);
    var classes = classNames(modalClasses, transitionClass);
    return /*#__PURE__*/React.createElement("div", {
      tabIndex: "-1",
      role: "dialog",
      className: classes,
      "data-modal": true,
      ref: nodeRef
    }, /*#__PURE__*/React.createElement("div", {
      className: dialogClasses,
      role: "document"
    }, /*#__PURE__*/React.createElement("div", _extends({}, attributes, {
      className: contentClasses,
      ref: innerRef
    }), /*#__PURE__*/React.createElement(Context.Provider, {
      value: {
        close: close
      }
    }, props.children))));
  }), backdrop && isOpen && /*#__PURE__*/React.createElement("div", {
    className: backdropClasses
  }));
};

CModal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  show: PropTypes.bool,
  centered: PropTypes.bool,
  size: PropTypes.oneOf(['', 'sm', 'lg', 'xl']),
  backdrop: PropTypes.bool,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
  fade: PropTypes.bool,
  closeOnBackdrop: PropTypes.bool,
  onClose: PropTypes.func,
  addContentClass: PropTypes.string,
  scrollable: PropTypes.bool
};
CModal.defaultProps = {
  backdrop: true,
  fade: true,
  closeOnBackdrop: true
};
export default CModal;