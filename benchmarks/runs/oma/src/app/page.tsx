import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const FEATURES = [
  {
    emoji: "🏗️",
    title: "Build",
    description: "Place blocks, shapes, and objects to create your dream world.",
    color: "from-ocean-400/20 to-forest-400/20",
  },
  {
    emoji: "✨",
    title: "Imagine",
    description: "Let your creativity run wild with colors, themes, and magic!",
    color: "from-spark-400/20 to-magic-400/20",
  },
  {
    emoji: "🌍",
    title: "Share",
    description: "Show your creations to friends and explore their worlds.",
    color: "from-sunset-400/20 to-candy-400/20",
  },
] as const;

export default function LandingPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section
          className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:pt-32"
          aria-labelledby="hero-heading"
        >
          {/* Decorative floating shapes */}
          <div aria-hidden="true" className="pointer-events-none select-none">
            <div
              className="absolute -left-8 top-12 h-28 w-28 rounded-3xl bg-spark-300/50 rotate-12 [animation:var(--animate-float)]"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute right-4 top-8 h-20 w-20 rounded-full bg-ocean-400/40 [animation:var(--animate-float)]"
              style={{ animationDelay: "0.8s" }}
            />
            <div
              className="absolute -right-6 top-40 h-24 w-24 rounded-2xl bg-magic-400/30 -rotate-6 [animation:var(--animate-float)]"
              style={{ animationDelay: "1.6s" }}
            />
            <div
              className="absolute left-12 bottom-8 h-16 w-16 rounded-full bg-forest-400/40 [animation:var(--animate-bounce-gentle)]"
              style={{ animationDelay: "0.4s" }}
            />
            <div
              className="absolute right-20 bottom-12 h-12 w-12 rounded-xl bg-candy-400/30 rotate-45 [animation:var(--animate-float)]"
              style={{ animationDelay: "1.2s" }}
            />
            <div
              className="absolute left-1/3 top-6 h-10 w-10 rounded-full bg-sunset-400/40 [animation:var(--animate-sparkle)]"
              style={{ animationDelay: "0.6s" }}
            />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-spark-100 px-4 py-2 text-sm font-bold text-sunset-500">
              <span className="[animation:var(--animate-sparkle)]" aria-hidden="true">⭐</span>
              Creative 3D Learning Platform
            </div>

            <h1
              id="hero-heading"
              className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Build Worlds From{" "}
              <span className="bg-gradient-to-r from-spark-400 to-sunset-500 bg-clip-text text-transparent">
                Your Imagination
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              Create amazing 3D worlds, tell stories, and explore with your creative
              friend Spark!
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/onboarding" aria-label="Start creating your world">
                <Button variant="primary" size="lg" className="w-full sm:w-auto min-w-[200px]">
                  🚀 Start Creating
                </Button>
              </Link>
              <Link href="/gallery" aria-label="Explore worlds in the gallery">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]">
                  🌍 Explore Gallery
                </Button>
              </Link>
            </div>

            {/* Hero visual: 3D preview placeholder */}
            <div
              className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-ocean-400/30 via-magic-400/20 to-forest-400/30 p-1 shadow-2xl"
              role="img"
              aria-label="A colorful 3D world preview"
            >
              <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-green-50 px-8 py-16 sm:py-20">
                <div className="flex items-end justify-center gap-4 sm:gap-6" aria-hidden="true">
                  {/* Simple CSS 3D-ish shapes */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-20 w-12 rounded-t-2xl bg-gradient-to-b from-forest-400 to-forest-500 shadow-lg sm:h-28 sm:w-16" />
                    <div className="h-6 w-12 rounded-full bg-forest-500/30 sm:w-16" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-spark-400 shadow-md sm:h-10 sm:w-10" style={{ marginBottom: "4px" }} />
                    <div className="h-28 w-16 rounded-t-3xl bg-gradient-to-b from-ocean-400 to-ocean-500 shadow-xl sm:h-36 sm:w-20" />
                    <div className="h-6 w-16 rounded-full bg-ocean-500/30 sm:w-20" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-16 w-14 rounded-t-2xl bg-gradient-to-b from-magic-400 to-magic-500 shadow-lg sm:h-24 sm:w-18" />
                    <div className="h-6 w-14 rounded-full bg-magic-500/30" />
                  </div>
                  <div className="hidden flex-col items-center gap-2 sm:flex">
                    <div className="h-12 w-12 rotate-45 rounded-xl bg-gradient-to-br from-sunset-400 to-candy-400 shadow-md" />
                    <div className="h-6 w-12 rounded-full bg-sunset-500/30" />
                  </div>
                </div>
                <div className="mt-4 h-4 rounded-full bg-gradient-to-r from-green-300 via-green-400 to-emerald-300 opacity-60" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className="px-4 py-16 sm:px-6 sm:py-24"
          aria-labelledby="features-heading"
        >
          <div className="mx-auto max-w-5xl">
            <h2
              id="features-heading"
              className="mb-4 text-center text-3xl font-extrabold text-gray-900 sm:text-4xl"
            >
              What you can do
            </h2>
            <p className="mb-12 text-center text-lg text-gray-500">
              Everything you need to create your masterpiece
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {FEATURES.map((feature) => (
                <Card
                  key={feature.title}
                  hoverable
                  padding="lg"
                  className={`bg-gradient-to-br ${feature.color} text-center`}
                >
                  <div
                    className="mb-4 text-5xl [animation:var(--animate-bounce-gentle)]"
                    aria-hidden="true"
                  >
                    {feature.emoji}
                  </div>
                  <h3 className="mb-2 text-2xl font-extrabold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section
          className="px-4 pb-20 sm:px-6"
          aria-labelledby="cta-heading"
        >
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-r from-spark-400 via-sunset-400 to-candy-400 p-1 shadow-xl">
            <div className="rounded-3xl bg-white px-8 py-12 text-center">
              <div className="mb-3 text-4xl" aria-hidden="true">🌟</div>
              <h2 id="cta-heading" className="mb-4 text-3xl font-extrabold text-gray-900">
                Ready to start building?
              </h2>
              <p className="mb-8 text-lg text-gray-500">
                Join thousands of young creators — no experience needed!
              </p>
              <Link href="/onboarding">
                <Button variant="primary" size="lg">
                  Let&apos;s Go! 🚀
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-spark-100 bg-white py-8 text-center text-base text-gray-400">
        <p>
          Made with{" "}
          <span aria-label="imagination" role="img">
            ✨
          </span>{" "}
          imagination &mdash; Worldcraft &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
