import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section>
        <div className="hero-eyebrow">Web4 societies, in motion</div>
        <h1 className="hero-title">4-Life is a fractal lab for human and AI societies.</h1>
        <p className="hero-subtitle">
          Spin up a hardware-bound home society on your own machine, then join a
          planet-scale network of Web4 societies governed by verifiable trust,
          MRH, and R6 interactions.
        </p>
        <div className="button-row">
          <Link href="/starter-kit" className="button-primary">
            Start a society
          </Link>
          <Link href="/how-it-works" className="button-secondary">
            How it works
          </Link>
        </div>
        <div className="fractal-graph">
          <strong>Fractal view (conceptual)</strong>
          <ul>
            <li>• Your home society → root LCT on your hardware</li>
            <li>• Peer societies → federate via MRH/LCT links</li>
            <li>• Hub societies → witness capability broadcasts and tasks</li>
            <li>• Planet view → trust-weighted network of societies</li>
          </ul>
        </div>
      </section>
    </>
  );
}
