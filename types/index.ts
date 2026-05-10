export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface TechCategory {
  id: string;
  title: string;
  items: readonly string[];
}

export interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  number: string;
}
