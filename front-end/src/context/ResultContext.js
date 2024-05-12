import React from 'react';

const ResultContext = React.createContext({
  result: null,
  setResult: () => {}
});

export default ResultContext;
