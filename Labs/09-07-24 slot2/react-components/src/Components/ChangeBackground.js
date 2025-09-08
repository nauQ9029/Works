import React from 'react';
import { useBackgroundColor } from './BackgroundColorContext';

const ChangeBackground = () => {
  const { color, setColor } = useBackgroundColor();

  const changeToCyan = () => setColor('cyan');
  const changeToGreen = () => setColor('lightgreen');
  const changeToBlack = () => setColor('black');

  return (
    <div style={{ backgroundColor: color, height: '100vh', padding: '20px' }}>
      <h1>The current background color is: {color}</h1>
      <button onClick={changeToCyan}>Cyan</button>
      <button onClick={changeToGreen}>Green</button>
      <button onClick={changeToBlack}>Black</button>
    </div>
  );
};

export default ChangeBackground;
