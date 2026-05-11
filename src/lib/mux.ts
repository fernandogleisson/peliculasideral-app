/**
 * Mux video client. STUB — real impl arrives in Phase F4 (video curso).
 *
 * Wraps Mux Video API for upload + playback IDs + signed playback.
 */

export interface CreateUploadParams {
  corsOrigin?: string;
  newAssetSettings?: {
    playbackPolicy?: Array<'public' | 'signed'>;
    mp4Support?: 'standard' | 'capped-1080p' | 'audio-only';
  };
}

export interface CreateUploadResult {
  uploadId: string;
  uploadUrl: string;
  assetId?: string;
}

export async function createUpload(_params: CreateUploadParams = {}): Promise<CreateUploadResult> {
  throw new Error('TODO Phase F4: Mux createUpload not yet implemented');
}

export async function getPlaybackId(_assetId: string): Promise<string> {
  throw new Error('TODO Phase F4: Mux getPlaybackId not yet implemented');
}
