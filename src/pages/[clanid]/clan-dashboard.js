import React, { useMemo, useState } from "react";
import { useRouter } from 'next/router';

import { Text, Div, Image } from "atomize";

import useGetClanMemberInfo from "../../functions/getClanMemberProfileInfo/useGetClanMemberInfo";
import useGetAllMembersFullProfile from "../../functions/useGetAllMembersFullProfile";
import DefaultTemplate from "../../components/DefaultLayout";
import Head from "next/head";
import InfoBox from "../../components/InfoBox";
import PlayerMetricsTable from "../../components/clan-dashboard/components/PlayerMetricsTable";
import prepareMetricsTable from "../../components/clan-dashboard/functions/prepareMetricsTable";
import useGetManifestComponents from "../../functions/useGetManifestComponents";
import useGetManifest from "../../functions/useGetManifest";
import MetricsDashboard from "../../components/clan-dashboard/components/metrics/components/MetricsDashboard";
import useFormatManifestData from "../../components/clan-dashboard/components/metrics/functions/useFormatManifestData";
import useGetEntityDefinition from "../../functions/useGetEntityDefinition";
import LoadingWrapper from "../../components/LoadingWrapper";

export default function ClanDashboard() {
  const [metricId, setMetricId] = useState('');

  // Get the clanId from the URL
  const router = useRouter();
  const { clanid } = router.query;

  const manifest = useGetManifest()
  const metricDefinitions = useGetManifestComponents(manifest, 'DestinyMetricDefinition')
  const metricDashabordData = useFormatManifestData(metricDefinitions)

  const { data: members, mutate: mutateMembers } = useGetClanMemberInfo(clanid);
  const clanMemberProfiles = useGetAllMembersFullProfile(members);

  const selectedMetricDef = useGetEntityDefinition('DestinyMetricDefinition', metricId)

  const metricTableData = useMemo(() => prepareMetricsTable(clanMemberProfiles, metricId), [clanMemberProfiles, metricId]);

  function StatDescription({ metricDef }) {
    const urlBase = "https://www.bungie.net"
    const displayProps = metricDef?.Response?.displayProperties
    const hasIcon = displayProps?.hasIcon
    const iconPath = urlBase + displayProps?.iconSequences[0].frames[2]

    if (displayProps) {
      return (
        <Div>
          <Div d="flex" align="center" m={{ y: "1rem" }}>
            <Text textColor="cbWhite" textSize="heading">{displayProps?.name}</Text>
            {hasIcon ? <Image src={iconPath} m={{ x: "1rem" }} h="2.5rem" w="auto" alt="" /> : null}
          </Div>
          <Text textColor="cbWhite">{displayProps?.description}</Text>
        </Div>
      )
    } else {
      return null
    }
  }

  return (
    <DefaultTemplate>
      <Head>
        <title>Clan Dashboard | ClanBase</title>
        <meta name="description" content="Clan leaderboards and stats" key="desc" />
      </Head>
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <InfoBox bg="cbGrey1">
          <Div m={{ y: "0.5rem" }}>
            <LoadingWrapper isLoading={!metricDashabordData} size="30px" color="cbWhite">
              <MetricsDashboard
                masterNodes={metricDashabordData?.masterNodes}
                contexts={metricDashabordData?.contexts}
                stats={metricDashabordData?.stats}
                setMetricId={setMetricId}
              />
            </LoadingWrapper>
          </Div>
          <Div m={{ y: "1.5rem" }}>
            <LoadingWrapper isLoading={!selectedMetricDef} size="30px" color="cbWhite">
              <StatDescription metricDef={selectedMetricDef} />
            </LoadingWrapper>
          </Div>
          <LoadingWrapper isLoading={!metricTableData} iconName="Loading" size="55px" d="flex" justify="center" p="5rem">
            <PlayerMetricsTable data={metricTableData} />
          </LoadingWrapper>
        </InfoBox>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            gap: "1.5rem",
          }}
        >
        </div>
      </div>
    </DefaultTemplate>
  );
}
