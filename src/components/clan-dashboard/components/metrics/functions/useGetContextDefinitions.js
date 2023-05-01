import useSWRImmutable from 'swr/immutable';
import getHeaders from '../../../../../functions/useGetHeaders';

export default function useGetContextDefinitions(contextHashes) {
  const header = getHeaders(false);

  const getKey = () => {
    if (contextHashes) {
      return contextHashes.map(
        (hash) =>
          `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyPresentationNodeDefinition/${hash}/`
      );
    }
    return null;
  };

  const { data: fetchedData } = useSWRImmutable(getKey, (keys) =>
    Promise.all(
      keys.map((key) =>
        fetch(key, { headers: header }).then((res) => res.json())
      )
    )
  );

  return fetchedData;
}
