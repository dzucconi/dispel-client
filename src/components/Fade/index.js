import React, { memo } from "react";
import { Transition } from "react-transition-group";
import parameters from "queryparams";

const { opacityDuration, transformDuration, translateY } = parameters({
  opacityDuration: 1000,
  transformDuration: 1250,
  translateY: "1%"
});

export const Fade = memo(({ in: inProp, children, ...rest }) => {
  const timeout = Math.max(opacityDuration, transformDuration);

  const defaultStyle = {
    transition: `opacity ${opacityDuration}ms ease-in-out, transform ${transformDuration}ms ease-in-out`,
    opacity: 0,
    transform: "translateY(0)"
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0, transform: `translateY(${translateY})` },
    exited: { opacity: 0 }
  };

  return (
    <Transition in={inProp} timeout={timeout} {...rest}>
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
