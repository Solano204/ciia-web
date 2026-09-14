"use client";

import React, { useState, Children, useRef, useLayoutEffect, type HTMLAttributes, type ReactNode } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  backButtonText?: string;
  nextButtonText?: string;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  backButtonText = "Anterior",
  nextButtonText = "Siguiente",
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    onStepChange(newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  return (
    <div className="w-full" {...rest}>
      <div className="flex w-full items-center">
        {stepsArray.map((_, index) => {
          const stepNumber = index + 1;
          const isNotLastStep = index < totalSteps - 1;
          return (
            <React.Fragment key={stepNumber}>
              <StepIndicator
                step={stepNumber}
                currentStep={currentStep}
                onClickStep={(clicked) => {
                  setDirection(clicked > currentStep ? 1 : -1);
                  updateStep(clicked);
                }}
              />
              {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
            </React.Fragment>
          );
        })}
      </div>

      <StepContentWrapper currentStep={currentStep} direction={direction}>
        {stepsArray[currentStep - 1]}
      </StepContentWrapper>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500 transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          {backButtonText}
        </button>
        <button
          onClick={handleNext}
          disabled={isLastStep}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-white/[0.1] disabled:pointer-events-none disabled:opacity-30"
        >
          {nextButtonText}
        </button>
      </div>
    </div>
  );
}

function StepContentWrapper({
  currentStep,
  direction,
  children,
}: {
  currentStep: number;
  direction: number;
  children: ReactNode;
}) {
  const [height, setHeight] = useState<number>(0);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height }}
      transition={{ type: "spring", duration: 0.4 }}
      className="mt-8"
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <SlideTransition key={currentStep} direction={direction} onHeightReady={setHeight}>
          {children}
        </SlideTransition>
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
}: {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? "-8%" : "8%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? "8%" : "-8%", opacity: 0 }),
};

export function Step({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function StepIndicator({
  step,
  currentStep,
  onClickStep,
}: {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
}) {
  const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  return (
    <motion.button
      type="button"
      onClick={() => onClickStep(step)}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs outline-none"
      animate={status}
      initial={false}
      variants={{
        inactive: { backgroundColor: "rgba(255,255,255,0.04)", color: "#6b6e7e", borderColor: "rgba(255,255,255,0.12)" },
        active: { backgroundColor: "rgba(30,193,203,0.14)", color: "#1EC1CB", borderColor: "#1EC1CB" },
        complete: { backgroundColor: "#1EC1CB", color: "#12121A", borderColor: "#1EC1CB" },
      }}
      style={{ border: "1px solid" }}
      transition={{ duration: 0.3 }}
    >
      {status === "complete" ? <CheckIcon /> : step}
    </motion.button>
  );
}

function StepConnector({ isComplete }: { isComplete: boolean }) {
  return (
    <div className="relative mx-1.5 h-px flex-1 overflow-hidden bg-[var(--border-v2)]">
      <motion.div
        className="absolute left-0 top-0 h-full bg-accent-v2"
        initial={false}
        animate={{ width: isComplete ? "100%" : "0%" }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
