import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface TagItem {
  name: string;
  count: number;
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
}

interface TagApiResponse {
  items: TagItem[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

export interface TagsQueryParams {
  page?: string;
  pageSize?: string;
  order?: string;
  sort?: string;
  site?: string;
}

const BASE_URL = "https://api.stackexchange.com/2.2/";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTags = async (params?: TagsQueryParams) => {
  const {
    pageSize = "10",
    sort = "name",
    order = "desc",
    site = "stackoverflow",
    page = "1",
  } = params || {};

  const response = await axiosInstance.get(`tags`, {
    params: {
      pageSize,
      sort,
      order,
      site,
      page,
    },
  });

  return response.data as TagApiResponse;
};

export const queryTags = (params?: TagsQueryParams) => {
  return useQuery({
    queryKey: ["paginatedTags", params],
    queryFn: () => getTags(params),
  });
};
