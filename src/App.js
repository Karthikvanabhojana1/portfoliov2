import './App.css';
import Header from './components/Header';
import Portfolio from './component/Portfolio';
import Calendar from './components/Calendar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Portfolio />
        <Calendar />
      </main>
      <Footer />
    </div>
  );
}

export default App;
