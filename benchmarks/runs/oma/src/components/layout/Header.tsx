import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";

interface HeaderProps {
  userEmoji?: string;
  userName?: string;
}

export function Header({ userEmoji, userName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-spark-100">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-sunset-500 transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300 rounded-xl"
          aria-label="Worldcraft home"
        >
          Worldcraft
          <span aria-hidden="true" className="[animation:var(--animate-sparkle)]">
            ✨
          </span>
        </Link>

        <nav className="flex items-center gap-4" aria-label="Main navigation">
          {userEmoji ? (
            <div className="flex items-center gap-2">
              {userName && (
                <span className="hidden text-base font-semibold text-gray-700 sm:block">
                  {userName}
                </span>
              )}
              <Avatar emoji={userEmoji} label={userName ?? "My avatar"} size="md" />
            </div>
          ) : (
            <Link
              href="/onboarding"
              className="inline-flex h-10 items-center rounded-2xl bg-gradient-to-r from-spark-400 to-sunset-400 px-5 text-sm font-bold text-white shadow transition hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300"
            >
              Get Started
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
