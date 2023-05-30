DROP SCHEMA IF EXISTS notezen;
CREATE SCHEMA IF NOT EXISTS notezen;

CREATE TABLE IF NOT EXISTS notezen.tasks_status (
    id    serial primary key,
    title varchar(255) NOT NULL unique
);
CREATE TABLE IF NOT EXISTS notezen.projects_status (
    id      serial primary key,
    title   varchar(255) NOT NULL unique
);
CREATE TABLE IF NOT EXISTS notezen.roles (
      id   serial primary key ,
      name varchar(50) not null unique
);

CREATE TABLE IF NOT EXISTS notezen.task_priority(
    id serial primary key,
    priority varchar(50) not null
);

CREATE TABLE IF NOT EXISTS notezen.users (
    id       serial primary key,
    username varchar(255) NOT NULL unique,
    password varchar(255) NOT NULL,
    role     int not null references notezen.roles(id),
    created_date timestamp default now(),
    updated_date timestamp
);

CREATE TABLE IF NOT EXISTS notezen.projects (
    id    serial primary key,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    created_date timestamp NOT NULL default now(),
    updated_date timestamp,
    created_by int NOT NULL references notezen.users(id) ON DELETE CASCADE ON UPDATE CASCADE ,
    project_status int NOT NULL references notezen.projects_status(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS notezen.tasks (
    id      serial primary key,
    title   varchar(50) NOT NULL,
    description json NOT NULL,
    status int NOT NULL references notezen.tasks_status(id) ON DELETE CASCADE ON UPDATE CASCADE ,
    task_priority int NOT NULL references notezen.task_priority(id) ON DELETE CASCADE ON UPDATE CASCADE ,
    expiration_date timestamp,
    created_by int NOT NULL references notezen.users(id) ON DELETE CASCADE ON UPDATE CASCADE ,
    created_date timestamp NOT NULL default now(),
    updated_date timestamp,
    project int not null references notezen.projects(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS  notezen.notifications(
    id serial primary key ,
    message varchar(255) NOT NULL ,
    user_id int NOT NULL references notezen.users(id) ON DELETE CASCADE ON UPDATE CASCADE ,
    task_id int NOT NULL references notezen.tasks(id) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS notezen.comments (
    id          serial primary key,
    task int not null references notezen.tasks(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_date timestamp NOT NULL default now(),
    created_by int NOT NULL references notezen.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS notezen.task_assignment (
    task_id INTEGER REFERENCES notezen.tasks (id) ON DELETE CASCADE ON UPDATE CASCADE ,
    user_id INTEGER REFERENCES notezen.users (id) ON DELETE CASCADE ON UPDATE CASCADE ,
    PRIMARY KEY (task_id, user_id)
);

CREATE TABLE IF NOT EXISTS notezen.projects_users (
    project_id int not null references notezen.projects(id),
    user_id int not null references notezen.users(id),
    primary key (project_id, user_id)
);

