import useGetEntityDefinition from "../../../../../functions/useGetEntityDefinition";
import useGetContextDefinitions from "./useGetContextDefinitions";

export default function useFormatManifestData(manifestData) {
  const masterNodes = [];

  const contexts = {};
  const stats = {};

  const masterNode = useGetEntityDefinition('DestinyPresentationNodeDefinition', 1074663644)
  const contextHashes = masterNode ? masterNode.Response.children.presentationNodes.map(node => node.presentationNodeHash) : null
  const contextData = useGetContextDefinitions(contextHashes)

  if (contextData) {
    contextData.forEach(context => {
      const contextHash = context.Response.hash;
      const parentNodeHash = context.Response.parentNodeHashes[0];

      // Add the context to the masterNodes array
      if (!masterNodes.some(masterNode => masterNode.value === parentNodeHash)) {
        masterNodes.push({
          value: parentNodeHash,
          label: masterNode?.Response?.displayProperties?.name,
        });
      }

      // Add the context to the contexts object
      if (!contexts[parentNodeHash]) {
        contexts[parentNodeHash] = [];
      }
      contexts[parentNodeHash].push({
        value: contextHash,
        label: context.Response.displayProperties.name
      });

      // Add the stats to the stats object
      stats[contextHash] = context.Response.children.metrics.map(node => {
        const statHash = node.metricHash;
        const stat = manifestData?.destinyDefinitions[statHash];

        if (stat) {
          return {
            value: statHash,
            label: stat.displayProperties.name
          };
        } else {
          return null
        }
      });
    });

    return {
      masterNodes,
      contexts,
      stats
    };
  } else {
    return null
  }
}
