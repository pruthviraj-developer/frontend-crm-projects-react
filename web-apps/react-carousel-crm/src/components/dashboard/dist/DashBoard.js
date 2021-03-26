"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
/* eslint-disable no-console */
/* eslint react/prop-types: 0 */
var react_1 = require("react");
var components_1 = require("@hs/components");
var DeleteForever_1 = require("@material-ui/icons/DeleteForever");
var FileCopy_1 = require("@material-ui/icons/FileCopy");
var Publish_1 = require("@material-ui/icons/Publish");
var core_1 = require("@material-ui/core");
var date_fns_1 = require("date-fns");
var styled_1 = require("@emotion/styled");
var services_1 = require("@hs/services");
var react_router_dom_1 = require("react-router-dom");
var react_router_dom_2 = require("react-router-dom");
var icons_1 = require("@hs/icons");
var DashBoardWrapper = styled_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-left: 90px;\n"], ["\n  margin-left: 90px;\n"])));
var StyledIcon = styled_1["default"](icons_1.SvgIcon)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  min-width: 24px;\n"], ["\n  min-width: 24px;\n"])));
var snackBarProps = {
    open: false,
    type: 'error',
    message: 'Test'
};
var DashBoard = function () {
    // const snackBarProps = {
    //   open: false,
    //   type: 'error' as const,
    //   message: 'Test',
    //   onSnackBarClose: onSnackBarClose,
    // };
    var history = react_router_dom_2.useHistory();
    var location = react_router_dom_1.useLocation();
    var _a = react_1.useState({}), data = _a[0], setTableData = _a[1];
    var _b = react_1.useState(snackBarProps), snackBarError = _b[0], setSnackBarError = _b[1];
    var _c = react_1.useState(0), count = _c[0], setCount = _c[1];
    var _d = react_1.useState(0), isUrlChanged = _d[0], setUrlChanged = _d[1];
    var _e = react_1.useState({ pageSize: 10, pageNo: 0 }), filterParams = _e[0], setFilterParams = _e[1]; // page size should be size as rowsperpage
    var onSnackBarClose = function (open) {
        setSnackBarError(__assign(__assign({}, snackBarError), { open: open }));
    };
    var geTableData = react_1.useCallback(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var tableData, params, error_1, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        tableData = { totalRecords: 0 };
                        params = __assign(__assign({}, filterParams), { pageNo: filterParams.pageNo + 1 });
                        if (!(location.pathname === '/dashboard')) return [3 /*break*/, 2];
                        return [4 /*yield*/, services_1.carouselService.getTableData(params)];
                    case 1:
                        tableData = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, services_1.carouselService.getArchivedTableData(params)];
                    case 3:
                        tableData = _a.sent();
                        _a.label = 4;
                    case 4:
                        setTableData(tableData);
                        setCount(tableData.totalRecords || 0);
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        setTableData({});
                        setCount(0);
                        message = 'Try Later';
                        if (error_1.action === 'failure') {
                            message = error_1.messageDetail.message;
                        }
                        setSnackBarError({
                            open: true,
                            type: 'error',
                            message: message
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    react_1.useEffect(function () {
        geTableData();
    }, [filterParams]);
    react_1.useEffect(function () {
        if (isUrlChanged) {
            setTableData({});
            setCount(0);
            setFilterParams({ pageSize: 10, pageNo: 0 });
        }
        else {
            setUrlChanged(1);
        }
    }, [location]);
    var getUpdatedTableData = function (filters) {
        setFilterParams(filters);
    };
    var saveCloneData = function (res) {
        var postData = __assign(__assign({}, res), { title: "Cloned " + res.title });
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, value, error_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.carouselService.createNonHeroCarousel(postData)];
                    case 1:
                        response = _a.sent();
                        if (response.action === 'success') {
                            setSnackBarError({
                                open: true,
                                type: 'success',
                                message: response.messageDetail ? response.messageDetail.message : 'Refresh the Page to see the status'
                            });
                            value = response.messageDetail ? response.messageDetail.value : undefined;
                            if (value) {
                                history.push("edit-carousel/" + value);
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        setCount(0);
                        message = 'Try Later';
                        if (error_2.action === 'failure') {
                            message = error_2.messageDetail.message;
                        }
                        setSnackBarError({
                            open: true,
                            type: 'error',
                            message: message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    };
    var cloneAndCreate = function (rowData) {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, responseError_1, error, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.carouselService.getNonHeroCarouselData(rowData.id)];
                    case 1:
                        res = _a.sent();
                        delete res['id'];
                        saveCloneData(res);
                        return [3 /*break*/, 3];
                    case 2:
                        responseError_1 = _a.sent();
                        error = responseError_1.data || responseError_1;
                        message = 'Try Later';
                        if (error.action === 'failure') {
                            message = error.messageDetail.message;
                        }
                        setSnackBarError({
                            open: true,
                            type: 'error',
                            message: message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    };
    var updateStatus = function (rowData) {
        if (rowData.type === 'clone') {
            cloneAndCreate(rowData);
        }
        else if (rowData.type === 'delete') {
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var res, message, error_3, data_1, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, services_1.carouselService.deleteNonHeroCarouselData(rowData.id)];
                        case 1:
                            res = _a.sent();
                            message = res.messageDetail ? res.messageDetail.message : 'Refresh the Page to see the status';
                            if (res.action === 'success') {
                                setFilterParams(__assign({}, filterParams));
                                setSnackBarError({
                                    open: true,
                                    type: 'success',
                                    message: message
                                });
                            }
                            else {
                                setSnackBarError({
                                    open: true,
                                    type: 'error',
                                    message: message
                                });
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            data_1 = error_3.data || error_3;
                            message = 'Try Later';
                            if (data_1.action === 'failure') {
                                message = data_1.messageDetail.message;
                            }
                            setSnackBarError(__assign(__assign({}, snackBarProps), { open: true, type: 'error', message: message }));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })();
        }
        else {
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var res, message, error_4, data_2, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, services_1.carouselService.updateNonHeroCarouselData(rowData.id)];
                        case 1:
                            res = _a.sent();
                            console.log(res);
                            if (res.action === 'success') {
                                message = res.messageDetail ? res.messageDetail.message : 'Published successfully';
                                setFilterParams(__assign({}, filterParams));
                                setSnackBarError(__assign(__assign({}, snackBarProps), { open: true, type: 'success', message: message }));
                            }
                            else {
                                throw res;
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            data_2 = error_4.data || error_4;
                            message = 'Try Later';
                            if (data_2.action === 'failure') {
                                message = data_2.messageDetail.message;
                            }
                            setSnackBarError(__assign(__assign({}, snackBarProps), { open: true, type: 'error', message: message }));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })();
        }
    };
    var action = function (row) {
        updateStatus(row);
    };
    var columns = [
        {
            id: 'id',
            label: 'Id',
            render: function (value, rowData, isTitle) {
                if (isTitle) {
                    return value;
                }
                if (rowData) {
                    return (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            } },
                            react_1["default"].createElement(react_router_dom_1.NavLink, { to: { pathname: "/edit-carousel/" + rowData.id } },
                                " ",
                                value),
                            rowData.active && react_1["default"].createElement(StyledIcon, { icon: icons_1.SelectedCircle }))));
                }
                return '--';
            }
        },
        {
            id: 'title',
            label: 'Title',
            width: 100,
            render: function (props, data, isTitle) {
                if (isTitle) {
                    return data.title;
                }
                if (props || data) {
                    return (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(react_router_dom_1.NavLink, { to: { pathname: "/edit-carousel/" + data.id } }, data.title)));
                }
                return '--';
            }
        },
        {
            id: 'sorts',
            label: 'Sorted By',
            width: 150,
            render: function (sorts) {
                if (sorts && sorts.length) {
                    return sorts.join(' ,');
                }
                return '--';
            }
        },
        {
            id: 'startDate',
            label: 'Start Date',
            render: function (data) {
                if (data) {
                    return date_fns_1.format(new Date(data), 'dd/MM/yyyy, hh:mm aa');
                }
                return '--';
            }
        },
        {
            id: 'endDate',
            label: 'End Date',
            render: function (data) {
                if (data) {
                    return date_fns_1.format(new Date(data), 'dd/MM/yyyy, hh:mm aa');
                }
                return '--';
            }
        },
        { id: 'createdBy', label: 'Created By', width: 200 },
        { id: 'updatedBy', label: 'Updated By', width: 200 },
        {
            id: 'createdOn',
            label: 'Created On',
            render: function (data) {
                if (data) {
                    return date_fns_1.format(new Date(data), 'dd-MM-yy');
                }
                return '--';
            }
        },
        {
            id: 'updatedOn',
            label: 'Last updated',
            render: function (data) {
                if (data) {
                    return date_fns_1.format(new Date(data), 'dd-MM-yy');
                }
                return '--';
            }
        },
        {
            label: 'Action',
            render: function (props, data) {
                if (data) {
                    return (react_1["default"].createElement("div", { style: { display: 'flex' } },
                        react_1["default"].createElement(core_1.IconButton, { style: { marginLeft: '5px', padding: '6px' }, title: "Publish", color: "primary", "aria-label": "Publish", onClick: function () {
                                if (props) {
                                    props.action(__assign(__assign({}, data), { type: 'publish' }));
                                }
                            } },
                            react_1["default"].createElement(Publish_1["default"], null)),
                        react_1["default"].createElement(core_1.IconButton, { style: { marginLeft: '5px', padding: '6px' }, title: "Copy", color: "primary", "aria-label": "clone", onClick: function () {
                                if (props) {
                                    props.action(__assign(__assign({}, data), { type: 'clone' }));
                                }
                            } },
                            react_1["default"].createElement(FileCopy_1["default"], null)),
                        react_1["default"].createElement(core_1.IconButton, { style: { marginLeft: '5px', padding: '6px' }, title: "Delete", color: "primary", "aria-label": "Delete", onClick: function () {
                                if (props) {
                                    props.action(__assign(__assign({}, data), { type: 'delete' }));
                                }
                            } },
                            react_1["default"].createElement(DeleteForever_1["default"], null))));
                }
                return '--';
            }
        },
    ];
    var records = data.records || [];
    var TableData = {
        title: 'Table testing',
        count: count,
        columns: columns,
        rowsPerPage: 10,
        rows: __spreadArrays(records),
        filterRowsPerPage: [10, 25, 50, 100],
        fetchTableData: getUpdatedTableData,
        action: action
    };
    return (react_1["default"].createElement(DashBoardWrapper, null,
        react_1["default"].createElement("h1", null, "Page Carousel DashBoard"),
        count > 0 && react_1["default"].createElement(components_1.HSTable, __assign({}, TableData)),
        count === 0 && react_1["default"].createElement("h5", null, " Loading or no data"),
        snackBarError.open && react_1["default"].createElement(components_1.HsSnackbar, __assign({}, snackBarError, { onSnackBarClose: onSnackBarClose }))));
};
exports["default"] = DashBoard;
var templateObject_1, templateObject_2;
