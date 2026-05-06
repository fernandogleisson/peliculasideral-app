CREATE TABLE "birth_data_change_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"old_data" jsonb NOT NULL,
	"new_data" jsonb NOT NULL,
	"changed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip_address" "inet"
);
--> statement-breakpoint
ALTER TABLE "birth_data_change_log" ADD CONSTRAINT "birth_data_change_log_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "birth_change_profile_at_idx" ON "birth_data_change_log" USING btree ("profile_id","changed_at");