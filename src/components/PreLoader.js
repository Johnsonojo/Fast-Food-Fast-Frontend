import React from 'react';
import PropTypes from 'prop-types';

const PreLoader = () => (
  <div id="fountainG" data-testid="loader">
    <div id="fountainG_1" className="fountainG" />
    <div id="fountainG_2" className="fountainG" />
    <div id="fountainG_3" className="fountainG" />
    <div id="fountainG_4" className="fountainG" />
    <div id="fountainG_5" className="fountainG" />
    <div id="fountainG_6" className="fountainG" />
    <div id="fountainG_7" className="fountainG" />
    <div id="fountainG_8" className="fountainG" />
  </div>
);
PreLoader.defaultProps = {
  classes: '',
};

PreLoader.propTypes = {
  classes: PropTypes.string,
};
export default PreLoader;
