import * as React from 'react';

const ErrorPage = ({ title }) => {
  return (
    <div className="container">
      <h1 className="">{title}</h1>
      <a href="/">
        <button type="button" className="button">Zur Startseite</button>
      </a>
    </div>
  );
};

export default ErrorPage;
