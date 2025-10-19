-- Azure Audit Log Table
CREATE TABLE azure_audit_log (
                                 id SERIAL PRIMARY KEY,
                                 "Timestamp" TIMESTAMP NOT NULL,
                                 "Actor" VARCHAR(255) NOT NULL,
                                 "Action" VARCHAR(255) NOT NULL,
                                 "Target" VARCHAR(255) NOT NULL,
                                 "TargetType" VARCHAR(100) NOT NULL,
                                 "Details" TEXT,
                                 "SourceIP" VARCHAR(45) NOT NULL,
                                 "Result" VARCHAR(50) NOT NULL
);

CREATE INDEX idx_azure_audit_timestamp ON azure_audit_log("Timestamp");
CREATE INDEX idx_azure_audit_actor ON azure_audit_log("Actor");
CREATE INDEX idx_azure_audit_source_ip ON azure_audit_log("SourceIP");
CREATE INDEX idx_azure_audit_action ON azure_audit_log("Action");

-- Azure Sign-in Log Table
CREATE TABLE azure_signin_log (
                                  id SERIAL PRIMARY KEY,
                                  "Timestamp" TIMESTAMP NOT NULL,
                                  "User" VARCHAR(255) NOT NULL,
                                  "SourceIP" VARCHAR(45) NOT NULL,
                                  "Location" VARCHAR(100),
                                  "Application" VARCHAR(255) NOT NULL,
                                  "Status" VARCHAR(50) NOT NULL,
                                  "FailureReason" TEXT,
                                  "DeviceInfo" VARCHAR(255)
);

CREATE INDEX idx_azure_signin_timestamp ON azure_signin_log("Timestamp");
CREATE INDEX idx_azure_signin_user ON azure_signin_log("User");
CREATE INDEX idx_azure_signin_source_ip ON azure_signin_log("SourceIP");
CREATE INDEX idx_azure_signin_status ON azure_signin_log("Status");

-- Office Firewall Log Table
CREATE TABLE office_firewall_log (
                                     id SERIAL PRIMARY KEY,
                                     "Timestamp" TIMESTAMP NOT NULL,
                                     "EventType" VARCHAR(100) NOT NULL,
                                     "SourceIP" VARCHAR(45) NOT NULL,
                                     "SourceUser" VARCHAR(255),
                                     "DestIP" VARCHAR(45),
                                     "DestDomain" VARCHAR(255),
                                     "DestPort" INTEGER,
                                     "Protocol" VARCHAR(50) NOT NULL,
                                     "Action" VARCHAR(50) NOT NULL,
                                     "BytesTransferred" BIGINT,
                                     "Details" TEXT
);

CREATE INDEX idx_office_firewall_timestamp ON office_firewall_log("Timestamp");
CREATE INDEX idx_office_firewall_source_ip ON office_firewall_log("SourceIP");
CREATE INDEX idx_office_firewall_dest_ip ON office_firewall_log("DestIP");
CREATE INDEX idx_office_firewall_event_type ON office_firewall_log("EventType");
CREATE INDEX idx_office_firewall_action ON office_firewall_log("Action");

-- App Server 1 Log Table
CREATE TABLE app_server1_log (
                                 id SERIAL PRIMARY KEY,
                                 "Timestamp" TIMESTAMP NOT NULL,
                                 "EventType" VARCHAR(100) NOT NULL,
                                 "User" VARCHAR(255) NOT NULL,
                                 "SourceIP" VARCHAR(45) NOT NULL,
                                 "TargetResource" VARCHAR(500),
                                 "Action" VARCHAR(50) NOT NULL,
                                 "Details" TEXT,
                                 "Result" VARCHAR(50) NOT NULL
);

CREATE INDEX idx_app_server1_timestamp ON app_server1_log("Timestamp");
CREATE INDEX idx_app_server1_user ON app_server1_log("User");
CREATE INDEX idx_app_server1_source_ip ON app_server1_log("SourceIP");
CREATE INDEX idx_app_server1_event_type ON app_server1_log("EventType");

-- DB Server 1 Log Table
CREATE TABLE db_server1_log (
                                id SERIAL PRIMARY KEY,
                                "Timestamp" TIMESTAMP NOT NULL,
                                "EventType" VARCHAR(100) NOT NULL,
                                "User" VARCHAR(255) NOT NULL,
                                "SourceIP" VARCHAR(45) NOT NULL,
                                "Database" VARCHAR(255),
                                "Query" TEXT,
                                "RowsAffected" TEXT,
                                "Details" TEXT,
                                "Result" VARCHAR(50) NOT NULL
);

