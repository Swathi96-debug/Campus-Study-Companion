import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ text, type }) => {
  return (
    <span className={`custom-badge badge-${type}`}>
      {text}
    </span>
  );
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'warning', 'danger', 'info']).isRequired,
};

export default Badge;
