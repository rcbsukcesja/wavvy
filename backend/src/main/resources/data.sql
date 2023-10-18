INSERT INTO wavvy.wavvy.app_users(id, username, first_Name, last_Name, email, user_type, deleted)
VALUES ('ccccf3b0-0d10-11ee-be56-0242ac120002', 'zbyszek', 'Zbigniew', 'Brzęczyszczykiewicz', 'zbyszek@gmail.com',
        'CITY_HALL', false),
       ('2dc6b240-0d12-11ee-be56-0242a20002c1', 'romek', 'Roman', 'Rybak', 'romek@gmail.com', 'NGO', false),
       ('353feec4-0d12-11ee-be56-0242ac120002', 'eustachy', 'Eustachy', 'Bąbel', 'babel@gmail.com', 'NGO', false),
       ('03c79bef-4282-4326-be74-8acb180d7f03', 'andrew', 'Andrzej', 'Przedsiębiorczy', 'andrew@gmail.com', 'NGO',
        false),
       ('3ed0cf62-0d12-11ee-be56-0242ac120002', 'jesica', 'Jesica', 'Bąbelek', 'jesica@gmail.com', 'BUSINESS', false),
       ('4f1b9b6c-0d12-11ee-be56-0242ac120002', 'zenon', 'Zenon', 'Bździoch', 'zenon@gmail.com', 'BUSINESS', false),
       ('528f7db6-d46f-465b-a93a-6d67f9ab85c9', 'wiechu', 'Wiesław', 'Dąbrowski', 'wieslaw@gmail.com', 'BUSINESS',
        false);

INSERT INTO wavvy.wavvy.business_areas(id, name)
VALUES ('13857a2c-0d14-11ee-be56-0242ac120002', 'Sport i zdrowie'),
       ('ac0f9444-0d14-11ee-be56-0242ac120002', 'Kultura i sztuka'),
       ('bd47cb32-0d14-11ee-be56-0242ac120002', 'Edukacja i rozwój młodzieży'),
       ('c8db0982-0d14-11ee-be56-0242ac120002', 'Promocja i ochrona praw zwierząt'),
       ('d12be6e2-0d14-11ee-be56-0242ac120002', 'Pomoc humanitarna i rozwój międzynarodowy'),
       ('6f71128b-d609-48eb-9ffd-82cc64026b08', 'Wsparcie dla osób starszych'),
       ('43ff85e5-1e07-4337-8e8c-9439f203642f', 'Rozwój społeczności lokalnych'),
       ('c3c464c2-6b3f-487f-baf3-198d20ea3dc8', 'Ochrona środowiska'),
       ('df589c2a-1844-4cb1-9a16-77e48d049b70', 'Zdrowie i opieka społeczna'),
       ('d132b605-0f0c-4e5b-8c27-567e16e71551', 'Kształtowanie i rozwijanie świadomości morskiej społeczeństwa'),
       ('bbfe6fcc-24c8-4a9e-8310-3370eef6a97c',
        'Działania na rzecz rozwoju kultury morskiej, sztuki, literatury marynistycznej oraz sportów wodnych'),
       ('aad63583-035a-4e59-bee8-8509cdd48c2c',
        'Propagowanie patriotycznych postaw społeczeństwa, tradycji marynarki wojennej i handlowej, formacji granicznych'),
       ('c7bb84ea-09b7-4c25-95ae-4ac236e0bbd5',
        'Stwarzanie warunków do wszechstronnego, inetelektualnego, społecznego, duchowego, emocjonalnego i fizycznego rozwoju człowieka'),
       ('ae6e0b06-8da1-485f-b31b-88c58cf96ccf',
        'Nieskrępowane kształtowanie osobowości człowieka odpowiedzialnego, przy poszanowaniu jego prawa do wolności i godności, w tym wolności od wszelkich nałogów'),
       ('02e3b87a-2a05-4087-a762-3e239bb1df53', 'Technologia'),
       ('13a11d72-4c97-4ee7-b2ed-5fbf86119edc', 'Medycyna');

INSERT INTO wavvy.wavvy.conversations(id)
VALUES ('54fb43a6-0d19-11ee-be56-0242ac120002');

INSERT INTO wavvy.wavvy.conversation_users(conversation_id, user_id)
VALUES ('54fb43a6-0d19-11ee-be56-0242ac120002', '353feec4-0d12-11ee-be56-0242ac120002'),
       ('54fb43a6-0d19-11ee-be56-0242ac120002', '3ed0cf62-0d12-11ee-be56-0242ac120002');

