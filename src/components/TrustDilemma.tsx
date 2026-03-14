'use client';

import { useState } from 'react';

interface DilemmaQuestion {
  question: string;
  pillar: string;
  options: { id: string; label: string; icon: string }[];
  feedback: Record<string, { text: string; web4: string }>;
}

export const DILEMMA_QUESTIONS: DilemmaQuestion[] = [
  {
    question: 'Someone creates 10,000 fake accounts to spam your community. What do you do?',
    pillar: 'Energy',
    options: [
      { id: 'ban', label: 'Ban the spammer', icon: '🚫' },
      { id: 'captcha', label: 'Add more CAPTCHAs', icon: '🤖' },
      { id: 'cost', label: 'Make each action cost something', icon: '⚡' },
    ],
    feedback: {
      ban: {
        text: 'They make a new account in 30 seconds and do it again.',
        web4: 'Web4: every action costs attention energy (ATP — your energy budget). Spam burns through it with no return. Spammers die.',
      },
      captcha: {
        text: 'AI solves CAPTCHAs better than humans now. Arms race never ends.',
        web4: 'Web4: instead of proving you\'re human, prove you\'re consistent. Coherence is harder to fake.',
      },
      cost: {
        text: 'You\'re thinking like Web4. This mechanism is called ATP (Allocation Transfer Packets).',
        web4: 'Every action costs energy from a personal budget. Quality contributions earn it back; spam burns through it with no return. Spammers literally run out of fuel.',
      },
    },
  },
  {
    question: 'A troll gets banned. Five minutes later, they\'re back with a new account. How do you stop this?',
    pillar: 'Identity',
    options: [
      { id: 'ip', label: 'Block their IP address', icon: '🌐' },
      { id: 'phone', label: 'Require phone verification', icon: '📱' },
      { id: 'hardware', label: 'Tie identity to their device', icon: '🔗' },
    ],
    feedback: {
      ip: {
        text: 'VPNs cost $3/month. They switch IPs in seconds.',
        web4: 'Web4: identity is anchored to security chips across your devices, linked through tokens called LCTs. Creating a new identity means new hardware. Scale attacks require warehouses of phones.',
      },
      phone: {
        text: 'Burner SIMs cost $5. Phone farms exist. This slows trolls slightly but doesn\'t stop them.',
        web4: 'Web4: goes deeper than phone numbers — cryptographic keys in your device\'s security chip (TPM/Secure Enclave) prove it\'s really you.',
      },
      hardware: {
        text: 'You\'re thinking like Web4. This mechanism is called LCT (Linked Context Token).',
        web4: 'Identity is anchored to security chips (TPM/Secure Enclave) across your devices — phone, laptop, tablet form a constellation linked by LCTs. No new identity without new hardware. Reputation follows you, not a username.',
      },
    },
  },
  {
    question: 'A respected community member starts posting harmful content. What should happen to their 3-year reputation?',
    pillar: 'Consequences',
    options: [
      { id: 'delete', label: 'Delete their account entirely', icon: '🗑️' },
      { id: 'warning', label: 'Give them a warning', icon: '⚠️' },
      { id: 'permanent', label: 'Let the bad behavior damage their permanent record', icon: '📜' },
    ],
    feedback: {
      delete: {
        text: 'They start fresh with a new account. Three years of context erased. No lessons learned.',
        web4: 'Web4: reputation is permanent. Bad behavior costs trust. But good history isn\'t erased — it enables recovery if they change.',
      },
      warning: {
        text: 'Warnings without consequences teach people to push limits. Three warnings later, nothing changed.',
        web4: 'Web4: every action costs energy AND affects trust. Bad behavior is immediately expensive, not just warned against.',
      },
      permanent: {
        text: 'You\'re thinking like Web4. This is how karma and the Trust Tensor (T3) work together.',
        web4: 'Your track record is permanent. Bad behavior reduces trust across multiple dimensions — but a 3-year positive history provides resilience. One bad day doesn\'t erase years of contribution.',
      },
    },
  },
];

