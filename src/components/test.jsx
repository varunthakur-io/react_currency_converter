import React from 'react';

function test({ children, name }) {
  return (
    <div>
      <div>{children}</div>
      <div>{name}</div>
    </div>
  );
}

export default test;