INSERT INTO wavvy.wavvy.messages(id, text, created_at, from_user_id, to_user_id, conversation_id)
VALUES ('6601b652-0d15-11ee-be56-0242ac120002', 'text1', '2023-06-10T16:00:00.000000000Z',
        '353feec4-0d12-11ee-be56-0242ac120002', '3ed0cf62-0d12-11ee-be56-0242ac120002',
        '54fb43a6-0d19-11ee-be56-0242ac120002'),
       ('71de5b92-0d15-11ee-be56-0242ac120002', 'text2', '2023-06-10T16:01:00.000000000Z',
        '3ed0cf62-0d12-11ee-be56-0242ac120002', '353feec4-0d12-11ee-be56-0242ac120002',
        '54fb43a6-0d19-11ee-be56-0242ac120002'),
       ('7cd1b620-0d15-11ee-be56-0242ac120002', 'text3', '2023-06-10T16:02:00.000000000Z',
        '353feec4-0d12-11ee-be56-0242ac120002', '3ed0cf62-0d12-11ee-be56-0242ac120002',
        '54fb43a6-0d19-11ee-be56-0242ac120002'),
       ('88119a32-0d15-11ee-be56-0242ac120002', 'text4', '2023-06-10T16:03:00.000000000Z',
        '3ed0cf62-0d12-11ee-be56-0242ac120002', '353feec4-0d12-11ee-be56-0242ac120002',
        '54fb43a6-0d19-11ee-be56-0242ac120002'),
       ('90b1d38c-0d15-11ee-be56-0242ac120002', 'text5', '2023-06-10T16:04:00.000000000Z',
        '353feec4-0d12-11ee-be56-0242ac120002', '3ed0cf62-0d12-11ee-be56-0242ac120002',
        '54fb43a6-0d19-11ee-be56-0242ac120002');

INSERT INTO wavvy.wavvy.offers(id, name, description, budget, funding_level, target_audience, link, start_date,
                               end_date, scope)
VALUES ('ff435fd6-0d2a-11ee-be56-0242ac120002', 'Grant na Rozwój Kultury Lokalnej',
        'Ten grant jest przeznaczony dla artystów, muzeów i innych instytucji kultury w Kołobrzegu, które pracują nad promowaniem i zachowaniem lokalnej kultury i dziedzictwa.',
        '100000.00', '70', 'Artyści, muzea, instytucje kultury',
        'https://kolobrzeg-grants.com/granty-na-rozwoj-kultury-lokalnej', '2023-10-01', '2024-09-30', 'PUBLIC'),
       ('7af33516-0d2b-11ee-be56-0242ac120002', 'Grant na Aktywność Społeczną',
        'Grant jest przeznaczony dla lokalnych organizacji non-profit, które promują aktywność społeczną i zaangażowanie w mieście i okolicach miasta Kołobrzeg.',
        '50000.00', '80', 'Lokalne organizacje non-profit',
        'https://kolobrzeg-grants.com/granty-na-aktywnosc-spoleczna', '2023-10-12', '2023-10-15', 'PUBLIC'),
       ('89ca650a-0d2b-11ee-be56-0242ac120002', 'Grant na Ochronę Środowiska',
        'Ten grant jest przeznaczony dla organizacji non-profit i inicjatyw społecznych w mieście Kołobrzeg, które koncentrują się na ochronie środowiska i promowaniu zrównoważonego rozwoju.',
        '75000.00', '85', 'Organizacje ekologiczne i inicjatywy społeczne',
        'https://kolobrzeg-grants.com/granty-na-ochrone-srodowiska', '2023-08-02', '2024-07-31', 'PUBLIC');

INSERT INTO wavvy.wavvy.organizations_ngo(id, name, owner_id, address, phone, email, website, logo_path, creation_time,
                                          description, krs, nip, regon, legal_status)
