CREATE TABLE villages
(
    id          integer PRIMARY KEY,
    name        char(25) UNIQUE,
    township_id integer NOT NULL
        CHECK ( name IS NOT NULL AND name <> '')
);

CREATE TABLE township
(
    id   integer PRIMARY KEY,
    name char(25) UNIQUE
        CHECK ( name IS NOT NULL AND name <> '')
);

CREATE TABLE district
(
    id          integer PRIMARY KEY,
    name        char(25) UNIQUE,
    township_id integer NOT NULL
        CHECK ( name IS NOT NULL AND name <> '')
);

CREATE TABLE cityhall
(
    id          integer PRIMARY KEY,
    name        char(25),
    township_id integer NOT NULL
        CHECK ( name IS NOT NULL AND name <> '')
);


CREATE TABLE district_township
(
    district_township_id integer,
    township_id          integer,
    PRIMARY KEY (district_township_id, township_id)
);

ALTER TABLE villages
    ADD CONSTRAINT villages_in_township FOREIGN KEY (township_id) REFERENCES township (id);
ALTER TABLE district_township
    ADD FOREIGN KEY (district_township_id) REFERENCES district (township_id);

ALTER TABLE district_township
    ADD FOREIGN KEY (township_id) REFERENCES township (id);

ALTER TABLE cityhall
    ADD CONSTRAINT cityhall_to_township FOREIGN KEY (township_id) REFERENCES township (id);

