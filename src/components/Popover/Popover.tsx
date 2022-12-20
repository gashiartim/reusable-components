import useMountTransition from "@src/lib/hooks/useMountTransition";
import classNames from "classnames";
import {
  Children,
  cloneElement,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from "react";

export interface IPopoverButton {
  children: string | ReactNode;
  onMouseEnter: (index: number) => void;
  linkIndex: number;
  activePopover: number;
}

const Button: FunctionComponent<IPopoverButton> = ({
  children,
  onMouseEnter,
  linkIndex,
  activePopover,
}) => {
  const buttonClassNames = classNames([
    "py-4 mx-4 cursor-pointer",
    linkIndex === activePopover && "text-cyan-400",
  ]);

  return (
    <div
      className={buttonClassNames}
      onMouseEnter={() => onMouseEnter(linkIndex)}
    >
      {children}
    </div>
  );
};

export interface IPopoverContent {
  children: string | ReactNode;
  linkIndex: number;
  activePopover: number | null;
  onMouseLeave: () => void;
  className?: string;
}

const Content: FunctionComponent<IPopoverContent> = ({
  children,
  activePopover,
  linkIndex,
  onMouseLeave,
  className,
}) => {
  const isMounted = linkIndex === activePopover;

  const hasTransitionedId = useMountTransition(isMounted, 1000);

  const popoverWrapperClassNames = classNames([
    "absolute right-0 left-0 top-[70px]",
    className,
  ]);

  const popoverContentClassNames = classNames([
    "opacity-0 translate-y-5 transition-all duration-[500] ease-in-out z-20 p-4 bg-black bg-opacity-90 border border-blue-300 border-opacity-50",
    hasTransitionedId && isMounted && "opacity-90 translate-y-0",
  ]);

  return (
    <div className={popoverWrapperClassNames}>
      {(isMounted || hasTransitionedId) && (
        <div className={popoverContentClassNames} onMouseLeave={onMouseLeave}>
          {children}
        </div>
      )}
    </div>
  );
};

export interface IPopover {
  children: ReactNode;
  linkIndex: number;
  activePopover: number | null;
  onMouseLeave: () => void;
  onMouseEnter: (index: number) => void;
}

interface IPopoverChildrens {
  Button: FunctionComponent<
    Omit<IPopoverButton, "linkIndex" | "onMouseEnter" | "activePopover">
  >;
  Content: FunctionComponent<
    Omit<IPopoverContent, "activePopover" | "linkIndex" | "onMouseLeave">
  >;
}

const Popover: FunctionComponent<IPopover> & IPopoverChildrens = ({
  children,
  ...otherProps
}) => {
  const popoverClassNames = classNames([""]);

  const renderChildrens = () => {
    return Children.map(
      children as any,
      (child: ReactElement<IPopoverButton | IPopoverContent>): ReactNode => {
        return cloneElement(child, {
          ...otherProps,
        });
      }
    );
  };

  return <div className={popoverClassNames}>{renderChildrens()}</div>;
};

Popover.Button = Button as FunctionComponent<
  Omit<IPopoverButton, "linkIndex" | "onMouseEnter" | "activePopover">
>;
Popover.Content = Content as FunctionComponent<
  Omit<IPopoverContent, "activePopover" | "linkIndex" | "onMouseLeave">
>;

export default Popover;
