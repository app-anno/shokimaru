-- Create storage bucket for images if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the images bucket
CREATE POLICY "Images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

CREATE POLICY "Anyone can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Anyone can update images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'images');

CREATE POLICY "Anyone can delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'images');