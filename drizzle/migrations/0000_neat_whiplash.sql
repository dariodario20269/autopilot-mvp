CREATE TYPE "public"."analytics_level" AS ENUM('basic', 'full');--> statement-breakpoint
CREATE TYPE "public"."booking_status" AS ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no-show');--> statement-breakpoint
CREATE TYPE "public"."notification_status" AS ENUM('pending', 'sent', 'failed');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('booking_confirmation', 'booking_reminder', 'payment_receipt', 'owner_alert', 'new_inquiry');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('paypal', 'stripe');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."subscription_tier" AS ENUM('free', 'basic', 'pro');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"startTime" timestamp NOT NULL,
	"endTime" timestamp NOT NULL,
	"customerName" varchar(255) NOT NULL,
	"customerEmail" varchar(320) NOT NULL,
	"customerPhone" varchar(20),
	"status" "booking_status" DEFAULT 'pending' NOT NULL,
	"reminderSentAt" timestamp,
	"confirmationSentAt" timestamp,
	"paymentStatus" "payment_status" DEFAULT 'pending' NOT NULL,
	"paymentId" varchar(255),
	"amount" numeric(10, 2),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brandedBookingPages" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"slug" varchar(255) NOT NULL,
	"customDomain" varchar(255),
	"logoUrl" varchar(1024),
	"primaryColor" varchar(7) DEFAULT '#000000' NOT NULL,
	"secondaryColor" varchar(7) DEFAULT '#FFFFFF' NOT NULL,
	"description" text,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "brandedBookingPages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "earlyAdopterCounter" (
	"id" serial PRIMARY KEY NOT NULL,
	"slotsUsed" integer DEFAULT 0 NOT NULL,
	"maxSlots" integer DEFAULT 10 NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "emailConversations" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"senderEmail" varchar(320) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"messageHistory" text,
	"lastMessageAt" timestamp NOT NULL,
	"autoReplyGenerated" boolean DEFAULT false NOT NULL,
	"autoReplyContent" text,
	"flaggedForReview" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"paymentId" integer NOT NULL,
	"invoiceNumber" varchar(255) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"description" text NOT NULL,
	"pdfUrl" varchar(1024),
	"sentAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "invoices_invoiceNumber_unique" UNIQUE("invoiceNumber")
);
--> statement-breakpoint
CREATE TABLE "knowledgeBase" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"category" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"isDefault" boolean DEFAULT false NOT NULL,
	"searchKeywords" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"type" "notification_type" NOT NULL,
	"recipientEmail" varchar(320) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"body" text NOT NULL,
	"status" "notification_status" DEFAULT 'pending' NOT NULL,
	"sentAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"bookingId" integer,
	"subscriptionId" varchar(255),
	"amount" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"paymentMethod" "payment_method" NOT NULL,
	"paymentId" varchar(255) NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"invoiceId" varchar(255),
	"refundId" varchar(255),
	"refundReason" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "payments_paymentId_unique" UNIQUE("paymentId")
);
--> statement-breakpoint
CREATE TABLE "subscriptionTiers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "subscription_tier" NOT NULL,
	"monthlyPrice" numeric(10, 2),
	"bookingsPerMonth" integer DEFAULT -1 NOT NULL,
	"emailRepliesPerMonth" integer DEFAULT -1 NOT NULL,
	"whatsappRepliesPerMonth" integer DEFAULT -1 NOT NULL,
	"socialRepliesPerMonth" integer DEFAULT -1 NOT NULL,
	"knowledgeBaseEditable" boolean DEFAULT false NOT NULL,
	"brandedBookingPage" boolean DEFAULT false NOT NULL,
	"paypalPayments" boolean DEFAULT false NOT NULL,
	"teamMembers" integer DEFAULT 1 NOT NULL,
	"analyticsLevel" "analytics_level" DEFAULT 'basic' NOT NULL,
	CONSTRAINT "subscriptionTiers_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "usageTracking" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"month" date NOT NULL,
	"bookingsUsed" integer DEFAULT 0 NOT NULL,
	"emailRepliesUsed" integer DEFAULT 0 NOT NULL,
	"whatsappRepliesUsed" integer DEFAULT 0 NOT NULL,
	"socialRepliesUsed" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"subscriptionTier" "subscription_tier" DEFAULT 'free' NOT NULL,
	"trialStartedAt" timestamp DEFAULT now() NOT NULL,
	"trialDaysRemaining" integer DEFAULT 30 NOT NULL,
	"isEarlyAdopter" boolean DEFAULT false NOT NULL,
	"trialConvertedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
--> statement-breakpoint
CREATE TABLE "whatsappConversations" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"customerPhone" varchar(20) NOT NULL,
	"messageHistory" text,
	"lastMessageAt" timestamp NOT NULL,
	"autoReplyGenerated" boolean DEFAULT false NOT NULL,
	"autoReplyContent" text,
	"flaggedForReview" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
