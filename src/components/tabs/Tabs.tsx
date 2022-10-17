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

import { createContext, FunctionComponent, ReactNode, useContext, Children, ReactElement, PropsWithChildren, cloneElement, useMemo } from 'react';
import { useTabs } from 'shop/client/hooks/useTabs';
import Classes from 'shop/client/components/molecules/tabs/Tabs.scss';
import { CommonConstants } from 'shop/client/constants';
import Tab, { ITab } from 'shop/client/components/molecules/tabs/tab/Tab';
import { TabLabels } from 'shop/client/components/molecules/tabs/tab-labels/TabLabels';
import { classNamesHelper } from '@archibald/client';

interface ITabsContext {
    activeIndex: number;
    disabledIndexes: number[];
    hiddenIndexes: number[];
    openTab: (index: number) => void;
}
const initialState = { activeIndex: 0, openTab: CommonConstants.NOOP, disabledIndexes: [], hiddenIndexes: [] };

const TabsContext = createContext<ITabsContext>(initialState);

export function useTabsContext() {
    return useContext(TabsContext);
}

export interface ITabs {
    children: ReactNode | ReactNode[];
    contentClassName?: string;
}

interface ITabsChildrens {
    Item: FunctionComponent<ITab>;
}

const Tabs: FunctionComponent<ITabs> & ITabsChildrens = ({ children, contentClassName }) => {
    const { activeIndex, disabledIndexes, hiddenIndexes, openTab } = useTabs(initialState);

    const contentClassNames = classNamesHelper([Classes.tabContent, contentClassName]);

    const shouldNotBeDisplayed =
        Children.toArray(children).filter((child) => {
            const item = child as ReactElement<PropsWithChildren<ITab>>;
            return item.props.show === true;
        }).length === 0;

    const labels: string[] = useMemo(
        () =>
            Children.toArray(children)
                .filter((child) => {
                    const item = child as ReactElement<PropsWithChildren<ITab>>;
                    return item.props.show === true;
                })
                .map((child) => {
                    const item = child as ReactElement<PropsWithChildren<ITab>>;

                    return item.props.label;
                }) as string[],
        [children]
    );

    const renderChildrens = (childs: ReactElement<PropsWithChildren<ITab>>[]) => {
        const childrens: ReactElement<PropsWithChildren<ITab>>[] = [];

        Children.forEach(childs, (child) => {
            if (child.props.show) {
                childrens.push(child);
            }
        });

        return childrens.map((child, index) => {
            return cloneElement(child, { index, key: `tab-${index}` });
        });
    };

    if (shouldNotBeDisplayed) {
        return null;
    }

    return (
        <TabsContext.Provider value={{ activeIndex, disabledIndexes, hiddenIndexes, openTab }}>
            <TabLabels labels={labels} />
            <div data-testid="tabsContent" className={contentClassNames}>
                {renderChildrens(children as ReactElement<PropsWithChildren<ITab>>[])}
            </div>
        </TabsContext.Provider>
    );
};

Tabs.Item = Tab;
export default Tabs;
