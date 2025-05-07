import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "./api";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";

export const useGetUser = () => {
  const queryClient = useQueryClient();
  const { getItem } = useLocalStorage("tokens");

  const {
    data: user,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 3,
  });

  useEffect(() => {
    if (!getItem()) {
      queryClient.cancelQueries({ queryKey: ["user"] });
    }
  }, [getItem, queryClient]);

  return { user, isError, isPending };
};

export const useGetMe = () => {
  const {
    data: user,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 3,
  });

  return { user, isError, isPending };
};
