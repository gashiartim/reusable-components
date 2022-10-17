"use strict";
/*********************************************************************
 * The Initial Developer of the content of this file is NETCONOMY.
 * All portions of the code written by NETCONOMY are property of
 * NETCONOMY. All Rights Reserved.
 *
 * NETCONOMY Software & Consulting GmbH
 * Bahnhofgürtel 77-79 / 7, A-8020 Graz (Austria)
 * FN 204360 f, Landesgericht fuer ZRS Graz
 * Tel: +43 (316) 815 544
 * Fax: +43 (316) 815544-99
 * www.netconomy.net
 *
 * (c) 2022 by NETCONOMY Software & Consulting GmbH
 ********************************************************************/
exports.__esModule = true;
exports.useTabsContext = void 0;
var react_1 = require("react");
var useTabs_1 = require("shop/client/hooks/useTabs");
var Tabs_scss_1 = require("shop/client/components/molecules/tabs/Tabs.scss");
var constants_1 = require("shop/client/constants");
var Tab_1 = require("shop/client/components/molecules/tabs/tab/Tab");
var TabLabels_1 = require("shop/client/components/molecules/tabs/tab-labels/TabLabels");
var client_1 = require("@archibald/client");
var initialState = { activeIndex: 0, openTab: constants_1.CommonConstants.NOOP, disabledIndexes: [], hiddenIndexes: [] };
var TabsContext = react_1.createContext(initialState);
function useTabsContext() {
    return react_1.useContext(TabsContext);
}
exports.useTabsContext = useTabsContext;
var Tabs = function (_a) {
    var children = _a.children, contentClassName = _a.contentClassName;
    var _b = useTabs_1.useTabs(initialState), activeIndex = _b.activeIndex, disabledIndexes = _b.disabledIndexes, hiddenIndexes = _b.hiddenIndexes, openTab = _b.openTab;
    var contentClassNames = client_1.classNamesHelper([Tabs_scss_1["default"].tabContent, contentClassName ? Tabs_scss_1["default"][contentClassName] : null]);
    console.log('contentClassNames', contentClassNames);
    var labels = react_1.Children.map(children, function (child) {
        var item = child;
        return item.props.label;
    });
    var renderChildrens = function (childs) {
        return react_1.Children.map(childs, function (child, index) {
            return react_1.cloneElement(child, { index: index });
        });
    };
    return (React.createElement(TabsContext.Provider, { value: { activeIndex: activeIndex, disabledIndexes: disabledIndexes, hiddenIndexes: hiddenIndexes, openTab: openTab } },
        React.createElement(TabLabels_1.TabLabels, { labels: labels }),
        React.createElement("div", { className: contentClassNames }, renderChildrens(children))));
};
Tabs.Item = Tab_1["default"];
exports["default"] = Tabs;
