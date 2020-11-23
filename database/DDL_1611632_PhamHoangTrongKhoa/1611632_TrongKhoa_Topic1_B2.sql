CREATE SCHEMA AIRPORT;
CREATE TABLE plane_type(
    Model               char        NOT NULL,
    Capacity            INT,
    Weight              INT,         
    PRIMARY KEY (Model)
);
CREATE TABLE Airplane(
    REG#                INIT        NOT NULL,
    Model               CHAR,
    Number              INT,
    start               DATE,
    end                 DATE
    PRIMARY KEY (REG#),
    UNIQUE (REG#),
    FOREIGN KEY (Model) REFERENCES plane_type (Model),
    FOREIGN KEY (Number) REFERENCES Hangar (Number)
);
CREATE TABLE Hangar(
    Number              INT         NOT NULL,
    Capacity            INT,
    Location            CHAR,
    Year                INT,
    PRIMARY KEY (Number)
);
CREATE TABLE Person(
    Ssn                 INT         NOT NULL,
    Name                CHAR,
    Phone               INT,
    Address             CHAR,
    PRIMARY KEY (Ssn)
);
CREATE TABLE Pilot(
    Ssn                 INT         NOT NULL,
    Restr               CHAR,
    Lic_num             INT,
    PRIMARY KEY (Ssn),
    FOREIGN KEY (Ssn) REFERENCES Person (Ssn)
);
CREATE TABLE Employee(
    Ssn                 INT         NOT NULL,
    Shift               CHAR,
    Salary              INT,
    PRIMARY KEY (Ssn),
    FOREIGN KEY (Ssn) REFERENCES Person (Ssn)
);
CREATE TABLE Ower(
    OwerID              INT         NOT NULL,
    PRIMARY KEY (OwerID)
);
CREATE TABLE Corporation(
    Name                CHAR        NOT NULL,
    Phone               INT,
    Address             CHAR,
    PRIMARY KEY (Name),
    FOREIGN KEY (OwerID) REFERENCES Ower (OwerID)
);
CREATE TABLE Person_Ower(
    Ssn                 INT         NOT NULL,
    Name                CHAR,
    Phone               INT,
    Address             CHAR,
    PRIMARY KEY (Ssn),
    FOREIGN KEY (OwerID) REFERENCES Ower (OwerID)
);//Co can ko ?
CREATE TABLE Service(
    REG#                INIT        NOT NULL,
    Date                DATE,       NOT NULL,
    Workcode            INT,       NOT NULL,
    Hours               DOUBLE,
    PRIMARY KEY (REG#, Date, Workcode)
);
CREATE TABLE Works_on(
    Ssn                 INT         NOT NULL,
    Model               CHAR        not NULL,
    PRIMARY KEY (Ssn, Model),
    FOREIGN KEY (Ssn) REFERENCES Employee (Ssn),
    FOREIGN KEY (Model) REFERENCES plane_type (Model)
);
CREATE TABLE Files(
    Ssn                 INT         NOT NULL,
    Model               CHAR        not NULL,
    PRIMARY KEY (Ssn, Model),
    FOREIGN KEY (Ssn) REFERENCES Pilot (Ssn)
);
CREATE TABLE Maintain(
    Ssn                 INT         NOT NULL,
    REG#                INIT        NOT NULL,
    Date                DATE        NOT NULL,
    Workcode            INT         NOT NULL,
    PRIMARY KEY (Ssn, REG#, Date, Workcode),
    FOREIGN KEY (Ssn) REFERENCES Employee (Ssn),
    FOREIGN KEY (REG#, Date, Workcode) REFERENCES Service (REG#, Date, Workcode)
);
CREATE TABLE Owns(
    OwerID              INT         NOT NULL,
    REG#                INT         NOT NULL,
    Pdate               DATE,
    PRIMARY KEY (OwerID, REG#),
    FOREIGN KEY (OwerID) REFERENCES Owner (OwerID),
    FOREIGN KEY (REG#) REFERENCES Airplane (REG#),
);