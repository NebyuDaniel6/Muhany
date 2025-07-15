import React from "react";

interface ProductFilterProps {
  types: string[];
  typeFilter: string | null;
  setTypeFilter: (type: string | null) => void;
  sort: string;
  setSort: (sort: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ types, typeFilter, setTypeFilter, sort, setSort }) => (
  <div className="flex gap-4 mb-8">
    <select
      value={typeFilter ?? ""}
      onChange={e => setTypeFilter(e.target.value || null)}
      className="p-2 rounded border"
    >
      <option value="">All Types</option>
      {types.map(type => (
        <option key={type} value={type}>{type}</option>
      ))}
    </select>
    <select
      value={sort}
      onChange={e => setSort(e.target.value)}
      className="p-2 rounded border"
    >
      <option value="rating">Sort by Rating</option>
      <option value="price">Sort by Price</option>
    </select>
  </div>
);

export default ProductFilter; 