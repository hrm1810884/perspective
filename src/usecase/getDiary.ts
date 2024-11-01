import { getGetAIQueryKey, useGetAI } from "@/generated/api";
import { mutateDataUtils, ReceiverId } from "@/models";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useAIMutation = (id: ReceiverId) => {
    const queryClient = useQueryClient();

    const { data, isLoading } = useGetAI(id, { query: { refetchInterval: 10000 } });

    const refetch = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: getGetAIQueryKey(id) });
    }, [id, queryClient]);

    return {
        data: data?.data.result ? mutateDataUtils.convertData(data.data.result) : undefined,
        isLoading,
        refetch,
    };
};
