"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/input/Input";
import { useAgent, useCustomAgent } from "@/app/providers/agent";
import { isNotSubscribed } from "../../../../types/atmosphere/types/me/subsco/sync/getSubscriptionStatus";

export default function SubscriptionModal() {
  const [open, setOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const session = useAgent().session;
  const agent = useCustomAgent();

  const { error } = useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      const response = await agent.me.subsco.sync.getSubscriptionStatus();
      if (isNotSubscribed(response.data)) {
        setOpen(true);
      }
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (inviteCode: string) => {
      await agent.me.subsco.sync.subscribeServer({
        inviteCode: inviteCode.trim(),
      });
    },
    onSuccess: () => {
      setOpen(false);
    },
    onError: (error) => {
      console.error("サーバー登録エラー", error);
    },
  });

  const accountName = session?.handle
    ? `@${session.handle}`
    : session?.did
      ? session.did
      : "不明なアカウント";

  return (
    <Dialog.Root open={open || !!error} onOpenChange={setOpen}>
      <Dialog.Overlay className="animate-fade animate-duration-200 bg-skin-overlay-muted fixed inset-0 z-50 h-screen w-screen" />
      <Dialog.Content className="animate-fade animate-duration-200 bg-skin-base border-skin-base fixed left-[50%] top-[50%] z-50 h-fit w-[90svw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl border p-6 shadow-2xl">
        <Dialog.Title className="text-skin-base mb-4 text-center text-xl font-semibold">
          {error ? "エラー" : "アカウントの登録"}
        </Dialog.Title>

        {error ? (
          <>
            <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
              サーバー登録状態の取得に失敗しました
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setOpen(false)}
                className="text-skin-base border-skin-base hover:bg-skin-secondary rounded-full border px-4 py-2 text-sm font-semibold"
              >
                閉じる
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-skin-base mb-4">
              <p className="text-center mb-4">
                ログイン中のアカウント({accountName}
                )をSubscopeに登録しますか？
              </p>
              <p className="text-center mb-2">登録すると以下を実行します</p>
              <ul className="list-disc pl-5">
                <li>フォローしているアカウントの新しい投稿を表示</li>
                <li>{accountName}の過去投稿を表示</li>
              </ul>
            </div>

            <div className="mb-6">
              <label className="text-skin-base mb-2 block text-sm font-medium">
                招待コード
              </label>
              <Input
                type="text"
                placeholder="招待コードを入力"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setOpen(false)}
                className="text-skin-base border-skin-base hover:bg-skin-secondary rounded-full border px-4 py-2 text-sm font-semibold"
              >
                ログアウト
              </Button>
              <Button
                onClick={() => mutation.mutate(inviteCode)}
                disabled={mutation.isPending || !inviteCode.trim()}
                className={`bg-primary hover:bg-primary-dark text-skin-icon-inverted rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                  mutation.isPending && "animate-pulse animate-duration-1000"
                }`}
              >
                {mutation.isPending ? "登録中..." : "登録する"}
              </Button>
            </div>
          </>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
