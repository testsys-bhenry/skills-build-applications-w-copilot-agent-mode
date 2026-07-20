export const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() || '';

function inferCodespaceNameFromHost() {
  if (typeof window === 'undefined') {
    return '';
  }

  const { hostname } = window.location;
  if (hostname.endsWith('-5173.app.github.dev')) {
    return hostname.replace('-5173.app.github.dev', '');
  }

  return '';
}

const codespaceName = configuredCodespaceName || inferCodespaceNameFromHost();

export const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const isUsingFallbackOrigin = !codespaceName;

export const apiBaseUrl = `${apiOrigin}/api`;

export function normalizeApiItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload.data && Array.isArray(payload.data.items)) {
    return payload.data.items;
  }

  return [];
}

export async function fetchCollection(path) {
  const response = await fetch(`${apiBaseUrl}/${path}/`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return normalizeApiItems(payload);
}

export async function fetchEndpoint(endpointPath) {
  const response = await fetch(`${apiOrigin}${endpointPath}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return normalizeApiItems(payload);
}