VALUES ('a9656db2-0d2e-11ee-be56-0242ac120002', 'Liga Morska i Rzeczna', '2dc6b240-0d12-11ee-be56-0242a20002c1',
        'Chodkiewicza 3B/1', '693996135',
        'kontakt@lmir.kolobrzeg.pl', 'https://www.facebook.com/lmir.gdynia/?locale=pl_PL', null, '2023-06-20T00:00:00Z',
        'Celem ligi jest: 1/kształtowanie i stałe rozwijanie świadomości morskiej społeczeństwa Polskiego jako jednej z podstaw bytu narodowego, 2/kształtowania w społeczeństwie, ze szczególnym uwzględnieniem młodzieży, zrozumienia roli i znaczenia szeroko rozumianej gospodarki wodnej, żeglugi morskiej i śródlądowej oraz ochrony środowiska.',
        '000753580', '234858992',
        '930642371', 'ASSOCIATION'),
       ('b544b8e0-0d2e-11ee-be56-0242ac120002', 'ZHP Bałtycki Hufiec Morski w Kołobrzegu',
        '353feec4-0d12-11ee-be56-0242ac120002', 'Komenda Hufca ZHP Kołobrzeg ul. Słowińców 1', '943522114',
        'olga.korowadzka@zhp.net.pl', 'https://www.facebook.com/zhpkolobrzeg/?locale=pl_PL', null,
        '2020-06-10T12:24:36Z',
        '1) stwarzanie warunków do wszechstronnego, inetelektualnego, społecznego, duchowego, emocjonalnego i fizycznego rozwoju człowieka; 2) nieskrępowane kształtowanie osobowości człowieka odpowiedzialnego, przy poszanowaniu jego prawa do wolności i godności, w tym wolności od wszelkich nałogów; 3) upowszechnianie i umacnianie w społeczeństwie przywiązania do wartości: wolności, prawdy, sprawiedliwości, demokracji, samorządności, równouprawnienia, tolerancji i przyjaźni; 4) stwarzanie warunków do nawiązywania i utrwalania silnych więzi międzyludzkich ponad podziałami rasowymi, narodowościowymi i wyznaniowymi.',
        '000757520', '234858993',
        '192076468', 'ASSOCIATION'),
       ('c06f4f3c-0d2e-11ee-be56-0242ac120002', 'Kołobrzeski Międzyszkolny Klub Lekkoatletyczny "Sztorm"',
        '03c79bef-4282-4326-be74-8acb180d7f03', 'Bogusława X/22', '792367411',
        'osemkakolobrzeg@wp.pl', 'https://powiat.kolobrzeg.pl/opis-289-uczniowski_klub_sportowy_osemka.html', null,
        '2021-06-10T12:24:36Z',
        'Planowanie i organizowanie pozalekcyjnego życia sportowego uczniów w oparciu o możliwości obiektowe i sprzętowe szkoły oraz pomoc organizacyjną i materialną rodziców i sympatyków Klubu, angażowanie wszystkich uczniów do różnorodnych form aktywności ruchowej, gier i zabaw dostosowanych do wieku, stopnia sprawności i zainteresowań sportowych, uczestniczenie w imprezach sportowych organizowanych na terenie działania samorządu terytorialnego i poza nim.',
        '000757590', '234858996',
        '612958850', 'ASSOCIATION');

INSERT INTO wavvy.wavvy.companies(id, name, owner_id, address, phone, email, website, creation_time, description, krs,
                                  nip, regon)
VALUES ('a2daa44a-0d2d-11ee-be56-0242ac120002', 'Technologiczny Startup Kołobrzeg',
        '3ed0cf62-0d12-11ee-be56-0242ac120002', 'ul. Morska 1, 78-100 Kołobrzeg', '508158776',
        'kontakt@tsk.pl', 'https://www.tsk.pl', '2023-06-20T00:00:00Z',
        'Jesteśmy innowacyjnym startupem technologicznym z Kołobrzegu, specjalizującym się w tworzeniu zaawansowanych rozwiązań dla sektora medycznego. Nasze produkty pomagają lekarzom i pacjentom w zarządzaniu informacjami o stanie zdrowia, a także umożliwiają zdalną komunikację i konsultacje. Wierzymy w moc technologii w przekształcaniu opieki zdrowotnej i dążymy do bycia na czele tej transformacji.',
        '000757530', '234858990',
        '378955803'),
       ('9bab7cfc-0d2e-11ee-be56-0242ac120002', 'Restauracja Przystań', '4f1b9b6c-0d12-11ee-be56-0242ac120002',
        'ul. Portowa 2, 78-100 Kołobrzeg', '508158775',
        'kontakt@przystan.kolobrzeg.pl', 'https://www.przystan.kolobrzeg.pl', '2016-06-10T12:24:36Z',
        'Nasza restauracja oferuje najlepsze dania kuchni bałtyckiej, skupiając się na świeżych, lokalnych składnikach i autentycznych przepisach. Położona w sercu Kołobrzegu, z widokiem na morze, Restauracja Przystań jest idealnym miejscem na rodzinny obiad, romantyczną kolację czy spotkanie z przyjaciółmi. Pragniemy, by każdy posiłek u nas był nie tylko satysfakcjonującym doświadczeniem kulinarycznym, ale także niezapomnianym przeżyciem.',
        '000757550', '234858991',
        '394262080'),
       ('4b0e9873-47f7-499a-8190-5aff4ac16dde', 'Kołobrzeska Galeria Sztuki', '528f7db6-d46f-465b-a93a-6d67f9ab85c9',
        'ul. Sztuki 3, 78-100 Kołobrzeg', '123123123',
        'kontakt@galeria.kolobrzeg.pl', 'https://www.galeria.kolobrzeg.pl', '2016-06-10T12:24:36Z',
        'Promujemy lokalnych artystów i organizujemy wystawy sztuki współczesnej, które angażują społeczność Kołobrzegu i przyciągają zwiedzających z całego kraju. Nasza misja to rozwijanie kultury i sztuki w regionie, tworzenie przestrzeni do dyskusji i refleksji, a także edukowanie publiczności na temat wartości i znaczenia sztuki. Wierzymy, że sztuka ma moc inspirowania i łączenia ludzi, a nasza galeria jest miejscem, gdzie te spotkania mogą się zdarzyć.',
        '000757221', '234858111',
        '394262090');

