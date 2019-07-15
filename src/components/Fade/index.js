import React, { memo } from "react";
import { Transition } from "react-transition-group";

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
  opacity: 0,
  transform: "translateY(0)"
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0, transform: "translateY(2%)" },
  exited: { opacity: 0 }
};

export const Fade = memo(({ in: inProp, children, ...rest }) => {
  return (
    <Transition in={inProp} timeout={duration} {...rest}>
      {state => {
        return (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            {children}
          </div>
        );
      }}
    </Transition>
  );
});
