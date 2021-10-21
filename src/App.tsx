import React from 'react';
import { Video } from './Components/Video';

import './styles/app.css'

function App() {
  return (
    <div className="App" style={{ width: '1000px'}}>
      <Video
        src='test/test_video.mp4'
        fixedControls
      />
    </div>
  );
}

export default App;
