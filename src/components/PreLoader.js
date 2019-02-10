import React from 'react';
import PropTypes from 'prop-types';

const PreLoader = ({ customClasses = '' }) => (
  <div className={`spinner ${customClasses}`} data-testid="loader">
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>
);
// PreLoader.defaultProps = {
//   classes: '',
// };

// PreLoader.propTypes = {
//   classes: PropTypes.string,
// };
export default PreLoader;
