"use client";

/* Cybersecurity — educational content. Edit freely. */

export const CYBER_YT = "https://www.youtube.com/embed/AQDCe585Lnc";

export function CyberHowItWorks() {
  return (
    <div>
      <h4 style={{ fontSize: 15, marginBottom: 12, color: "var(--ink)" }}>1. Password Entropy Engine</h4>
      <div className="flow-row">
        <span className="flow-node">Password</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Length L</span>
        <span className="flow-arrow">×</span>
        <span className="flow-node">log₂(R)</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Entropy bits</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Strength rating</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        <b style={{ color: "var(--ink)" }}>Simple:</b> A strong password has so many possible combinations that no
        computer can guess it in a reasonable time. Each character class (lowercase, uppercase, digits, symbols) adds to
        the charset size R, making the search space explode exponentially.
      </p>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
        <b style={{ color: "var(--ink)" }}>Advanced:</b> Entropy E = L × log₂(R) measures the bits of uncertainty. Each
        bit doubles the search space, so a 60-bit password needs 2⁶⁰ ≈ 1.15 × 10¹⁸ guesses. Below ~28 bits = weak,
        28–36 = moderate, 36–60 = strong, 60+ = very strong (infeasible to brute-force).
      </p>

      <h4 style={{ fontSize: 15, marginTop: 20, marginBottom: 12, color: "var(--ink)" }}>2. Brute-Force Attack Simulation</h4>
      <div className="flow-row">
        <span className="flow-node">Target password</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Random guesses</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Match check</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">BREACHED or DEFENDED</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        The simulator spawns a stream of random guesses at ~1 billion/sec (scaled). Weak passwords (E &lt; 28) are cracked
        in seconds; strong ones (E ≥ 60) are declared infeasible — the attack times out and fails. Watch the terminal for
        real-time guess output and partial matches.
      </p>

      <h4 style={{ fontSize: 15, marginTop: 20, marginBottom: 12, color: "var(--ink)" }}>3. Encryption Pipeline (Caesar → XOR)</h4>
      <div className="flow-row">
        <span className="flow-node">Plaintext</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Caesar shift</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">XOR transform</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Ciphertext (hex)</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        Symmetric ciphers use one shared key for both encryption and decryption. Caesar substitution rotates each letter
        by a shift value; XOR applies a byte-level exclusive-or with a key character. Both are reversible with the same
        key — the foundation of secure channels before public-key exchange.
      </p>

      <h4 style={{ fontSize: 15, marginTop: 20, marginBottom: 12, color: "var(--ink)" }}>4. Secure Login + MFA</h4>
      <div className="flow-row">
        <span className="flow-node">Password</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Entropy check (≥36 bits)</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">OTP code</span>
        <span className="flow-arrow">→</span>
        <span className="flow-node">Access granted</span>
      </div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7 }}>
        Real systems layer defenses: first validate password strength (minimum entropy), then require a second factor
        (one-time code). After 3 failed attempts the system locks down for 12 seconds — simulating brute-force protection
        and account lockout policies.
      </p>

      <p style={{ marginTop: 14, fontSize: 13, color: "var(--ink-dim)" }}>
        🌍 Real-world: AES-256 (banking, HTTPS), password managers, WhatsApp end-to-end encryption, TOTP authenticator apps.
      </p>
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 13, color: "var(--ink-dim)", marginBottom: 6 }}>📺 How encryption works:</p>
        <div className="youtube-embed">
          <iframe src={CYBER_YT} loading="lazy" allowFullScreen title="Encryption" />
        </div>
      </div>
    </div>
  );
}
