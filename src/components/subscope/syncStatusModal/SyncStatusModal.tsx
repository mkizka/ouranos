"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import { MeSubscoSyncGetSubscriptionStatus } from "../../../../types/atmosphere";

type SyncRepoStatus =
  MeSubscoSyncGetSubscriptionStatus.Subscribed["syncRepoStatus"];

interface SyncStatusModalProps {
  syncRepoStatus: SyncRepoStatus;
}

export default function SyncStatusModal({
  syncRepoStatus,
}: SyncStatusModalProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });
    }, 2000);

    return () => clearInterval(timer);
  }, [queryClient]);

  const getSyncStatusText = () => {
    switch (syncRepoStatus) {
      case "dirty":
        return "同期準備中...";
      case "in-process":
        return "同期中...";
      case "ready":
        return "同期完了";
      case "failed":
        return "同期失敗";
      default:
        return "不明";
    }
  };

  const isSyncing =
    syncRepoStatus === "in-process" || syncRepoStatus === "dirty";

  return (
    <Dialog.Root open>
      <Dialog.Overlay
        className="animate-fade animate-duration-200 bg-skin-overlay-muted fixed inset-0 z-50 h-screen w-screen"
        onPointerDown={(e) => e.preventDefault()}
      />
      <Dialog.Content className="animate-fade animate-duration-200 bg-skin-base border-skin-base fixed left-[50%] top-[50%] z-50 h-fit w-[90svw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl border p-6 shadow-2xl">
        <Dialog.Title className="text-skin-base mb-4 text-center text-xl font-semibold">
          アカウント同期中
        </Dialog.Title>

        <div className="text-skin-base mb-6">
          <div className="flex flex-col items-center gap-4">
            {isSyncing && <LoadingSpinner />}
            <p className="text-center text-lg font-medium">
              ステータス: {getSyncStatusText()}
            </p>
          </div>
        </div>

        {isSyncing && (
          <p className="text-skin-secondary text-center text-sm">
            アカウントの同期が完了するまでお待ちください。
            <br />
            この処理には数秒から数分かかる場合があります。
          </p>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
