import { useQuery } from '@tanstack/react-query';
import { MoniteClient } from '@/services/monite/MoniteClient';

export function useMoniteClient() {
  const { data: client, isLoading, error } = useQuery({
    queryKey: ['monite-client'],
    queryFn: () => MoniteClient.getInstance(),
  });

  return {
    client,
    isLoading,
    error,
  };
}