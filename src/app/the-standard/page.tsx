import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTracker from "@/components/PageTracker";
import MaturityBadge from "@/components/MaturityBadge";
import NewcomerOrientationBanner from "@/components/NewcomerOrientationBanner";

/**
 * The core standard - the open ontology at the base of the Web4 onramp.
 * Grounded ONLY in the public web4 repo: the canonical equation, the honest
 * R&D status, and the newcomer's first-touch path. One of four onramp pieces
 * (the standard, the hub, hestia, hardbound).
 */

export const metadata = {
  title: "The core standard - the open ontology under Web4 | 4-Life",
  description:
    "The core standard is an open ontology (not infrastructure) that makes AI actions verifiable: every entity is anchored to cryptographically witnessed presence, role-contextual trust, and auditable authority, expressed as typed RDF relationships.",
};

export default function TheStandardPage() {
  return (
    <>
      <PageTracker slug="the-standard" />
      <Breadcrumbs currentPath="/the-standard" />
      <NewcomerOrientationBanner accent="#c4b5fd" />

      {/* Hero */}
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-sm uppercase tracking-wide text-purple-400">
            The core standard
          </div>
          <MaturityBadge tier="reference" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-sky-500 bg-clip-text text-transparent">
          The core standard
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-4">
          The core standard is an <strong>open ontology</strong> (not
          infrastructure) that makes AI actions verifiable. It anchors every
          entity to cryptographically witnessed presence, role-contextual trust,
          and auditable authority, expressed as typed{" "}
          <Link href="/glossary#rdf" className="text-purple-300 underline hover:text-purple-200">
            RDF
          </Link>{" "}
          (Resource Description Framework) relationships.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          It&apos;s the base layer of the{" "}
          <Link href="/onramp" className="text-purple-300 underline hover:text-purple-200">
            onramp
          </Link>
          : the shared vocabulary that the hub, Hestia, and Hardbound all speak.
        </p>
      </section>

      {/* The problem it solves */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">The problem it solves</h2>
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          Today you have to choose between two bad options for trusting an agent:
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-purple-300 mb-1">Central control</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              A platform decides who is trusted. That does not scale, and it&apos;s a
              single point of failure.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-purple-300 mb-1">Cryptographic ownership</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              You&apos;re trusted if you hold the key. But holding a key does not mean
              you will act well.
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4">
          <p className="text-base text-purple-100 leading-relaxed">
            Neither answers the real question: how do I know this agent will behave
            appropriately <em>here</em>, and how do I prove what it did? The core
            standard is built around that question.
          </p>
        </div>
      </section>

      {/* The canonical equation */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">The canonical equation</h2>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-4">
          <code className="block text-center text-lg text-sky-300 font-mono leading-relaxed">
            Web4 = MCP + RDF + LCT + T3/V3*MRH + ATP/ADP
          </code>
        </div>
        {/* Aug-11 visitor MEDIUM + their Unanswered Q7 ("What does MCP have to do with any of
            this?"), and the second of the two things their Honest Assessment named: "the site's
            promise to spell out every term on first use is kept everywhere except /the-standard,
            which opens with a five-term equation containing two terms the reading path never
            introduced ... that page reads like it was written for a different audience."
            The plain-English clauses they asked for ALREADY SHIP, in the `plain` field of the
            read-aloud array below ([[visitor-deferred-low-check-shipped-first]]): what renders on
            the term line is the upstream `role` label ("I/O membrane", "ontological backbone"),
            which is what they read as jargon-for-jargon. So the residual is ORDERING, plus the
            second half of their suggestion, which is the real one: introduce the two terms the
            path never met, so the equation is a recap and not a first contact.
            The counts are re-derived, not the visitor's summary, and they are not symmetric.
            `grep -c` for MCP and RDF over the six reading-path pages (/, /tldr, /why-web4,
            /first-contact, /how-it-works, /running-now): RDF is 0 on all six. MCP is 0 on five
            and 2 on /running-now, where :233 already glosses it. So MCP is introduced once, late
            and in passing; RDF is introduced nowhere. Do not flatten that into "neither
            appears", which is what the log says and what a coarser grep would have confirmed.
            The read-aloud array and the operator glosses below are untouched: both are guarded
            as the standard's own reading. This paragraph sits ABOVE them on purpose, because the
            defect is that ~25 lines of operator table stand between the equation and any gloss. */}
        <p className="text-base text-gray-400 leading-relaxed mb-3">
          Five terms, and this is where two of them arrive. LCT, T3/V3*MRH and ATP/ADP each
          have their own page earlier in the reading path. RDF appears nowhere else on that
          path, and MCP only once, in passing, on{" "}
          <Link href="/running-now" className="text-sky-400 underline hover:text-sky-300">
            what is running now
          </Link>
          . Both are existing standards borrowed from outside Web4 rather than Web4
          coinages, and both are spelled out in plain English in the term-by-term reading
          further down. If the equation reads as jargon, that is the place to start.
        </p>
        <p className="text-base text-gray-400 leading-relaxed mb-3">
          The operators carry meaning, and the terms must not be redefined:
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="font-mono text-purple-300 text-lg">/</div>
            <div className="text-sm text-gray-400 leading-relaxed">means &ldquo;verified by&rdquo;</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="font-mono text-purple-300 text-lg">*</div>
            <div className="text-sm text-gray-400 leading-relaxed">means &ldquo;contextualized by&rdquo;</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="font-mono text-purple-300 text-lg">+</div>
            <div className="text-sm text-gray-400 leading-relaxed">means &ldquo;augmented with&rdquo;</div>
          </div>
        </div>
        {/* Jul-27 visitor MEDIUM x2 + Unanswered Questions #4 and #6. The page displayed the
            equation and never read it aloud, so (a) RDF was used three times and defined
            nowhere on the site's visitor path, and (b) a reader applying the operator table
            above to "T3/V3" got "trust verified by value", which is a stronger claim than the
            parallel-companions framing every concept page uses. Both are fixed by importing
            the standard's OWN term-by-term reading (web4-standard/GLOSSARY.md), which treats
            "T3/V3" as a single pair and does not read the "/" aloud at all. The operator
            glosses above stay verbatim; what "/" asserts is escalated as Q6 in
            docs/WEB4-CANON-QUESTIONS.md, NOT answered here. The prose this replaces also
            dropped RDF from its own read-aloud of a five-term equation. */}
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          Read aloud, term by term, the way the standard itself reads it:
        </p>
        <div className="space-y-3 mb-4">
          {[
            {
              term: "MCP",
              role: "I/O membrane",
              plain:
                "Model Context Protocol, the standard way agents call tools and exchange context. It is how a society talks to the outside world.",
            },
            {
              term: "RDF",
              role: "ontological backbone",
              plain:
                "Resource Description Framework, a W3C standard for stating facts as subject-predicate-object triples (a subject, the relationship, and the thing it points at). Every trust relationship in Web4 is written this way, which is what makes trust a typed relationship rather than a number in a column.",
              href: "/glossary#rdf",
            },
            {
              term: "LCT",
              role: "presence substrate",
              plain:
                "The identity an entity acts under, anchored to witnessed presence rather than to a password.",
              href: "/lct-explainer",
            },
            {
              term: "T3/V3*MRH",
              role: "trust and value tensors, contextualized by the Markov Relevancy Horizon",
              plain:
                "T3 is what you are trusted for; V3 is what your work turned out to be worth. The *MRH is the load-bearing part: both are only ever meaningful inside a context, never as one global score.",
              href: "/trust-tensor",
            },
            {
              term: "ATP/ADP",
              role: "energy metabolism",
              plain:
                "The energy budget that makes acting cost something, and the receipt left behind when it is spent.",
              href: "/atp-economics",
            },
          ].map((t) => (
            <div
              key={t.term}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                {t.href ? (
                  <Link
                    href={t.href}
                    className="font-mono text-purple-300 underline hover:text-purple-200"
                  >
                    {t.term}
                  </Link>
                ) : (
                  <span className="font-mono text-purple-300">{t.term}</span>
                )}
                <span className="text-sm text-gray-500">{t.role}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{t.plain}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          Two things worth noticing. MCP is the only outward-facing term: the internal
          structure is RDF + LCT + T3/V3*MRH + ATP/ADP, and MCP is the membrane around it.
          And the standard reads <span className="font-mono text-gray-400">T3/V3</span> as a
          single pair, trust and value together, rather than reading the{" "}
          <span className="font-mono text-gray-400">/</span> aloud between them. So
          &ldquo;T3/V3&rdquo; is one thing contextualized by MRH, not a claim that trust is
          subordinate to value.
        </p>

        {/* Jul-29 visitor MEDIUM: /onramp step 1 (onramp:214) sends readers HERE to "learn the
            primitives (LCT, T3/V3*MRH, ATP/ADP, and R6/R7)", and R6/R7 was the one item on that
            list this page never mentioned: "The onramp sent me here to learn the vocabulary and
            the vocabulary item I did not know is not here."
            This is a SIBLING block on purpose. R6/R7 is not a term of the equation at L93, so it
            must NOT become a sixth card in the read-aloud array above - that array is the
            standard's own term-by-term reading of a five-term equation (see the guard at L117)
            and a sixth entry would stop it matching the equation it reads aloud.
            Gloss is the one already shipping at onramp:119, not a fourth phrasing. Expansion is
            canon: web4-standard/README.md:148 and core-spec/r7-framework.md. */}
        <div id="r6-r7" className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 scroll-mt-24">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
            <Link
              href="/glossary#r6"
              className="text-lg font-bold text-purple-300 hover:underline"
            >
              R6/R7
            </Link>
            <span className="text-sm text-gray-400">action grammar</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            One more piece of the vocabulary, and the reason it is not in the equation: everything
            above describes what an entity <em>is</em>, while this describes what an entity{" "}
            <em>does</em>. R6 is the standard six-part shape of any action, so a request like
            &ldquo;post this&rdquo; or &ldquo;spend 5 ATP&rdquo; gets checked and trust-scored the
            same way every time:{" "}
            <span className="font-mono text-gray-400">
              Rules + Role + Request + Reference + Resource
            </span>{" "}
            produce a <span className="font-mono text-gray-400">Result</span>. R7 adds a seventh
            element, <span className="font-mono text-gray-400">Reputation</span>, when the stakes
            are high enough that the trust change is worth recording as an output of the action
            rather than a side effect of it.
          </p>
        </div>
      </section>

      {/* Honest status */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <h2 className="text-lg font-bold text-amber-300 mb-2">Honest status: R&amp;D, not production</h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            The spec corpus is stable and reference implementations exist. There is no
            production deployment yet.
          </p>
          {/* Aug-06 visitor LOW: "The 2,627 test count is attributed to 'the reference Python
              SDK' on one page and appears attached to web4-trust-core v0.2.0 on the other. I
              could not tell which package it belongs to." They were right, and the text was
              WRONG rather than ambiguous: the SDK sentence sat inside the web4-trust-core card,
              so the count read as that crate's. It is not. Ground truth web4/STATUS.md:62:
              "Reference Python SDK | 2,627 tests, mypy --strict clean (not yet on PyPI
              separately) | web4-standard/implementation/". STATUS.md:57 confirms 171 belongs to
              web4-core v0.3.0. There are THREE artifacts here, not two, and the reason the
              visitor could not place the count is that one of the three is not a package at
              all - which is why the "not published separately" clause is the load-bearing part
              and must not be trimmed as filler.
              web4-trust-core deliberately carries NO test count: its README publishes none, and
              substituting one from a neighbouring crate is how the confusion started.
              /running-now:164-172 carries the matching version of this list. Keep the three
              attributions identical on both pages or the ambiguity comes back. */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="font-semibold text-purple-300 text-sm">web4-core</div>
              <div className="text-sm text-gray-400 leading-relaxed">
                Public at v0.3.0 on crates.io and PyPI. 171 tests green.
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="font-semibold text-purple-300 text-sm">web4-trust-core</div>
              <div className="text-sm text-gray-400 leading-relaxed">
                Public at v0.2.0.
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3 mt-3">
            <div className="font-semibold text-purple-300 text-sm">
              The reference Python implementation
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              2,627 tests. This is the standard&apos;s own reference implementation, a third
              artifact rather than either package above, and it is not published to PyPI
              separately: you get it with the spec repo.
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mt-3">
            A reference implementation plus a runnable{" "}
            <Link href="/hub" className="text-amber-300 underline hover:text-amber-200">
              society hub
            </Link>{" "}
            are public.
          </p>
        </div>
      </section>

      {/* How a newcomer touches it. id added Aug-05 so /running-now's "touch it in about 30
          seconds" bullet can route to the actual commands instead of naming the script and
          stopping. */}
      <section id="thirty-seconds" className="max-w-4xl mx-auto mt-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">How a newcomer touches it</h2>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-4">
          <p className="text-sm text-gray-400 leading-relaxed mb-2">Install it:</p>
          <code className="block text-sm text-sky-300 font-mono leading-relaxed mb-1">
            pip install web4-core web4-trust
          </code>
          <code className="block text-sm text-sky-300 font-mono leading-relaxed">
            cargo add web4-core web4-trust-core
          </code>
          {/* Aug-11 visitor LOW: "/tldr and /running-now tell me `pip install web4-core`. This
              page tells me `pip install web4-core web4-trust`. Small, but I am at a terminal and
              I do not know which one I need." Half of that is a misread (/running-now prints the
              same two-package form this page does; only /tldr prints the short one, and it is
              correct there because that bullet is scoped to "the primitives"). The real residual
              is the log's second option: say what the second package adds.
              Grounded in web4/STATUS.md, not inferred. :46 gives web4-core's contents and :58
              gives "Trust storage, witnessing, decay". Note :58 attributes that to the RUST crate
              web4-trust-core while the line above prints the PYPI package web4-trust; what
              licenses carrying it across is :46's closing sentence, "The Python wheels are
              PyO3-built bindings over the same Rust core". Cite that if this is ever re-checked. */}
          <p className="text-xs text-gray-400 leading-relaxed mt-3">
            Two packages, because they are two jobs.{" "}
            <code className="text-gray-300">web4-core</code> is the primitives: LCT identity,
            the T3/V3 tensors, identity coherence, ledger anchoring.{" "}
            <code className="text-gray-300">web4-trust</code> (
            <code className="text-gray-300">web4-trust-core</code> in Rust; the Python wheels
            are bindings over the same core) adds trust storage, witnessing and decay, which
            is what you need the moment trust has to persist and age rather than just be
            computed once.
          </p>
        </div>
        {/* Aug-05 visitor LOW + Unanswered Q7: "The page names identity_bootstrap.py and
            describes what it does, but never shows how to obtain or run it. I wanted to try
            the one thing the site said was 30 seconds away and could not." The defect was the
            SEQUENCE, not a missing path: this read "Install it: pip install ..." then "Then run
            identity_bootstrap.py", which implies the wheel carries the script. It does not.
            web4-core/python/pyproject.toml is maturin with module-name = "web4_core" and no
            examples packaging, so the wheel is the extension module only; upstream's own README
            says the script is repo-shipped ("The repo ships a small, self-contained script").
            The invocation below is copied verbatim from web4-core/python/README.md:89-92. Do not
            "simplify" this back into one install-then-run flow: the two artifacts arrive by
            different routes, and collapsing them is what dead-ended this visitor. Package names
            verified against web4 STATUS.md:36-38 and do not move. */}
        <p className="text-base text-gray-400 leading-relaxed mb-3">
          That gives you the library. The ~30-second proof-of-presence is an example
          script the repo ships rather than the package, so you fetch it separately:
        </p>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-3">
          <pre className="text-sm text-sky-300 font-mono overflow-x-auto"><code>{`git clone https://github.com/dp-web4/web4
cd web4/web4-core/python
python examples/identity_bootstrap.py --name laptop-01`}</code></pre>
        </div>
        <p className="text-base text-gray-400 leading-relaxed mb-3">
          It walks the whole loop end to end: create an{" "}
          <Link href="/lct-explainer" className="text-purple-300 underline hover:text-purple-200">
            LCT
          </Link>
          , mint it to a hash-chained ledger, sign and verify, and generate an
          inclusion proof. Re-run it with{" "}
          <code className="text-purple-300">--verify</code> and it re-checks the chain
          instead of regenerating, which is the part worth seeing twice.
        </p>
        <p className="text-base text-gray-400 leading-relaxed">
          To go deeper, read <code className="text-purple-300">docs/START_HERE.md</code> and
          the normative specs in{" "}
          <code className="text-purple-300">web4-standard/core-spec/</code>.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-sky-500/10 p-6">
          <p className="text-lg text-gray-200 leading-relaxed mb-4">
            The core standard is the vocabulary. See how the four pieces compose into
            an onramp, or follow a single concept down.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href="/onramp"
              className="rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2 text-purple-200 hover:bg-purple-500/25"
            >
              How the four pieces compose →
            </Link>
            <Link
              href="/trust-neighborhood"
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-emerald-200 hover:bg-emerald-500/25"
            >
              Trust in context →
            </Link>
            <Link
              href="/glossary"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-gray-200 hover:bg-white/10"
            >
              Glossary →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
