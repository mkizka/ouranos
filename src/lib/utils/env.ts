import { isDid } from "@atproto/api";

const asDidUrl = (value: string | undefined) => {
  if (!value) {
    throw new Error("APPVIEW_DID_URL is not set");
  }
  const [did, fragment] = value.split("#");
  if (!isDid(did) || fragment) {
    throw new Error(`APPVIEW_DID_URL is not a valid DID URL: ${value}`);
  }
  return `${did}#${fragment}` as const;
};

export const env = {
  APPVIEW_DID_URL: asDidUrl(process.env.APPVIEW_DID_URL),
};
