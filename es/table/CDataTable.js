import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState, useRef, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CPagination from "../pagination/CPagination";
import CElementCover from "../element-cover/CElementCover";
import CIcon from "@coreui/icons-react";
import { cilArrowTop, cilBan, cilFilterX } from "@coreui/icons";
/*import style from './CDataTable.module.css'*/

/*import './CDataTable.css'*/
//component - CoreUI / CTable

var CDataTable = function CDataTable(props) {
  var _ref2;

  var innerRef = props.innerRef,
      overTableSlot = props.overTableSlot,
      columnHeaderSlot = props.columnHeaderSlot,
      sortingIconSlot = props.sortingIconSlot,
      columnFilterSlot = props.columnFilterSlot,
      noItemsViewSlot = props.noItemsViewSlot,
      noItemsView = props.noItemsView,
      captionSlot = props.captionSlot,
      footerSlot = props.footerSlot,
      underTableSlot = props.underTableSlot,
      theadTopSlot = props.theadTopSlot,
      loadingSlot = props.loadingSlot,
      scopedSlots = props.scopedSlots,
      loading = props.loading,
      fields = props.fields,
      pagination = props.pagination,
      activePage = props.activePage,
      itemsPerPage = props.itemsPerPage,
      items = props.items,
      sorter = props.sorter,
      header = props.header,
      clickableRows = props.clickableRows,
      columnFilter = props.columnFilter,
      tableFilterValue = props.tableFilterValue,
      tableFilter = props.tableFilter,
      cleaner = props.cleaner,
      addTableClasses = props.addTableClasses,
      size = props.size,
      dark = props.dark,
      striped = props.striped,
      hover = props.hover,
      border = props.border,
      outlined = props.outlined,
      responsive = props.responsive,
      footer = props.footer,
      itemsPerPageSelect = props.itemsPerPageSelect,
      sorterValue = props.sorterValue,
      columnFilterValue = props.columnFilterValue,
      onRowClick = props.onRowClick,
      onSorterValueChange = props.onSorterValueChange,
      onPaginationChange = props.onPaginationChange,
      onColumnFilterChange = props.onColumnFilterChange,
      onPagesChange = props.onPagesChange,
      onTableFilterChange = props.onTableFilterChange,
      onPageChange = props.onPageChange,
      onFilteredItemsChange = props.onFilteredItemsChange;
  var compData = useRef({
    firstRun: true,
    columnFiltered: 0,
    changeItems: 0
  }).current; //

  var _useState = useState(itemsPerPage),
      perPageItems = _useState[0],
      setPerPageItems = _useState[1];

  var _useState2 = useState(sorterValue || {}),
      sorterState = _useState2[0],
      setSorterState = _useState2[1];

  var _useState3 = useState(tableFilterValue),
      tableFilterState = _useState3[0],
      setTableFilterState = _useState3[1];

  var _useState4 = useState(columnFilterValue || {}),
      columnFilterState = _useState4[0],
      setColumnFilterState = _useState4[1];

  var _useState5 = useState(activePage || 1),
      page = _useState5[0],
      setPage = _useState5[1];

  var _useState6 = useState(items || []),
      passedItems = _useState6[0],
      setPassedItems = _useState6[1]; // functions


  var cellClass = function cellClass(item, colName, index) {
    var classes = [];

    if (item._cellClasses && item._cellClasses[colName]) {
      classes.push(item._cellClasses[colName]);
    }

    if (fields && fields[index]._classes) {
      classes.push(fields[index]._classes);
    }

    return classes;
  };

  var pretifyName = function pretifyName(name) {
    return name.replace(/[-_.]/g, " ").replace(/ +/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(" ").map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  };

  var headerClass = function headerClass(i) {
    return fields && fields[i]._classes && fields[i]._classes;
  };

  var isSortable = function isSortable(i) {
    var isDataColumn = itemsDataColumns.includes(rawColumnNames[i]);
    return sorter && (!fields || fields[i].sorter !== false) && isDataColumn;
  };

  var headerStyles = function headerStyles(index) {
    var style = {
      verticalAlign: "middle",
      overflow: "hidden"
    };

    if (isSortable(index)) {
      style.cursor = "pointer";
    }

    if (fields && fields[index] && fields[index]._style) {
      return _objectSpread(_objectSpread({}, style), fields[index]._style);
    }

    return style;
  };

  var getIconState = function getIconState(index) {
    var direction = sorterState.asc ? "asc" : "desc";
    return rawColumnNames[index] === sorterState.column ? direction : 0;
  };

  var iconClasses = function iconClasses(index) {
    var state = getIconState(index);
    return ["position-absolute", style["icon-transition"], style["arrow-position"], !state && style["transparent"], state === "desc" && style["rotate-icon"]];
  };

  var rowClicked = function rowClicked(item, index, e, detailsClick) {
    if (detailsClick === void 0) {
      detailsClick = false;
    }

    onRowClick && onRowClick(item, index, getClickedColumnName(e, detailsClick), e);
  };

  var changeSort = function changeSort(column, index) {
    if (!isSortable(index)) {
      return;
    } //if column changed or sort was descending change asc to true


    var state = sorterState;
    var columnRepeated = state.column === column;

    if (!sorter || !sorter.resetable) {
      state.column = column;
    } else {
      state.column = columnRepeated && state.asc === false ? null : column;
    }

    state.asc = !(columnRepeated && state.asc);
    setSorterState(_objectSpread({}, state));
  };

  useEffect(function () {
    onSorterValueChange && onSorterValueChange(sorterState);
  }, [JSON.stringify(sorterState)]);

  var paginationChange = function paginationChange(e) {
    onPaginationChange && onPaginationChange(Number(e.target.value));
    !itemsPerPageSelect.external && setPerPageItems(Number(e.target.value));
  };

  var columnFilterEvent = function columnFilterEvent(colName, value, type) {
    var _objectSpread2;

    var isLazy = columnFilter && columnFilter.lazy === true;

    if (isLazy && type === "input" || !isLazy && type === "change") {
      return;
    }

    var newState = _objectSpread(_objectSpread({}, columnFilterState), {}, (_objectSpread2 = {}, _objectSpread2["" + colName] = value, _objectSpread2));

    setColumnFilterState(newState);
  };

  useEffect(function () {
    onColumnFilterChange && onColumnFilterChange(columnFilterState);
  }, [JSON.stringify(columnFilterState)]);

  var tableFilterChange = function tableFilterChange(value, type) {
    var isLazy = tableFilter && tableFilter.lazy === true;

    if (isLazy && type === "input" || !isLazy && type === "change") {
      return;
    }

    setTableFilterState(value);
  };

  useEffect(function () {
    onTableFilterChange && onTableFilterChange(tableFilterState);
  }, [tableFilterState]);

  var getClickedColumnName = function getClickedColumnName(e, detailsClick) {
    if (detailsClick) {
      return "details";
    } else {
      var children = Array.from(e.target.closest("tr").children);
      var clickedCell = children.filter(function (child) {
        return child.contains(e.target);
      })[0];
      return rawColumnNames[children.indexOf(clickedCell)];
    }
  };

  var clean = function clean() {
    setTableFilterState("");
    setColumnFilterState({});
    setSorterState({
      column: "",
      asc: true
    });
  }; // computed


  var genCols = Object.keys(passedItems[0] || {}).filter(function (el) {
    return el.charAt(0) !== "_";
  });
  var rawColumnNames = fields ? fields.map(function (el) {
    return el.key || el;
  }) : genCols;
  var itemsDataColumns = rawColumnNames.filter(function (name) {
    return genCols.includes(name);
  });
  useMemo(function () {
    compData.columnFiltered++;
  }, [JSON.stringify(columnFilter), JSON.stringify(columnFilterState), itemsDataColumns.join(""), compData.changeItems]);
  var columnFiltered = useMemo(function () {
    var items = passedItems;

    if (columnFilter && columnFilter.external) {
      return items;
    }

    Object.entries(columnFilterState).forEach(function (_ref) {
      var key = _ref[0],
          value = _ref[1];
      var columnFilter = String(value).toLowerCase();

      if (columnFilter && itemsDataColumns.includes(key)) {
        items = items.filter(function (item) {
          return String(item[key]).toLowerCase().includes(columnFilter);
        });
      }
    });
    return items;
  }, [compData.columnFiltered]);
  var tableFiltered = useMemo(function () {
    var items = columnFiltered;

    if (!tableFilterState || tableFilter && tableFilter.external) {
      return items;
    }

    var filter = tableFilterState.toLowerCase();

    var valueContainFilter = function valueContainFilter(val) {
      return String(val).toLowerCase().includes(filter);
    };

    items = items.filter(function (item) {
      return !!itemsDataColumns.find(function (key) {
        return valueContainFilter(item[key]);
      });
    });
    return items;
  }, [compData.columnFiltered, tableFilterState, JSON.stringify(tableFilter)]);
  var sortedItems = useMemo(function () {
    var col = sorterState.column;

    if (!col || !itemsDataColumns.includes(col) || sorter && sorter.external) {
      return tableFiltered;
    } //if values in column are to be sorted by numeric value they all have to be type number


    var flip = sorterState.asc ? 1 : -1;
    var sorted = tableFiltered.slice().sort(function (item, item2) {
      var value = item[col];
      var value2 = item2[col];
      var a = typeof value === "number" ? value : String(value).toLowerCase();
      var b = typeof value2 === "number" ? value2 : String(value2).toLowerCase();
      return a > b ? 1 * flip : b > a ? -1 * flip : 0;
    });
    return sorted;
  }, [JSON.stringify(tableFiltered), JSON.stringify(sorterState), JSON.stringify(sorter)]);
  useEffect(function () {
    !compData.firstRun && onFilteredItemsChange && onFilteredItemsChange(sortedItems);
  }, [JSON.stringify(sortedItems)]);
  var tableClasses = ["table", (_ref2 = {}, _ref2["table-" + size] = size, _ref2["table-dark"] = dark, _ref2["table-striped"] = striped, _ref2["table-hover"] = hover, _ref2["table-bordered"] = border, _ref2.border = outlined, _ref2), addTableClasses];
  var columnNames = useMemo(function () {
    if (fields) {
      return fields.map(function (f) {
        return f.label !== undefined ? f.label : pretifyName(f.key || f);
      });
    }

    return rawColumnNames.map(function (el) {
      return pretifyName(el);
    });
  }, [fields, rawColumnNames]);
  var sortingIconStyles = sorter && "position-relative pr-4";
  var colspan = rawColumnNames.length;
  var totalPages = Math.ceil(sortedItems.length / perPageItems) || 1;
  useMemo(function () {
    !compData.firstRun && onPagesChange && onPagesChange(totalPages);
  }, [totalPages]);
  var computedPage = useMemo(function () {
    var compPage = pagination ? page : activePage;
    !compData.firstRun && onPageChange && onPageChange(compPage);
    return compPage;
  }, [page, activePage, pagination]);
  var firstItemIndex = (computedPage - 1) * perPageItems || 0;
  var paginatedItems = sortedItems.slice(firstItemIndex, firstItemIndex + perPageItems);
  var currentItems = computedPage ? paginatedItems : sortedItems;
  var tableFilterData = {
    label: tableFilter && tableFilter.label || "Filter:",
    placeholder: tableFilter && tableFilter.placeholder || "type string..."
  };
  var paginationSelect = {
    label: itemsPerPageSelect && itemsPerPageSelect.label || "Items per page:",
    values: itemsPerPageSelect && itemsPerPageSelect.values || [5, 10, 20, 50]
  };

  var noItemsText = function () {
    var customValues = noItemsView || {};

    if (passedItems.length) {
      return customValues.noResults || "No filtering results";
    }

    return customValues.noItems || "No items";
  }();

  var isFiltered = tableFilterState || sorterState.column || Object.values(columnFilterState).join("");
  var cleanerProps = {
    content: cilFilterX,
    className: "mfs-2 " + (isFiltered ? "text-danger" : "transparent"),
    role: isFiltered ? "button" : null,
    tabIndex: isFiltered ? 0 : null
  }; // watch

  useMemo(function () {
    return setPerPageItems(itemsPerPage);
  }, [itemsPerPage]);
  useMemo(function () {
    return setSorterState(_objectSpread({}, sorterValue));
  }, [sorterValue]);
  useMemo(function () {
    return setTableFilterState(tableFilterValue);
  }, [tableFilterValue]);
  useMemo(function () {
    return setColumnFilterState(_objectSpread({}, columnFilterValue));
  }, [columnFilterValue]); //items

  useMemo(function () {
    if (items && !compData.firstRun && (items.length !== passedItems.length || JSON.stringify(items) !== JSON.stringify(passedItems))) {
      setPassedItems(items);
      compData.changeItems++;
    }
  }); // render

  compData.firstRun = false;
  var paginationProps = typeof pagination === "object" ? pagination : null;
  var headerContent = /*#__PURE__*/React.createElement("tr", null, columnNames.map(function (name, index) {
    return /*#__PURE__*/React.createElement("th", {
      onClick: function onClick() {
        changeSort(rawColumnNames[index], index);
      },
      className: classNames([headerClass(index), sortingIconStyles]),
      style: headerStyles(index),
      key: index
    }, columnHeaderSlot["" + rawColumnNames[index]] || /*#__PURE__*/React.createElement("div", {
      className: "d-inline"
    }, name), isSortable(index) && (sortingIconSlot && sortingIconSlot(getIconState(index), iconClasses(index)) || /*#__PURE__*/React.createElement(CIcon, {
      customClasses: classNames(iconClasses(index)),
      width: 18,
      content: cilArrowTop
    })));
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: innerRef
  }, (itemsPerPageSelect || tableFilter || cleaner) && /*#__PURE__*/React.createElement("div", {
    className: "row my-2 mx-0"
  }, (tableFilter || cleaner) && /*#__PURE__*/React.createElement("div", {
    className: "col-sm-6 form-inline p-0 c-datatable-filter"
  }, tableFilter && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    className: "mfe-2"
  }, tableFilterData.label), /*#__PURE__*/React.createElement("input", {
    className: "form-control",
    type: "text",
    placeholder: tableFilterData.placeholder,
    onInput: function onInput(e) {
      tableFilterChange(e.target.value, "input");
    },
    onChange: function onChange(e) {
      tableFilterChange(e.target.value, "change");
    },
    value: tableFilterState || "",
    "aria-label": "table filter input"
  })), cleaner && (typeof cleaner === "function" ? cleaner(clean, isFiltered, cleanerProps) : /*#__PURE__*/React.createElement(CIcon, _extends({}, cleanerProps, {
    onClick: clean,
    onKeyUp: function onKeyUp(event) {
      if (event.key === "Enter") clean();
    }
  })))), itemsPerPageSelect && /*#__PURE__*/React.createElement("div", {
    className: "col-sm-6 p-0 " + (tableFilter || cleaner ? "" : "offset-sm-6")
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-inline justify-content-sm-end c-datatable-items-per-page"
  }, /*#__PURE__*/React.createElement("label", {
    className: "mfe-2"
  }, paginationSelect.label), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    onChange: paginationChange,
    "aria-label": "changes number of visible items",
    value: perPageItems
  }, paginationSelect.values.map(function (number, key) {
    return /*#__PURE__*/React.createElement("option", {
      val: number,
      key: key
    }, number);
  })))))), overTableSlot, /*#__PURE__*/React.createElement("div", {
    className: "position-relative " + (responsive && "table-responsive")
  }, /*#__PURE__*/React.createElement("table", {
    className: classNames(tableClasses)
  }, /*#__PURE__*/React.createElement("thead", null, theadTopSlot, header && headerContent, columnFilter && /*#__PURE__*/React.createElement("tr", {
    className: "table-sm"
  }, rawColumnNames.map(function (colName, index) {
    return /*#__PURE__*/React.createElement("th", {
      className: classNames(headerClass(index)),
      key: index
    }, columnFilterSlot["" + rawColumnNames[index]] || (!fields || fields[index].filter !== false) && /*#__PURE__*/React.createElement("input", {
      className: "form-control form-control-sm",
      onInput: function onInput(e) {
        columnFilterEvent(colName, e.target.value, "input");
      },
      onChange: function onChange(e) {
        columnFilterEvent(colName, e.target.value, "change");
      },
      value: columnFilterState[colName] || "",
      "aria-label": "column name: '" + colName + "' filter input"
    }));
  }))), /*#__PURE__*/React.createElement("tbody", {
    style: clickableRows && {
      cursor: "pointer"
    }
  }, currentItems.map(function (item, itemIndex) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: itemIndex
    }, /*#__PURE__*/React.createElement("tr", {
      className: classNames(item._classes),
      tabIndex: clickableRows && 0,
      onClick: function onClick(e) {
        rowClicked(item, itemIndex + firstItemIndex, e);
      }
    }, rawColumnNames.map(function (colName, index) {
      return scopedSlots[colName] && /*#__PURE__*/React.cloneElement(scopedSlots[colName](item, itemIndex + firstItemIndex), {
        key: index
      }) || /*#__PURE__*/React.createElement("td", {
        className: classNames(cellClass(item, colName, index)),
        key: index
      }, String(item[colName]));
    })), scopedSlots.details && /*#__PURE__*/React.createElement("tr", {
      onClick: function onClick(e) {
        rowClicked(item, itemIndex + firstItemIndex, e, true);
      },
      className: "p-0",
      style: {
        border: "none !important"
      },
      key: "details" + itemIndex
    }, /*#__PURE__*/React.createElement("td", {
      colSpan: colspan,
      className: "p-0",
      style: {
        border: "none !important"
      }
    }, scopedSlots.details(item, itemIndex + firstItemIndex))));
  }), !currentItems.length && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: colspan
  }, noItemsViewSlot || /*#__PURE__*/React.createElement("div", {
    className: "text-center my-5"
  }, /*#__PURE__*/React.createElement("h2", null, noItemsText + " ", /*#__PURE__*/React.createElement(CIcon, {
    width: "30",
    name: "cilBan",
    content: cilBan,
    className: "text-danger mb-2"
  })))))), footer && currentItems.length > 0 && /*#__PURE__*/React.createElement("tfoot", null, headerContent), footerSlot, captionSlot), loading && (loadingSlot || /*#__PURE__*/React.createElement(CElementCover, {
    boundaries: [{
      sides: ["top"],
      query: "td"
    }, {
      sides: ["bottom"],
      query: "tbody"
    }]
  }))), underTableSlot, pagination && /*#__PURE__*/React.createElement(CPagination, _extends({
    style: {
      display: totalPages > 1 ? "inline" : "none"
    },
    onActivePageChange: function onActivePageChange(page) {
      setPage(page);
    },
    pages: totalPages,
    activePage: page
  }, paginationProps)));
};