INSERT INTO wavvy.wavvy.organization_business_areas(organization_id, business_area_id)
VALUES ('a9656db2-0d2e-11ee-be56-0242ac120002', 'd132b605-0f0c-4e5b-8c27-567e16e71551'),
       ('a9656db2-0d2e-11ee-be56-0242ac120002', 'bbfe6fcc-24c8-4a9e-8310-3370eef6a97c'),
       ('a9656db2-0d2e-11ee-be56-0242ac120002', 'aad63583-035a-4e59-bee8-8509cdd48c2c'),
       ('b544b8e0-0d2e-11ee-be56-0242ac120002', 'c7bb84ea-09b7-4c25-95ae-4ac236e0bbd5'),
       ('b544b8e0-0d2e-11ee-be56-0242ac120002', 'ae6e0b06-8da1-485f-b31b-88c58cf96ccf'),
       ('c06f4f3c-0d2e-11ee-be56-0242ac120002', '13857a2c-0d14-11ee-be56-0242ac120002'),
       ('c06f4f3c-0d2e-11ee-be56-0242ac120002', 'bd47cb32-0d14-11ee-be56-0242ac120002'),
       ('a2daa44a-0d2d-11ee-be56-0242ac120002', '02e3b87a-2a05-4087-a762-3e239bb1df53'),
       ('a2daa44a-0d2d-11ee-be56-0242ac120002', '13a11d72-4c97-4ee7-b2ed-5fbf86119edc'),
       ('9bab7cfc-0d2e-11ee-be56-0242ac120002', '43ff85e5-1e07-4337-8e8c-9439f203642f'),
       ('4b0e9873-47f7-499a-8190-5aff4ac16dde', 'ac0f9444-0d14-11ee-be56-0242ac120002'),
       ('4b0e9873-47f7-499a-8190-5aff4ac16dde', '43ff85e5-1e07-4337-8e8c-9439f203642f');

INSERT INTO wavvy.wavvy.projects(id, name, description, address, image_link, link, start_Time, end_Time, budget,
                                 cooperation_Message, status, possible_Volunteer, organizer_id)
VALUES ('9457f49a-15de-4a67-8870-6c7c5dd4746e', 'Zbiórka żywności',
        'Zbiórka żywności dla osób potrzebujących: Dołącz do nas w akcji gromadzenia żywności i pomóż dostarczyć posiłki potrzebującym w naszej społeczności.',
        'brak',
        'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'wwww.onet.pl',
        '2023-06-10T16:00:00+00:00', '2023-06-10T19:00:00+00:00', '2500.00',
        'siemanko szukamy psychologa do współpracy!!!',
        'PLANNED', 'true', 'b544b8e0-0d2e-11ee-be56-0242ac120002'),
       ('6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'Edukacyjny program o znaczeniu gospodarki wodnej',
        'Edukacyjny program mający na celu kształtowanie zrozumienia roli i znaczenia gospodarki wodnej, żeglugi morskiej i śródlądowej.',
        'brak',
        'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        'https://www.facebook.com/lmir.gdynia/?locale=pl_PL',
        '2023-01-01T23:00:00+00:00', '2024-02-29T23:59:59+00:00', '50000.00', '', 'OBTAINING_FINANCING', 'true',
        'a9656db2-0d2e-11ee-be56-0242ac120002'),
       ('44135c4c-6b9a-405e-a18c-6354b5eb06f7', 'Bieg Niepodległości', 'Promocja ruchu', 'Bogusława X/22',
        'https://images.unsplash.com/photo-1597892657493-6847b9640bac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
        'https://www.bieg.kolobrzeg.pl/inne-imprezy-biegowe/bieg-niepodleglosci',
        '2022-11-11T10:00:00+00:00', '2022-11-11T13:00:00+00:00', '30000.00',
        'Poszukujemy wolontariuszy do obsługi biegu.',
        'COMPLETED', 'true', 'c06f4f3c-0d2e-11ee-be56-0242ac120002');

