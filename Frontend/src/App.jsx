import './App.css';
import Header from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IssueSection } from './components/IssueSection';
import { StrategySection } from './components/StrategySection';
import { VisibilitySection } from './components/VisibilitySection';
import { OutcomeSection } from './components/OutcomeSection';
import { FooterCta } from './components/FooterCta';

function App() {
  return (
    <div className="stelloid-app">
      <Header />

      <main className="page-shell">
        <HeroSection />
        <IssueSection />
        <StrategySection />
        <VisibilitySection />
        <OutcomeSection />
      </main>

      <FooterCta />
    </div>
  );
}

export default App;
