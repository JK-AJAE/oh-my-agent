export interface EnglishDraft {
  title: string;
  tags: string[];
  body_markdown: string;
  source_url?: string;
}

export interface JapaneseDraft {
  title: string;
  body: string;
  tags: string[];
  source_url: string;
}

// TabNews has no tag system; content is title + body + source_url only.
export interface PortugueseDraft {
  title: string;
  body: string;
  source_url: string;
}

export interface SkipPayload {
  skip: true;
  reason: string;
}
