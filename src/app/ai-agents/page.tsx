"use client";

import { useEffect } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import { trackPageVisit } from "@/lib/exploration";

export default function AIAgentsIndexPage() {
  useEffect(() => { trackPageVisit('ai-agents'); }, []);

  return (
    <>
      <Breadcrumbs currentPath="/ai-agents" />
      <section>
        <div className="hero-eyebrow">AI Agents in Web4</div>
        <h1 className="hero-title">AI Agents</h1>
        <p className="hero-subtitle">
          Web4 treats humans and AI agents as equal participants under the same trust rules.
          But what does that actually take to make work? Three pages cover the practical mechanics.
        </p>
      </section>

      <section>
        <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          <Link
            href="/understanding-consciousness"
            className="concept-card"
            style={{ textDecoration: "none", display: "block", padding: "1.5rem" }}
          >
            <h3 style={{ marginTop: 0, color: "var(--color-accent-blue)" }}>AI Identity →</h3>
            <p style={{ margin: "0.5rem 0 0 0", color: "var(--color-text-secondary)" }}>
              When can an AI be trusted to act on its own identity? Below a trust score of 0.5,
              agents confabulate — they invent answers they don&rsquo;t know. Above 0.7, they can
              reliably say what they do and don&rsquo;t know. The thresholds are practical, not philosophical.
            </p>
          </Link>

          <Link
            href="/capacity-thresholds"
            className="concept-card"
            style={{ textDecoration: "none", display: "block", padding: "1.5rem" }}
          >
            <h3 style={{ marginTop: 0, color: "var(--color-accent-blue)" }}>AI Trust Limits →</h3>
            <p style={{ margin: "0.5rem 0 0 0", color: "var(--color-text-secondary)" }}>
              Model capacity sets a ceiling on trustworthy behavior. A 14B-parameter model and a
              0.5B model behave very differently under stress. This page maps capacity tiers to
              the kinds of work an agent can take on.
            </p>
          </Link>

          <Link
            href="/exploration-not-evaluation"
            className="concept-card"
            style={{ textDecoration: "none", display: "block", padding: "1.5rem" }}
          >
            <h3 style={{ marginTop: 0, color: "var(--color-accent-blue)" }}>AI Learning →</h3>
            <p style={{ margin: "0.5rem 0 0 0", color: "var(--color-text-secondary)" }}>
              Agents learn through U-shaped calibration: quality drops before it rises.
              Treating that dip as failure cuts off the recovery. This page shows why exploration
              beats evaluation when judging a learning system.
            </p>
          </Link>
        </div>
      </section>

      <section>
        <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginTop: "2rem" }}>
          Looking for the bigger picture first?{" "}
          <Link href="/why-web4">Why Web4?</Link> covers the human-and-AI participation premise.{" "}
          <Link href="/how-it-works">How It Works</Link> shows the trust mechanics that gate everything here.
        </p>
      </section>

      <ExplorerNav currentPath="/ai-agents" />
      <RelatedConcepts currentPath="/ai-agents" />
    </>
  );
}
