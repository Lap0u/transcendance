import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div style={{ color: 'white' }}>
      Page not found,
      <Link style={{ textDecoration: 'none', color: 'red' }} to="/">click here to return home</Link>
    </div>
  );
};

export default Page404;