CDataTable.propTypes = {
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  overTableSlot: PropTypes.node,
  columnHeaderSlot: PropTypes.object,
  sortingIconSlot: PropTypes.func,
  columnFilterSlot: PropTypes.object,
  noItemsViewSlot: PropTypes.node,
  noItemsView: PropTypes.object,
  captionSlot: PropTypes.node,
  footerSlot: PropTypes.node,
  underTableSlot: PropTypes.node,
  scopedSlots: PropTypes.object,
  theadTopSlot: PropTypes.node,
  loadingSlot: PropTypes.node,
  loading: PropTypes.bool,
  fields: PropTypes.array,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  activePage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  items: PropTypes.array,
  sorter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  clickableRows: PropTypes.bool,
  columnFilter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  tableFilterValue: PropTypes.string,
  tableFilter: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  cleaner: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  addTableClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  size: PropTypes.string,
  dark: PropTypes.bool,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  border: PropTypes.bool,
  outlined: PropTypes.bool,
  responsive: PropTypes.bool,
  footer: PropTypes.bool,
  itemsPerPageSelect: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  sorterValue: PropTypes.object,
  columnFilterValue: PropTypes.object,
  header: PropTypes.bool,
  onRowClick: PropTypes.func,
  onSorterValueChange: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onColumnFilterChange: PropTypes.func,
  onPagesChange: PropTypes.func,
  onTableFilterChange: PropTypes.func,
  onPageChange: PropTypes.func,
  onFilteredItemsChange: PropTypes.func
};
CDataTable.defaultProps = {
  itemsPerPage: 10,
  responsive: true,
  columnHeaderSlot: {},
  columnFilterSlot: {},
  scopedSlots: {},
  sorterValue: {},
  header: true
};
export default CDataTable;