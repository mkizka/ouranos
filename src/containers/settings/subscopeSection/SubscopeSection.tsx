"use client";

import { BiSolidServer } from "react-icons/bi";
import { MdSync } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import UnsubscribeButton from "@/components/subscope/unsubscribeButton/UnsubscribeButton";
import { useCustomAgent } from "@/app/providers/agent";
import { isSubscribed } from "../../../../types/atmosphere/types/me/subsco/sync/getSubscriptionStatus";
import { MeSubscoSyncGetSubscriptionStatus } from "../../../../types/atmosphere";

type BackfillStatus =
  MeSubscoSyncGetSubscriptionStatus.Subscribed["backfillStatus"];

export default function SubscopeSection() {
  const agent = useCustomAgent();

  const { data, isLoading } = useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      const response = await agent.me.subsco.sync.getSubscriptionStatus();
      return response.data;
    },
  });

  const getBackfillStatusText = (status?: BackfillStatus) => {
    switch (status) {
      case "dirty":
        return "未同期";
      case "in-process":
        return "同期中";
      case "synchronized":
        return "同期完了";
      default:
        return "不明";
    }
  };

  const getBackfillStatusColor = (status?: BackfillStatus) => {
    switch (status) {
      case "dirty":
        return "text-status-warning bg-status-warning/20";
      case "in-process":
        return "text-blue-600 dark:text-blue-400 bg-blue-600/20 dark:bg-blue-400/20";
      case "synchronized":
        return "text-status-success bg-status-success/20";
      default:
        return "text-skin-tertiary bg-skin-tertiary/20";
    }
  };

  return (
    <section>
      <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
        Subscope
      </h3>
      {isLoading ? (
        <div className="border-skin-base mt-2 rounded-none border border-x-0 md:rounded-2xl md:border-x">
          <div className="border-skin-base flex items-center justify-between border-b p-3">
            <div className="bg-skin-tertiary h-5 w-20 animate-pulse rounded" />
            <div className="flex items-center gap-3">
              <div className="bg-skin-tertiary h-5 w-24 animate-pulse rounded" />
              <div className="bg-skin-tertiary h-10 w-32 animate-pulse rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between p-3">
            <div className="bg-skin-tertiary h-5 w-32 animate-pulse rounded" />
            <div className="bg-skin-tertiary h-7 w-20 animate-pulse rounded-full" />
          </div>
        </div>
      ) : (
        <div className="border-skin-base mt-2 flex w-full flex-col gap-3 rounded-none border border-x-0 p-3 md:rounded-2xl md:border-x">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdSync className="text-skin-icon-base text-xl" />
              <span className="text-skin-base font-medium">アカウント同期</span>
            </div>
            {data && isSubscribed(data) ? (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold ${getBackfillStatusColor(data.backfillStatus)}`}
              >
                {getBackfillStatusText(data.backfillStatus)}
              </span>
            ) : (
              <span className="text-skin-tertiary text-sm">未登録</span>
            )}
          </div>
          <hr className="border-skin-base" />
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
