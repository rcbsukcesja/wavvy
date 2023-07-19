
INSERT INTO
    APP_USERS(id, username, first_Name, last_Name, email, user_Type)
VALUES
    ('ccccf3b0-0d10-11ee-be56-0242ac120002','Zbychu', 'Zbigniew', 'Brzęczyszczykiewicz', 'zbyszek@gmail.com', 'MAGISTRATE'),
    ('2dc6b240-0d12-11ee-be56-0242a20002c1','Romek', 'Roman', 'Rybak', 'romek@gmail.com', 'NGO'),
    ('353feec4-0d12-11ee-be56-0242ac120002','Eustachy', 'Eustachy', 'Bąbel', 'babel@gmail.com', 'NGO'),
    ('3ed0cf62-0d12-11ee-be56-0242ac120002','Jesica', 'Jesica', 'Bąbelek', 'jesica@gmail.com', 'BUSINESS'),
    ('4b0a51e0-0d12-11ee-be56-0242ac120002','Krysia', 'Krystna', 'Brzydal', 'krysia@gmail.com', 'RESIDENT');

INSERT INTO
    BUSINESS_AREAS(id, name)
VALUES
     ('13857a2c-0d14-11ee-be56-0242ac120002', 'Edukacja i rozwój młodzieży'),
     ('ac0f9444-0d14-11ee-be56-0242ac120002', 'Ochrona środowiska'),
     ('bd47cb32-0d14-11ee-be56-0242ac120002', 'Rozwój społeczności lokalnych'),
     ('c8db0982-0d14-11ee-be56-0242ac120002', 'Wsparcie dla osób niepełnosprawnyc'),
     ('d12be6e2-0d14-11ee-be56-0242ac120002', 'Pomoc humanitarna i rozwój międzynarodowy');

INSERT INTO
    MESSAGES(id, text, created_At, from_User_id, to_User_id)
VALUES
     ('6601b652-0d15-11ee-be56-0242ac120002', 'text1', '2023-06-10T16:00:00', '353feec4-0d12-11ee-be56-0242ac120002', '3ed0cf62-0d12-11ee-be56-0242ac120002'),
     ('71de5b92-0d15-11ee-be56-0242ac120002', 'text2', '2023-06-10T16:01:00', '3ed0cf62-0d12-11ee-be56-0242ac120002', '353feec4-0d12-11ee-be56-0242ac120002'),
     ('7cd1b620-0d15-11ee-be56-0242ac120002', 'text3', '2023-06-10T16:02:00', '353feec4-0d12-11ee-be56-0242ac120002', '3ed0cf62-0d12-11ee-be56-0242ac120002'),
     ('88119a32-0d15-11ee-be56-0242ac120002', 'text4', '2023-06-10T16:03:00', '3ed0cf62-0d12-11ee-be56-0242ac120002', '353feec4-0d12-11ee-be56-0242ac120002'),
     ('90b1d38c-0d15-11ee-be56-0242ac120002', 'text5', '2023-06-10T16:04:00', '353feec4-0d12-11ee-be56-0242ac120002', '3ed0cf62-0d12-11ee-be56-0242ac120002');

INSERT INTO
    CONVERSATIONS(id)
VALUES
    ('54fb43a6-0d19-11ee-be56-0242ac120002');

INSERT INTO
    conversation_users(conversation_id, user_id)
VALUES
    ('54fb43a6-0d19-11ee-be56-0242ac120002', '353feec4-0d12-11ee-be56-0242ac120002'),
    ('54fb43a6-0d19-11ee-be56-0242ac120002', '3ed0cf62-0d12-11ee-be56-0242ac120002');

INSERT INTO
    conversation_message(conversation_id, message_id)
VALUES
    ('54fb43a6-0d19-11ee-be56-0242ac120002', '6601b652-0d15-11ee-be56-0242ac120002'),
    ('54fb43a6-0d19-11ee-be56-0242ac120002', '71de5b92-0d15-11ee-be56-0242ac120002'),
    ('54fb43a6-0d19-11ee-be56-0242ac120002', '7cd1b620-0d15-11ee-be56-0242ac120002'),
    ('54fb43a6-0d19-11ee-be56-0242ac120002', '88119a32-0d15-11ee-be56-0242ac120002'),
    ('54fb43a6-0d19-11ee-be56-0242ac120002', '90b1d38c-0d15-11ee-be56-0242ac120002');

INSERT INTO
    OFFERS(id, name, description, link, start_Date, end_Date, close_Deadline, scope)
