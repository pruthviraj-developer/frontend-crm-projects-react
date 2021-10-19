"use strict";
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
var react_1 = require("react");
var StyledSearch_1 = require("./StyledSearch");
var icons_1 = require("@hs/icons");
var framework_1 = require("@hs/framework");
var services_1 = require("@hs/services");
var router_1 = require("next/router");
// import { chain } from 'lodash-es';
var RECENT_SEARCH = 'RecentSearch';
var BRAND_SUGGESTION = 'BrandSuggestion';
var KEYWORD = 'Keyword';
var CATEGORY_SUGGESTION = 'CategorySuggestion';
var Search = function (_a) {
    var close = _a.close, resource = _a.resource;
    // let _recentSearch: boolean = true;
    var router = router_1.useRouter();
    var _b = react_1.useState(''), searchBy = _b[0], setSearchBy = _b[1];
    var _c = react_1.useState([]), suggestions = _c[0], setSuggestions = _c[1];
    var keyWord = framework_1.useDebounce(searchBy, 500);
    // const readRecentSearchesFromLocalStorage: any = useReadLocalStorage(['recentSearches']);
    var _d = framework_1.useLocalStorage('recentSearches', []), recentSearchData = _d[0], setRecentSearchData = _d[1];
    var _e = react_1.useState(recentSearchData), recentSearches = _e[0], setRecentSearches = _e[1];
    var getSuggestions = function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 2, 3]);
                        return [4 /*yield*/, services_1.productDetailsService.getEulerAutoSuggestions(keyWord)];
                    case 1:
                        response = _a.sent();
                        if (response.action === 'success') {
                            setSuggestions(response.suggestions);
                        }
                        return [3 /*break*/, 3];
                    case 2: return [7 /*endfinally*/];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    };
    react_1.useEffect(function () {
        // _recentSearch = true;
        if (keyWord.length) {
            setRecentSearches([]);
            setSuggestions([]);
            // if (resource) {
            //   const brands = resource.brands || [];
            //   const categories = resource.categories;
            //   const subCategories = chain(categories)
            //     .map(function (each: any) {
            //       if (each.subCategory) {
            //         for (let i = 0; i < each.subCategory.length; i++) {
            //           each.subCategory[i].parentName = each.name;
            //         }
            //         return each.subCategory;
            //       }
            //       return null;
            //     })
            //     .flatten()
            //     .compact()
            //     .value();
            //   const productTypeList = chain(subCategories)
            //     .map(function (each: any) {
            //       if (each.productTypeList) {
            //         for (let i = 0; i < each.productTypeList.length; i++) {
            //           each.productTypeList[i].parentName = each.parentName;
            //         }
            //         return each.productTypeList;
            //       }
            //       return null;
            //     })
            //     .flatten()
            //     .compact()
            //     .value();
            //   const stringContains = (each: any) => {
            //     return each.name.toLowerCase().indexOf(keyWord.toLowerCase()) > -1;
            //   };
            //   const suggestions = []
            //     .concat(
            //       chain(productTypeList)
            //         .filter(stringContains)
            //         .map(function (each: any) {
            //           return {
            //             label: each.name + ' in ' + each.parentName,
            //             id: each.id,
            //             name: each.name,
            //             type: 'productTypeList',
            //           };
            //         })
            //         .value(),
            //     )
            //     .concat(
            //       chain(subCategories)
            //         .filter(stringContains)
            //         .map(function (each: any) {
            //           return {
            //             label: each.name + ' in ' + each.parentName,
            //             id: each.id,
            //             name: each.name,
            //             type: 'subCategories',
            //           };
            //         })
            //         .value(),
            //     )
            //     .concat(
            //       chain(categories)
            //         .filter(stringContains)
            //         .map(function (each: any) {
            //           return {
            //             label: each.name,
            //             id: each.id,
            //             name: each.name,
            //             type: 'categories',
            //           };
            //         })
            //         .value(),
            //     )
            //     .concat(
            //       chain(brands)
            //         .filter(stringContains)
            //         .map(function (each: any) {
            //           return {
            //             label: each.name + ' in Brands',
            //             id: each.id,
            //             name: each.name,
            //             type: 'brands',
            //           };
            //         })
            //         .value(),
            //     );
            //   setSuggestions(suggestions);
            //   return;
            // }
            getSuggestions();
        }
    }, [keyWord]);
    var getSubCategorys = function (categoryId) {
        var categories = (resource && resource.categories) || [];
        if (categories && categories.length) {
            var categoryList = categories.filter(function (category) { return category.id === categoryId; });
            if (categoryList[0] && categoryList[0].hasOwnProperty('subCategory')) {
                var reduceValue = function (initial, subCategory) { return initial + ',' + subCategory.id; };
                return categoryList[0] && categoryList[0].subCategory && categoryList[0].subCategory.reduce(reduceValue, '');
            }
            return '';
        }
    };
    var submitForm = function (e) {
        e ? e.preventDefault() : '';
        // _recentSearch = false;
        getSuggestions();
    };
    var handleOnChange = function (e) {
        setSearchBy(e.target.value);
    };
    var selectAndSearch = function (data, recent, suggestionIndex, options) {
        var searchObj = Object.assign({}, data, { recent: recent }, options);
        var q = {};
        var id = searchObj.id, name = searchObj.name, type = searchObj.type;
        var params = {
            resetFunnel: true,
            funnel_tile: name,
            funnel_section: ''
        };
        var extraSegdata = {
            from_location: 'Search icon'
        };
        if (keyWord) {
            extraSegdata.keyword = keyWord;
            extraSegdata.length = keyWord.length;
        }
        if (Number.isInteger(suggestionIndex) && suggestionIndex > -1) {
            extraSegdata.suggestion_index = suggestionIndex + 1;
        }
        extraSegdata = Object.assign({}, searchObj.trackingData, extraSegdata);
        params.extraSegdata = JSON.stringify(extraSegdata);
        if (recentSearchData.length >= 5 &&
            recentSearchData.filter(function (e) {
                return e.name == name;
            }).length < 1) {
            setRecentSearchData(__spreadArrays([searchObj], recentSearchData.slice(0, 4)));
        }
        else if (recentSearchData.filter(function (e) {
            return e.name == name;
        }).length < 1) {
            setRecentSearchData(__spreadArrays([searchObj], recentSearchData));
        }
        if (searchObj.search_params || searchObj.actionURI) {
            if (searchObj.actionURI) {
                params.hplp = null;
            }
            else {
                var stringyfiedSearchParams = void 0;
                if (typeof searchObj.search_params === 'string') {
                    stringyfiedSearchParams = searchObj.search_params;
                }
                else {
                    stringyfiedSearchParams = Object.keys(searchObj.search_params)
                        .map(function (key) { return key + '=' + searchObj.search_params[key]; })
                        .join('&');
                }
                q = Object.assign({}, q, {
                    searchParams: btoa(stringyfiedSearchParams)
                });
                params.hplp = name;
            }
            params.hsection = recent === 'recent' ? RECENT_SEARCH : extraSegdata.section;
            params.funnel_section = recent === 'recent' ? RECENT_SEARCH : extraSegdata.section;
            // _self._SegmentService.setUniversal('Server autocomplete');
        }
        else {
            // if (type !== 'keyword') {
            //   console.log('Client autocomplete');
            //   // _self._SegmentService.setUniversal('Client autocomplete');
            // }
            if (type === 'brands') {
                q.filterQuery = 'brandId=' + id;
                q.brandId = id;
                params.hsection = recent === 'recent' ? RECENT_SEARCH : BRAND_SUGGESTION;
                params.hplp = name;
                params.funnel_section = BRAND_SUGGESTION;
            }
            else if (type === 'keyword') {
                q.filterQuery = 'keyWord=' + name;
                q.keyWord = name;
                // params.hsection = _recentSearch ? RECENT_SEARCH : KEYWORD;
                params.hsection = RECENT_SEARCH;
                // END As we are not using keyboard arrows
                params.hplp = name;
                params.orderRule = 3;
                params.funnel_section = recent === 'recent' ? RECENT_SEARCH : KEYWORD;
            }
            else if (type === 'productTypeList') {
                q.filterQuery = 'productTypeId=' + id;
                q.productTypeId = id;
                params.hsection = recent === 'recent' ? RECENT_SEARCH : CATEGORY_SUGGESTION;
                params.hplp = name;
                params.funnel_section = params.hsection;
            }
            else {
                var categoryIds = getSubCategorys(id);
                q.filterQuery = 'subCategorys=' + id + categoryIds;
                params.hsection = recent === 'recent' ? RECENT_SEARCH : CATEGORY_SUGGESTION;
                params.hplp = name;
            }
        }
        if (params.resetFunnel && !params.funnel) {
            params.funnel = 'Search';
        }
        params.section = params.hsection;
        params.subSection = params.hsubSection;
        params.plp = params.hplp;
        q.searchBy = searchObj.search_params ? searchObj.term : name;
        var qparams = __assign({}, params);
        qparams.q = JSON.stringify(q);
        router.push({
            pathname: searchObj.actionURI || 'search',
            query: qparams
        });
        // console.log(qparams);
    };
    var getHighlightSearchText = function (word, suggestion) {
        var highlightText = suggestion;
        if (suggestion.includes('<b>') || suggestion.includes('<p>')) {
            highlightText = suggestion;
        }
        else {
            try {
                var str = new RegExp(word, 'gi');
                highlightText = suggestion.replace(str, function (w) {
                    return '<em>' + w + '</em>';
                });
                highlightText = '<p>' + highlightText + '</p>';
            }
            catch (error) {
                //TBD
            }
        }
        return highlightText;
    };
    return (react_1["default"].createElement(StyledSearch_1.SearchWrapper, null,
        react_1["default"].createElement(StyledSearch_1.SearchField, null,
            react_1["default"].createElement(StyledSearch_1.SearchForm, { onSubmit: function (e) {
                    return submitForm(e);
                }, noValidate: true, autoComplete: 'off' },
                react_1["default"].createElement("input", { type: "text", name: "search", onChange: handleOnChange, placeholder: "Search for products" }),
                react_1["default"].createElement(StyledSearch_1.CloseIcon, { onClick: close, icon: icons_1.IconClose })),
            react_1["default"].createElement(StyledSearch_1.SearchList, null, recentSearches && recentSearches.length && suggestions && suggestions.length === 0 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(StyledSearch_1.List, null, "Recent Searches"),
                recentSearches.map(function (data, index) {
                    return (react_1["default"].createElement(StyledSearch_1.List, { key: index, onClick: function () {
                            selectAndSearch(data, 'recent', index, null);
                        }, dangerouslySetInnerHTML: { __html: data.term || data.name } }));
                }))) : suggestions && suggestions.length > 0 ? (suggestions.map(function (data, index) {
                return (react_1["default"].createElement(StyledSearch_1.List, { key: index, onClick: function () {
                        selectAndSearch(data, null, index, null);
                    }, dangerouslySetInnerHTML: { __html: data.displayName || getHighlightSearchText(keyWord, data.label) } }));
            })) : ('')))));
};
exports["default"] = Search;
