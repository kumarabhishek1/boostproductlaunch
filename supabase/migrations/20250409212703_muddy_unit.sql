/*
  # Create FAQs table

  1. New Tables
    - `faqs`
      - `id` (uuid, primary key)
      - `question` (text, not null)
      - `answer` (text, not null)
      - `order` (integer, not null)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `faqs` table
    - Add policy for public read access
    - Add policy for authenticated admin users to manage FAQs
*/

CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON faqs
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage FAQs
CREATE POLICY "Allow authenticated users to manage FAQs"
  ON faqs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial FAQs
INSERT INTO faqs (question, answer, "order") VALUES
  ('How does your distribution service work?', 'We leverage our extensive network of tech communities across Reddit, WhatsApp, Telegram, and Discord to promote your Product Hunt launch. Our community members are active Product Hunt users who are genuinely interested in discovering and supporting new products.', 1),
  ('When should I contact you before my launch?', 'We recommend reaching out at least 1-2 weeks before your planned Product Hunt launch date. This gives us enough time to prepare the distribution strategy and ensure maximum impact on launch day.', 2),
  ('Do you guarantee a top position?', 'While we can''t guarantee specific positions, our track record shows that 99% of our supported products reach Top 5, with over 90% reaching Top 3 positions. Success depends on various factors including product quality and market fit.', 3),
  ('What makes your service different from others?', 'Our service stands out due to our authentic community approach. We focus on real engagement from genuine users rather than artificial methods. Our extensive network of 1.5M+ reach across various platforms ensures broad, organic visibility.', 4),
  ('What information do you need to get started?', 'We need your product details, planned launch date, Product Hunt page URL (if already scheduled), and your preferred distribution scale. You can provide these through our contact form.', 5),
  ('Do you offer post-launch support?', 'Yes, depending on your chosen plan. We provide post-launch momentum support to maintain visibility and engagement beyond the launch day, especially with our Pro and Elite packages.', 6);