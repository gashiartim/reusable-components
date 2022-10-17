import { FunctionComponent, ReactElement } from 'react';

export interface ITab {
    label: string;
    show?: boolean;
    children?: ReactElement | ReactElement[];
}

const Tab: FunctionComponent<ITab> = (props): JSX.Element | null => {
    const { show = true, children } = props;

    if (!show) {
        return null;
    }

    return <div data-testid="tab">{children}</div>;
};

export default Tab;
