import React from 'react';
import Footer from '../footer/footer.comonent';
import Header from '../header/header.component';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh' }} className='--pad'>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
