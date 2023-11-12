import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollProps {
  onFetchMore: () => void;
  canFetchMore: boolean;
  isLoading: boolean;
}

const useInfiniteScroll = ({
  onFetchMore,
  canFetchMore,
  isLoading,
}: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && canFetchMore) {
          onFetchMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, canFetchMore, onFetchMore]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return lastElementRef;
};

export default useInfiniteScroll;
