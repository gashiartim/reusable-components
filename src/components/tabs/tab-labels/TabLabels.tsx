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

import { classNamesHelper } from '@archibald/client';
import { FunctionComponent } from 'react';
import { useTabsContext } from '../Tabs';
import Classes from 'shop/client/components/molecules/tabs/tab-labels/TabLabels.scss';

interface ITabLabel {
    index: number;
    label: string;
    disabledIndexes?: number[];
    hide?: boolean;
}

export const TabLabel: FunctionComponent<ITabLabel> = ({ index, label, hide }) => {
    const { disabledIndexes, openTab, activeIndex } = useTabsContext();

    const tabLabelsClassNames = classNamesHelper([
        Classes.tabLabel,
        disabledIndexes && disabledIndexes.includes(index) ? Classes['disabledTab'] : null,
        hide ? Classes['hiddenTab'] : null,
        activeIndex === index ? Classes['activeTab'] : null
    ]);

    function handleClick() {
        openTab(index);
    }

    return (
        <li className={tabLabelsClassNames} onClick={handleClick}>
            {label}
        </li>
    );
};

export interface ITabLabels {
    labels: string[];
}

export const TabLabels: FunctionComponent<ITabLabels> = ({ labels }) => {
    const { hiddenIndexes } = useTabsContext();

    return (
        <ul data-testid="tabLabels" className={Classes.tabLabels}>
            {labels.map((label, index) => {
                return <TabLabel key={`tab-label-${index}`} label={label} index={index} hide={hiddenIndexes.includes(index)} />;
            })}
        </ul>
    );
};
