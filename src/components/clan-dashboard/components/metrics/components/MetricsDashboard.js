import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import MetricsMasterNode from './MetricsMasterNode';
import MetricsContext from './MetricsContext';
import MetricsStat from './MetricsStat';

const MetricsDashboard = ({ masterNodes, contexts, stats, setMetricId }) => {
  const defaultMasterNode = masterNodes[0].value
  const defaultContext = useCallback(
    (masterNode) => contexts[masterNode][0].value,
    [contexts]
  );

  const defaultStat = useCallback(
    (context) => stats[context][0].value,
    [stats]
  );

  const [selectedMasterNode, setSelectedMasterNode] = useState(defaultMasterNode);
  const [selectedContext, setSelectedContext] = useState(defaultContext(defaultMasterNode));
  const [selectedStat, setSelectedStat] = useState(defaultStat(defaultContext(defaultMasterNode)));

  const router = useRouter();

  useEffect(() => {
    const { masterNode, context, stat } = router.query;

    if (masterNode && contexts[masterNode]) {
      setSelectedMasterNode(masterNode);
      if (context && stats[context]) {
        setSelectedContext(context);
        if (stat) {
          setSelectedStat(stat);
        } else {
          setSelectedStat(defaultStat(context));
        }
      } else {
        const defaultContextValue = defaultContext(masterNode);
        setSelectedContext(defaultContextValue);
        setSelectedStat(defaultStat(defaultContextValue));
      }
    } else {
      setSelectedMasterNode(defaultMasterNode);
      setSelectedContext(defaultContext(defaultMasterNode));
      setSelectedStat(defaultStat(defaultContext(defaultMasterNode)));
    }
  }, [router.query, contexts, defaultContext, defaultMasterNode, defaultStat, stats]);

  useEffect(() => {
    setMetricId(selectedStat);
  }, [selectedStat, setMetricId]);

  const handleSelectMasterNode = (value) => {
    setSelectedMasterNode(value);
    setSelectedContext(defaultContext(value));
    setSelectedStat(defaultStat(defaultContext(value)));
    updateUrlQuery(value, defaultContext(value), defaultStat(defaultContext(value)));
  };

  const handleSelectContext = (value) => {
    setSelectedContext(value);
    setSelectedStat(defaultStat(value));
    updateUrlQuery(selectedMasterNode, value, defaultStat(value));
  };

  const handleSelectStat = (value) => {
    setSelectedStat(value);
    updateUrlQuery(selectedMasterNode, selectedContext, value);
  };

  const updateUrlQuery = (masterNode, context, stat) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, masterNode, context, stat },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div>
      <MetricsMasterNode
        masterNodes={masterNodes}
        selectedMasterNode={selectedMasterNode}
        onSelectMasterNode={handleSelectMasterNode}
      />
      <MetricsContext
        contexts={contexts[selectedMasterNode] || []}
        selectedContext={selectedContext}
        onSelectContext={handleSelectContext}
      />
      <MetricsStat
        stats={stats[selectedContext] || []}
        selectedStat={selectedStat}
        onSelectStat={handleSelectStat}
      />
    </div>
  );
};

export default MetricsDashboard;
