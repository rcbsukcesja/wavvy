export type MenuButtonLabel =
  | 'Wyszukaj punkty'
  | 'Lista zadań'
  | 'Komunikaty'
  | 'Podgląd trasy'
  | 'Rozlicz'
  | 'Pojazd'
  | 'Serwis'
  | 'Dokumenty oddawcze'
  | 'Wyloguj';

export type TabButtonLabel = 'Trasy' | 'Serwis' | 'Skanuj' | 'Wstecz';

export type TabActiveableLabel = Exclude<TabButtonLabel, 'Wstecz'>;

export type ButtonVariant = 'primary' | 'secondary' | 'menu' | 'tab';

export type BaseButtonVariant = Exclude<ButtonVariant, 'tab'>;
