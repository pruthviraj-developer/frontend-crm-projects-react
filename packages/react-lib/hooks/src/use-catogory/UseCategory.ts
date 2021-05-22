import React from 'react';

interface Props {
  category_id: string;
  sub_category_ids?: string[];
}

export const useCategory = ({ category_id, sub_category_ids }: Props) => {
  return { category_id, sub_category_ids };
};
