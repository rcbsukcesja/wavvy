import { LegalStatus } from 'src/features/BusinessCards/types';
import { StateCreator, create } from 'zustand';

interface LoginSlice {
  isLogged: boolean;
  handleLogin: () => void;
}

interface EventFilterSlice {
  selectedMonth: string;
  setSelectedMonth: (name: string) => void;
  selectedCategory: string;
  setSelectedCategory: (name: string) => void;
}

interface VolunteeringFormSlice {
  isVisible: boolean;
  showForm: () => void;
  hideForm: () => void;
}

interface BusinessCardSlice {
  visibleBusinessCardType: 'ngo' | 'company';
  selectedBusinessArea: string;
  selectedLegalStatus: LegalStatus | 'all';
  setVisibleBusinessCardType: (value: 'ngo' | 'company') => void;
  setSelectedBusinessArea: (value: string) => void;
  setSelectedLegalStatus: (value: LegalStatus | 'all') => void;
}

type GlobalState = LoginSlice & EventFilterSlice & VolunteeringFormSlice & BusinessCardSlice;

const createLoginSlice: StateCreator<GlobalState, [], [], LoginSlice> = set => ({
  isLogged: false,
  handleLogin: () => set(() => ({ isLogged: true })),
});

const createEventFilterSlice: StateCreator<GlobalState, [], [], EventFilterSlice> = set => ({
  selectedMonth: new Date().toLocaleString('default', { month: 'long' }),
  setSelectedMonth: (name: string) => set(() => ({ selectedMonth: name })),
  selectedCategory: 'all',
  setSelectedCategory: (name: string) => set(() => ({ selectedCategory: name })),
});

const createVolunteeringFormSlice: StateCreator<GlobalState, [], [], VolunteeringFormSlice> = set => ({
  isVisible: false,
  showForm: () => set(() => ({ isVisible: true })),
  hideForm: () => set(() => ({ isVisible: false })),
});

const createBusinessCardSlice: StateCreator<GlobalState, [], [], BusinessCardSlice> = set => ({
  visibleBusinessCardType: 'ngo',
  selectedBusinessArea: 'all',
  selectedLegalStatus: 'all',
  setVisibleBusinessCardType: value => set(() => ({ visibleBusinessCardType: value })),
  setSelectedBusinessArea: value => set(() => ({ selectedBusinessArea: value })),
  setSelectedLegalStatus: value => set(() => ({ selectedLegalStatus: value })),
});

export const useCombinedStore = create<GlobalState>()((...params) => ({
  ...createLoginSlice(...params),
  ...createEventFilterSlice(...params),
  ...createVolunteeringFormSlice(...params),
  ...createBusinessCardSlice(...params),
}));
