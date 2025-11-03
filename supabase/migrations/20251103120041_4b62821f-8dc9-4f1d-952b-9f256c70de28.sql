-- Create user analysis results table
CREATE TABLE public.user_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  linkedin_url TEXT,
  github_id TEXT,
  resume_score INTEGER DEFAULT 0,
  coding_stats JSONB DEFAULT '{}',
  certifications JSONB DEFAULT '[]',
  feedback TEXT,
  recommendations JSONB DEFAULT '[]',
  progress JSONB DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create mock interview results table
CREATE TABLE public.mock_interviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  ai_feedback TEXT,
  score INTEGER,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  issuer TEXT,
  issue_date DATE,
  verification_hash TEXT,
  verified BOOLEAN DEFAULT false,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_analysis
CREATE POLICY "Users can view own analysis"
  ON public.user_analysis FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can insert own analysis"
  ON public.user_analysis FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analysis"
  ON public.user_analysis FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analysis"
  ON public.user_analysis FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for mock_interviews
CREATE POLICY "Users can view own interviews"
  ON public.mock_interviews FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interviews"
  ON public.mock_interviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for certifications
CREATE POLICY "Users can view own certifications"
  ON public.certifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own certifications"
  ON public.certifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own certifications"
  ON public.certifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_analysis_updated_at
  BEFORE UPDATE ON public.user_analysis
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();