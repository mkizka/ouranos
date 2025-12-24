"use client";

import { useQuery } from "@tanstack/react-query";
import { useCustomAgent } from "@/app/providers/agent";
import { isNotSubscribed } from "../../../../types/atmosphere/types/me/subsco/sync/getSubscriptionStatus";
import SubscriptionModal from "../subscriptionModal/SubscriptionModal";

export default function SubscopeModals() {
  const agent = useCustomAgent();

  const { data } = useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      const response = await agent.me.subsco.sync.getSubscriptionStatus();
      return response.data;
    },
  });

  if (!data || !isNotSubscribed(data)) {
    return null;
  }

  return <SubscriptionModal />;
}
