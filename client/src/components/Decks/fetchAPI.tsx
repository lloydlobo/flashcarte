/**
 * fetchApi is a wrapper for the fetch API.
 * Fetches the data from the API and returns the response.
 * @param path The URL endpoint to fetch.
 * @param options The options to pass to the fetch API.
 */

export async function fetchAPI<ResultType>(
  path: RequestInit & string,
  options?: Partial<RequestInit>,
): Promise<ResultType | void> {
  try {
    const response: Response = await fetch(`http://localhost:8080/api${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    return await response.json();
  } catch (err) {
    console.error(`Error fetching ${path}`, err);
  }
}
