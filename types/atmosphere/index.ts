/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { XrpcClient, FetchHandler, FetchHandlerOptions } from '@atproto/xrpc'
import { schemas } from './lexicons'
import { CID } from 'multiformats/cid'
import * as FyiUnravelFrontpagePost from './types/fyi/unravel/frontpage/post'
import * as BlueLinkatBoard from './types/blue/linkat/board'
import * as MeSubscoSyncGetSubscriptionStatus from './types/me/subsco/sync/getSubscriptionStatus'
import * as MeSubscoSyncSubscribeServer from './types/me/subsco/sync/subscribeServer'
import * as ComWhtwndBlogDefs from './types/com/whtwnd/blog/defs'
import * as ComWhtwndBlogEntry from './types/com/whtwnd/blog/entry'

export * as FyiUnravelFrontpagePost from './types/fyi/unravel/frontpage/post'
export * as BlueLinkatBoard from './types/blue/linkat/board'
export * as MeSubscoSyncGetSubscriptionStatus from './types/me/subsco/sync/getSubscriptionStatus'
export * as MeSubscoSyncSubscribeServer from './types/me/subsco/sync/subscribeServer'
export * as ComWhtwndBlogDefs from './types/com/whtwnd/blog/defs'
export * as ComWhtwndBlogEntry from './types/com/whtwnd/blog/entry'

export class AtpBaseClient extends XrpcClient {
  fyi: FyiNS
  blue: BlueNS
  me: MeNS
  com: ComNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.fyi = new FyiNS(this)
    this.blue = new BlueNS(this)
    this.me = new MeNS(this)
    this.com = new ComNS(this)
  }

  /** @deprecated use `this` instead */
  get xrpc(): XrpcClient {
    return this
  }
}

export class FyiNS {
  _client: XrpcClient
  unravel: FyiUnravelNS

  constructor(client: XrpcClient) {
    this._client = client
    this.unravel = new FyiUnravelNS(client)
  }
}

export class FyiUnravelNS {
  _client: XrpcClient
  frontpage: FyiUnravelFrontpageNS

  constructor(client: XrpcClient) {
    this._client = client
    this.frontpage = new FyiUnravelFrontpageNS(client)
  }
}

export class FyiUnravelFrontpageNS {
  _client: XrpcClient
  post: PostRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.post = new PostRecord(client)
  }
}

export class PostRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: FyiUnravelFrontpagePost.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'fyi.unravel.frontpage.post',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: FyiUnravelFrontpagePost.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'fyi.unravel.frontpage.post',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: FyiUnravelFrontpagePost.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'fyi.unravel.frontpage.post'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'fyi.unravel.frontpage.post', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'fyi.unravel.frontpage.post', ...params },
      { headers },
    )
  }
}

export class BlueNS {
  _client: XrpcClient
  linkat: BlueLinkatNS

  constructor(client: XrpcClient) {
    this._client = client
    this.linkat = new BlueLinkatNS(client)
  }
}

export class BlueLinkatNS {
  _client: XrpcClient
  board: BoardRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.board = new BoardRecord(client)
  }
}

export class BoardRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: BlueLinkatBoard.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'blue.linkat.board',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: BlueLinkatBoard.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'blue.linkat.board',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: BlueLinkatBoard.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'blue.linkat.board'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'blue.linkat.board', rkey: 'self', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'blue.linkat.board', ...params },
      { headers },
    )
  }
}

export class MeNS {
  _client: XrpcClient
  subsco: MeSubscoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.subsco = new MeSubscoNS(client)
  }
}

export class MeSubscoNS {
  _client: XrpcClient
  sync: MeSubscoSyncNS

  constructor(client: XrpcClient) {
    this._client = client
    this.sync = new MeSubscoSyncNS(client)
  }
}

export class MeSubscoSyncNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  getSubscriptionStatus(
    params?: MeSubscoSyncGetSubscriptionStatus.QueryParams,
    opts?: MeSubscoSyncGetSubscriptionStatus.CallOptions,
  ): Promise<MeSubscoSyncGetSubscriptionStatus.Response> {
    return this._client.call(
      'me.subsco.sync.getSubscriptionStatus',
      params,
      undefined,
      opts,
    )
  }

  subscribeServer(
    data?: MeSubscoSyncSubscribeServer.InputSchema,
    opts?: MeSubscoSyncSubscribeServer.CallOptions,
  ): Promise<MeSubscoSyncSubscribeServer.Response> {
    return this._client
      .call('me.subsco.sync.subscribeServer', opts?.qp, data, opts)
      .catch((e) => {
        throw MeSubscoSyncSubscribeServer.toKnownErr(e)
      })
  }
}

export class ComNS {
  _client: XrpcClient
  whtwnd: ComWhtwndNS

  constructor(client: XrpcClient) {
    this._client = client
    this.whtwnd = new ComWhtwndNS(client)
  }
}

export class ComWhtwndNS {
  _client: XrpcClient
  blog: ComWhtwndBlogNS

  constructor(client: XrpcClient) {
    this._client = client
    this.blog = new ComWhtwndBlogNS(client)
  }
}

export class ComWhtwndBlogNS {
  _client: XrpcClient
  entry: EntryRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.entry = new EntryRecord(client)
  }
}

export class EntryRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: ComWhtwndBlogEntry.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'com.whtwnd.blog.entry',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: ComWhtwndBlogEntry.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'com.whtwnd.blog.entry',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: ComWhtwndBlogEntry.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'com.whtwnd.blog.entry'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'com.whtwnd.blog.entry', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'com.whtwnd.blog.entry', ...params },
      { headers },
    )
  }
}
