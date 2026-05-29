"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ConnectorGeometry = {
  width: number;
  height: number;
  paths: string[];
};

function WorkflowIcon({ type }: { type: string }) {
  if (type === "in") {
    return (
      <Image
        src="/social-logos/linkedin.svg"
        alt=""
        width={17}
        height={17}
        sizes="17px"
        className="seq-channel-logo"
      />
    );
  }
  if (type === "mail") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.5 6.5h15v11h-15z" />
        <path d="m5 7 7 6 7-6" />
      </svg>
    );
  }
  if (type === "like") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.8 10.4v8.1" />
        <path d="M7.8 11.2h-3v7.3h3" />
        <path d="M7.8 17.9h8.6c.9 0 1.6-.6 1.8-1.5l1.1-4.6c.2-.9-.5-1.8-1.4-1.8h-4.2l.5-2.4c.2-.9-.4-1.8-1.3-1.8h-.3l-4.8 5.4Z" />
      </svg>
    );
  }
  if (type === "endorse") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.8 18.2 6v5.2c0 3.9-2.4 7.3-6.2 9-3.8-1.7-6.2-5.1-6.2-9V6L12 3.8Z" />
        <path d="m8.8 12.1 2.1 2.1 4.4-4.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12.2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4.8 20.2c1.3-3.2 3.7-4.8 7.2-4.8s5.9 1.6 7.2 4.8" />
      <path d="M19 8.8h3.4" />
      <path d="M20.7 7.1v3.4" />
    </svg>
  );
}

