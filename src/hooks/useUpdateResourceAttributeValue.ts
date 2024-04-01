import { ResourceAttributeValue } from "../entity/ResourceAttributeValue.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ResourceAttributeValueService from "../service/resourceAttributeValueService.ts";

const updateResourceAttributeValue = async (value: ResourceAttributeValue) => {
  const response = await ResourceAttributeValueService.update(value);
  return response.data;
};

export const useUpdateResourceAttributeValue = () => {
  const queryClient = useQueryClient();

  return useMutation(updateResourceAttributeValue, {
    onMutate: async (updatedValue: ResourceAttributeValue) => {
      await queryClient.cancelQueries(["resource-attribute-values"]);
      const previousValues = queryClient.getQueryData<ResourceAttributeValue[]>(
        ["resource-attribute-values"],
      );

      queryClient.setQueryData<ResourceAttributeValue[]>(
        ["resource-attribute-values"],
        (oldValues) => {
          return oldValues?.map((value) => {
            if (value.id === updatedValue.id) {
              return { ...value, managed: updatedValue.managed };
            } else {
              return value;
            }
          });
        },
      );
      return { previousValues };
    },
    onError: (error: unknown, _updatedValue, context) => {
      if (error instanceof Error) {
        console.error("Mutation error:", error.message);
      } else {
        console.error("Mutation failed for an unknown reason");
      }
      queryClient.setQueryData<ResourceAttributeValue[]>(
        ["resource-attribute-values"],
        (oldValues) => {
          if (context?.previousValues) {
            return context.previousValues;
          }
          return oldValues;
        },
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });
};
