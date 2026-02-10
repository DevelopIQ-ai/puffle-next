export default function Carousel() {
  return (
    <>
      <div className="carousel-slide snap-page" id="product">
        <h2>Find the right people.</h2>
        <p>
          AI-scored leads ranked by intent, fit, and timing. Stop guessing who
          to talk to.
        </p>
        <div className="connect-hub">
          {/* Source nodes - positioned around the circle */}
          <div className="connect-node node-0">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="#0A66C2">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
          </div>
          <div className="connect-node node-1">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="#ffffff">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>X</span>
          </div>
          <div className="connect-node node-2">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="#FF4500">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.995 13.985c.04.218.06.441.06.665 0 3.396-3.951 6.15-8.828 6.15-4.877 0-8.828-2.754-8.828-6.15 0-.224.02-.447.06-.665A1.783 1.783 0 010 12.233c0-.988.806-1.794 1.794-1.794.442 0 .845.162 1.157.428 1.471-1.023 3.467-1.663 5.733-1.726l1.109-5.088.01-.042a.357.357 0 01.423-.275l3.608.78c.213-.452.672-.77 1.203-.77.731 0 1.324.593 1.324 1.324s-.593 1.324-1.324 1.324-1.324-.593-1.324-1.324l-.001-.065-3.164-.684-.978 4.487c2.2.094 4.126.736 5.56 1.734.314-.27.72-.435 1.165-.435.988 0 1.794.806 1.794 1.794 0 .673-.371 1.258-.919 1.567zm-11.3.542c0 .731.593 1.324 1.324 1.324s1.324-.593 1.324-1.324-.593-1.324-1.324-1.324-1.324.593-1.324 1.324zm7.396 2.603c-.065 0-.13-.025-.179-.074a.25.25 0 010-.354c.742-.742.742-2.557 0-3.299a.25.25 0 01.354-.354c.898.898.898 3.109 0 4.007a.25.25 0 01-.175.074zm-1.143-1.279c0-.731.593-1.324 1.324-1.324s1.324.593 1.324 1.324-.593 1.324-1.324 1.324-1.324-.593-1.324-1.324z"/>
            </svg>
            <span>Reddit</span>
          </div>
          <div className="connect-node node-3">
            <img src="/crunchbase-logo.png" alt="Crunchbase" width="32" height="32" className="connect-logo" />
            <span>Crunchbase</span>
          </div>
          <div className="connect-node node-4">
            <img src="/datagov-logo.png" alt="Data.gov" width="32" height="32" className="connect-logo" />
            <span>Data.gov</span>
          </div>

          {/* Animated connection lines (SVG) */}
          <svg className="connect-lines" viewBox="0 0 400 400" fill="none">
            {/* Lines from center to each node */}
            <line x1="200" y1="200" x2="200" y2="32" className="connect-line line-0" />
            <line x1="200" y1="200" x2="360" y2="100" className="connect-line line-1" />
            <line x1="200" y1="200" x2="360" y2="300" className="connect-line line-2" />
            <line x1="200" y1="200" x2="40" y2="300" className="connect-line line-3" />
            <line x1="200" y1="200" x2="40" y2="100" className="connect-line line-4" />
            {/* Animated pulses traveling along each line */}
            <circle cx="200" cy="200" r="4" fill="#4169e1" className="connect-pulse pulse-0" />
            <circle cx="200" cy="200" r="4" fill="#4169e1" className="connect-pulse pulse-1" />
            <circle cx="200" cy="200" r="4" fill="#4169e1" className="connect-pulse pulse-2" />
            <circle cx="200" cy="200" r="4" fill="#4169e1" className="connect-pulse pulse-3" />
            <circle cx="200" cy="200" r="4" fill="#4169e1" className="connect-pulse pulse-4" />
          </svg>

          {/* Puffle center logo */}
          <div className="connect-center">
            <img src="/puffle-logo.svg" alt="Puffle" width="56" height="56" />
          </div>
        </div>
      </div>
      <div className="carousel-slide snap-page">
        <h2>Run the sequence.</h2>
        <p>
          Automated, personalized outreach across channels. Every touchpoint
          timed and tailored.
        </p>
        <div className="seq-timeline">
          <div className="seq-row">
            <span className="seq-day">Day 1</span>
            <div className="seq-dot seq-dot-linkedin"></div>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span className="seq-text">Connection request</span>
          </div>
          <div className="seq-row">
            <span className="seq-day">Day 3</span>
            <div className="seq-dot seq-dot-email"></div>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#A0B4C4"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            <span className="seq-text">Intro email</span>
          </div>
          <div className="seq-row">
            <span className="seq-day">Day 6</span>
            <div className="seq-dot seq-dot-linkedin"></div>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span className="seq-text">Follow-up message</span>
          </div>
          <div className="seq-row">
            <span className="seq-day">Day 10</span>
            <div className="seq-dot seq-dot-email"></div>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#A0B4C4"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            <span className="seq-text">Break-up email</span>
          </div>
        </div>
      </div>
    </>
  );
}
