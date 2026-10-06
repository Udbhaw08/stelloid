import React, { useState } from 'react';
import { BarChart3, Calculator, Flag, Hand, KeyRound, LayoutDashboard, ListChecks, LockKeyhole, Minus, Plus, MousePointer2, RefreshCw, ShieldCheck, Sparkles, Store } from 'lucide-react';
import Reveal from './Reveal';

const impactStages = [
  { label: 'BEFORE', title: 'Capture the baseline', text: 'Align revenue, contribution margin and stock cover before applying the action.' },
  { label: 'HUMAN-APPROVED ACTION', title: 'Apply with guardrails', text: 'Your team makes the change. Keep the action’s stop condition in view.' },
  { label: 'AFTER', title: 'Compare the outcome', text: 'Measure revenue, margin and inventory against the baseline and your goal.', tone: 'success' },
];

const teamRoles = [
  { icon: Flag, title: 'Founders & commerce heads', text: 'Connect commercial ambition to a focused weekly plan.' },
  { icon: Store, title: 'E-commerce & marketplace managers', text: 'Prioritise the SKUs and channels that need attention.' },
  { icon: MousePointer2, title: 'Growth & performance teams', text: 'Read advertising decisions alongside stock and margin.' },
  { icon: Calculator, title: 'Finance & operations', text: 'Keep agreed costs, contribution margin and inventory in the conversation.' },
];

const faqItems = [
  {
    question: 'What data does Stelloid need?',
    answer: 'A pilot can start with limited exports from your commerce, marketplace, advertising, analytics, inventory and finance systems. We agree the required fields and cost definitions first. No customer PII is required.',
  },
  {
    question: 'Will it change my prices or campaigns?',
    answer: 'No. Access is read-only. Your team reviews each recommendation and approves, applies or defers it. Stelloid does not autonomously change prices, campaigns, listings or inventory.',
  },
  {
    question: 'Are all the platforms shown live connectors?',
    answer: 'No. Shopify, Amazon, Meta Ads, Google Ads and CSV are example inputs. Pilots begin with exports; connectors are added deliberately, with fields and access documented before activation.',
  },
  {
    question: 'What does a pilot look like?',
    answer: 'Agree metric definitions, import limited exports, choose one goal and timeframe, then review a focused weekly plan. Measure outcomes against that goal and use the evidence in the next planning cycle.',
  },
];

function SectionBadge({ children }) {
  return (
    <div className="section-badge">
      <span className="badge-dot" />
      <span>{children}</span>
    </div>
  );
}

