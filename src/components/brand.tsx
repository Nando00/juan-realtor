export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      href="/"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Lanza Realty Group home"
    >
      <span className="brand-wordmark">
        <span className="brand-name">
          LRG<span>.</span>
        </span>
        <span className="brand-business">LANZA REALTY GROUP</span>
      </span>
      <span className="brand-rule" />
      <span className="brand-caption">
        HOUSTON,
        <br />
        TEXAS
      </span>
    </a>
  );
}
