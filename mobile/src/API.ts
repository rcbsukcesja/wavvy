import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { CompanyDTO } from './features/Company/types';
import { EventDTO, EventStatus } from './features/Event/types';
import { NgoDTO } from './features/Ngo/types';

export interface EventParams {
  statusList?: EventStatus[];
  startDate?: string;
  endDate?: string;
  search?: string;
  size?: number;
  sort?: 'asc' | 'desc';
}

export interface NgosParams {
  page?: number;
  size?: number;
  sort?: 'asc' | 'desc';
  search?: string;
}

export interface CompaniesParams {
  page?: number;
  size?: number;
  sort?: 'asc' | 'desc';
  search?: string;
}

interface EventsResponse {
  content: EventDTO[];
}

interface NgosResponse {
  content: NgoDTO[];
}

interface CompaniesResponse {
  content: CompanyDTO[];
}

interface LikeRequest {
  eventId: string;
  clientId: string;
}

export const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const ENDPOINTS = {
  events: `${API_URL}/projects`,
  ngos: `${API_URL}/ngos`,
  companies: `${API_URL}/companies`,
};

const fetcher = <T>(url: string, params?: object) => axios.get<T>(url, { params }).then(res => res.data);

export function useEvents(params: EventParams) {
  return useQuery<EventsResponse>({
    queryKey: 'event',
    queryFn: () => fetcher(ENDPOINTS.events, params),
  });
}

export function useCompanies(params: CompaniesParams) {
  return useQuery<CompaniesResponse>({
    queryKey: 'company',
    queryFn: () => fetcher(ENDPOINTS.companies, params),
  });
}

export function useNgos(params: NgosParams) {
  return useQuery<NgosResponse>({
    queryKey: 'ngo',
    queryFn: () => fetcher(ENDPOINTS.ngos, params),
  });
}

export function useLikeEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: LikeRequest) =>
      axios.patch(`${ENDPOINTS.events}/${params.eventId}/like?clientId=${params.clientId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['event'] }),
  });
}
