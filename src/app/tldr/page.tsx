import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

export const metadata = {
  title: "Web4 in 2 Minutes | 4-Life",
  description:
    "The shortest possible explanation of Web4: what it is, why it matters, and how to see it in action.",
};

export default function TLDRPage() {
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs currentPath="/tldr" />
      </div>

      <section className="max-w-3xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
          2-Minute Overview
        </div>
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
          Web4 in 2 Minutes
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed mb-10">
          No jargon. No prerequisites. Just the idea.
        </p>

        {/* The Problem */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-red-400">The Problem</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            The internet has no memory. A spammer can create a new account in seconds.
            A scammer banned from one platform signs up on another. Your 10-year
            reputation on Twitter means nothing on Reddit. Bad actors never face
            compounding consequences — they just reset.
          </p>
        </div>

        {/* The Idea */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-sky-400">The Idea</h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-4">
            What if every online action had a cost, every identity was tied to physical
            hardware, and your reputation followed you everywhere — permanently?
          </p>
          <div className="space-y-3">
            <div className="flex gap-3 items-start">
              <span className="text-sky-400 text-xl mt-0.5">1.</span>
              <p className="text-gray-300">
                <strong className="text-white">Actions cost energy.</strong> Posting,
                messaging, voting — everything draws from a personal budget. Spam drains
                your budget with no return. Quality contributions earn it back.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-sky-400 text-xl mt-0.5">2.</span>
              <p className="text-gray-300">
                <strong className="text-white">Identity is hardware-bound.</strong> Your
                identity is tied to a physical chip in your device. Creating a fake identity
                means buying a new device — expensive and slow.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-sky-400 text-xl mt-0.5">3.</span>
              <p className="text-gray-300">
                <strong className="text-white">Trust is earned, never bought.</strong> Your
                reputation is multi-dimensional (not just a single score), portable across
                platforms, and permanent. Good behavior compounds. Bad behavior follows you.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-sky-400 text-xl mt-0.5">4.</span>
              <p className="text-gray-300">
                <strong className="text-white">Humans and AI play by the same rules.</strong> The
                same trust framework applies to people and AI agents. No separate systems —
                everyone earns their place.
              </p>
            </div>
          </div>
        </div>

        {/* The Result */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-green-400">The Result</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Spam dies because it&apos;s too expensive. Scammers can&apos;t escape their
            history. Trusted contributors accumulate real, portable reputation. And the
            whole thing runs without any central authority deciding who&apos;s trustworthy.
          </p>
        </div>

        {/* Status */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-amber-400 mb-2">Where is this now?</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Web4 is <strong>active research with working simulations</strong>, not a deployed product.
            This site lets you watch the mechanics in action — see societies form, trust networks
            emerge, and bad actors fail. The underlying{" "}
            <a
              href="https://dp-web4.github.io/web4/"
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:underline"
            >
              protocol specification
            </a>{" "}
            is open.
          </p>
        </div>

        {/* What next */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-100">Want to go deeper?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/why-web4"
              className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-sky-600 transition-colors"
            >
              <div className="text-sky-400 font-semibold mb-1">Why Web4?</div>
              <div className="text-gray-400 text-sm">
                The full problem statement and honest questions
              </div>
              <div className="text-gray-500 text-xs mt-1">5 min read</div>
            </Link>
            <Link
              href="/first-contact"
              className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-sky-600 transition-colors"
            >
              <div className="text-sky-400 font-semibold mb-1">First Contact</div>
              <div className="text-gray-400 text-sm">
                Follow Alice through her first 10 actions in a Web4 community
              </div>
              <div className="text-gray-500 text-xs mt-1">10 min interactive</div>
            </Link>
            <Link
              href="/karma-journey"
              className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-sky-600 transition-colors"
            >
              <div className="text-sky-400 font-semibold mb-1">Karma Journey</div>
              <div className="text-gray-400 text-sm">
                Make choices that shape your trust across multiple lives
              </div>
              <div className="text-gray-500 text-xs mt-1">15 min interactive</div>
            </Link>
            <Link
              href="/society-simulator"
              className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-sky-600 transition-colors"
            >
              <div className="text-sky-400 font-semibold mb-1">Society Simulator</div>
              <div className="text-gray-400 text-sm">
                Watch 12 agents form alliances, betray, and self-organize
              </div>
              <div className="text-gray-500 text-xs mt-1">15 min interactive</div>
            </Link>
          </div>
        </div>

        {/* Share-friendly summary */}
        <div className="bg-gradient-to-br from-sky-950/30 to-purple-950/30 border border-sky-800/30 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">The one-sentence version</h2>
          <p className="text-gray-300 leading-relaxed text-lg italic">
            &ldquo;What if the internet made trust a built-in feature instead of something platforms
            bolt on — and you could see it working in a simulation right now?&rdquo;
          </p>
        </div>
      </section>
      <RelatedConcepts currentPath="/tldr" />
    </>
  );
}
