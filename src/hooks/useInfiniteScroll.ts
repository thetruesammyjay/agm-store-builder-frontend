import { useEffect, useRef, useCallback, useState } from 'react';

interface UseInfiniteScrollOptions {
  /**
   * Function to call when reaching the threshold
   */
  onLoadMore: () => void;

  /**
   * Whether there are more items to load
   */
  hasMore: boolean;

  /**
   * Whether currently loading
   */
  isLoading: boolean;

  /**
   * Distance from bottom to trigger load (in pixels)
   * @default 300
   */
  threshold?: number;

  /**
   * Root element for intersection observer
   * @default null (viewport)
   */
  root?: Element | null;

  /**
   * Enable/disable the hook
   * @default true
   */
  enabled?: boolean;
}

/**
 * Infinite scroll hook using Intersection Observer
 * 
 * @example
 * ```tsx
 * function ProductList() {
 *   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteProducts();
 *   
 *   const { observerTarget } = useInfiniteScroll({
 *     onLoadMore: fetchNextPage,
 *     hasMore: hasNextPage,
 *     isLoading: isFetchingNextPage,
 *   });
 * 
 *   return (
 *     <div>
 *       {data?.pages.map(page => 
 *         page.products.map(product => <ProductCard key={product.id} {...product} />)
 *       )}
 *       <div ref={observerTarget} />
 *       {isFetchingNextPage && <Spinner />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 300,
  root = null,
  enabled = true,
}: UseInfiniteScrollOptions) {
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      
      if (target.isIntersecting && hasMore && !isLoading && enabled) {
        onLoadMore();
      }
    },
    [onLoadMore, hasMore, isLoading, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root,
      rootMargin: `${threshold}px`,
      threshold: 0,
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleObserver, threshold, root, enabled]);

  return {
    /**
     * Ref to attach to the sentinel element at the bottom of your list
     */
    observerTarget,
  };
}

/**
 * Simpler scroll-based infinite scroll (alternative to Intersection Observer)
 * Useful for older browsers or specific use cases
 */
export function useScrollInfinite({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 300,
  enabled = true,
}: Omit<UseInfiniteScrollOptions, 'root'>) {
  const handleScroll = useCallback(() => {
    if (!enabled || !hasMore || isLoading) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      onLoadMore();
    }
  }, [onLoadMore, hasMore, isLoading, threshold, enabled]);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, enabled]);
}

/**
 * Hook for detecting when user reaches bottom of a scrollable container
 */
export function useScrollToBottom(callback: () => void, threshold = 100) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isBottom = scrollHeight - scrollTop - clientHeight < threshold;

    if (isBottom) {
      callback();
    }
  }, [callback, threshold]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return containerRef;
}

/**
 * Detect scroll direction
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollDirection;
}