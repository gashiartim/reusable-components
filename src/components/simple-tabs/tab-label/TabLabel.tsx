import { classNamesHelper } from '@archibald/client';
import { FunctionComponent } from 'react';
import Classes from 'shop/client/components/molecules/simple-tabs/tab-label/TabLabel.scss';

export interface ITabLabel {
    index: number;
    label: string;
    isActive: boolean;
    setActiveTab: (index: number) => void;
    show?: boolean;
}

const TabLabel: FunctionComponent<ITabLabel> = (props) => {
    const { index, label, isActive, setActiveTab, show = true } = props;

    const tabLabelClassNames = classNamesHelper([Classes['tabLabel'], isActive && Classes['activeLabel'], !show && Classes['hiddenLabel']]);

    function onClickHandler() {
        setActiveTab(index);
    }

    return (
        <li className={tabLabelClassNames} onClick={onClickHandler}>
            {label}
        </li>
    );
};

export default TabLabel;
