--liquibase formatted sql

--changeset pgorski:20231129-01
INSERT INTO wavvy.organizations(id, organization_type, name, street,
                                      city, zip_code, country, phone, email, website, logo_path,
                                      created_at, updated_at, description, krs, nip, regon, legal_status, bank_account,
                                      confirmed, founded_at, reason, disabled)
VALUES ('a9656db2-0d2e-11ee-be56-0242ac120002', 'NGO', 'Liga Morska i Rzeczna',
        'Chodkiewicza 4/5', 'Kołobrzeg', '78-100', 'Polska', '693996135',
        'kontakt@lmir.kolobrzeg.pl', 'https://www.facebook.com/lmir.gdynia/?locale=pl_PL', null, '2023-06-20T00:00:00',
        '2023-06-20T00:00:00',
        'Celem ligi jest: 1/kształtowanie i stałe rozwijanie świadomości morskiej społeczeństwa Polskiego jako jednej z podstaw bytu narodowego, 2/kształtowania w społeczeństwie, ze szczególnym uwzględnieniem młodzieży, zrozumienia roli i znaczenia szeroko rozumianej gospodarki wodnej, żeglugi morskiej i śródlądowej oraz ochrony środowiska.',
        '000753580', '234858992',
        '930642371', 'ASSOCIATION', '25102031501478016953990306', true, '2000-06-20', 'Lubimy działać', false),
       ('b544b8e0-0d2e-11ee-be56-0242ac120002', 'NGO', 'ZHP Bałtycki Hufiec Morski w Kołobrzegu',
        'Słowińców 7/1', 'Kołobrzeg', '78-100', 'Polska', '943522114',
        'olga.korowadzka@zhp.net.pl', 'https://www.facebook.com/zhpkolobrzeg/?locale=pl_PL', null,
        '2020-06-10T12:24:36', '2020-06-10T12:24:36',
        '1) stwarzanie warunków do wszechstronnego, inetelektualnego, społecznego, duchowego, emocjonalnego i fizycznego rozwoju człowieka; 2) nieskrępowane kształtowanie osobowości człowieka odpowiedzialnego, przy poszanowaniu jego prawa do wolności i godności, w tym wolności od wszelkich nałogów; 3) upowszechnianie i umacnianie w społeczeństwie przywiązania do wartości: wolności, prawdy, sprawiedliwości, demokracji, samorządności, równouprawnienia, tolerancji i przyjaźni; 4) stwarzanie warunków do nawiązywania i utrwalania silnych więzi międzyludzkich ponad podziałami rasowymi, narodowościowymi i wyznaniowymi.',
        '000757520', '234858993',
        '192076468', 'ASSOCIATION', '22102051389741970611730870', true, '2000-06-20', 'Bardzo lubimy działać', true),
       ('c06f4f3c-0d2e-11ee-be56-0242ac120002', 'NGO', 'Kołobrzeski Międzyszkolny Klub Lekkoatletyczny "Sztorm"',
        'Bogusława X 1', 'Kołobrzeg', '78-100', 'Polska', '792367411',
        'osemkakolobrzeg@wp.pl', 'https://powiat.kolobrzeg.pl/opis-289-uczniowski_klub_sportowy_osemka.html', null,
        '2021-01-10T12:24:36', '2021-01-10T12:24:36',
        'Planowanie i organizowanie pozalekcyjnego życia sportowego uczniów w oparciu o możliwości obiektowe i sprzętowe szkoły oraz pomoc organizacyjną i materialną rodziców i sympatyków Klubu, angażowanie wszystkich uczniów do różnorodnych form aktywności ruchowej, gier i zabaw dostosowanych do wieku, stopnia sprawności i zainteresowań sportowych, uczestniczenie w imprezach sportowych organizowanych na terenie działania samorządu terytorialnego i poza nim.',
        '000757590', '234858996', '612958850', 'ASSOCIATION', '28870710321365697594072650', false, '2000-06-20',
        'A my działamy', false),
       ('a2daa44a-0d2d-11ee-be56-0242ac120002', 'COMPANY', 'Technologiczny Startup Kołobrzeg',
        'Morska 1/3', 'Kołobrzeg', '78-100', 'Polska', '508158776',
        'kontakt@tsk.pl', 'https://www.tsk.pl', null, '2023-06-20T00:00:00', '2023-06-20T00:00:00',
        'Jesteśmy innowacyjnym startupem technologicznym z Kołobrzegu, specjalizującym się w tworzeniu zaawansowanych rozwiązań dla sektora medycznego. Nasze produkty pomagają lekarzom i pacjentom w zarządzaniu informacjami o stanie zdrowia, a także umożliwiają zdalną komunikację i konsultacje. Wierzymy w moc technologii w przekształcaniu opieki zdrowotnej i dążymy do bycia na czele tej transformacji.',
        '000757530', '234858990', '378955803', null, null, true, null, null, false),
       ('9bab7cfc-0d2e-11ee-be56-0242ac120002', 'COMPANY', 'Restauracja Przystań',
        'Portowa 4', 'Kołobrzeg', '78-100', 'Polska', '508158775',
        'kontakt@przystan.kolobrzeg.pl', 'https://www.przystan.kolobrzeg.pl', null, '2016-06-10T12:24:36',
        '2016-06-10T12:24:36',
        'Nasza restauracja oferuje najlepsze dania kuchni bałtyckiej, skupiając się na świeżych, lokalnych składnikach i autentycznych przepisach. Położona w sercu Kołobrzegu, z widokiem na morze, Restauracja Przystań jest idealnym miejscem na rodzinny obiad, romantyczną kolację czy spotkanie z przyjaciółmi. Pragniemy, by każdy posiłek u nas był nie tylko satysfakcjonującym doświadczeniem kulinarycznym, ale także niezapomnianym przeżyciem.',
        '000757550', '234858991', '394262080', null, null, true, null, null, false),
       ('4b0e9873-47f7-499a-8190-5aff4ac16dde', 'COMPANY', 'Kołobrzeska Galeria Sztuki',
        'Sztuki 2/1', 'Kołobrzeg', '78-100', 'Polska', '123123123',
        'kontakt@galeria.kolobrzeg.pl', 'https://www.galeria.kolobrzeg.pl', null, '2016-06-10T12:24:36',
        '2016-06-10T12:24:36',
        'Promujemy lokalnych artystów i organizujemy wystawy sztuki współczesnej, które angażują społeczność Kołobrzegu i przyciągają zwiedzających z całego kraju. Nasza misja to rozwijanie kultury i sztuki w regionie, tworzenie przestrzeni do dyskusji i refleksji, a także edukowanie publiczności na temat wartości i znaczenia sztuki. Wierzymy, że sztuka ma moc inspirowania i łączenia ludzi, a nasza galeria jest miejscem, gdzie te spotkania mogą się zdarzyć.',
        '000757221', '234858111', '394262090', null, null, false, null, 'Treści niezgodne z polityką', true);