CREATE INDEX idx_db_server1_timestamp ON db_server1_log("Timestamp");
CREATE INDEX idx_db_server1_user ON db_server1_log("User");
CREATE INDEX idx_db_server1_source_ip ON db_server1_log("SourceIP");
CREATE INDEX idx_db_server1_database ON db_server1_log("Database");
CREATE INDEX idx_db_server1_event_type ON db_server1_log("EventType");

-- App Server 2 Log Table
CREATE TABLE app_server2_log (
                                 id SERIAL PRIMARY KEY,
                                 "Timestamp" TIMESTAMP NOT NULL,
                                 "EventType" VARCHAR(100) NOT NULL,
                                 "User" VARCHAR(255) NOT NULL,
                                 "SourceIP" VARCHAR(45) NOT NULL,
                                 "TargetResource" VARCHAR(500),
                                 "Action" VARCHAR(50) NOT NULL,
                                 "Details" TEXT,
                                 "Result" VARCHAR(50) NOT NULL
);

CREATE INDEX idx_app_server2_timestamp ON app_server2_log("Timestamp");
CREATE INDEX idx_app_server2_user ON app_server2_log("User");
CREATE INDEX idx_app_server2_source_ip ON app_server2_log("SourceIP");
CREATE INDEX idx_app_server2_event_type ON app_server2_log("EventType");

-- DB Server 2 Log Table
CREATE TABLE db_server2_log (
                                id SERIAL PRIMARY KEY,
                                "Timestamp" TIMESTAMP NOT NULL,
                                "EventType" VARCHAR(100) NOT NULL,
                                "User" VARCHAR(255) NOT NULL,
                                "SourceIP" VARCHAR(45) NOT NULL,
                                "Database" VARCHAR(255),
                                "Query" TEXT,
                                "RowsAffected" TEXT,
                                "Details" TEXT,
                                "Result" VARCHAR(50) NOT NULL
);

CREATE INDEX idx_db_server2_timestamp ON db_server2_log("Timestamp");
CREATE INDEX idx_db_server2_user ON db_server2_log("User");
CREATE INDEX idx_db_server2_source_ip ON db_server2_log("SourceIP");
CREATE INDEX idx_db_server2_database ON db_server2_log("Database");
CREATE INDEX idx_db_server2_event_type ON db_server2_log("EventType");

-- App Server 3 Log Table
CREATE TABLE app_server3_log (
                                 id SERIAL PRIMARY KEY,
                                 "Timestamp" TIMESTAMP NOT NULL,
                                 "EventType" VARCHAR(100) NOT NULL,
                                 "User" VARCHAR(255) NOT NULL,
                                 "SourceIP" VARCHAR(45) NOT NULL,
                                 "TargetResource" VARCHAR(500),
                                 "Action" VARCHAR(50) NOT NULL,
                                 "Details" TEXT,
                                 "Result" VARCHAR(50) NOT NULL
);

CREATE INDEX idx_app_server3_timestamp ON app_server3_log("Timestamp");
CREATE INDEX idx_app_server3_user ON app_server3_log("User");
CREATE INDEX idx_app_server3_source_ip ON app_server3_log("SourceIP");
CREATE INDEX idx_app_server3_event_type ON app_server3_log("EventType");

-- DB Server 3 Log Table
CREATE TABLE db_server3_log (
                                id SERIAL PRIMARY KEY,
                                "Timestamp" TIMESTAMP NOT NULL,
                                "EventType" VARCHAR(100) NOT NULL,
                                "User" VARCHAR(255) NOT NULL,
                                "SourceIP" VARCHAR(45) NOT NULL,
                                "Database" VARCHAR(255),
                                "Query" TEXT,
                                "RowsAffected" TEXT,
                                "Details" TEXT,
                                "Result" VARCHAR(50) NOT NULL
);

CREATE INDEX idx_db_server3_timestamp ON db_server3_log("Timestamp");
CREATE INDEX idx_db_server3_user ON db_server3_log("User");
CREATE INDEX idx_db_server3_source_ip ON db_server3_log("SourceIP");
CREATE INDEX idx_db_server3_database ON db_server3_log("Database");
CREATE INDEX idx_db_server3_event_type ON db_server3_log("EventType");