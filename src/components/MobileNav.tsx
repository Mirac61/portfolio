export function MobileNav({
  tabs,
  activeTab,
  onOpen,
}: {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onOpen: (id: string) => void;
}) {
  return (
    <nav className="mobile-nav" aria-label="Hauptnavigation">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`mobile-nav-tab ${activeTab === id ? 'active' : ''}`}
          aria-current={activeTab === id ? 'page' : undefined}
          onClick={() => onOpen(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
