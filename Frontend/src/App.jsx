import './App.css';
import Header from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CommerceStackStrip } from './components/CommerceStackStrip';
import { IssueSection } from './components/IssueSection';
import { ChallengeStackSection } from './components/ChallengeStackSection';
import { StrategySection } from './components/StrategySection';
import { RecommendationsWorkflow } from './components/RecommendationsWorkflow';
import { VisibilitySection } from './components/VisibilitySection';
import { OutcomeSection } from './components/OutcomeSection';
import { FooterCta } from './components/FooterCta';
import { Reveal } from './components/Reveal';

function App() {
  return (
    <div className="stelloid-app">
      <Header />

      <main className="page-shell">
        <HeroSection />
        <CommerceStackStrip />
        <IssueSection />
        <ChallengeStackSection />
        <RecommendationsWorkflow />
        <StrategySection />
        <VisibilitySection />
        <OutcomeSection />
      </main>

      <Reveal><FooterCta /></Reveal>
    </div>
  );
}

export default App;
