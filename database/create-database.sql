CREATE TABLE "Comp_time"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "month" TINYINT NOT NULL,
    "year" TINYINT NOT NULL,
    "hours" TINYINT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME NOT NULL
);
ALTER TABLE
    "Comp_time" ADD CONSTRAINT "comp_time_id_primary" PRIMARY KEY("id");
CREATE TABLE "Absence_types"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME NULL
);
ALTER TABLE
    "Absence_types" ADD CONSTRAINT "absence_types_id_primary" PRIMARY KEY("id");
CREATE TABLE "Users"(
    "id" BIGINT NOT NULL,
    "sector_id" BIGINT NOT NULL,
    "office_id" BIGINT NOT NULL,
    "scale_id" BIGINT NOT NULL,
    "document" VARCHAR(20) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "is_admin" BIT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME NULL
);
ALTER TABLE
    "Users" ADD CONSTRAINT "users_id_primary" PRIMARY KEY("id");
CREATE TABLE "Turns"(
    "id" BIGINT NOT NULL,
    "hour_start" TIME NOT NULL,
    "hour_end" TIME NOT NULL,
    "has_lunch" BIT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME NOT NULL
);
ALTER TABLE
    "Turns" ADD CONSTRAINT "turns_id_primary" PRIMARY KEY("id");
CREATE TABLE "Absences"(
    "id" BIGINT NOT NULL,
    "type_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "justification" VARCHAR(255) NOT NULL,
    "date_start" DATE NOT NULL,
    "date_end" DATE NULL,
    "hour_start" DATE NULL,
    "hour_end" DATE NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME NULL
);
ALTER TABLE
    "Absences" ADD CONSTRAINT "absences_id_primary" PRIMARY KEY("id");
CREATE TABLE "Sectors"(
    "id" BIGINT NOT NULL,
    "scale_id" BIGINT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME NULL
);
ALTER TABLE
    "Sectors" ADD CONSTRAINT "sectors_id_primary" PRIMARY KEY("id");
CREATE TABLE "Hour_points"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    "hour" TIME NOT NULL,
    "year" TINYINT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME NULL
);
ALTER TABLE
    "Hour_points" ADD CONSTRAINT "hour_points_id_primary" PRIMARY KEY("id");
CREATE TABLE "Scales"(
    "id" BIGINT NOT NULL,
    "general_turn_id" BIGINT NOT NULL,
    "lunch_turn_id" BIGINT NOT NULL,
    "is_default" BIT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME NULL
);
ALTER TABLE
    "Scales" ADD CONSTRAINT "scales_id_primary" PRIMARY KEY("id");
CREATE TABLE "Global_config"(
    "id" BIGINT NOT NULL,
    "minutes_to_extra_hour" TINYINT NOT NULL,
    "days_to_expiration" TINYINT NOT NULL,
    "working_saturday" BIT NOT NULL,
    "working_sunday" BIT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);
ALTER TABLE
    "Global_config" ADD CONSTRAINT "global_config_id_primary" PRIMARY KEY("id");
CREATE TABLE "Offices"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "city" VARCHAR(80) NOT NULL,
    "state" NCHAR(2) NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME NULL
);
ALTER TABLE
    "Offices" ADD CONSTRAINT "offices_id_primary" PRIMARY KEY("id");
ALTER TABLE
    "Users" ADD CONSTRAINT "users_office_id_foreign" FOREIGN KEY("office_id") REFERENCES "Offices"("id");
ALTER TABLE
    "Scales" ADD CONSTRAINT "scales_general_turn_id_foreign" FOREIGN KEY("general_turn_id") REFERENCES "Turns"("id");
ALTER TABLE
    "Absences" ADD CONSTRAINT "absences_type_id_foreign" FOREIGN KEY("type_id") REFERENCES "Absence_types"("id");
ALTER TABLE
    "Users" ADD CONSTRAINT "users_sector_id_foreign" FOREIGN KEY("sector_id") REFERENCES "Sectors"("id");
ALTER TABLE
    "Hour_points" ADD CONSTRAINT "hour_points_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "Users"("id");
ALTER TABLE
    "Users" ADD CONSTRAINT "users_scale_id_foreign" FOREIGN KEY("scale_id") REFERENCES "Scales"("id");
ALTER TABLE
    "Scales" ADD CONSTRAINT "scales_lunch_turn_id_foreign" FOREIGN KEY("lunch_turn_id") REFERENCES "Turns"("id");
ALTER TABLE
    "Absences" ADD CONSTRAINT "absences_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "Users"("id");
ALTER TABLE
    "Sectors" ADD CONSTRAINT "sectors_scale_id_foreign" FOREIGN KEY("scale_id") REFERENCES "Scales"("id");
ALTER TABLE
    "Comp_time" ADD CONSTRAINT "comp_time_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "Users"("id");