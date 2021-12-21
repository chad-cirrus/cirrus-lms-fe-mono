export interface IContent {
  id: number;
  title: string;
  subtitle: string;
  status?: boolean | null;
  score?: number | null;
  url: string;
  estimated_time: string;
  created_at: string;
  updated_at: string;
  content_type: number;
  meta_tags: string[];
  content_html?: string | null;
  link_id?: string | null;
  desc: string;
  placeholder_image: string;
  content_file?: string | null;
  jet_scoring: boolean;
  created_by: string;
  upload_image?: string | null;
  content_filename: string;
  blob_directory?: string | null;
  starter_file?: string | null;
  version: number;
  show_comments: boolean;
  order: number;
}
