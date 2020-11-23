CREATE SCHEMA BANKING;
CREATE TABLE Person(
    Ssn                 INT         NOT NULL,
    FirstName           CHAR,
    LastName            CHAR,
    PRIMARY KEY (Ssn)
);
CREATE TABLE Customer(
    Number              INT         NOT NULL,
    Ssn                 INT         NOT NULL,
    EmployeeID          INT,
    Type                CHAR,
    PRIMARY KEY (Number),
    SECONDARY KEY (Ssn),
    FOREIGN KEY (Ssn) REFERENCES Person (Ssn),
    FOREIGN KEY (EmployeeID) REFERENCES Employee (ID)
);
CREATE TABLE Employee(
    ID                  INT         NOT NULL,
    Salary              INT,
    StartDate           DATE,
    Ssn                 INT         NOT NULL,
    BranchName          CHAR        NOT NULL,
    SupervisorID        INT,
    PRIMARY KEY (ID),
    SECONDARY KEY (Ssn),
    FOREIGN KEY (Ssn) REFERENCES Person (Ssn)
    FOREIGN KEY (BranchName) REFERENCES Branch (Name),
    FOREIGN KEY (SupervisorID) REFERENCES Employee (ID)
);
CREATE TABLE Branch(
    Name                CHAR        NOT NULL,
    Address             CHAR,
    Assets              CHAR,
    ID                  INT         NOT NULL,
    PRIMARY KEY (Name),
    FOREIGN KEY (ID) REFERENCES Employee (ID)
);
CREATE TABLE Account(
    Number              INT         NOT NULL,
    Balance             INT,
    BranchName          CHAR        NOT NULL,
    OpenDate            DATE,
    ContractID          INT,
    PRIMARY KEY (Number),
    FOREIGN KEY (BranchName) REFERENCES Branch (Name),
    FOREIGN KEY (ContractID) REFERENCES Contract (ContractID)
);
CREATE TABLE Saving(
    Number              INT         NOT NULL,
    InterestRate        DOUBLE      NOT NULL,
    PRIMARY KEY (Number),
    FOREIGN KEY (Number) REFERENCES Account (Number)
);
CREATE TABLE Checking(
    Number              INT         NOT NULL,
    Overdraft           INT         NOT NULL,
    PRIMARY KEY (Number),
    FOREIGN KEY (Number) REFERENCES Account (Number)
);
CREATE TABLE Loan(
    Number              INT         NOT NULL,
    Amount              INT         NOT NULL,
    DueDate             DATE        NOT NULL,    
    Program             CHAR,
    BranchName          CHAR,
    PRIMARY KEY (Number),
    FOREIGN KEY (BranchName) REFERENCES Branch (Name)
);
CREATE TABLE Payment(
    Number              INT         NOT NULL,
    LoanNumber          INT         NOT NULL,    
    Amount              INT         NOT NULL,
    Date                DATE,
    PRIMARY KEY (Number, LoanNumber)
);
CREATE TABLE Contract(
    ContractID          INT         NOT NULL,
    StartDate           DATE        NOT NULL,
    CustomerNumber      INT         NOT NULL,
    BranchName          CHAR        NOT NULL,
    Value               INT,
    Text                TEXT,
    PRIMARY KEY (ContractID),
    SECONDARY KEY (StartDate, CustomerNumber, BranchName),
    FOREIGN KEY (CustomerNumber) REFERENCES Customer (Number),
    FOREIGN KEY (BranchName) REFERENCES Branch (Name)
);
CREATE TABLE Borrow(
    CustomerNumber      INT         NOT NULL,
    LoanNumber          INT         NOT NULL,
    Date                DATE,
    PRIMARY KEY (CustomerNumber, LoanNumber),
    FOREIGN KEY (CustomerNumber) REFERENCES Customer (Number),
    FOREIGN KEY (LoanNumber) REFERENCES Loan (Number)
);
CREATE TABLE Deposit(
    CustomerNumber      INT         NOT NULL,
    AccountNumber       INT         NOT NULL,
    PRIMARY KEY (CustomerNumber, AccountNumber),
    FOREIGN KEY (CustomerNumber) REFERENCES Customer (Number),
    FOREIGN KEY (AccountNumber) REFERENCES Account (Number)
);
CREATE TABLE PersonPhone(
    Ssn                 INT         NOT NULL,
    Phone               INT         NOT NULL,
    PRIMARY KEY (Ssn, Phone),
    FOREIGN KEY (Ssn) REFERENCES Person (Ssn)
);
CREATE TABLE CustomerContactAddress(
    Number              INT         NOT NULL,
    Address             CHAR        NOT NULL,
    PRIMARY KEY (Number, Address),
    FOREIGN KEY (Number) REFERENCES Customer (Number)
)