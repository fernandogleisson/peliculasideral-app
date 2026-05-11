CREATE TABLE "substack_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"substack_id" text NOT NULL,
	"email" text NOT NULL,
	"display_name" text,
	"plan" text,
	"subscribed_at" timestamp with time zone,
	"status" text,
	"migration_token" text,
	"migration_email_sent_at" timestamp with time zone,
	"profile_id" uuid,
	"migrated_at" timestamp with time zone,
	CONSTRAINT "substack_subscribers_substack_id_unique" UNIQUE("substack_id"),
	CONSTRAINT "substack_subscribers_migration_token_unique" UNIQUE("migration_token"),
	CONSTRAINT "substack_status_check" CHECK ("substack_subscribers"."status" IS NULL OR "substack_subscribers"."status" IN ('active','expired','cancelled'))
);
--> statement-breakpoint
ALTER TABLE "substack_subscribers" ADD CONSTRAINT "substack_subscribers_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "substack_email_idx" ON "substack_subscribers" USING btree ("email");--> statement-breakpoint
CREATE INDEX "substack_token_idx" ON "substack_subscribers" USING btree ("migration_token") WHERE "substack_subscribers"."migration_token" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "substack_profile_idx" ON "substack_subscribers" USING btree ("profile_id") WHERE "substack_subscribers"."profile_id" IS NOT NULL;