--changeset pgorski:20231129-02
INSERT INTO wavvy.ngo_tags(id, organization_ngo_id, tag)
VALUES ('1c8490ed-485e-4f8c-8caf-fbfdcdf37052', 'a9656db2-0d2e-11ee-be56-0242ac120002', 'świadomość morska'),
       ('f28cf3e8-b42b-46b5-9fa9-e01f3f3e0838', 'b544b8e0-0d2e-11ee-be56-0242ac120002', 'harcerstwo'),
       ('defc0e24-f3db-4050-a309-6e0b2806072c', 'b544b8e0-0d2e-11ee-be56-0242ac120002', 'młodzież'),
       ('896ef52e-6d0c-4085-952d-d44845abd12e', 'c06f4f3c-0d2e-11ee-be56-0242ac120002', 'sztorm'),
       ('4be963ed-67d0-4072-ad70-68ae33dc2aff', 'c06f4f3c-0d2e-11ee-be56-0242ac120002', 'lekkoatletyka'),
       ('a0adb809-16c2-478f-8ec4-b3fe75511c74', 'c06f4f3c-0d2e-11ee-be56-0242ac120002', 'sport');

--changeset pgorski:20231129-03
INSERT INTO wavvy.app_users(id, username, first_Name, last_Name, email, user_type, deleted, created_timestamp,
                                  enabled, email_verified, organization_id, phone)
