-- Additive migration. Existing chapter content, user accounts and completion records are preserved.
CREATE TABLE IF NOT EXISTS academy_learning_state (
 user_id uuid NOT NULL REFERENCES academy_users(id) ON DELETE CASCADE,
 chapter_id text NOT NULL,
 completed_modules jsonb NOT NULL DEFAULT '{}'::jsonb,
 notes jsonb NOT NULL DEFAULT '{}'::jsonb,
 favorite boolean NOT NULL DEFAULT false,
 current_module_id text,
 updated_at timestamptz NOT NULL DEFAULT NOW(),
 PRIMARY KEY(user_id,chapter_id)
);
