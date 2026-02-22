'use client';

import { useState } from 'react';

// Ghost card with pulsing skeleton lines
function GhostCard() {
  return (
    <div className="ghost-card">
      <div className="ghost-avatar"></div>
      <div className="ghost-lines">
        <div className="ghost-line ghost-line-1"></div>
        <div className="ghost-line ghost-line-2"></div>
        <div className="ghost-line ghost-line-3"></div>
      </div>
    </div>
  );
}

// Infinite stream of ghost cards from left
function GhostCardStack() {
  return (
    <div className="ghost-stack-wrapper">
      <div className="ghost-stack">
        <GhostCard />
        <GhostCard />
        <GhostCard />
        <GhostCard />
        <GhostCard />
        <GhostCard />
      </div>
    </div>
  );
}

// Outcome card showing success result
function OutcomeCard({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <div className="outcome-card">
      <span className="outcome-icon">{icon}</span>
      <span className="outcome-label">{label}</span>
    </div>
  );
}

// Infinite stream of outcome cards to the right
function OutcomeStack() {
  return (
    <div className="outcome-stack-wrapper">
      <div className="outcome-stack">
        <OutcomeCard icon="📅" label="Meeting Booked" />
        <OutcomeCard icon="💬" label="Reply Received" />
        <OutcomeCard icon="✅" label="Deal Closed" />
        <OutcomeCard icon="📅" label="Meeting Booked" />
        <OutcomeCard icon="💬" label="Reply Received" />
        <OutcomeCard icon="✅" label="Deal Closed" />
      </div>
    </div>
  );
}

// Mini lead card component with hover tilt
function LeadCard({
  name,
  title,
  company,
  baseTransform,
}: {
  name: string;
  title: string;
  company: string;
  baseTransform?: string;
}) {
  return (
    <div
      className="lead-card"
      style={{ transform: baseTransform }}
    >
      <div className="lead-avatar">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="lead-info">
        <div className="lead-name">{name}</div>
        <div className="lead-title">{title}</div>
        <div className="lead-company">{company}</div>
      </div>
    </div>
  );
}

// Step indicator
function StepBadge({ number, label }: { number: number; label: string }) {
  return (
    <div className="step-badge">
      <span className="step-number">{number}</span>
      <span className="step-label">{label}</span>
    </div>
  );
}

// Signal tracking card
function TrackingCard() {
  return (
    <div className="enrichment-card">
      <div className="enrichment-header">
        <div className="lead-avatar small">SC</div>
        <div>
          <div className="lead-name">Sarah Chen</div>
          <div className="lead-title">VP of Sales · TechCorp</div>
        </div>
      </div>
      <div className="enrichment-data">
        <div className="enrichment-row">
          <span className="enrichment-icon">🔥</span>
          <span className="enrichment-value">Raised Series B yesterday</span>
          <span className="enrichment-badge">Hot</span>
        </div>
        <div className="enrichment-row">
          <span className="enrichment-icon">💼</span>
          <span className="enrichment-value">Promoted to VP 2 weeks ago</span>
        </div>
        <div className="enrichment-row">
          <span className="enrichment-icon">👀</span>
          <span className="enrichment-value">Visited your pricing page 3x</span>
        </div>
      </div>
    </div>
  );
}

// Channel card with rotating personalized messages
function ChannelCard({
  type,
}: {
  type: 'linkedin' | 'email';
}) {
  const linkedinMessages = [
    "Hi Sarah, saw TechCorp's Series B news—congrats!",
    "Mike, loved your talk at SaaStr last week.",
    "Hey Alex, noticed you're scaling the SDR team.",
  ];

  const emailMessages = [
    "Re: Your recent product launch",
    "Quick question about ScaleUp's Q4 goals",
    "Saw your post on outbound automation",
  ];

  const messages = type === 'linkedin' ? linkedinMessages : emailMessages;

  return (
    <div className={`channel-card channel-${type}`}>
      <div className="channel-header">
        {type === 'linkedin' ? (
          <>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 6L12 13 2 6"/>
            </svg>
            Email
          </>
        )}
        <span className="ai-badge">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
          </svg>
          AI
        </span>
      </div>
      <div className="channel-content">
        <div className="message-carousel">
          {messages.map((msg, i) => (
            <div key={i} className="message-variation">{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Viewport showing streaming cards (same as left side)
function CardViewport() {
  return (
    <div className="card-viewport-wrapper">
      <div className="card-viewport">
        <div className="card-viewport-stream">
          <GhostCard />
          <GhostCard />
          <GhostCard />
          <GhostCard />
          <GhostCard />
          <GhostCard />
        </div>
      </div>
    </div>
  );
}

export default function LeadPipeline() {
  return (
    <div className="pipeline-container">
      <div className="pipeline-flow">
        {/* Ghost cards fading in from left */}
        <GhostCardStack />

        {/* Step 1: Lead Sourcing */}
        <div className="pipeline-step active">
          <StepBadge number={1} label="Find" />
          <div className="step-content">
            <div className="lead-stack">
              <LeadCard
                name="Sarah Chen"
                title="VP of Sales"
                company="TechCorp"
                baseTransform="rotate(-2deg)"
              />
              <LeadCard
                name="Mike Johnson"
                title="CRO"
                company="ScaleUp Inc"
                baseTransform="translate(8px, -95%) rotate(2deg)"
              />
            </div>
          </div>
        </div>

        <CardViewport />

        {/* Step 2: Enrichment */}
        <div className="pipeline-step active">
          <StepBadge number={2} label="Track" />
          <div className="step-content">
            <TrackingCard />
          </div>
        </div>

        <CardViewport />

        {/* Step 3: Outbound (Split) */}
        <div className="pipeline-step pipeline-step-split active">
          <StepBadge number={3} label="Message" />
          <div className="step-content step-content-split">
            <ChannelCard type="linkedin" />
            <ChannelCard type="email" />
          </div>
        </div>

        {/* Outcome cards fading out to right */}
        <OutcomeStack />
      </div>
    </div>
  );
}