VALUES ('ccccf3b0-0d10-11ee-be56-0242ac120002', 'miasto@gmail.com', 'Zbigniew', 'Brzęczyszczykiewicz',
        'miasto@gmail.com',
        'CITY_HALL', false, 1700154735340, true, true, null, '123123123'),
       ('2dc6b240-0d12-11ee-be56-0242a20002c1', 'ngo1@gmail.com', 'Roman', 'Rybak', 'ngo1@gmail.com',
        'NGO', false, 1700154735340, true, true, 'a9656db2-0d2e-11ee-be56-0242ac120002', '321321321'),
       ('353feec4-0d12-11ee-be56-0242ac120002', 'ngo2@gmail.com', 'Eustachy', 'Bąbel', 'ngo2@gmail.com',
        'NGO', false, 1700154735340, true, true, 'b544b8e0-0d2e-11ee-be56-0242ac120002', '123456789'),
       ('03c79bef-4282-4326-be74-8acb180d7f03', 'ngo3@gmail.com', 'Andrzej', 'Przedsiębiorczy', 'ngo3@gmail.com',
        'NGO', false, 1700154735340, true, true, 'c06f4f3c-0d2e-11ee-be56-0242ac120002', '987654321'),
       ('3ed0cf62-0d12-11ee-be56-0242ac120002', 'msp1@gmail.com', 'Jesica', 'Bąbelek', 'msp1@gmail.com',
        'BUSINESS', false, 1700154735340, true, true, 'a2daa44a-0d2d-11ee-be56-0242ac120002', '999999999'),
       ('4f1b9b6c-0d12-11ee-be56-0242ac120002', 'msp2@gmail.com', 'Zenon', 'Bździoch', 'msp2@gmail.com',
        'BUSINESS', false, 1700154735340, true, true, '9bab7cfc-0d2e-11ee-be56-0242ac120002', '888888888'),
       ('528f7db6-d46f-465b-a93a-6d67f9ab85c9', 'msp3@gmail.com', 'Wiesław', 'Dąbrowski', 'msp3@gmail.com',
        'BUSINESS', false, 1700154735340, true, true, '4b0e9873-47f7-499a-8190-5aff4ac16dde', '777777777');

--changeset pgorski:20231129-04
INSERT INTO wavvy.business_areas(id, name)
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

--changeset pgorski:20231129-05
INSERT INTO wavvy.offers(id, name, description, budget, funding_level, target_audience, link, start_date,
                               end_date, scope, created_at, updated_at)
VALUES ('ff435fd6-0d2a-11ee-be56-0242ac120002', 'Grant na Rozwój Kultury Lokalnej',
        'Ten grant jest przeznaczony dla artystów, muzeów i innych instytucji kultury w Kołobrzegu, które pracują nad promowaniem i zachowaniem lokalnej kultury i dziedzictwa.',
        '100000.00', '70', 'Artyści, muzea, instytucje kultury',
        'https://kolobrzeg-grants.com/granty-na-rozwoj-kultury-lokalnej', '2023-10-23', '2023-10-25', 'NGO_ONLY',
        '2023-10-10T12:24:36', '2023-10-10T12:24:36'),
       ('7af33516-0d2b-11ee-be56-0242ac120002', 'Grant na Aktywność Społeczną',
        'Grant jest przeznaczony dla lokalnych organizacji non-profit, które promują aktywność społeczną i zaangażowanie w mieście i okolicach miasta Kołobrzeg.',
        '50000.00', '80', 'Lokalne organizacje non-profit',
        'https://kolobrzeg-grants.com/granty-na-aktywnosc-spoleczna', '2023-10-12', '2023-10-15', 'HIDDEN',
        '2023-10-10T12:24:36', '2023-10-10T12:24:36'),
       ('89ca650a-0d2b-11ee-be56-0242ac120002', 'Grant na Ochronę Środowiska',
        'Ten grant jest przeznaczony dla organizacji non-profit i inicjatyw społecznych w mieście Kołobrzeg, które koncentrują się na ochronie środowiska i promowaniu zrównoważonego rozwoju.',
        '75000.00', '85', 'Organizacje ekologiczne i inicjatywy społeczne',
        'https://kolobrzeg-grants.com/granty-na-ochrone-srodowiska', '2023-10-10', '2023-10-25', 'PUBLIC',
        '2023-10-10T12:24:36', '2023-10-10T12:24:36');

