interface TagListProps {
  tags: string[];
  subtle?: boolean;
}

export function TagList({ tags, subtle = false }: TagListProps) {
  if (!tags.length) {
    return null;
  }

  return (
    <div className="tag-row">
      {tags.map((tag) => (
        <span key={tag} className={subtle ? "tag subtle" : "tag"}>
          {tag}
        </span>
      ))}
    </div>
  );
}
