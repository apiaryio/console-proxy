import React from 'react';
import ReactDOM from 'react-dom';
import Seed from './Seed';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Seed />, div);
});
