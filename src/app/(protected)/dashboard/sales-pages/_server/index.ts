import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/eden";
import { toast } from "sonner";
import { salesPagesQueryKey, type SalesPageBodyInput } from "./type";

export function useSalesPages() {
    return useQuery({
        queryKey: salesPagesQueryKey,
        queryFn: async () => {
            const { data, error } = await api["sales-pages"].get();
            if (error) throw new Error("Failed to fetch sales pages");
            return data;
        },
    });
}

export function useSalesPage(id: string) {
    return useQuery({
        queryKey: [...salesPagesQueryKey, id],
        queryFn: async () => {
            const { data, error } = await api["sales-pages"]({ id }).get();
            if (error) throw new Error("Failed to fetch sales page");
            return data;
        },
        enabled: !!id,
    });
}

export function useCreateSalesPage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: SalesPageBodyInput) => {
            const { data, error } = await api["sales-pages"].post(body);
            if (error) throw new Error("Failed to create sales page");
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: salesPagesQueryKey });
            toast.success("Sales page created successfully!");
        },
        onError: (err) => {
            toast.error(err.message ?? "Failed to create sales page");
        },
    });
}

export function useUpdateSalesPage(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: SalesPageBodyInput) => {
            const { data, error } = await api["sales-pages"]({ id }).patch(body);
            if (error) throw new Error("Failed to update sales page");
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: salesPagesQueryKey });
            queryClient.invalidateQueries({ queryKey: [...salesPagesQueryKey, id] });
            toast.success("Sales page updated successfully!");
        },
        onError: (err) => {
            toast.error(err.message ?? "Failed to update sales page");
        },
    });
}

export function useRegenerateSalesPage(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (section?: string) => {
            const { data, error } = await api["sales-pages"]({ id }).regenerate.post({
                section,
            });
            if (error) throw new Error("Failed to regenerate");
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [...salesPagesQueryKey, id] });
            toast.success("Content regenerated!");
        },
        onError: (err) => {
            toast.error(err.message ?? "Failed to regenerate");
        },
    });
}

export function useDeleteSalesPage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { data, error } = await api["sales-pages"]({ id }).delete();
            if (error) throw new Error("Failed to delete sales page");
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: salesPagesQueryKey });
            toast.success("Sales page deleted");
        },
        onError: (err) => {
            toast.error(err.message ?? "Failed to delete sales page");
        },
    });
}
