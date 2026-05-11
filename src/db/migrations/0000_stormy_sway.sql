CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"display_name" text,
	"avatar_url" text,
	"whatsapp" text,
	"instagram" text,
	"birth_date" date NOT NULL,
	"birth_time" time,
	"birth_time_known" boolean DEFAULT true NOT NULL,
	"birth_city" text NOT NULL,
	"birth_state" text,
	"birth_country" text NOT NULL,
	"birth_lat" numeric(8, 5) NOT NULL,
	"birth_lng" numeric(8, 5) NOT NULL,
	"birth_tz" text NOT NULL,
	"locale" text DEFAULT 'pt-BR' NOT NULL,
	"currency_pref" text DEFAULT 'BRL' NOT NULL,
	"tier" text DEFAULT 'free' NOT NULL,
	"tier_expires_at" timestamp with time zone,
	"substack_migrated" boolean DEFAULT false NOT NULL,
	"substack_subscriber_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_username_unique" UNIQUE("username"),
	CONSTRAINT "profiles_locale_check" CHECK ("profiles"."locale" IN ('pt-BR','en-US','es-419')),
	CONSTRAINT "profiles_currency_check" CHECK ("profiles"."currency_pref" IN ('BRL','USD','EUR')),
	CONSTRAINT "profiles_tier_check" CHECK ("profiles"."tier" IN ('free','premium'))
);
--> statement-breakpoint
CREATE INDEX "profiles_username_idx" ON "profiles" USING btree ("username");--> statement-breakpoint
CREATE INDEX "profiles_tier_premium_idx" ON "profiles" USING btree ("tier") WHERE "profiles"."tier" = 'premium';--> statement-breakpoint
CREATE INDEX "profiles_substack_idx" ON "profiles" USING btree ("substack_migrated") WHERE "profiles"."substack_migrated" = true;