INSERT INTO wavvy.wavvy.tags(id, project_id, tag)
VALUES ('4a16e0e4-ca1b-4d82-bdd0-84011b9e9ad5', '9457f49a-15de-4a67-8870-6c7c5dd4746e', 'zbiórka żywności'),
       ('d8b99892-fca7-4e44-8a23-6a1ee82ddcdf', '6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'edukacja'),
       ('3127f35f-1965-4661-80bb-83981f9520da', '6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'młodzież'),
       ('d342e576-8276-4fa1-8a66-60edc0859499', '6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'świadomość morska'),
       ('89751836-dafd-4c29-8296-dbdf56f95dd2', '44135c4c-6b9a-405e-a18c-6354b5eb06f7', 'bieg'),
       ('4f00069a-9385-465c-bb4b-90c065cadd1a', '44135c4c-6b9a-405e-a18c-6354b5eb06f7', 'niepodległość'),
       ('419c1f74-6821-4aa6-a484-c2ba6614f1fa', '44135c4c-6b9a-405e-a18c-6354b5eb06f7', 'promocja ruchu');

INSERT INTO wavvy.wavvy.social_links(id, organization_id, link)
VALUES ('013701d1-6a46-449f-8e18-c78144aaeba9', 'a2daa44a-0d2d-11ee-be56-0242ac120002', 'https://www.facebook.com/tsk'),
       ('a3e9a851-fc2d-4293-b7cd-ee5f71b4b059', 'a2daa44a-0d2d-11ee-be56-0242ac120002', 'https://www.linkedin.com/tsk'),
       ('da2a8e51-3742-4110-b616-738758cb4a23', '9bab7cfc-0d2e-11ee-be56-0242ac120002',
        'https://www.facebook.com/przystan'),
       ('42adf51d-4b2a-44e6-9e23-6d6783208d91', '4b0e9873-47f7-499a-8190-5aff4ac16dde',
        'https://facebook.com/galeria-kolobrzeg'),
       ('26984ddd-413a-4322-9078-23c32c1fb637', 'a9656db2-0d2e-11ee-be56-0242ac120002', 'https://facebook.com/4'),
       ('792aa665-a40d-4e64-b1e7-69ce591d2ed2', 'b544b8e0-0d2e-11ee-be56-0242ac120002', 'https://facebook.com/5'),
       ('85f025c1-1644-4248-b4c8-d08c45e4a6c8', 'c06f4f3c-0d2e-11ee-be56-0242ac120002', 'https://facebook.com/6');

INSERT INTO wavvy.wavvy.resources(id, organization_id, resource)
VALUES ('b04ce852-4ab6-44fa-8887-153c1c838210', 'a2daa44a-0d2d-11ee-be56-0242ac120002', 'Brak danych'),
       ('25777134-17aa-4eb7-8254-a38783f577bb', '9bab7cfc-0d2e-11ee-be56-0242ac120002', 'Sala weselna'),
       ('9d9422c0-26ad-44ff-9b09-b9dffd4fafd4', '4b0e9873-47f7-499a-8190-5aff4ac16dde', 'Brak danych'),
       ('e4ae15bf-0e8c-481d-8261-9fe1dac62030', 'a9656db2-0d2e-11ee-be56-0242ac120002', 'Brak danych'),
       ('4704aa6b-5998-4171-b31e-e92d90de6101', 'b544b8e0-0d2e-11ee-be56-0242ac120002', 'Namiot polowy'),
       ('26c2960d-bef0-4b18-90f9-b4e63c942888', 'b544b8e0-0d2e-11ee-be56-0242ac120002', 'Grill przemysłowy'),
       ('08decab5-0c6b-4f22-82cc-3aeebe8ba904', 'c06f4f3c-0d2e-11ee-be56-0242ac120002', 'Stadion sportowy');

INSERT INTO wavvy.wavvy.project_categories(project_id, business_area_id)
VALUES ('9457f49a-15de-4a67-8870-6c7c5dd4746e', '13857a2c-0d14-11ee-be56-0242ac120002'),
       ('6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'ac0f9444-0d14-11ee-be56-0242ac120002'),
       ('44135c4c-6b9a-405e-a18c-6354b5eb06f7', 'bd47cb32-0d14-11ee-be56-0242ac120002');
