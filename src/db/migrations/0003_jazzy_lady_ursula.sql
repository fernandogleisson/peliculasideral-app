CREATE TABLE "astrologer_chart_cache" (
	"chart_hash" text PRIMARY KEY NOT NULL,
	"chart_data" jsonb NOT NULL,
	"chart_version" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_used_at" timestamp with time zone DEFAULT now() NOT NULL,
	"hit_count" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE INDEX "astrologer_cache_last_used_idx" ON "astrologer_chart_cache" USING btree ("last_used_at");