"use client";

import { useQuery } from "@tanstack/react-query";
import { useCustomAgent } from "@/app/providers/agent";
import {
  isSubscribed,
  isNotSubscribed,
} from "../../../../types/atmosphere/types/me/subsco/sync/getSubscriptionStatus";
import SubscriptionModal from "../subscriptionModal/SubscriptionModal";
import SyncStatusModal from "../syncStatusModal/SyncStatusModal";

export default function SubscopeModals() {
  const agent = useCustomAgent();

  const { data } = useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      const response = await agent.me.subsco.sync.getSubscriptionStatus();
      return response.data;
    },
  });

  if (!data) return null;

  const showSyncStatusModal =
    isSubscribed(data) &&
    data.syncRepoStatus !== "ready" &&
    data.syncRepoStatus !== "synchronized";

  return (
    <>
      {isNotSubscribed(data) && <SubscriptionModal />}
      {showSyncStatusModal && (
        <SyncStatusModal syncRepoStatus={data.syncRepoStatus} />
      )}
    </>
  );
}
