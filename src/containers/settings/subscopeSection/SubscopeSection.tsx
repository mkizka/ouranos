"use client";

import { BiSolidServer } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import UnsubscribeButton from "@/components/subscope/unsubscribeButton/UnsubscribeButton";
import { useCustomAgent } from "@/app/providers/agent";

export default function SubscopeSection() {
  const agent = useCustomAgent();

  const { isLoading } = useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      const response = await agent.me.subsco.sync.getSubscriptionStatus();
      return response.data;
    },
  });

  return (
    <section>
      <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
        Subscope
      </h3>
      {isLoading ? (
        <div className="border-skin-base mt-2 rounded-none border border-x-0 md:rounded-2xl md:border-x">
          <div className="flex items-center justify-between p-3">
            <div className="bg-skin-tertiary h-5 w-32 animate-pulse rounded" />
            <div className="bg-skin-tertiary h-7 w-20 animate-pulse rounded-full" />
          </div>
        </div>
      ) : (
        <div className="border-skin-base mt-2 flex w-full flex-col gap-3 rounded-none border border-x-0 p-3 md:rounded-2xl md:border-x">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BiSolidServer className="text-skin-icon-base text-xl" />
              <span className="text-skin-base font-medium">サーバー登録</span>
            </div>
            <UnsubscribeButton />
          </div>
        </div>
      )}
    </section>
  );
}
