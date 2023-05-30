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

CREATE TABLE IF NOT EXISTS notezen.task_users (
    user_id int not null ,
    task_id int not null
);

CREATE TABLE IF NOT EXISTS notezen.projects_users (
    project_id int not null,
    user_id int not null
);

CREATE TABLE IF NOT EXISTS notezen.users (
    id       serial primary key,
    username varchar(255) NOT NULL unique,
    password varchar(255) NOT NULL,
    role     int not null,
    created_date timestamp default now(),
    updated_date timestamp,
    constraint fk_roles
    foreign key (role) references notezen.roles(id)

);

CREATE TABLE IF NOT EXISTS notezen.tasks (
    id      serial primary key,
    title   varchar(255) NOT NULL,
    description json NOT NULL,
    status int NOT NULL,
    priority int NOT NULL,
    expiration_date timestamp,
    created_by int NOT NULL,
    created_date timestamp NOT NULL default now(),
    updated_date timestamp,
    assigned_to int,
    constraint fk_priority foreign key (priority) references notezen.task_priority(id),
    constraint fk_created_by foreign key (created_by) references notezen.users(id),
    constraint fk_status foreign key (status) references notezen.tasks_status(id)
);
CREATE TABLE IF NOT EXISTS  notezen.notifications(
    id serial primary key ,
    message varchar(255) NOT NULL ,
    user_id int NOT NULL,
    task_id int NOT NULL ,
    constraint fk_user foreign key (user_id) references notezen.users(id),
    constraint fk_task foreign key (task_id) references notezen.tasks(id)
);
CREATE TABLE IF NOT EXISTS notezen.projects (
    id    serial primary key,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    created_date timestamp NOT NULL default now(),
    updated_date timestamp,
    created_by int NOT NULL,
    status int NOT NULL,

    constraint fk_author foreign key (created_by) references notezen.users(id),
    constraint fk_status foreign key (status) references notezen.projects_status(id)
);

CREATE TABLE IF NOT EXISTS notezen.comments (
    id          serial primary key,
    task int not null,
    created_date timestamp NOT NULL default now(),
    created_by int NOT NULL,

    constraint fk_author foreign key (created_by) references notezen.users(id),
    constraint fk_task foreign key (task) references notezen.tasks(id)
);



