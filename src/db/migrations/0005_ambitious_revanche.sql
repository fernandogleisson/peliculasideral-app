CREATE TABLE "mapas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"chart_hash" text NOT NULL,
	"chart_data" jsonb NOT NULL,
	"chart_version" text NOT NULL,
	"house_system" text DEFAULT 'placidus' NOT NULL,
	"revision" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "mapas_house_system_check" CHECK ("mapas"."house_system" IN ('placidus','koch','whole_sign'))
);
--> statement-breakpoint
CREATE TABLE "interpretations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"key" text NOT NULL,
	"short_text" text NOT NULL,
	"long_text" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"author_id" uuid,
	"revision" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "interpretations_type_key_unique" UNIQUE("type","key"),
	CONSTRAINT "interpretations_type_check" CHECK ("interpretations"."type" IN ('planet_in_sign_house','planet_aspect_planet','house_in_sign','ascendant_sign')),
	CONSTRAINT "interpretations_status_check" CHECK ("interpretations"."status" IN ('draft','review','published','archived'))
);
--> statement-breakpoint
CREATE TABLE "interpretation_revisions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"interpretation_id" uuid NOT NULL,
	"revision" integer NOT NULL,
	"short_text" text NOT NULL,
	"long_text" text NOT NULL,
	"status_at_save" text NOT NULL,
	"author_id" uuid,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interpretation_review_assists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"interpretation_id" uuid NOT NULL,
	"agent" text NOT NULL,
	"prompt_used" text NOT NULL,
	"ai_output" text NOT NULL,
	"ai_metadata" jsonb,
	"requested_by" uuid,
	"accepted" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "mapas" ADD CONSTRAINT "mapas_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interpretation_revisions" ADD CONSTRAINT "interpretation_revisions_interpretation_id_interpretations_id_fk" FOREIGN KEY ("interpretation_id") REFERENCES "public"."interpretations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interpretation_review_assists" ADD CONSTRAINT "interpretation_review_assists_interpretation_id_interpretations_id_fk" FOREIGN KEY ("interpretation_id") REFERENCES "public"."interpretations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "mapas_profile_idx" ON "mapas" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "mapas_chart_hash_idx" ON "mapas" USING btree ("chart_hash");--> statement-breakpoint
CREATE INDEX "interpretations_type_idx" ON "interpretations" USING btree ("type");--> statement-breakpoint
CREATE INDEX "interpretations_status_idx" ON "interpretations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "interpretations_published_idx" ON "interpretations" USING btree ("type","key") WHERE "interpretations"."status" = 'published';--> statement-breakpoint
CREATE INDEX "interp_rev_interp_idx" ON "interpretation_revisions" USING btree ("interpretation_id");--> statement-breakpoint
CREATE INDEX "interp_rev_interp_revision_idx" ON "interpretation_revisions" USING btree ("interpretation_id","revision");--> statement-breakpoint
CREATE INDEX "interp_assists_interp_idx" ON "interpretation_review_assists" USING btree ("interpretation_id");--> statement-breakpoint
CREATE INDEX "interp_assists_agent_idx" ON "interpretation_review_assists" USING btree ("agent");