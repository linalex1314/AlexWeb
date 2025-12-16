import React from 'react';

interface EditableProps {
  value: string;
  onSave: (val: string) => void;
  className?: string;
  multiline?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  isEditMode?: boolean;
}

export const Editable: React.FC<EditableProps> = ({
  value,
  onSave,
  className = '',
  multiline = false,
  tag: Tag = 'span',
  isEditMode = false,
}) => {
  if (!isEditMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (multiline) {
    return (
      <textarea
        className={`w-full bg-slate-800 text-white border border-blue-500 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        value={value}
        onChange={(e) => onSave(e.target.value)}
        rows={4}
      />
    );
  }

  return (
    <input
      type="text"
      className={`bg-slate-800 text-white border-b border-blue-500 min-w-[200px] px-1 focus:outline-none focus:border-blue-300 ${className}`}
      value={value}
      onChange={(e) => onSave(e.target.value)}
    />
  );
};