VALUES
    ('ff435fd6-0d2a-11ee-be56-0242ac120002', 'example name1', 'opis1', 'example link1', '2023-06-10', '2023-07-10', 'false', 'PUBLIC'),
    ('7af33516-0d2b-11ee-be56-0242ac120002', 'example name2', 'opis2', 'example link2', '2023-06-10', '2023-08-10', 'false', 'PUBLIC'),
    ('89ca650a-0d2b-11ee-be56-0242ac120002', 'example name3', 'opis3', 'example link3', '2023-06-01', '2023-06-10', 'true', 'PUBLIC'),
    ('9a0ef7f0-0d2b-11ee-be56-0242ac120002', 'example name4', 'opis4', 'example link4', '2023-06-10', '2023-07-8', 'false', 'NGO_ONLY'),
    ('a5b7431e-0d2b-11ee-be56-0242ac120002', 'example name5', 'opis5', 'example link5', '2023-06-01', '2023-07-10', 'true', 'NGO_ONLY');

INSERT INTO
   ORGANIZATIONS(id, name, address, phone, email, website, logo_url, creation_date, description, KRS, NIP)
VALUES
    ('a2daa44a-0d2d-11ee-be56-0242ac120002', 'name1', 'adres1', 'phone1', 'email1', 'website1', 'logoUrl1','2015-06-10','opis1', '000757520', '234858990'),
    ('9bab7cfc-0d2e-11ee-be56-0242ac120002', 'name2', 'adres2', 'phone2', 'email2', 'website2', 'logoUrl2','2016-06-10','opis1', '000757550', '234858991'),
    ('a9656db2-0d2e-11ee-be56-0242ac120002', 'name3', 'adres3', 'phone3', 'email3', 'website3', 'logoUrl3','2018-06-10','opis1', '000753520', '234858992'),
    ('b544b8e0-0d2e-11ee-be56-0242ac120002', 'name4', 'adres4', 'phone4', 'email4', 'website4', 'logoUrl4','2020-06-10','opis1', '000757520', '234858993'),
    ('c06f4f3c-0d2e-11ee-be56-0242ac120002', 'name5', 'adres5', 'phone5', 'email5', 'website5', 'logoUrl5','2021-06-10','opis1', '000757590', '234858996');

INSERT INTO
    COMPANIES(id)
VALUES
    ('a2daa44a-0d2d-11ee-be56-0242ac120002'),
    ('9bab7cfc-0d2e-11ee-be56-0242ac120002');

INSERT INTO
    ORGANIZATIONS_NGOS(id, legal_Status)
VALUES
    ('a9656db2-0d2e-11ee-be56-0242ac120002' ,'FOUNDATION'),
    ('b544b8e0-0d2e-11ee-be56-0242ac120002' , 'SOCIAL_COOPERATIVE') ,
    ('c06f4f3c-0d2e-11ee-be56-0242ac120002' ,'ASSOCIATION');

INSERT INTO
    organizationsNGO_employees(organizationNGO_id, user_id)
VALUES
    ('a9656db2-0d2e-11ee-be56-0242ac120002', '2dc6b240-0d12-11ee-be56-0242a20002c1'),
    ('b544b8e0-0d2e-11ee-be56-0242ac120002', '353feec4-0d12-11ee-be56-0242ac120002'),
    ('c06f4f3c-0d2e-11ee-be56-0242ac120002', '2dc6b240-0d12-11ee-be56-0242a20002c1'),
    ('c06f4f3c-0d2e-11ee-be56-0242ac120002', '3ed0cf62-0d12-11ee-be56-0242ac120002');

INSERT INTO
    organization_business_areas(organization_id, business_area_id)
VALUES
    ('a9656db2-0d2e-11ee-be56-0242ac120002', '13857a2c-0d14-11ee-be56-0242ac120002'),
    ('b544b8e0-0d2e-11ee-be56-0242ac120002', 'c8db0982-0d14-11ee-be56-0242ac120002'),
    ('c06f4f3c-0d2e-11ee-be56-0242ac120002', 'c8db0982-0d14-11ee-be56-0242ac120002'),
    ('c06f4f3c-0d2e-11ee-be56-0242ac120002', '13857a2c-0d14-11ee-be56-0242ac120002');

INSERT INTO
    organizationsNGO_donors(organizationNGO_id, company_id)
VALUES
     ('a9656db2-0d2e-11ee-be56-0242ac120002' , 'a2daa44a-0d2d-11ee-be56-0242ac120002'),
     ('b544b8e0-0d2e-11ee-be56-0242ac120002' , 'a2daa44a-0d2d-11ee-be56-0242ac120002') ,
     ('c06f4f3c-0d2e-11ee-be56-0242ac120002' , '9bab7cfc-0d2e-11ee-be56-0242ac120002');

INSERT INTO
     organization_owners(organization_id, user_id)
