import React from 'react';
import Dropdown from './Dropdown';

const MetricsStat = ({ stats, selectedStat, onSelectStat }) => (
  <Dropdown
    options={stats}
    value={selectedStat}
    onChange={(e) => onSelectStat(e.target.value)}
  />
);

export default MetricsStat;
