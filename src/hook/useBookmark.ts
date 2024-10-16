import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useBookmark({
  id, // 북마크 대상의 ID
  queryKey, // 쿼리 키 (예: 'partners-detail', 'contents-detail' 등)
  bookmarkFn, // 북마크 추가 함수
  bookmarkCancelFn, // 북마크 취소 함수
  initialBookmarkState, // 초기 북마크 상태
}: {
  id: any;
  queryKey: string;
  bookmarkFn: (id: any) => Promise<any>;
  bookmarkCancelFn: (id: any) => Promise<any>;
  initialBookmarkState: boolean | null; // 서버에서 받아온 북마크 상태
}) {
  const queryClient = useQueryClient();
  const [like, setLike] = useState(initialBookmarkState || false); // 북마크 상태를 관리

  const mutation = useMutation({
    mutationFn: async (userAction: 'UNLIKE' | 'LIKE') => {
      if (userAction === 'LIKE') {
        await bookmarkFn(id); // 북마크 추가
      } else {
        await bookmarkCancelFn(id); // 북마크 취소
      }
    },
    onMutate: async (userAction) => {
      await queryClient.cancelQueries({
        queryKey: [queryKey, id],
      });

      const prevDetails = queryClient.getQueryData([queryKey, id]);

      queryClient.setQueryData([queryKey, id], (prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          bookmark: userAction === 'LIKE',
        };
      });

      return { prevDetails };
    },
    onError: (_error, _, context) => {
      if (context?.prevDetails) {
        queryClient.setQueryData([queryKey, id], context.prevDetails);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey, id],
      });
    },
  });

  // `initialBookmarkState` 값이 변경될 때 (즉, 서버에서 받아온 `data.bookmark`가 로드될 때) `like` 상태를 업데이트
  useEffect(() => {
    if (initialBookmarkState !== null) {
      setLike(initialBookmarkState);
    }
  }, [initialBookmarkState]);

  const toggleBookmark = () => {
    const action = like ? 'UNLIKE' : 'LIKE';
    mutation.mutate(action);
    setLike((prev) => !prev); // 낙관적으로 상태를 업데이트
  };

  return {
    like,
    toggleBookmark,
  };
}