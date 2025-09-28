# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

OuranosはNext.jsで構築されたBlueskyクライアントアプリケーション。AT Protocol (@atproto/api)を使用してBlueskyと通信し、NextAuthを使用した認証システムを実装している。

## 開発コマンド

- `npm run dev` - 開発サーバーを起動（Turboモード）
- `npm run build` - プロダクションビルドを実行
- `npm run lint` - ESLintによるコードチェック
- `npm run gen-api` - lexiconsからAPI型定義を生成

## 必須環境変数

開発時には以下の環境変数が必要:
- `NEXTAUTH_SECRET` - NextAuthの秘密鍵（`openssl rand -base64 32`で生成）
- `NEXTAUTH_URL` - ローカル開発時は`http://localhost:3000`

## アーキテクチャ

### ディレクトリ構造

- `src/app/` - Next.js App Routerのページとレイアウト
  - `(auth)/` - 認証関連のページ
  - `(site)/` - 公開ページ
  - `dashboard/` - ログイン後のメインアプリケーション
  - `api/` - API Routes（NextAuthなど）

- `src/lib/` - コアロジック
  - `api/` - AT ProtocolとBluesky APIのラッパー
    - `auth/` - NextAuthの設定とセッション管理
    - `bsky/` - Bluesky API（actor, feed, notification, social, identity）
  - `hooks/` - カスタムReact Hooks
  - `utils/` - ユーティリティ関数
  - `consts/` - 定数定義
  - `store/` - 状態管理

- `src/components/` - 再利用可能なUIコンポーネント
  - 機能別に分類（actions, dataDisplay, contentDisplay, inputs, navigational, feedback, forms, filter, status）

- `src/containers/` - ページレベルのコンテナコンポーネント
  - 機能別に分類（posts, users, notifications, search, settings, thread, lists, atmosphere）

- `types/` - TypeScript型定義
  - `atmosphere/` - lexiconsから生成されたAPI型定義

- `lexicons/` - AT Protocolのlexicon定義（frontpage, linkat, whiteWind）

### 認証フロー

- NextAuthのCredentialsProviderを使用してBlueskyアカウントでログイン
- `src/lib/api/bsky/agent.ts`でAtpAgentを管理
- セッションの有効期限チェックと自動更新機能を実装
- サーバーサイド: `getAgentFromServer()`
- クライアントサイド: `getBskySession()`

### スタイリング

- TailwindCSS（tailwind.config.ts）
- Radix UIコンポーネント（Dialog, Dropdown Menu, Popover, Switch, Tooltipなど）
- next-themesによるダークモード対応

### 主要ライブラリ

- @atproto/api - AT Protocol/Bluesky API
- @tanstack/react-query - サーバー状態管理
- @tiptap/react - リッチテキストエディタ
- @vidstack/react - ビデオプレーヤー
- react-hot-toast - 通知
- emoji-picker-react - 絵文字ピッカー

## デプロイ

- mainブランチはプロダクション環境に自動デプロイ
- previewブランチはステージング環境に自動デプロイ
- Vercelにデプロイされる想定