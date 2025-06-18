-- Sample data demonstrating structured content types
-- This shows how your Google Sheets yearly overview would be modeled

-- Sample user (replace with actual user ID)
-- INSERT INTO users (id, email, name) VALUES ('550e8400-e29b-41d4-a716-446655440000', 'user@example.com', 'Sample User');

-- Sample yearly overview entries based on your Google Sheets data
INSERT INTO memories (
    id,
    user_id, 
    title,
    content_type,
    content_schema_version,
    body,
    memory_date,
    visibility,
    is_draft
) VALUES 

-- 2009 Overview
(
    uuid_generate_v4(),
    '550e8400-e29b-41d4-a716-446655440000', -- Replace with actual user ID
    'Resumen del año 2009 - 17',
    'yearly_overview',
    1,
    '{
        "year": 2009,
        "age": 17,
        "studies": "BDS Senior",
        "relationships": "Vicky Medina, Nicky Alston, Belu Conteri",
        "children": "",
        "long_trips": "Porto Seguro!",
        "short_trips": "",
        "work": "",
        "side_hustle": "",
        "sports": "Basket Harrods Sub 17",
        "important_events": "",
        "car": "",
        "housing": "Conesa",
        "phone": "",
        "additional_info": "",
        "annual_salary_usd": null,
        "key_achievements": ["BDS Senior completion", "Porto Seguro trip"],
        "challenges_faced": [],
        "lessons_learned": "",
        "goals_for_next_year": []
    }',
    '2009-12-31'::timestamp with time zone,
    'private',
    false
),

-- 2010 Overview  
(
    uuid_generate_v4(),
    '550e8400-e29b-41d4-a716-446655440000',
    'Resumen del año 2010 - 18',
    'yearly_overview',
    1,
    '{
        "year": 2010,
        "age": 18,
        "studies": "1er año Ditella",
        "relationships": "Noviazgo Mai",
        "children": "",
        "long_trips": "Inglaterra - Gales",
        "short_trips": "-",
        "work": "-",
        "side_hustle": "",
        "sports": "Basket Harrods Sub 19",
        "important_events": "",
        "car": "-",
        "housing": "Conesa",
        "phone": "Sony Ericcson?",
        "additional_info": "",
        "annual_salary_usd": null,
        "key_achievements": ["Started university at Ditella", "Trip to England and Wales"],
        "challenges_faced": [],
        "lessons_learned": "",
        "goals_for_next_year": []
    }',
    '2010-12-31'::timestamp with time zone,
    'private',
    false
),

-- 2013 Overview (with salary data)
(
    uuid_generate_v4(),
    '550e8400-e29b-41d4-a716-446655440000',
    'Resumen del año 2013 - 21',
    'yearly_overview', 
    1,
    '{
        "year": 2013,
        "age": 21,
        "studies": "4to año Ditella",
        "relationships": "Noviazgo Mai / Corte Mai",
        "children": "",
        "long_trips": "Cuba - Cayos / Chile - Reñaca (Guido y pelo)",
        "short_trips": "Gualeguaychu - Amigos",
        "work": "-",
        "side_hustle": "GoFiesta/UIN",
        "sports": "Basket Richmond Kungfu",
        "important_events": "Lol fever",
        "car": "Gol Trend negro",
        "housing": "Conesa",
        "phone": "",
        "additional_info": "",
        "annual_salary_usd": 8000,
        "key_achievements": ["Final year of university", "Started GoFiesta/UIN", "Got first car"],
        "challenges_faced": ["Relationship breakup with Mai"],
        "lessons_learned": "University final year challenges, entrepreneurship experience",
        "goals_for_next_year": ["Graduate", "Expand side hustle"]
    }',
    '2013-12-31'::timestamp with time zone,
    'private',
    false
);

-- Sample milestone entries
INSERT INTO memories (
    id,
    user_id,
    title, 
    content_type,
    content_schema_version,
    body,
    memory_date,
    visibility,
    is_draft
) VALUES

