import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <span style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔮</span>
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: "var(--text-primary)",
          marginBottom: "0.75rem",
        }}
      >
        404 — 页面不存在
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1.1rem",
          maxWidth: "420px",
          lineHeight: 1.7,
          marginBottom: "2rem",
        }}
      >
        你访问的页面可能已被移动、删除，或者从未存在过。
      </p>
      <Link
        href="/"
        style={{
          padding: "0.75rem 1.75rem",
          background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
          color: "#fff",
          fontWeight: 600,
          fontSize: "0.95rem",
          borderRadius: "var(--radius-md)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        ← 返回首页
      </Link>
    </div>
  );
}
