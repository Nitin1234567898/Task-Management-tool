import { useMemo } from 'react';

const GREETINGS = [
  "Ready when you are.",
  "Let’s get things done.",
  "What’s first today?",
  "Time to begin.",
  "Your tasks are waiting.",
  "Start where you are.",
  "One step at a time.",
  "Let’s make progress.",
  "Today starts here.",
  "Small steps beat no steps.",
  "Progress over perfection.",
  "Show up for yourself.",
  "Make today count.",
  "Build momentum.",
  "Focus beats motivation.",
  "Consistency wins.",
  "Keep moving forward.",
  "Let’s create some wins.",
  "Let’s knock some stuff out.",
  "What are we tackling today?",
  "Ready to roll?",
  "Let’s do this.",
  "Time to get rolling.",
  "Let’s clear the list.",
  "Make it a productive one.",
  "Let’s start strong.",
  "Plan. Do. Repeat.",
  "Focus mode on.",
  "Start now.",
  "Begin here.",
  "Make progress.",
  "Get moving.",
  "Take control.",
  "Stay focused.",
  "Get organized.",
  "One task closer.",
  "Keep going.",
  "You’re on track.",
  "Today matters.",
  "Trust the process.",
  "Just start.",
  "Make future-you proud.",
  "Do the thing.",
  "Less scrolling. More doing.",
  "Tasks don’t finish themselves.",
  "Let’s make stuff happen.",
  "Organize your day.",
  "Turn plans into action.",
  "From ideas to execution.",
  "Shape your day.",
  "Take charge of today."
];


export function Greeting() {
  // useMemo will select a greeting once per component mount (i.e., on refresh)
  const randomGreeting = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * GREETINGS.length);
    return GREETINGS[randomIndex];
  }, []);

  return (
    // Positioned at the top-left, below the XP bar
    <div className="fixed top-24 left-8 z-0 pointer-events-none">
      <p className="text-gray-300 text-4xl font-light">
        {randomGreeting}
      </p>
    </div>
  );
}