import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Rules } from '@/components/Rules';
import { Reports } from '@/components/Reports';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main>
        <Hero />
        <Rules />
        <Reports />
      </main>
      <Footer />
    </div>
  );
}

export default App;
