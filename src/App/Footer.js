import React from 'react'

const Footer = () => (
  <div>
    <div className="footer">
      <div className="footer-container">
        <h3>HeadlessCMS is hosted and maintained by <a href="https://www.netlify.com">Netlify</a>, the perfect way to deploy your <a href="https://www.netlify.com/jamstack">Jamstack sites and apps</a>.</h3>
      </div>
      <div className="postscript">
        © Netlify {new Date().getFullYear()}
      </div>
    </div>
  </div>
)

export default Footer
