-- postgresql
CREATE TABLE student(
    id integer primary key not null,
    name varchar not null,
    age integer,
    mark1 integer,
    mark2 integer,
    mark3 integer,
    total integer,
    result varchar
)