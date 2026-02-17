import { cn } from "../../lib/utils";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";

export interface DockProps {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, magnification = DEFAULT_MAGNIFICATION, distance = DEFAULT_DISTANCE, ...props }, ref) => {
    const mousex = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<DockIconProps>, { 
            mousex, 
            magnification, 
            distance 
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mousex.set(e.pageX)}
        onMouseLeave={() => mousex.set(Infinity)}
        {...props}
        className={cn("flex items-end", className)}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  magnification?: number;
  distance?: number;
  mousex?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({ 
  magnification = DEFAULT_MAGNIFICATION, 
  distance = DEFAULT_DISTANCE, 
  mousex, 
  className, 
  children, 
  ...props 
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const fallbackMousex = useMotionValue(Infinity);
  const activeMousex = mousex || fallbackMousex;

  const distanceCalc = useTransform(activeMousex, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [40, magnification, 40]);
  const width = useSpring(widthSync, { 
    mass: 0.05,
    stiffness: 200,
    damping: 15
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: '40px' }}
      className={cn("flex cursor-pointer items-center justify-center rounded-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };