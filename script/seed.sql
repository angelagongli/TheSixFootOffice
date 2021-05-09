INSERT INTO Office_DB.Teams (name) VALUES ('Finance');

INSERT INTO Office_DB.TeamSchedules (weekOf, TeamId)
VALUES ('2021-5-10', 1), ('2021-5-17', 1);

INSERT INTO Office_DB.Employees (name, seatNumber, nearestNeighborID, TeamId)
VALUES ('Employee A', 1, 2, 1), ('Employee B', 2, 1, 1);

INSERT INTO Office_DB.EmployeeSchedules (weekOf, EmployeeId)
VALUES ('2021-5-10', 1), ('2021-5-10', 2),
('2021-5-17', 1), ('2021-5-17', 2);

INSERT INTO Office_DB.Days (date, inOfficeRequirement, EmployeeScheduleId)
VALUES ('2021-5-10', 'In Office AM', 1),
('2021-5-11', 'In Office AM', 1),
('2021-5-12', 'In Office AM', 1),
('2021-5-13', 'In Office AM', 1),
('2021-5-14', 'In Office AM', 1),
('2021-5-10', 'In Office PM', 2),
('2021-5-11', 'In Office PM', 2),
('2021-5-12', 'In Office PM', 2),
('2021-5-13', 'In Office PM', 2),
('2021-5-14', 'In Office PM', 2),
('2021-5-17', 'In Office AM', 3),
('2021-5-18', 'In Office AM', 3),
('2021-5-19', 'In Office AM', 3),
('2021-5-20', 'In Office AM', 3),
('2021-5-21', 'In Office AM', 3),
('2021-5-17', 'In Office PM', 4),
('2021-5-18', 'In Office PM', 4),
('2021-5-19', 'In Office PM', 4),
('2021-5-20', 'In Office PM', 4),
('2021-5-21', 'In Office PM', 4);

INSERT INTO Office_DB.Events
(name, description, date, startTime, endTime, TeamScheduleId)
VALUES ('Daily Stand-Up', 'We discuss our work for the day', '2021-5-10', '9:00:00', '10:00:00', 1),
('Daily Stand-Up', 'We discuss our work for the day', '2021-5-11', '9:00:00', '10:00:00', 1),
('Daily Stand-Up', 'We discuss our work for the day', '2021-5-12', '9:00:00', '10:00:00', 1),
('Daily Stand-Up', 'We discuss our work for the day', '2021-5-13', '9:00:00', '10:00:00', 1),
('Daily Stand-Up', 'We discuss our work for the day', '2021-5-14', '9:00:00', '10:00:00', 1),
('Weekly Sprint Retrospective', 'We look back on/discuss our completed work for the week', '2021-5-14', '10:00:00', '11:00:00', 1),
('Upcoming Week Planning Meeting', 'We plan our work for the week to come', '2021-5-14', '11:00:00', '12:00:00', 1),
('Daily Stand-Up', 'We discuss our work for the day', '2021-5-17', '9:00:00', '10:00:00', 2),
('Daily Stand-Up', 'We discuss our work for the day', '2021-5-18', '9:00:00', '10:00:00', 2),
('Daily Stand-Up', 'We discuss our work for the day', '2021-5-19', '9:00:00', '10:00:00', 2),
('Daily Stand-Up', 'We discuss our work for the day', '2021-5-20', '9:00:00', '10:00:00', 2),
('Daily Stand-Up', 'We discuss our work for the day', '2021-5-21', '9:00:00', '10:00:00', 2),
('Weekly Sprint Retrospective', 'We look back on/discuss our completed work for the week', '2021-5-21', '10:00:00', '11:00:00', 2),
('Upcoming Week Planning Meeting', 'We plan our work for the week to come', '2021-5-21', '11:00:00', '12:00:00', 2);
