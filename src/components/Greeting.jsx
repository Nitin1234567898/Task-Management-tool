import { useMemo } from 'react';

const GREETINGS = [
  "Hello, let's start working.",
  "Ready to be productive?",
  "What's on the agenda today?",
  "Let's get things done.",
  "Create a new group to begin.",
  "An empty canvas awaits your tasks.",
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