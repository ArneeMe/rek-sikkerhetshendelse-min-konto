-- supabase/migrations/006_documents.sql
-- Create documents table for storing company policy documents, procedures, etc.

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id INT,  -- null = visible to all teams
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('policy', 'procedure', 'guide', 'other')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_documents_team ON documents(team_id);
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_documents_title ON documents(title);

-- Sample documents
INSERT INTO documents (team_id, title, content, category) VALUES
(NULL, 'Ferieplan 2024-2025', 
'# Ferieplan Nordavind Solutions

HR Manager: Frithjof Fredriksen', 'other'),

(NULL, 'Sikkerhetsrutiner - Nordavind Solutions',
'# Sikkerhetsrutiner for Nordavind Solutions
TBD
', 'policy'),

