import { FunctionComponent, ReactElement, useState } from "react";
import TabLabel, {
  ITabLabel,
} from "shop/client/components/molecules/simple-tabs/tab-label/TabLabel";
import Classes from "shop/client/components/molecules/simple-tabs/SimpleTabs.scss";
import { classNamesHelper } from "@archibald/client";
import Tab, {
  ITab,
} from "shop/client/components/molecules/simple-tabs/tab/Tab";

export interface ISimpleTabs {
  children: ReactElement<ITabLabel>[];
  initialActiveTab?: number;
  contentClassName?: string;
}

interface ISimpleTabsChildrens {
  Item: FunctionComponent<ITab>;
}

const SimpleTabs: FunctionComponent<ISimpleTabs> & ISimpleTabsChildrens = (
  props
): JSX.Element => {
  const { children, initialActiveTab, contentClassName } = props;
  const [activeTab, setActiveTab] = useState<number>(
    () => initialActiveTab || 0
  );

  const contentClassNames = classNamesHelper([
    Classes["content"],
    contentClassName,
  ]);

  function activeTabHandler(index: number) {
    setActiveTab(index);
  }

  function validateChildrenType(child: ReactElement<ITabLabel>) {
    if (child.type !== Tab) {
      throw Error("Please use SimpleTabs.Item component to render tabs");
    }
  }

  function renderLabels() {
    return children.map((child, index) => {
      validateChildrenType(child);

      return child.props.show && child.type === Tab ? (
        <TabLabel
          key={`tab-label-${index}`}
          {...child.props}
          index={index}
          setActiveTab={activeTabHandler}
          isActive={index === activeTab}
        />
      ) : null;
    });
  }

  return (
    <div>
      <ul className={Classes.labelsContainer} data-testid="tabLabels">
        {renderLabels()}
      </ul>
      <div className={contentClassNames} data-testid="tabsContent">
        {children[activeTab]}
      </div>
    </div>
  );
};

SimpleTabs.Item = Tab;
export default SimpleTabs;
