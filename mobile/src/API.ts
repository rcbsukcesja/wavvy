import axios from 'axios';

import { Company, Ngo } from './features/BusinessCards/types';
import { IEvent } from './features/Event/types';

export const API_URL = 'http://localhost:8081';

export const ENDPOINTS = {
  events: `${API_URL}/events`,
  ngos: `${API_URL}/ngos`,
  companies: `${API_URL}/companies`,
};

export const getEventsQuery = axios<IEvent[]>({
  method: 'get',
  url: ENDPOINTS.events,
});

export const getNgosQuery = axios<Ngo[]>({
  method: 'get',
  url: ENDPOINTS.ngos,
});

export const getCompaniesQuery = axios<Company[]>({
  method: 'get',
  url: ENDPOINTS.companies,
});