VALUES
    ('a2daa44a-0d2d-11ee-be56-0242ac120002', 'ccccf3b0-0d10-11ee-be56-0242ac120002'),
    ('9bab7cfc-0d2e-11ee-be56-0242ac120002', '2dc6b240-0d12-11ee-be56-0242a20002c1'),
    ('a9656db2-0d2e-11ee-be56-0242ac120002', '353feec4-0d12-11ee-be56-0242ac120002'),
    ('b544b8e0-0d2e-11ee-be56-0242ac120002', '3ed0cf62-0d12-11ee-be56-0242ac120002'),
    ('c06f4f3c-0d2e-11ee-be56-0242ac120002', '4b0a51e0-0d12-11ee-be56-0242ac120002');

INSERT INTO
    PROJECT(id,  name, description, address, image_Link, link, start_Time, end_Time, budget, cooperation_Message, place, status, possible_Volunteer)
VALUES
    ('9457f49a-15de-4a67-8870-6c7c5dd4746e',  'name1', 'description1', 'address1', 'imageLink1', 'link1', '2023-06-10T16:00:00', '2023-06-10T19:00:00', '20000.00', 'cooperationMessage1', 'place1', 'IN_PROMOTION', 'true'),
    ('6e17f538-7280-4251-bbe7-5d44bc8b1bf6',  'name2', 'description2', 'address2', 'imageLink2', 'link2', '2023-06-10T16:00:00', '2023-06-10T20:00:00', '10000.00', 'cooperationMessage2', 'place2', 'IN_PROGRESS', 'true'),
    ('44135c4c-6b9a-405e-a18c-6354b5eb06f7',  'name3', 'description3', 'address3', 'imageLink3', 'link3', '2023-06-10T16:00:00', '2023-06-11T16:00:00', '30000.00', 'cooperationMessage3', 'place3', 'PLANNED', 'true');

INSERT INTO
    tags(tag_id, tag)
VALUES
    ('9457f49a-15de-4a67-8870-6c7c5dd4746e', 'tag1'),
    ('9457f49a-15de-4a67-8870-6c7c5dd4746e', 'tag2'),
    ('9457f49a-15de-4a67-8870-6c7c5dd4746e', 'tag3'),
    ('6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'tag4'),
    ('6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'tag5');

INSERT INTO
organizationsNGO_projects(ORGANIZATIONNGO_ID, PROJECT_ID )
VALUES
('a9656db2-0d2e-11ee-be56-0242ac120002', '9457f49a-15de-4a67-8870-6c7c5dd4746e'),
('b544b8e0-0d2e-11ee-be56-0242ac120002', '6e17f538-7280-4251-bbe7-5d44bc8b1bf6'),
('c06f4f3c-0d2e-11ee-be56-0242ac120002', '44135c4c-6b9a-405e-a18c-6354b5eb06f7');

INSERT INTO
social_Links(social_Link_id, social_Link)
VALUES
('a2daa44a-0d2d-11ee-be56-0242ac120002', 'link1'),
('9bab7cfc-0d2e-11ee-be56-0242ac120002', 'link2'),
('a9656db2-0d2e-11ee-be56-0242ac120002', 'link3'),
('b544b8e0-0d2e-11ee-be56-0242ac120002', 'link4'),
('c06f4f3c-0d2e-11ee-be56-0242ac120002', 'link5');

INSERT INTO
resources(resource_id, resource)
VALUES
('a2daa44a-0d2d-11ee-be56-0242ac120002', 'resource1'),
('9bab7cfc-0d2e-11ee-be56-0242ac120002', 'resource2'),
('a9656db2-0d2e-11ee-be56-0242ac120002', 'resource3'),
('b544b8e0-0d2e-11ee-be56-0242ac120002', 'resource4'),
('c06f4f3c-0d2e-11ee-be56-0242ac120002', 'resource5');

INSERT INTO
project_categories(project_id, business_area_id)
VALUES
('9457f49a-15de-4a67-8870-6c7c5dd4746e', '13857a2c-0d14-11ee-be56-0242ac120002'),
('6e17f538-7280-4251-bbe7-5d44bc8b1bf6', 'ac0f9444-0d14-11ee-be56-0242ac120002'),
('44135c4c-6b9a-405e-a18c-6354b5eb06f7', 'bd47cb32-0d14-11ee-be56-0242ac120002');

INSERT INTO
company_donated_projects(company_id, project_id)
VALUES
('a2daa44a-0d2d-11ee-be56-0242ac120002', '9457f49a-15de-4a67-8870-6c7c5dd4746e'),
('a2daa44a-0d2d-11ee-be56-0242ac120002', '6e17f538-7280-4251-bbe7-5d44bc8b1bf6'),
('9bab7cfc-0d2e-11ee-be56-0242ac120002', '44135c4c-6b9a-405e-a18c-6354b5eb06f7');



















