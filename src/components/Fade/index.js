import React, { memo } from "react";
import { Transition } from "react-transition-group";

const OPACITY_DURATION = 750;
const TRANSFORM_DURATION = 1000;
const DURATION = Math.max(OPACITY_DURATION, TRANSFORM_DURATION);

const defaultStyle = {
  transition: `opacity ${OPACITY_DURATION}ms ease-in-out, transform ${TRANSFORM_DURATION}ms ease-in-out`,
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
    <Transition in={inProp} timeout={DURATION} {...rest}>
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
