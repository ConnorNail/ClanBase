import React from 'react';
import Dropdown from './Dropdown';

const MetricsMasterNode = ({ masterNodes, selectedMasterNode, onSelectMasterNode }) => (
  <Dropdown
    options={masterNodes}
    value={selectedMasterNode}
    onChange={(e) => onSelectMasterNode(e.target.value)}
  />
);

export default MetricsMasterNode;
