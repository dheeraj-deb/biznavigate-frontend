import { useEffect, useState } from "react";

// Module-level cache so list → detail → back navigation doesn't refetch
// within a session. Keyed by a caller-provided string (usually the URL path).
const cache = new Map<string, unknown>();

type State<T> = {
  data: T | null;
  loading: boolean;
  error: boolean;
};

export function usePublicResource<T>(key: string, fetcher: () => Promise<T>): State<T> {
  const [state, setState] = useState<State<T>>(() =>
    cache.has(key)
      ? { data: cache.get(key) as T, loading: false, error: false }
      : { data: null, loading: true, error: false },
  );

  useEffect(() => {
    let alive = true;
    if (cache.has(key)) {
      setState({ data: cache.get(key) as T, loading: false, error: false });
      return;
    }
    setState({ data: null, loading: true, error: false });
    fetcher()
      .then((data) => {
        cache.set(key, data);
        if (alive) setState({ data, loading: false, error: false });
      })
      .catch(() => {
        if (alive) setState({ data: null, loading: false, error: true });
      });
    return () => {
      alive = false;
    };
    // fetcher is intentionally excluded: it's a new closure each render, and
    // the cache key fully identifies the resource being fetched.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
