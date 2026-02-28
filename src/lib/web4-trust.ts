/**
 * Web4 Trust Engine — WASM Bridge
 *
 * Loads the real web4-trust-core WASM module and provides
 * a clean API for browser-side trust calculations.
 *
 * The WASM binary (66KB) contains the same trust primitives
 * used in the web4 protocol — T3/V3 tensors, entity trust,
 * witnessing, and decay.
 */

let wasmModule: typeof import('./wasm/web4_trust_core') | null = null;
let initPromise: Promise<typeof import('./wasm/web4_trust_core')> | null = null;

/**
 * Initialize the WASM trust engine.
 * Safe to call multiple times — will only init once.
 */
export async function initTrustEngine() {
  if (wasmModule) return wasmModule;

  if (!initPromise) {
    initPromise = (async () => {
      const mod = await import('./wasm/web4_trust_core');
      // Try webpack-resolved path first, fallback to public/ URL
      try {
        await mod.default();
      } catch {
        await mod.default('/wasm/web4_trust_core_bg.wasm');
      }
      wasmModule = mod;
      return mod;
    })();
  }

  return initPromise;
}

export type { EntityTrust, T3Tensor, V3Tensor, WasmTrustStore } from './wasm/web4_trust_core';
