"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "@/components/actions/button/Button";
import { useCustomAgent } from "@/app/providers/agent";
import { NotSubscribedError } from "../../../../types/atmosphere/types/me/subsco/sync/unsubscribeServer";

export default function UnsubscribeButton() {
  const [open, setOpen] = useState(false);
  const agent = useCustomAgent();

  const mutation = useMutation({
    mutationFn: async () => {
      await agent.me.subsco.sync.unsubscribeServer();
    },
    onSuccess: () => {
      toast.success("サーバー登録を解除しました");
      setOpen(false);
      // 登録解除後はログアウトさせる
      signOut({ callbackUrl: "/" });
    },
    onError: (error) => {
      if (error instanceof NotSubscribedError) {
        toast.error("既に登録解除されています");
      } else {
        toast.error("登録解除に失敗しました");
      }
    },
  });

  useEffect(() => {
    if (!open) {
      mutation.reset();
    }
  }, [open]);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="text-status-danger border-status-danger hover:bg-status-danger/10 rounded-full border px-3 py-1.5 text-sm font-semibold"
      >
        登録解除
      </Button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="animate-fade animate-duration-200 bg-skin-overlay-muted fixed inset-0 z-50 h-screen w-screen" />
          <Dialog.Content className="animate-fade animate-duration-200 bg-skin-base border-skin-base fixed left-[50%] top-[50%] z-50 h-fit w-[90svw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl border p-6 shadow-2xl">
            <Dialog.Title className="text-skin-base mb-4 text-center text-xl font-semibold">
              サーバー登録の解除
            </Dialog.Title>
            <Dialog.Description className="text-skin-base mb-4 text-center">
              本当にサーバーの登録を解除しますか?
              <br />
              登録解除後はログアウトされます。
            </Dialog.Description>

            {mutation.error && (
              <div className="text-center mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
                エラー：
                {mutation.error instanceof NotSubscribedError
                  ? "既に登録解除されています"
                  : "登録解除に失敗しました"}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setOpen(false)}
                disabled={mutation.isPending}
                className="text-skin-base border-skin-base hover:bg-skin-secondary rounded-full border px-4 py-2 text-sm font-semibold"
              >
                キャンセル
              </Button>
              <Button
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
                className={`bg-status-danger hover:bg-status-danger/90 text-white rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                  mutation.isPending && "animate-pulse animate-duration-1000"
                }`}
              >
                {mutation.isPending ? "解除中..." : "登録解除する"}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
