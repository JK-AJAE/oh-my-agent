"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";

// Step definitions

const TOTAL_STEPS = 3;

const AVATARS = [
  { emoji: "🦊", label: "Fox" },
  { emoji: "🐱", label: "Cat" },
  { emoji: "🐼", label: "Panda" },
  { emoji: "🦄", label: "Unicorn" },
  { emoji: "🐙", label: "Octopus" },
  { emoji: "🌟", label: "Star" },
] as const;

const THEMES = [
  { id: "forest", emoji: "🌲", label: "Forest", description: "Tall trees and woodland creatures", color: "from-forest-400/30 to-forest-500/20 border-forest-400" },
  { id: "ocean", emoji: "🌊", label: "Ocean", description: "Deep blue seas and sea life", color: "from-ocean-400/30 to-ocean-500/20 border-ocean-400" },
  { id: "space", emoji: "🚀", label: "Space", description: "Stars, planets, and rockets", color: "from-magic-400/30 to-magic-500/20 border-magic-400" },
  { id: "fantasy", emoji: "🦄", label: "Fantasy", description: "Magic, castles, and dragons", color: "from-candy-400/30 to-candy-500/20 border-candy-400" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

interface OnboardingState {
  name: string;
  avatar: string;
  theme: ThemeId | "";
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2" role="group" aria-label="Onboarding progress">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={[
            "h-3 rounded-full transition-all duration-300",
            i + 1 === current
              ? "w-8 bg-gradient-to-r from-spark-400 to-sunset-400"
              : i + 1 < current
              ? "w-3 bg-spark-400"
              : "w-3 bg-gray-200",
          ].join(" ")}
          aria-label={`Step ${i + 1}${i + 1 === current ? " (current)" : i + 1 < current ? " (completed)" : ""}`}
          aria-current={i + 1 === current ? "step" : undefined}
        />
      ))}
    </div>
  );
}

function Step1Name({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputId = useId();
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="text-6xl [animation:var(--animate-bounce-gentle)]" aria-hidden="true">
        👋
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        What&apos;s your name?
      </h1>
      <p className="text-lg text-gray-500">We&apos;ll use it to greet you!</p>
      <div className="w-full max-w-xs">
        <label htmlFor={inputId} className="sr-only">
          Your name
        </label>
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your name here..."
          maxLength={32}
          autoFocus
          className="w-full rounded-2xl border-2 border-spark-200 bg-spark-50 px-5 py-4 text-xl font-bold text-gray-800 placeholder-gray-300 transition focus:border-spark-400 focus:outline-none focus:ring-4 focus:ring-spark-300"
          aria-required="true"
        />
      </div>
    </div>
  );
}

function Step2Avatar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (emoji: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="text-6xl [animation:var(--animate-float)]" aria-hidden="true">
        🪞
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Pick your look!
      </h1>
      <p className="text-lg text-gray-500">Choose your avatar character</p>
      <div
        className="grid grid-cols-3 gap-4"
        role="group"
        aria-label="Avatar selection"
      >
        {AVATARS.map(({ emoji, label }) => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            aria-pressed={selected === emoji}
            aria-label={`${label} avatar`}
            className={[
              "flex flex-col items-center gap-2 rounded-3xl border-4 p-4 transition-all duration-150",
              "hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300",
              selected === emoji
                ? "border-spark-400 bg-spark-50 shadow-lg scale-105"
                : "border-transparent bg-white shadow hover:border-spark-200",
            ].join(" ")}
          >
            <Avatar emoji={emoji} label={label} size="xl" />
            <span className="text-sm font-bold text-gray-600">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step3Theme({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: ThemeId) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="text-6xl [animation:var(--animate-sparkle)]" aria-hidden="true">
        🗺️
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        What do you want to build?
      </h1>
      <p className="text-lg text-gray-500">Choose a theme for your first world</p>
      <div
        className="grid w-full max-w-lg grid-cols-2 gap-4"
        role="group"
        aria-label="World theme selection"
      >
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelect(theme.id)}
            aria-pressed={selected === theme.id}
            aria-label={`${theme.label} theme: ${theme.description}`}
            className={[
              "flex flex-col items-center gap-3 rounded-3xl border-4 bg-gradient-to-br p-5 text-left transition-all duration-150",
              "hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300",
              theme.color,
              selected === theme.id
                ? "scale-105 shadow-lg"
                : "border-transparent shadow hover:shadow-md",
            ].join(" ")}
          >
            <span className="text-4xl" aria-hidden="true">{theme.emoji}</span>
            <span className="text-lg font-extrabold text-gray-900">{theme.label}</span>
            <span className="text-sm text-gray-600">{theme.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<OnboardingState>({
    name: "",
    avatar: "",
    theme: "",
  });

  const canProceed =
    (step === 1 && state.name.trim().length >= 1) ||
    (step === 2 && state.avatar !== "") ||
    (step === 3 && state.theme !== "");

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      // MVP: store in sessionStorage and redirect to builder
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "worldcraft_profile",
          JSON.stringify({ name: state.name.trim(), avatar: state.avatar, theme: state.theme })
        );
      }
      router.push("/builder/new");
    }
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-spark-50 to-white px-4 py-8 sm:py-16">
      <div className="w-full max-w-2xl">
        {/* Back link */}
        <div className="mb-6 flex items-center">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 rounded-xl px-3 py-2 text-base font-bold text-gray-500 transition hover:bg-spark-50 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300"
              aria-label="Go back to previous step"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>
          ) : (
            <a
              href="/"
              className="flex items-center gap-1 rounded-xl px-3 py-2 text-base font-bold text-gray-500 transition hover:bg-spark-50 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Home
            </a>
          )}
          <div className="ml-auto">
            <span className="text-sm font-semibold text-gray-400">
              Step {step} of {TOTAL_STEPS}
            </span>
          </div>
        </div>

        {/* Progress dots */}
        <div className="mb-8">
          <ProgressDots current={step} total={TOTAL_STEPS} />
        </div>

        {/* Step content */}
        <Card padding="lg" className="mb-8 shadow-xl">
          {step === 1 && (
            <Step1Name
              value={state.name}
              onChange={(name) => setState((s) => ({ ...s, name }))}
            />
          )}
          {step === 2 && (
            <Step2Avatar
              selected={state.avatar}
              onSelect={(avatar) => setState((s) => ({ ...s, avatar }))}
            />
          )}
          {step === 3 && (
            <Step3Theme
              selected={state.theme}
              onSelect={(theme) => setState((s) => ({ ...s, theme }))}
            />
          )}
        </Card>

        {/* Next button */}
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
            className="w-full max-w-xs"
            aria-label={step === TOTAL_STEPS ? "Finish setup and start building" : "Continue to next step"}
          >
            {step === TOTAL_STEPS ? "Let's Build! 🚀" : "Next →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
