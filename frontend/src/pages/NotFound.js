// NotFound.js
// css for NotFound.js is here as this is a simple page requiring little detail
import React from 'react';

const NotFound = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Uh-oh! We couldn't find the page you're looking for.</h1>
            <p style={styles.text}>Sorry about that! The page you're trying to access doesn't seem to exist.</p>
            <p style={styles.text}>Please double-check the URL or return to the <a href="/" style={styles.link}>home page</a>.</p>
        </div>
    );
  }
  
  const styles = {
    container: {
      textAlign: 'center',
      padding: '50px',
    },
    heading: {
      fontSize: '32px',
      color: '#333',
      marginBottom: '20px',
    },
    text: {
      fontSize: '18px',
      color: '#666',
      marginBottom: '10px',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

export default NotFound;