export function VisibilitySection() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <section className="section section-spacing">
        <Reveal>
        <div className="container dashboard-wrap">
          <div className="loop-heading-row dashboard-header">
            <div>
              <SectionBadge>01 / See the whole business</SectionBadge>
              <h2 className="section-title loop-title">
                One commercial picture.<br />Down to the SKU.
              </h2>
            </div>
            <p className="loop-intro">
              Bring sales, advertising spend, inventory and profitability into one decision layer. Move from brand to channel to SKU × channel, without losing the economics.
            </p>
          </div>

          <div className="dashboard-demo">
            <aside className="dashboard-sidebar">
              <div className="sidebar-brand">
                <div className="brand-icon small">
                  <Sparkles size={18} />
                </div>
                <span>stelloid</span>
              </div>

              <div className="sidebar-list">
                <div className="sidebar-item active">
                  <LayoutDashboard size={16} />
                  <span>Overview</span>
                </div>
                <div className="sidebar-item">
                  <ListChecks size={16} />
                  <span>Weekly plan</span>
                </div>
                <div className="sidebar-item">
                  <BarChart3 size={16} />
                  <span>Impact</span>
                </div>
              </div>

              <div className="sidebar-pill">Read-only workspace</div>
            </aside>

            <div className="dashboard-main">
              <div className="dash-head">
                <h3>Commercial overview</h3>
                <span>Last 30 days vs prior period</span>
              </div>

              <div className="level-tabs">
                {['Brand', 'Channel', 'SKU', 'SKU × channel'].map((tab, index) => (
                  <button key={tab} className={index === 1 ? 'tab active' : 'tab'}>{tab}</button>
                ))}
              </div>

              <div className="metric-row">
                <Reveal delay={0.1}>
                  <div className="metric-box primary">
                    <span>Net revenue</span>
                    <strong style={{ color: '#2d6645' }}>+18.4%</strong>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="metric-box">
                    <span>Contribution margin</span>
                    <strong>27.8%</strong>
                  </div>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="metric-box">
                    <span>Average order value</span>
                    <strong style={{ color: '#2d6645' }}>+12.4%</strong>
                  </div>
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="metric-box">
                    <span>Orders</span>
                    <strong style={{ color: '#2d6645' }}>+14.1%</strong>
                  </div>
                </Reveal>
              </div>

              <div className="table-label">Channel performance</div>
              <div className="channel-table">
                <div className="table-row head-row">
                  <span>Channel</span>
                  <span>Net revenue</span>
                  <span>CM</span>
                  <span>AOV</span>
                  <span>Commercial signal</span>
                </div>
                <Reveal delay={0.1}>
                  <div className="table-row">
                    <span>Shopify</span>
                    <span style={{ color: '#2d6645', fontWeight: 700 }}>+19.2%</span>
                    <span>36%</span>
                    <span style={{ color: '#2d6645' }}>+12.4%</span>
                    <span>Bundles lifting AOV</span>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="table-row">
                    <span>Amazon</span>
                    <span style={{ color: '#2d6645', fontWeight: 700 }}>+22.6%</span>
                    <span>27%</span>
                    <span style={{ color: '#2d6645' }}>+5.8%</span>
                    <span>Compton Cap leads growth</span>
                  </div>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="table-row">
                    <span>Flipkart</span>
                    <span style={{ color: '#a13535', fontWeight: 700 }}>+8.1%</span>
                    <span>23%</span>
                    <span style={{ color: '#a13535' }}>+3.1%</span>
                    <span>Margin needs attention</span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          <div className="economics-note">
            <div className="note-title">Revenue is only<br />half the story.</div>
            <p>
              Align net revenue with product cost, marketplace and payment fees, fulfilment, shipping, returns and other agreed costs. Compare growth with contribution margin, not just a bigger top line.
            </p>
          </div>
        </div>
        </Reveal>
      </section>

      <section className="section section-spacing">
        <Reveal>
        <div className="container impact-wrap">
          <div className="loop-heading-row impact-header">
            <div>
              <SectionBadge>03 / Learn from the outcome</SectionBadge>
              <h2 className="section-title loop-title">
                Close the loop.<br />Not just the task.
              </h2>
            </div>
            <p className="loop-intro">
              Did the move help your goal, without breaking your guardrails? Compare before and after, then bring that evidence into next week’s plan.
            </p>
          </div>

          <div className="impact-review">
            <div className="review-head">
              <p>The before → after review</p>
              <RefreshCw size={20} />
            </div>

            <div className="impact-row">
              {impactStages.map(({ label, title, text, tone }) => (
                <div key={label} className={`impact-stage ${tone || ''}`}>
                  <p className="impact-label">{label}</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>

            <p className="impact-footer">Continue, adjust or stop based on observed outcomes. That’s the starting point for next week.</p>
          </div>
        </div>
        </Reveal>
      </section>

      <section className="section section-spacing">
        <Reveal>
        <div className="container team-wrap">
          <div className="loop-heading-row team-header">
            <div>
              <SectionBadge>Built for your team</SectionBadge>
              <h2 className="section-title loop-title">
                Different roles.<br />One commercial direction.
              </h2>
            </div>
            <p className="loop-intro">
              For mid- and upper mid-market e-commerce brands selling across multiple online channels, with too much riding on manual decisions.
            </p>
          </div>

          <div className="team-list">
            {teamRoles.map(({ icon: Icon, title, text }) => (
              <div key={title} className="team-role">
                <div className="role-icon">
                  <Icon size={22} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      <section className="section section-spacing">
        <Reveal>
        <div className="container trust-wrap">
          <div className="trust-panel left-panel">
            <SectionBadge>Trust by design</SectionBadge>
            <h2 className="section-title loop-title">
              Read-only.<br />Human-led.<br />
              <em>Your call.</em>
            </h2>
            <p>
              Commercial intelligence should strengthen your judgement, not take your hands off the wheel.
            </p>
            <div className="notice-box">
              <LockKeyhole size={18} />
              <div>
                <span>Recommendations in.</span>
                <span>No autonomous changes out.</span>
              </div>
            </div>
          </div>

          <div className="trust-panel right-panel">
            <div className="trust-item-row">
              <Hand size={22} />
              <div>
                <h3>You stay in control.</h3>
                <p>Every action is human-approved. Stelloid does not autonomously change prices, campaigns, listings or inventory.</p>
              </div>
            </div>

            <div className="trust-item-row">
              <KeyRound size={22} />
              <div>
                <h3>Only what’s needed.</h3>
                <p>Read-only access and minimum required fields. No customer PII required. Access is documented before activation.</p>
              </div>
            </div>

            <div className="trust-item-row">
              <ShieldCheck size={22} />
              <div>
                <h3>Protected in transit and at rest.</h3>
                <p>Data is encrypted in transit and at rest, with fields and access documented before activation.</p>
              </div>
            </div>

            <div className="trust-item-row">
              <FileCheckIcon />
              <div>
                <h3>Your data remains yours.</h3>
                <p>Export and deletion are available on request. Start with limited exports for a focused pilot.</p>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      <section className="section section-spacing">
        <Reveal>
        <div className="container faq-wrap">
          <div className="faq-intro">
            <SectionBadge>A few good questions</SectionBadge>
            <h2 className="section-title faq-title">
              Clarity, before<br />you connect.
            </h2>
            <p>Have something else in mind?</p>
            <a href="mailto:contact@stelloid.io">contact@stelloid.io ↗</a>
          </div>

          <div className="faq-list">
            {faqItems.map(({ question, answer }, index) => (
              <div key={question} className={`faq-item ${activeFaq === index ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
                <div className="faq-question">
                  <p>{question}</p>
                  {activeFaq === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
                <p className="faq-answer">{answer}</p>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>
    </>
  );
}

function FileCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-6Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 2v6h6M9.5 14.5l1.6 1.6 3.4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