-- University graduation milestone
(
    uuid_generate_v4(),
    '550e8400-e29b-41d4-a716-446655440000',
    'Graduated from Ditella University',
    'milestone',
    1,
    '{
        "title": "Graduated from Ditella University",
        "category": "education",
        "achievement_date": "2014-05-15",
        "description": "Completed 4-year degree at Universidad Torcuato Di Tella",
        "impact_score": 9,
        "celebration": "Family dinner and trip with friends",
        "lessons_learned": "Persistence and time management are key to academic success",
        "next_steps": "Focus on career development and applying learned skills",
        "people_involved": ["Family", "University friends", "Professors"],
        "supporting_documents": ["Diploma", "Graduation photos"]
    }',
    '2014-05-15'::timestamp with time zone,
    'private',
    false
),

-- First car milestone
(
    uuid_generate_v4(), 
    '550e8400-e29b-41d4-a716-446655440000',
    'Bought First Car - Gol Trend',
    'milestone',
    1,
    '{
        "title": "Bought First Car - Gol Trend",
        "category": "personal",
        "achievement_date": "2013-08-20",
        "description": "Purchased my first car - a black Gol Trend. Freedom and independence milestone!",
        "impact_score": 8,
        "celebration": "Drove around the city with friends",
        "lessons_learned": "Financial responsibility and the value of saving for goals",
        "next_steps": "Learn proper car maintenance and safe driving habits",
        "people_involved": ["Parents for advice", "Friends for celebration"],
        "supporting_documents": ["Car registration", "First drive photos"]
    }',
    '2013-08-20'::timestamp with time zone,
    'private',
    false
);

-- Sample goal entry
INSERT INTO memories (
    id,
    user_id,
    title,
    content_type, 
    content_schema_version,
    body,
    memory_date,
    visibility,
    is_draft
) VALUES
(
    uuid_generate_v4(),
    '550e8400-e29b-41d4-a716-446655440000',
    'Build Successful Side Hustle',
    'goal',
    1,
    '{
        "title": "Build Successful Side Hustle", 
        "category": "career",
        "description": "Develop GoFiesta/UIN into a profitable business while finishing university",
        "target_date": "2014-12-31",
        "priority": "high",
        "status": "in_progress",
        "progress_percentage": 60,
        "milestones": [
            {
                "title": "Launch MVP",
                "completed": true,
                "date": "2013-03-15"
            },
            {
                "title": "Get first 100 customers", 
                "completed": true,
                "date": "2013-07-20"
            },
            {
                "title": "Reach $1000 monthly revenue",
                "completed": false,
                "date": "2014-06-30"
            }
        ],
        "obstacles": "Balancing time between university studies and business development",
        "resources_needed": "More time for marketing, potential co-founder for tech development"
    }',
    '2013-01-01'::timestamp with time zone,
    'private',
    false
);

-- Show how to query structured content
-- 
-- Examples of useful queries:
--
-- 1. Get all yearly overviews ordered by year:
-- SELECT title, (body->>'year')::int as year, body FROM memories 
-- WHERE content_type = 'yearly_overview' AND user_id = '550e8400-e29b-41d4-a716-446655440000'
-- ORDER BY (body->>'year')::int;
--
-- 2. Get salary progression over years:
-- SELECT (body->>'year')::int as year, (body->>'annual_salary_usd')::numeric as salary 
-- FROM memories 
-- WHERE content_type = 'yearly_overview' 
--   AND user_id = '550e8400-e29b-41d4-a716-446655440000'
--   AND body->>'annual_salary_usd' IS NOT NULL
-- ORDER BY (body->>'year')::int;
--
-- 3. Get all milestones by category:
-- SELECT title, body->>'category' as category, body->>'achievement_date' as date
-- FROM memories
-- WHERE content_type = 'milestone' AND user_id = '550e8400-e29b-41d4-a716-446655440000'
-- ORDER BY body->>'achievement_date';
--
-- 4. Get goals with their progress:
-- SELECT title, body->>'status' as status, (body->>'progress_percentage')::int as progress
-- FROM memories  
-- WHERE content_type = 'goal' AND user_id = '550e8400-e29b-41d4-a716-446655440000'
-- ORDER BY (body->>'progress_percentage')::int DESC; 