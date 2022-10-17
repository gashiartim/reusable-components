import { render } from '@testing-library/react';
import TabsComponent from 'shop/client/components/molecules/tabs/Tabs';

const defaultProps = {
    children: [
        ...[...Array(4)].map((_, index) => {
            return (
                <TabsComponent.Item key={`tab-${index}`} label={`Tab-${index}`} show={index % 2 === 0}>
                    <div>Tab-content-{index}</div>
                </TabsComponent.Item>
            );
        })
    ]
};

describe('<TabsComponent /> component:', () => {
    describe('Rendering TabsComponent', () => {
        it('should exist ', async () => {
            const container = render(<TabsComponent {...defaultProps} />);
            expect(container).toBeDefined();
        });

        it('should render classes', async () => {
            const { getByTestId } = render(<TabsComponent contentClassName="tabs-content" {...defaultProps} />);
            const container = getByTestId('tabsContent');

            expect(container).toHaveClass('tabs-content');
        });

        it('should render only 1 children(tab) at a time', async () => {
            const { getByTestId } = render(<TabsComponent {...defaultProps} />);

            const container = getByTestId('tabsContent');
            const childs = container.children.length;

            expect(childs).toBe(1);
        });

        it('should render only tabs which have content(flag show === true). In this case it should render only 2 childrens', async () => {
            const { getByTestId } = render(<TabsComponent {...defaultProps} />);

            const container = getByTestId('tabLabels');
            const childs = container.children.length;

            expect(childs).toBe(2);
        });
    });
});
