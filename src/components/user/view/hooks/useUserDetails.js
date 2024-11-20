import { useQuery } from '@tanstack/react-query';
import { getDetailUser } from '@core/services/api/User';

export const useUserDetails = (userId) => {
  return useQuery({
    queryKey: ['getDetailUser', userId], // Include userId to avoid caching conflicts
    queryFn: () => getDetailUser(userId),
    enabled: !!userId, // Ensures the query doesn't run without a userId
  });
};