--changeset pgorski:20231129-06
INSERT INTO wavvy.organization_business_areas(organization_id, business_area_id)
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

--changeset pgorski:20231129-07
INSERT INTO wavvy.projects(id, name, description, street, zip_code, city, country,
                                 image_link, start_Time, end_Time, budget,
                                 cooperation_Message, status, possible_Volunteer, organizer_id, created_at, updated_at,
                                 reason, disabled)
VALUES ('9457f49a-15de-4a67-8870-6c7c5dd4746e', 'Zbiórka żywności',
        'Zbiórka żywności dla osób potrzebujących: Dołącz do nas w akcji gromadzenia żywności i pomóż dostarczyć posiłki potrzebującym w naszej społeczności.',
        null, null, null, null,
        'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        '2023-06-10T16:00:00', '2023-06-10T19:00:00', '2500.00',
        'siemanko szukamy psychologa do współpracy!!!',
        4, 'true', 'b544b8e0-0d2e-11ee-be56-0242ac120002', '2023-05-10T16:00:00', '2023-05-10T16:00:00', 'reason1',
        false),
       ('6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'Edukacyjny program o znaczeniu gospodarki wodnej',
        'Edukacyjny program mający na celu kształtowanie zrozumienia roli i znaczenia gospodarki wodnej, żeglugi morskiej i śródlądowej.',
        null, null, null, null,
        'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        '2023-01-01T23:00:00', '2024-02-29T23:59:59', '50000.00', '', 5, 'true',
        'a9656db2-0d2e-11ee-be56-0242ac120002', '2022-12-10T16:00:00', '2022-12-10T16:00:00', 'reason2', false),
       ('44135c4c-6b9a-405e-a18c-6354b5eb06f7', 'Bieg Niepodległości', 'Promocja ruchu',
        'Bogusława X 1', '78-100', 'Kołobrzeg', 'Polska',
        'https://images.unsplash.com/photo-1597892657493-6847b9640bac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
        '2022-11-11T10:00:00', '2022-11-11T13:00:00', '30000.00',
        'Poszukujemy wolontariuszy do obsługi biegu.',
        7, 'true', 'c06f4f3c-0d2e-11ee-be56-0242ac120002', '2022-03-10T16:00:00', '2022-03-10T16:00:00', 'reason3',
        true);