export default function CampaignsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const inviteRef = useRef<HTMLDivElement>(null);
  const missLaneRef = useRef<HTMLDivElement>(null);
  const acceptedLaneRef = useRef<HTMLDivElement>(null);
  const missEndRef = useRef<HTMLDivElement>(null);
  const acceptedEndRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [connectors, setConnectors] = useState<ConnectorGeometry>({
    width: 820,
    height: 535,
    paths: [],
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const scroller = document.querySelector(".snap-container");

    const checkVisible = () => {
      const sectionRect = section.getBoundingClientRect();
      const rootRect = scroller?.getBoundingClientRect() ?? {
        top: 0,
        bottom: window.innerHeight,
        height: window.innerHeight,
      };
      const visibleHeight =
        Math.min(sectionRect.bottom, rootRect.bottom) -
        Math.max(sectionRect.top, rootRect.top);
      const activationHeight = Math.min(sectionRect.height, rootRect.height) * 0.24;
      if (visibleHeight >= activationHeight) setVisible(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { root: scroller, threshold: 0.24 }
    );

    observer.observe(section);
    requestAnimationFrame(checkVisible);
    scroller?.addEventListener("scroll", checkVisible, { passive: true });
    window.addEventListener("resize", checkVisible);

    return () => {
      observer.disconnect();
      scroller?.removeEventListener("scroll", checkVisible);
      window.removeEventListener("resize", checkVisible);
    };
  }, []);

  useEffect(() => {
    const workflow = workflowRef.current;
    const invite = inviteRef.current;
    const missLane = missLaneRef.current;
    const acceptedLane = acceptedLaneRef.current;
    const missEnd = missEndRef.current;
    const acceptedEnd = acceptedEndRef.current;

    if (
      !workflow ||
      !invite ||
      !missLane ||
      !acceptedLane ||
      !missEnd ||
      !acceptedEnd
    ) {
      return;
    }

    let frame = 0;
    let settleTimer = 0;

    const measure = () => {
      const workflowRect = workflow.getBoundingClientRect();
      const inviteRect = invite.getBoundingClientRect();
      const missLaneRect = missLane.getBoundingClientRect();
      const acceptedLaneRect = acceptedLane.getBoundingClientRect();
      const missEndRect = missEnd.getBoundingClientRect();
      const acceptedEndRect = acceptedEnd.getBoundingClientRect();

      const centerX = (rect: DOMRect) => rect.left - workflowRect.left + rect.width / 2;
      const centerY = (rect: DOMRect) => rect.top - workflowRect.top + rect.height / 2;
      const inviteY = centerY(inviteRect);
      const inviteLeft = inviteRect.left - workflowRect.left;
      const inviteRight = inviteRect.right - workflowRect.left;
      const missX = centerX(missLaneRect);
      const acceptedX = centerX(acceptedLaneRect);
      const missEndY = centerY(missEndRect);
      const acceptedEndY = centerY(acceptedEndRect);
      const turnRadius = 18;
      const branchY = Math.round(inviteY);
      const leftTurnX = Math.round(missX + turnRadius);
      const rightTurnX = Math.round(acceptedX - turnRadius);
      const leftX = Math.round(missX);
      const rightX = Math.round(acceptedX);

      setConnectors({
        width: Math.round(workflowRect.width),
        height: Math.round(workflowRect.height),
        paths: [
          [
            `M${Math.round(inviteLeft)} ${branchY}`,
            `H${leftTurnX}`,
            `Q${leftX} ${branchY} ${leftX} ${branchY + turnRadius}`,
            `V${Math.round(missEndY)}`,
          ].join(" "),
          [
            `M${Math.round(inviteRight)} ${branchY}`,
            `H${rightTurnX}`,
            `Q${rightX} ${branchY} ${rightX} ${branchY + turnRadius}`,
            `V${Math.round(acceptedEndY)}`,
          ].join(" "),
        ],
      });
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(scheduleMeasure);
    [workflow, invite, missLane, acceptedLane, missEnd, acceptedEnd].forEach((element) =>
      observer.observe(element)
    );

    scheduleMeasure();
    settleTimer = window.setTimeout(measure, 480);
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [visible]);

  return (
    <section className="seq-section" ref={sectionRef}>
      <div className="seq-content">
        <div className="seq-text">
          <h2>Sequences that run themselves.</h2>
          <p>Clean LinkedIn and email branches, timed and automated.</p>
        </div>

        <div
          className={`seq-workflow ${visible ? "seq-workflow-visible" : ""}`}
          ref={workflowRef}
        >
          <div className="seq-puffle-perch" aria-hidden="true">
            <div className="seq-puffle-body">
              <Image
                src="/puffle-logo.svg"
                alt=""
                width={126}
                height={126}
                sizes="126px"
                className="seq-puffle-logo"
              />
              <span className="seq-puffle-feet">
                <span />
                <span />
              </span>
            </div>
          </div>

          <div
            className="seq-node seq-node-invite"
            ref={inviteRef}
            style={{ transitionDelay: "160ms" }}
          >
            <span className="seq-node-icon">
              <WorkflowIcon type="in" />
            </span>
            <span className="seq-node-copy">
              <strong>Linkedin connection request</strong>
            </span>
            <span className="seq-node-menu">...</span>
          </div>

          <svg
            className="seq-branch-lines"
            viewBox={`0 0 ${connectors.width} ${connectors.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {connectors.paths.map((path) => (
              <path key={path} d={path} />
            ))}
          </svg>

          <div className="seq-lanes">
            <div
              className="seq-lane seq-lane-miss"
              ref={missLaneRef}
              style={{ transitionDelay: "280ms" }}
            >
              <span className="seq-label">Not accepted?</span>
              <span className="seq-delay">
                <span />
                1 day
              </span>
              <div className="seq-node seq-node-like">
                <span className="seq-node-icon">
                  <WorkflowIcon type="like" />
                </span>
                <span className="seq-node-copy">
                  <strong>Like post</strong>
                </span>
                <span className="seq-node-menu">...</span>
              </div>
              <span className="seq-delay">
                <span />
                1 day
              </span>
              <div className="seq-node seq-node-endorse">
                <span className="seq-node-icon">
                  <WorkflowIcon type="endorse" />
                </span>
                <span className="seq-node-copy">
                  <strong>Endorse Skill</strong>
                </span>
                <span className="seq-node-menu">...</span>
              </div>
              <span className="seq-delay">
                <span />
                1 day
              </span>
              <div className="seq-node seq-node-email" ref={missEndRef}>
                <span className="seq-node-icon">
                  <WorkflowIcon type="mail" />
                </span>
                <span className="seq-node-copy">
                  <strong>Send email</strong>
                </span>
                <span className="seq-node-menu">...</span>
              </div>
            </div>

            <div
              className="seq-lane seq-lane-accepted"
              ref={acceptedLaneRef}
              style={{ transitionDelay: "360ms" }}
            >
              <span className="seq-label">Accepted?</span>
              <span className="seq-delay">
                <span />
                1 day
              </span>
              <div className="seq-node seq-node-linkedin">
                <span className="seq-node-icon">
                  <WorkflowIcon type="in" />
                </span>
                <span className="seq-node-copy">
                  <strong>Linkedin Message</strong>
                </span>
                <span className="seq-node-menu">...</span>
              </div>
              <span className="seq-delay">
                <span />
                1 day
              </span>
              <div className="seq-node seq-node-email" ref={acceptedEndRef}>
                <span className="seq-node-icon">
                  <WorkflowIcon type="mail" />
                </span>
                <span className="seq-node-copy">
                  <strong>Email</strong>
                </span>
                <span className="seq-node-menu">...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
