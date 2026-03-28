import { useState, useEffect, useRef } from 'react';
import './LoginPage.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function LoginPage() {
  const [uniqueId, setUniqueId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const initial: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.06,
      speedY: (Math.random() - 0.5) * 0.06,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    particlesRef.current = initial;
    setParticles([...initial]);

    const animate = () => {
      particlesRef.current = particlesRef.current.map((p) => {
        let nx = p.x + p.speedX;
        let ny = p.y + p.speedY;
        if (nx < 0 || nx > 100) { nx = ((nx % 100) + 100) % 100; }
        if (ny < 0 || ny > 100) { ny = ((ny % 100) + 100) % 100; }
        return { ...p, x: nx, y: ny };
      });
      setParticles([...particlesRef.current]);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="login-root">
      {/* Left Panel */}
      <div className="login-left">
        {/* Animated particle canvas */}
        <div className="particles-container">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>

        {/* Floating orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Brand content */}
        <div className="left-content">
          <div className="brand-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L36 13V27L20 36L4 27V13L20 4Z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
                <path d="M20 10L30 16V28L20 34L10 28V16L20 10Z" fill="white" fillOpacity="0.2"/>
                <circle cx="20" cy="22" r="5" fill="white"/>
              </svg>
            </div>
            <span className="brand-name">IPTECH</span>
          </div>

          <div className="left-headline">
            <h1>Welcome<br />Back</h1>
            <div className="headline-accent" />
          </div>

          <p className="left-subtext">
            Secure access to your integrated platform. Your data, protected and always within reach.
          </p>

          <div className="left-features">
            {[
              { icon: '🔒', label: 'Enterprise Security' },
              { icon: '⚡', label: 'Real-time Sync' },
              { icon: '🌐', label: 'Global Access' },
            ].map((f) => (
              <div key={f.label} className="feature-pill">
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="left-bottom-wave">
          <svg viewBox="0 0 500 80" preserveAspectRatio="none">
            <path d="M0,40 C150,80 350,0 500,40 L500,80 L0,80 Z" fill="rgba(255,255,255,0.05)"/>
          </svg>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login-right">
        <div className="login-form-wrapper">
          <div className="form-header">
            <div className="form-badge">Secure Portal</div>
            <h2 className="form-title">Sign in to your account</h2>
            <p className="form-subtitle">Enter your credentials to continue</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Unique Access ID */}
            <div className={`input-group ${focusedField === 'uid' ? 'focused' : ''} ${uniqueId ? 'filled' : ''}`}>
              <label htmlFor="unique-id">Unique Access ID</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="unique-id"
                  type="text"
                  placeholder="e.g. IPTECH-2024-0001"
                  value={uniqueId}
                  onChange={(e) => setUniqueId(e.target.value)}
                  onFocus={() => setFocusedField('uid')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="off"
                />
                <div className="input-highlight" />
              </div>
            </div>

            {/* Username */}
            <div className={`input-group ${focusedField === 'user' ? 'focused' : ''} ${username ? 'filled' : ''}`}>
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('user')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="username"
                />
                <div className="input-highlight" />
              </div>
            </div>

            {/* Password */}
            <div className={`input-group ${focusedField === 'pass' ? 'focused' : ''} ${password ? 'filled' : ''}`}>
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('pass')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
                <div className="input-highlight" />
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="form-options">
              <label className="remember-label" htmlFor="remember-me">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="custom-checkbox">
                  {rememberMe && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <span>Keep me signed in</span>
              </label>
              <a href="#" className="forgot-link" id="forgot-password-link">Forgot password?</a>
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              className={`login-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="btn-spinner">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" strokeLinecap="round"/>
                  </svg>
                  Authenticating...
                </span>
              ) : (
                <span className="btn-content">
                  Login to Dashboard
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              )}
            </button>
          </form>

          <div className="form-footer">
            <div className="divider"><span>Need access?</span></div>
            <a href="#" id="contact-admin-link" className="contact-admin">Contact Administrator</a>
            <p className="copyright">© 2025 IPTECH. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
