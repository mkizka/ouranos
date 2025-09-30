/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import { CID } from 'multiformats/cid'

export interface QueryParams {}

export type InputSchema = undefined
export type OutputSchema =
  | Subscribed
  | NotSubscribed
  | { $type: string; [k: string]: unknown }

export interface CallOptions {
  signal?: AbortSignal
  headers?: HeadersMap
}

export interface Response {
  success: boolean
  headers: HeadersMap
  data: OutputSchema
}

export function toKnownErr(e: any) {
  return e
}

export interface Subscribed {
  /** The user is a subscriber */
  isSubscriber: true
  /** Current backfill status */
  backfillStatus: 'dirty' | 'in-process' | 'synchronized'
  [k: string]: unknown
}

export function isSubscribed(v: unknown): v is Subscribed {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'me.subsco.sync.getSubscriptionStatus#subscribed'
  )
}

export function validateSubscribed(v: unknown): ValidationResult {
  return lexicons.validate('me.subsco.sync.getSubscriptionStatus#subscribed', v)
}

export interface NotSubscribed {
  /** The user is not a subscriber */
  isSubscriber: boolean
  [k: string]: unknown
}

export function isNotSubscribed(v: unknown): v is NotSubscribed {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'me.subsco.sync.getSubscriptionStatus#notSubscribed'
  )
}

export function validateNotSubscribed(v: unknown): ValidationResult {
  return lexicons.validate(
    'me.subsco.sync.getSubscriptionStatus#notSubscribed',
    v,
  )
}