--changeset pgorski:20231129-08
INSERT INTO wavvy.project_tags(id, project_id, tag)
VALUES ('4a16e0e4-ca1b-4d82-bdd0-84011b9e9ad5', '9457f49a-15de-4a67-8870-6c7c5dd4746e', 'zbiórka żywności'),
       ('d8b99892-fca7-4e44-8a23-6a1ee82ddcdf', '6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'edukacja'),
       ('3127f35f-1965-4661-80bb-83981f9520da', '6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'młodzież'),
       ('d342e576-8276-4fa1-8a66-60edc0859499', '6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'świadomość morska'),
       ('89751836-dafd-4c29-8296-dbdf56f95dd2', '44135c4c-6b9a-405e-a18c-6354b5eb06f7', 'bieg'),
       ('4f00069a-9385-465c-bb4b-90c065cadd1a', '44135c4c-6b9a-405e-a18c-6354b5eb06f7', 'niepodległość'),
       ('419c1f74-6821-4aa6-a484-c2ba6614f1fa', '44135c4c-6b9a-405e-a18c-6354b5eb06f7', 'promocja ruchu');

--changeset pgorski:20231129-09
INSERT INTO wavvy.project_links(id, project_id, link)
VALUES ('58f6a175-60e7-4efc-b78a-2d8d37fb5e45', '9457f49a-15de-4a67-8870-6c7c5dd4746e', 'https://www.onet.pl'),
       ('a9a8b864-9e82-4f38-9b0b-ec6c02e7d4d7', '6e17f538-7280-4251-bbe7-5d44bc8b1bf6',
        'https://www.facebook.com/lmir.gdynia/?locale=pl_PL'),
       ('c1a0d9f3-aa48-4823-9f4d-8f9176f93671', '6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'link2'),
       ('3a2c1407-d5a9-46b0-b857-0861a75d5572', '6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'link3'),
       ('e361f1cf-24c5-4b47-842b-69b0a1cc8a3b', '44135c4c-6b9a-405e-a18c-6354b5eb06f7',
        'https://www.bieg.kolobrzeg.pl/inne-imprezy-biegowe/bieg-niepodleglosci'),
       ('cc301982-4a09-4aa1-8d09-1e3d5c6c853b', '44135c4c-6b9a-405e-a18c-6354b5eb06f7', 'link4'),
       ('92fc68a0-3ef3-4c3e-9a1d-47f378e69b3d', '44135c4c-6b9a-405e-a18c-6354b5eb06f7', 'link5');

--changeset pgorski:20231129-10
INSERT INTO wavvy.social_links(id, organization_id, link)
VALUES ('013701d1-6a46-449f-8e18-c78144aaeba9', 'a2daa44a-0d2d-11ee-be56-0242ac120002', 'https://www.facebook.com/tsk'),
       ('a3e9a851-fc2d-4293-b7cd-ee5f71b4b059', 'a2daa44a-0d2d-11ee-be56-0242ac120002', 'https://www.linkedin.com/tsk'),
       ('da2a8e51-3742-4110-b616-738758cb4a23', '9bab7cfc-0d2e-11ee-be56-0242ac120002',
        'https://www.facebook.com/przystan'),
       ('42adf51d-4b2a-44e6-9e23-6d6783208d91', '4b0e9873-47f7-499a-8190-5aff4ac16dde',
        'https://facebook.com/galeria-kolobrzeg'),
       ('26984ddd-413a-4322-9078-23c32c1fb637', 'a9656db2-0d2e-11ee-be56-0242ac120002', 'https://facebook.com/4'),
       ('792aa665-a40d-4e64-b1e7-69ce591d2ed2', 'b544b8e0-0d2e-11ee-be56-0242ac120002', 'https://facebook.com/5'),
       ('85f025c1-1644-4248-b4c8-d08c45e4a6c8', 'c06f4f3c-0d2e-11ee-be56-0242ac120002', 'https://facebook.com/6');

--changeset pgorski:20231129-11
INSERT INTO wavvy.resources(id, organization_id, resource)
VALUES ('b04ce852-4ab6-44fa-8887-153c1c838210', 'a2daa44a-0d2d-11ee-be56-0242ac120002', 'Brak danych'),
       ('25777134-17aa-4eb7-8254-a38783f577bb', '9bab7cfc-0d2e-11ee-be56-0242ac120002', 'Sala weselna'),
       ('9d9422c0-26ad-44ff-9b09-b9dffd4fafd4', '4b0e9873-47f7-499a-8190-5aff4ac16dde', 'Brak danych'),
       ('e4ae15bf-0e8c-481d-8261-9fe1dac62030', 'a9656db2-0d2e-11ee-be56-0242ac120002', 'Brak danych'),
       ('4704aa6b-5998-4171-b31e-e92d90de6101', 'b544b8e0-0d2e-11ee-be56-0242ac120002', 'Namiot polowy'),
       ('26c2960d-bef0-4b18-90f9-b4e63c942888', 'b544b8e0-0d2e-11ee-be56-0242ac120002', 'Grill przemysłowy'),
       ('08decab5-0c6b-4f22-82cc-3aeebe8ba904', 'c06f4f3c-0d2e-11ee-be56-0242ac120002', 'Stadion sportowy');
