/**
 * Fetches the given URL and returns the JSON response.
 *
 * @param  input The URL or RequestInput to fetch .
 * @return The JSON response after the completion of an asynchronous operation.
 */
async function fetcherAPI<T extends Object>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
): Promise<T> {
  const res: Response = await fetch(input, init);
  return await res.json();
}

export { fetcherAPI as fetcher };
