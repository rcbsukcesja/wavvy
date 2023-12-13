import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventDTO } from 'src/features/Event/types';
import { currentMonth, currentYear } from 'src/theme/utils/date';
import { StateCreator, create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface LoginSlice {
  isLogged: boolean;
  userId: string;
  appTerms: boolean;
  userEmail: string;
  handleLogin: () => void;
  handleLogout: () => void;
  setUserId: (uid: string) => void;
  setAppTerms: (state: boolean) => void;
  setUserEmail: (email: string) => void;
}

interface EventListSlice {
  events: EventDTO[];
  updateEvents: (newEvents: EventDTO[]) => void;
}

interface EventFilterSlice {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedCategory: string;
  setSelectedCategory: (name: string) => void;
  searchedEventPhrase: string;
  setSearchedEventPhrase: (phrase: string) => void;
  searchedNgoPhrase: string;
  setSearchedNgoPhrase: (phrase: string) => void;
  searchedCompanyPhrase: string;
  setSearchedCompanyPhrase: (phrase: string) => void;
}

interface AppUISlice {
  modal: {
    modalVisible: boolean;
    modalMessage: string;
    modalType: 'default' | 'voluntaary' | 'donate' | 'resetPassword' | 'deleteAccount';
    modalParam: string;
  };
  pickerVisible: boolean;
  pickerType: 'idle' | 'month' | 'year' | 'category';
  setModalState: (state: {
    visible: boolean;
    message: string;
    type: 'default' | 'voluntaary' | 'donate' | 'resetPassword' | 'deleteAccount';
    param: string;
  }) => void;
  setPickerState: (state: { visible: boolean; type: 'idle' | 'month' | 'year' | 'category' }) => void;
}

type GlobalState = LoginSlice & EventListSlice & EventFilterSlice & AppUISlice;

const createLoginSlice: StateCreator<GlobalState, [], [], LoginSlice> = set => ({
  isLogged: false,
  userId: '',
  appTerms: false,
  userEmail: '',
  handleLogin: () => set(() => ({ isLogged: true })),
  handleLogout: () => set(() => ({ isLogged: false })),
  setUserId: (uid: string) => set(() => ({ userId: uid })),
  setAppTerms: (state: boolean) => set(() => ({ appTerms: state })),
  setUserEmail: (email: string) => set({ userEmail: email }),
});

const createEventListSlice: StateCreator<GlobalState, [], [], EventListSlice> = set => ({
  events: [],
  updateEvents: newEvents => set({ events: [...newEvents] }),
});

const createEventFilterSlice: StateCreator<GlobalState, [], [], EventFilterSlice> = set => ({
  selectedMonth: currentMonth,
  setSelectedMonth: (month: number) => set(() => ({ selectedMonth: month })),
  selectedYear: currentYear,
  setSelectedYear: (year: number) => set(() => ({ selectedYear: year })),
  selectedCategory: 'all',
  setSelectedCategory: (name: string) => set(() => ({ selectedCategory: name })),
  searchedEventPhrase: '',
  searchedNgoPhrase: '',
  searchedCompanyPhrase: '',
  setSearchedEventPhrase: (phrase: string) => set({ searchedEventPhrase: phrase }),
  setSearchedNgoPhrase: (phrase: string) => set({ searchedNgoPhrase: phrase }),
  setSearchedCompanyPhrase: (phrase: string) => set({ searchedCompanyPhrase: phrase }),
});

const createAppUISlice: StateCreator<GlobalState, [], [], AppUISlice> = set => ({
  modal: { modalMessage: '', modalParam: '', modalType: 'default', modalVisible: false },
  pickerVisible: false,
  pickerType: 'idle',

  setModalState: state =>
    set(() => ({
      modal: {
        modalMessage: state.message,
        modalParam: state.param,
        modalType: state.type,
        modalVisible: state.visible,
      },
    })),
  setPickerState: state => set(() => ({ pickerVisible: state.visible, pickerType: state.type })),
});

export const useCombinedStore = create<GlobalState>()(
  persist(
    (...params) => ({
      ...createLoginSlice(...params),
      ...createEventListSlice(...params),
      ...createEventFilterSlice(...params),
      ...createAppUISlice(...params),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        userId: state.userId,
        consent: state.appTerms,
        isLogged: state.isLogged,
      }),
    },
  ),
);
