CREATE TABLE "lgpd_consent_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"consent_type" text NOT NULL,
	"granted" boolean NOT NULL,
	"version" text NOT NULL,
	"ip_address" "inet",
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "lgpd_consent_type_check" CHECK ("lgpd_consent_log"."consent_type" IN ('terms','privacy','marketing_email','marketing_whatsapp','cookies_analytics'))
);
--> statement-breakpoint
ALTER TABLE "lgpd_consent_log" ADD CONSTRAINT "lgpd_consent_log_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lgpd_consent_profile_type_idx" ON "lgpd_consent_log" USING btree ("profile_id","consent_type");