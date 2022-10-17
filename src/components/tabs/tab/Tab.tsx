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

import { FunctionComponent, ReactNode } from 'react';
import { useTabsContext } from '../Tabs';
import Classes from 'shop/client/components/molecules/tabs/tab/Tab.scss';

export interface ITab {
    children: ReactNode | ReactNode[];
    show?: boolean;
    index?: number;
    label?: string;
}

const Tab: FunctionComponent<ITab> = ({ children, index, show = true }) => {
    const { activeIndex } = useTabsContext();

    if (!(activeIndex === index || !show)) {
        return null;
    }

    return <div className={Classes.tab}>{children}</div>;
};

export default Tab;
