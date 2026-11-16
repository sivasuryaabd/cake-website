import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchproducts, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(queryFromUrl);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    let active = true;
    fetchproducts()
      .then((data) => {
        if (active) {
          setProducts(data);
          setStatus('ready');
        }
      })
      .catch(() => active && setStatus('error'));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setQuery(queryFromUrl);
  }, [queryFromUrl]);

  const filtered = useMemo(() => {
    let result = products;

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    const sorted = [...result];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);

    return sorted;
  }, [products, category, query, sort]);

  function handleQueryChange(value) {
    setQuery(value);
    if (value.trim()) {
      setSearchParams({ q: value.trim() });
    } else {
      setSearchParams({});
    }
  }

  return (
    <section className="shop-page">
      <div className="container">
        <header className="section-header">
          <p className="section-eyebrow">The full case</p>
          <h1>Shop all cakes</h1>
        </header>

        <div className="shop-controls">
          <input
            type="search"
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Search cakes by name or flavor..."
            aria-label="Search products"
            className="shop-search"
          />

          <div className="shop-filters">
            <div className="category-pills" role="group" aria-label="Filter by category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`pill ${category === cat.id ? 'pill-active' : ''}`}
                  onClick={() => setCategory(cat.id)}
                  aria-pressed={category === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <label className="sort-select">
              <span className="visually-hidden">Sort by</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>
        </div>

        {status === 'loading' && <p className="state-message">Loading cakes…</p>}
        {status === 'error' && (
          <p className="state-message">Something went wrong loading the menu. Please refresh.</p>
        )}

        {status === 'ready' && filtered.length === 0 && (
          <div className="empty-state">
            <h3>No cakes match that search</h3>
            <p>Try a different name, flavor, or clear your filters.</p>
          </div>
        )}

        {status === 'ready' && filtered.length > 0 && (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