export default function TrustDilemma() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);

  const isComplete = step >= DILEMMA_QUESTIONS.length;
  const currentQuestion = !isComplete ? DILEMMA_QUESTIONS[step] : null;

  const handleAnswer = (answerId: string) => {
    setCurrentAnswer(answerId);
  };

  const handleNext = () => {
    if (currentAnswer) {
      setAnswers([...answers, currentAnswer]);
      setCurrentAnswer(null);
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setCurrentAnswer(null);
  };

  const handleShare = async () => {
    const text = 'I just answered 3 questions about internet trust problems and saw how a trust-native framework addresses each one. Try it yourself:';
    const url = 'https://4-life-ivory.vercel.app';
    if (navigator.share) {
      try { await navigator.share({ title: '3 Trust Dilemmas', text, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      alert('Copied to clipboard!');
    }
  };

  if (isComplete) {
    return (
      <section className="card" style={{
        maxWidth: '48rem', margin: '0 auto',
        border: '1px solid var(--color-border)',
        background: 'var(--color-dark-surface)',
      }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Three problems, one framework
        </p>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
          {DILEMMA_QUESTIONS.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{
                fontSize: '0.7rem', fontWeight: 600, padding: '0.15rem 0.4rem', borderRadius: '0.25rem',
                background: 'rgba(56, 189, 248, 0.15)', color: 'var(--color-sky)', whiteSpace: 'nowrap',
              }}>
                {q.pillar}
              </span>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                {q.feedback[answers[i]].web4}
              </p>
            </div>
          ))}
        </div>
        <p style={{ color: 'var(--color-sky)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.75rem' }}>
          Energy + Identity + Consequences = a self-regulating internet. No moderators needed.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={handleShare}
            style={{
              color: 'var(--color-sky)', fontSize: '0.8rem', background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '0.375rem',
              padding: '0.35rem 0.75rem', cursor: 'pointer',
            }}
          >
            Share this quiz
          </button>
          <button
            onClick={handleReset}
            style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  if (currentAnswer) {
    const fb = currentQuestion!.feedback[currentAnswer];
    return (
      <section className="card" style={{
        maxWidth: '48rem', margin: '0 auto',
        border: '1px solid var(--color-border)',
        background: 'var(--color-dark-surface)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
            Dilemma {step + 1} of 3
          </span>
          <span style={{
            fontSize: '0.7rem', fontWeight: 600, padding: '0.15rem 0.4rem', borderRadius: '0.25rem',
            background: 'rgba(56, 189, 248, 0.15)', color: 'var(--color-sky)',
          }}>
            {currentQuestion!.pillar}
          </span>
        </div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          {fb.text}
        </p>
        <p style={{ color: 'var(--color-sky)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.75rem' }}>
          {fb.web4}
        </p>
        <button
          onClick={handleNext}
          className="btn-primary"
          style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
        >
          {step < 2 ? 'Next question →' : 'See the full picture →'}
        </button>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
          Dilemma {step + 1} of 3
        </span>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {DILEMMA_QUESTIONS.map((_, i) => (
            <div key={i} style={{
              width: '2rem', height: '3px', borderRadius: '2px',
              background: i < step ? 'var(--color-sky)' : i === step ? 'var(--color-text-secondary)' : 'var(--color-border)',
            }} />
          ))}
        </div>
      </div>
      <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
        <strong>{currentQuestion!.question}</strong>
      </p>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
        Pick your answer — then see how Web4 handles it.
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {currentQuestion!.options.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleAnswer(opt.id)}
            className="card"
            style={{
              cursor: 'pointer',
              padding: '0.75rem 1.25rem',
              border: '1px solid var(--color-border)',
              background: 'var(--color-dark-surface)',
              fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-sky)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          >
            <span>{opt.icon}</span> {opt.label}
          </button>
        ))}
      </div>
    </section>
  );
}
