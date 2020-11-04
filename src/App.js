import logo from './logo.svg';
import './App.css';
import Boundary from './components/Boundary'
import PlayerSprite from './components/PlayerSprite'

function App() {
  return (
    <div className="App">
      <div className="playable-area">
        <Boundary orientation="horizontal" location="top"/>
        <Boundary orientation="vertical" location="left"/>
        <Boundary orientation="vertical" location="right"/>
        <Boundary orientation="horizontal" location="bottom"/>
        <PlayerSprite />
      </div>
    </div>
  );
}

export default App;
