CREATE SCHEMA IF NOT EXISTS notezen;

CREATE TABLE IF NOT EXISTS users (
    id       bigserial primary key,
    username varchar(255) NOT NULL unique,
    password varchar(255) NOT NULL,
    created_at timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
    id      bigserial primary key,
    title   varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    "status" int NOT NULL,
    expiration_date timestamp NOT NULL,
    created_at timestamp NOT NULL,
    created_by int NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
    id      bigserial primary key,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    created_at timestamp NOT NULL,
    created_by int NOT NULL,
    "status" int NOT NULL

);

CREATE TABLE IF NOT EXISTS comments (
    id      bigserial primary key,
    created_at timestamp NOT NULL,
    created_by int NOT NULL

);

CREATE TABLE IF NOT EXISTS tasks_status (
    id      bigserial primary key,
    title varchar(255) NOT NULL unique
);
CREATE TABLE IF NOT EXISTS projects_status (
    id      bigserial primary key,
    title   varchar(255) NOT NULL unique
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id bigint       not null,
    role    varchar(255) not null,
    primary key (user_id, role),
    constraint fk_users_roles_users foreign key (user_id) references users (id) on delete cascade on update no action
);

CREATE TABLE IF NOT EXISTS projects_users (
    project_id int not null,
    user_id int not null
);

