import './App.css';
import './components/CustomerList';
import './components/Trainings';
import './components/menu';
import PersistentDrawerLeft from './components/menu';
import './components/Router'
function App() {

  return (
    <div className="App">
      <PersistentDrawerLeft/>
    </div>
  );
}

export default App;
