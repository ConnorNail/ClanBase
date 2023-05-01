import React from 'react';
import Dropdown from './Dropdown';

const MetricsContext = ({ contexts, selectedContext, onSelectContext }) => (
  <Dropdown
    options={contexts}
    value={selectedContext}
    onChange={(e) => onSelectContext(e.target.value)}
  />
);

export default MetricsContext;
