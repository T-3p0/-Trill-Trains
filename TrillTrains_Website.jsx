import { useState, useEffect, useRef } from "react";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#F0D78C";
const DARK = "#0a0a0a";
const DARK2 = "#111111";
const DARK3 = "#1a1a1a";
const GRAY = "#888888";
const WHITE = "#f5f5f0";

const products = [
  {
    id: 1,
    category: "training",
    level: "Beginner",
    title: "Foundation Program",
    subtitle: "Starting to 1 Year",
    price: 49.99,
    description: "Master the fundamentals. Build a rock-solid base with proper form, progressive overload principles, and structured programming designed for those just starting their journey.",
    features: ["12-week progressive program", "Full video exercise library", "Form breakdown guides", "Recovery & mobility protocols", "Weekly check-in templates"],
    badge: "MOST POPULAR",
    badgeColor: GOLD,
  },
  {
    id: 2,
    category: "training",
    level: "Intermediate",
    title: "Evolution Program",
    subtitle: "1–3 Years Experience",
    price: 79.99,
    description: "Break through plateaus. Advanced periodization, intensity techniques, and split variations to push past your limits and unlock the next level of your physique.",
    features: ["16-week periodized cycles", "Advanced split variations", "Plateau-busting techniques", "Deload & recovery weeks", "Progress tracking system"],
    badge: null,
  },
  {
    id: 3,
    category: "training",
    level: "Advanced",
    title: "Apex Program",
    subtitle: "3+ Years Experience",
    price: 119.99,
    description: "For the relentless. Elite programming with conjugate methods, undulating periodization, and peak performance strategies for experienced lifters.",
    features: ["20-week elite periodization", "Conjugate & DUP methods", "Weak point analysis protocols", "Competition prep option", "Advanced nutrition timing"],
    badge: "ELITE",
    badgeColor: "#ff4444",
  },
  {
    id: 4,
    category: "nutrition",
    title: "Complete Nutrition Blueprint",
    subtitle: "TDEE · BMR · Macros · Micros",
    price: 39.99,
    description: "Take command of your nutrition. Learn to calculate your exact caloric needs, dial in your macros, optimize your micronutrient intake, and build sustainable eating habits.",
    features: ["TDEE & BMR calculators", "Custom macro formulas", "Micronutrient deep-dive", "Meal prep strategies", "Supplement guide"],
    badge: null,
  },
  {
    id: 5,
    category: "mindset",
    title: "CEO Habits Blueprint",
    subtitle: "Build the Habits of Elite Performers",
    price: 34.99,
    description: "Reverse-engineer the daily systems of high performers. Morning routines, deep work protocols, decision frameworks, and the discipline architecture that separates the top 1%.",
    features: ["90-day habit installation system", "Morning & evening ritual templates", "Deep work & focus protocols", "Decision-making frameworks", "Accountability trackers"],
    badge: null,
  },
  {
    id: 6,
    category: "mindset",
    title: "Break the Cycle",
    subtitle: "Escape Toxic Patterns for Good",
    price: 34.99,
    description: "Identify, confront, and dismantle the destructive loops holding you back. A raw, practical guide to recognizing toxic patterns and replacing them with growth-oriented systems.",
    features: ["Pattern recognition exercises", "Trigger identification maps", "Boundary-setting frameworks", "Journaling & reflection guides", "Replacement habit systems"],
    badge: "NEW",
    badgeColor: "#22c55e",
  },
];

const bundleDiscount = 0.20;
const allProductsTotal = products.reduce((s, p) => s + p.price, 0);
const bundlePrice = (allProductsTotal * (1 - bundleDiscount)).toFixed(2);

function GoldLine({ width = "60px", className = "" }) {
  return (
    <div
      className={className}
      style={{
        width,
        height: "2px",
        background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}, ${GOLD})`,
      }}
    />
  );
}

function TrainTrack() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "30px 0" }}>
      <div style={{ width: "100%", maxWidth: "800px", height: "2px", background: `linear-gradient(90deg, transparent, ${GOLD}44, ${GOLD}, ${GOLD}44, transparent)` }} />
      <div style={{ width: "100%", maxWidth: "800px", display: "flex", justifyContent: "center", gap: "20px" }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} style={{ width: "2px", height: "8px", background: `${GOLD}33` }} />
        ))}
      </div>
      <div style={{ width: "100%", maxWidth: "800px", height: "2px", background: `linear-gradient(90deg, transparent, ${GOLD}44, ${GOLD}, ${GOLD}44, transparent)` }} />
    </div>
  );
}

function ProductCard({ product, onAdd, inCart }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? DARK3 : DARK2,
        border: `1px solid ${hover ? GOLD + "66" : "#222"}`,
        borderRadius: "8px",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "all 0.4s ease",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? `0 12px 40px ${GOLD}11` : "none",
        minHeight: "420px",
      }}
    >
      {product.badge && (
        <div style={{
          position: "absolute", top: "-1px", right: "20px",
          background: product.badgeColor || GOLD,
          color: DARK, fontSize: "10px", fontWeight: "800",
          padding: "4px 12px 6px", letterSpacing: "2px",
          borderRadius: "0 0 6px 6px",
          fontFamily: "'Arial', sans-serif",
        }}>
          {product.badge}
        </div>
      )}

      {product.level && (
        <div style={{
          fontSize: "10px", letterSpacing: "4px", color: GOLD,
          fontWeight: "700", marginBottom: "8px",
          fontFamily: "'Arial', sans-serif",
        }}>
          {product.level.toUpperCase()}
        </div>
      )}

      {product.category === "nutrition" && (
        <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#22c55e", fontWeight: "700", marginBottom: "8px", fontFamily: "'Arial', sans-serif" }}>
          NUTRITION
        </div>
      )}

      {product.category === "mindset" && (
        <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#818cf8", fontWeight: "700", marginBottom: "8px", fontFamily: "'Arial', sans-serif" }}>
          MINDSET
        </div>
      )}

      <h3 style={{
        fontFamily: "'Georgia', serif",
        fontSize: "24px", fontWeight: "700", color: WHITE,
        margin: "0 0 4px", lineHeight: 1.2,
      }}>
        {product.title}
      </h3>

      <div style={{ fontSize: "12px", color: GRAY, marginBottom: "16px", letterSpacing: "1px", fontFamily: "'Arial', sans-serif" }}>
        {product.subtitle}
      </div>

      <GoldLine width="40px" className="" />

      <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#aaa", margin: "16px 0", flex: 1, fontFamily: "'Arial', sans-serif" }}>
        {product.description}
      </p>

      <div style={{ marginBottom: "20px" }}>
        {product.features.map((f, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "8px",
            fontSize: "12px", color: "#999", marginBottom: "6px",
            fontFamily: "'Arial', sans-serif",
          }}>
            <span style={{ color: GOLD, fontSize: "8px" }}>◆</span>
            {f}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <div style={{
          fontFamily: "'Georgia', serif",
          fontSize: "28px", fontWeight: "700",
          background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          ${product.price}
        </div>
        <button
          onClick={() => onAdd(product)}
          style={{
            background: inCart ? "transparent" : `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            color: inCart ? GOLD : DARK,
            border: inCart ? `1px solid ${GOLD}` : "none",
            padding: "10px 24px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "2px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "'Arial', sans-serif",
          }}
        >
          {inCart ? "✓ ADDED" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}

function CartPanel({ cart, onRemove, onClose, onCheckout }) {
  const total = cart.reduce((s, p) => s + p.price, 0);
  return (
    <div style={{
      position: "fixed", top: 0, right: 0, width: "400px", height: "100vh",
      background: DARK2, borderLeft: `1px solid ${GOLD}33`,
      zIndex: 1000, display: "flex", flexDirection: "column",
      boxShadow: "-10px 0 40px rgba(0,0,0,0.5)",
    }}>
      <div style={{ padding: "28px", borderBottom: `1px solid #222`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "20px", color: WHITE, margin: 0 }}>Your Cart</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", color: GRAY, cursor: "pointer", fontSize: "20px" }}>✕</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
        {cart.length === 0 ? (
          <p style={{ color: GRAY, fontFamily: "'Arial', sans-serif", fontSize: "14px", textAlign: "center", marginTop: "40px" }}>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "16px 0", borderBottom: `1px solid #1a1a1a`,
            }}>
              <div>
                <div style={{ fontFamily: "'Georgia', serif", fontSize: "15px", color: WHITE }}>{item.title}</div>
                <div style={{ fontSize: "12px", color: GRAY, fontFamily: "'Arial', sans-serif" }}>{item.subtitle}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ color: GOLD, fontFamily: "'Georgia', serif", fontSize: "16px" }}>${item.price}</span>
                <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "14px" }}>✕</button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div style={{ padding: "24px 28px", borderTop: `1px solid ${GOLD}33` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <span style={{ fontFamily: "'Arial', sans-serif", fontSize: "14px", color: GRAY, letterSpacing: "2px" }}>TOTAL</span>
            <span style={{
              fontFamily: "'Georgia', serif", fontSize: "24px", fontWeight: "700",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={onCheckout}
            style={{
              width: "100%",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              color: DARK, border: "none", padding: "14px",
              borderRadius: "4px", fontSize: "13px", fontWeight: "800",
              letterSpacing: "3px", cursor: "pointer",
              fontFamily: "'Arial', sans-serif",
            }}
          >
            CHECKOUT
          </button>
        </div>
      )}
    </div>
  );
}

function CheckoutView({ cart, onBack }) {
  const total = cart.reduce((s, p) => s + p.price, 0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh", background: DARK,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", padding: "40px",
      }}>
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%",
          border: `2px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "24px",
        }}>
          <span style={{ color: GOLD, fontSize: "36px" }}>✓</span>
        </div>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "32px", color: WHITE, marginBottom: "12px" }}>Order Confirmed</h2>
        <p style={{ color: GRAY, fontFamily: "'Arial', sans-serif", fontSize: "14px", marginBottom: "24px" }}>
          Your download links have been sent to {email}
        </p>
        <GoldLine width="60px" />
        <p style={{ color: "#555", fontFamily: "'Arial', sans-serif", fontSize: "12px", marginTop: "24px", letterSpacing: "1px" }}>
          Thank you for choosing Trill Trains.
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: DARK, padding: "60px 20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", color: GOLD, cursor: "pointer",
          fontSize: "13px", letterSpacing: "2px", fontFamily: "'Arial', sans-serif",
          marginBottom: "40px", display: "flex", alignItems: "center", gap: "8px",
        }}>
          ← BACK TO STORE
        </button>

        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "32px", color: WHITE, marginBottom: "8px" }}>Checkout</h2>
        <GoldLine width="50px" />

        <div style={{ marginTop: "32px", marginBottom: "32px" }}>
          {cart.map((item) => (
            <div key={item.id} style={{
              display: "flex", justifyContent: "space-between",
              padding: "14px 0", borderBottom: `1px solid #1a1a1a`,
              fontFamily: "'Arial', sans-serif",
            }}>
              <span style={{ color: WHITE, fontSize: "14px" }}>{item.title}</span>
              <span style={{ color: GOLD, fontFamily: "'Georgia', serif" }}>${item.price}</span>
            </div>
          ))}
          <div style={{
            display: "flex", justifyContent: "space-between",
            padding: "20px 0 0", marginTop: "8px",
            borderTop: `1px solid ${GOLD}33`,
          }}>
            <span style={{ color: GRAY, fontSize: "12px", letterSpacing: "2px", fontFamily: "'Arial', sans-serif" }}>TOTAL</span>
            <span style={{
              fontFamily: "'Georgia', serif", fontSize: "28px", fontWeight: "700",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "11px", letterSpacing: "3px", color: GRAY, marginBottom: "8px", fontFamily: "'Arial', sans-serif" }}>
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              width: "100%", padding: "14px 16px",
              background: DARK3, border: `1px solid #333`,
              borderRadius: "4px", color: WHITE,
              fontSize: "15px", fontFamily: "'Arial', sans-serif",
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        <button
          onClick={() => { if (email) setSubmitted(true); }}
          style={{
            width: "100%",
            background: email ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` : "#333",
            color: email ? DARK : "#666",
            border: "none", padding: "16px",
            borderRadius: "4px", fontSize: "13px", fontWeight: "800",
            letterSpacing: "3px", cursor: email ? "pointer" : "not-allowed",
            fontFamily: "'Arial', sans-serif",
            marginTop: "12px",
          }}
        >
          COMPLETE PURCHASE
        </button>

        <p style={{ fontSize: "11px", color: "#555", textAlign: "center", marginTop: "20px", fontFamily: "'Arial', sans-serif", lineHeight: 1.6 }}>
          By completing this purchase you agree to the Trill Trains Terms of Service and Privacy Policy. All sales are final. Digital products are delivered via email.
        </p>
      </div>
    </div>
  );
}

export default function TrillTrains() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState("home");
  const [filter, setFilter] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const shopRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const addToCart = (product) => {
    if (cart.find((p) => p.id === product.id)) {
      setCart(cart.filter((p) => p.id !== product.id));
    } else {
      setCart([...cart, product]);
    }
  };

  const addBundle = () => {
    setCart([...products]);
  };

  const removeFromCart = (id) => setCart(cart.filter((p) => p.id !== id));

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  if (view === "checkout") {
    return <CheckoutView cart={cart} onBack={() => setView("home")} />;
  }

  return (
    <div style={{ background: DARK, minHeight: "100vh", color: WHITE, fontFamily: "'Arial', sans-serif" }}>
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: scrolled ? `${DARK}ee` : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${GOLD}22` : "none",
        transition: "all 0.4s ease",
        padding: "16px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px", height: "36px", border: `1.5px solid ${GOLD}`,
            borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Georgia', serif", fontSize: "16px", fontWeight: "700", color: GOLD,
          }}>
            TT
          </div>
          <span style={{
            fontFamily: "'Georgia', serif", fontSize: "18px", fontWeight: "700",
            letterSpacing: "3px", color: WHITE,
          }}>
            TRILL TRAINS
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <button
            onClick={() => shopRef.current?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "none", border: "none", color: GRAY, cursor: "pointer", fontSize: "12px", letterSpacing: "2px", fontFamily: "'Arial', sans-serif" }}
          >
            SHOP
          </button>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              background: "none", border: `1px solid ${GOLD}66`, borderRadius: "4px",
              color: GOLD, cursor: "pointer", fontSize: "12px", letterSpacing: "2px",
              padding: "8px 16px", fontFamily: "'Arial', sans-serif",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            CART
            {cart.length > 0 && (
              <span style={{
                background: GOLD, color: DARK, borderRadius: "50%",
                width: "18px", height: "18px", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "10px", fontWeight: "800",
              }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "40px 20px",
        position: "relative",
        background: `radial-gradient(ellipse at center, ${DARK3} 0%, ${DARK} 70%)`,
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px", height: "500px",
          background: `radial-gradient(circle, ${GOLD}08 0%, transparent 70%)`,
          borderRadius: "50%",
        }} />

        <div style={{
          fontSize: "11px", letterSpacing: "8px", color: GOLD,
          marginBottom: "24px", fontWeight: "600",
        }}>
          ELEVATE YOUR BODY · ELEVATE YOUR MIND
        </div>

        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(48px, 8vw, 96px)",
          fontWeight: "700",
          lineHeight: 1,
          margin: "0 0 8px",
          background: `linear-gradient(135deg, ${WHITE} 0%, ${GOLD_LIGHT} 50%, ${GOLD} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          position: "relative",
        }}>
          TRILL TRAINS
        </h1>

        <GoldLine width="80px" />

        <p style={{
          fontSize: "16px", color: GRAY, maxWidth: "520px",
          lineHeight: 1.8, margin: "24px 0 40px",
          fontFamily: "'Arial', sans-serif",
        }}>
          Premium training programs, nutrition science, and mindset frameworks
          designed for those who refuse to settle. No shortcuts. No excuses. Just results.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => shopRef.current?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              color: DARK, border: "none", padding: "14px 40px",
              borderRadius: "4px", fontSize: "12px", fontWeight: "800",
              letterSpacing: "3px", cursor: "pointer",
              fontFamily: "'Arial', sans-serif",
            }}
          >
            SHOP NOW
          </button>
          <button
            onClick={addBundle}
            style={{
              background: "transparent",
              color: GOLD, border: `1px solid ${GOLD}`,
              padding: "14px 40px",
              borderRadius: "4px", fontSize: "12px", fontWeight: "800",
              letterSpacing: "3px", cursor: "pointer",
              fontFamily: "'Arial', sans-serif",
            }}
          >
            GET THE FULL BUNDLE — ${bundlePrice}
          </button>
        </div>

        <div style={{
          marginTop: "16px", fontSize: "11px", color: "#555",
          letterSpacing: "1px",
        }}>
          Save 20% when you buy all 6 programs
        </div>
      </section>

      <TrainTrack />

      {/* VALUE PROPS */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <div style={{
          display: "flex", justifyContent: "center", gap: "60px",
          flexWrap: "wrap", maxWidth: "900px", margin: "0 auto",
        }}>
          {[
            { icon: "◆", label: "INSTANT DOWNLOAD", desc: "Access your programs immediately after purchase" },
            { icon: "◆", label: "SCIENCE-BACKED", desc: "Every program grounded in proven methodology" },
            { icon: "◆", label: "LIFETIME ACCESS", desc: "Buy once, keep forever. No subscriptions." },
          ].map((v, i) => (
            <div key={i} style={{ maxWidth: "220px" }}>
              <div style={{ color: GOLD, fontSize: "16px", marginBottom: "12px" }}>{v.icon}</div>
              <div style={{ fontSize: "11px", letterSpacing: "3px", color: WHITE, fontWeight: "700", marginBottom: "8px" }}>{v.label}</div>
              <div style={{ fontSize: "13px", color: GRAY, lineHeight: 1.6 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <TrainTrack />

      {/* SHOP */}
      <section ref={shopRef} style={{ padding: "80px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "6px", color: GOLD, marginBottom: "12px" }}>THE COLLECTION</div>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "36px", color: WHITE, margin: "0 0 16px" }}>
            Choose Your Path
          </h2>
          <GoldLine width="50px" className="" />
          <div style={{
            display: "flex", justifyContent: "center", gap: "12px",
            marginTop: "32px", flexWrap: "wrap",
          }}>
            {[
              { key: "all", label: "ALL" },
              { key: "training", label: "TRAINING" },
              { key: "nutrition", label: "NUTRITION" },
              { key: "mindset", label: "MINDSET" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  background: filter === f.key ? GOLD : "transparent",
                  color: filter === f.key ? DARK : GRAY,
                  border: `1px solid ${filter === f.key ? GOLD : "#333"}`,
                  padding: "8px 20px", borderRadius: "4px",
                  fontSize: "11px", letterSpacing: "2px", fontWeight: "700",
                  cursor: "pointer", fontFamily: "'Arial', sans-serif",
                  transition: "all 0.3s ease",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}>
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
              inCart={!!cart.find((p) => p.id === product.id)}
            />
          ))}
        </div>
      </section>

      <TrainTrack />

      {/* BUNDLE CTA */}
      <section style={{
        padding: "80px 20px", textAlign: "center",
        background: `linear-gradient(180deg, ${DARK} 0%, ${DARK3} 50%, ${DARK} 100%)`,
      }}>
        <div style={{ fontSize: "11px", letterSpacing: "6px", color: GOLD, marginBottom: "12px" }}>THE COMPLETE PACKAGE</div>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "36px", color: WHITE, margin: "0 0 8px" }}>
          Full Arsenal Bundle
        </h2>
        <GoldLine width="50px" className="" />
        <p style={{ color: GRAY, fontSize: "15px", maxWidth: "500px", margin: "20px auto 32px", lineHeight: 1.7 }}>
          All 6 programs. Training. Nutrition. Mindset. Everything you need to transform your body and your life — at 20% off.
        </p>
        <div style={{
          display: "flex", alignItems: "baseline", justifyContent: "center", gap: "16px", marginBottom: "24px",
        }}>
          <span style={{ fontSize: "16px", color: "#666", textDecoration: "line-through", fontFamily: "'Georgia', serif" }}>
            ${allProductsTotal.toFixed(2)}
          </span>
          <span style={{
            fontFamily: "'Georgia', serif", fontSize: "48px", fontWeight: "700",
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            ${bundlePrice}
          </span>
        </div>
        <button
          onClick={addBundle}
          style={{
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
            color: DARK, border: "none", padding: "16px 48px",
            borderRadius: "4px", fontSize: "13px", fontWeight: "800",
            letterSpacing: "3px", cursor: "pointer",
            fontFamily: "'Arial', sans-serif",
          }}
        >
          GET THE BUNDLE
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${GOLD}22`,
        padding: "48px 40px 32px",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{
            width: "32px", height: "32px", border: `1.5px solid ${GOLD}`,
            borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Georgia', serif", fontSize: "14px", fontWeight: "700", color: GOLD,
          }}>
            TT
          </div>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: "16px", letterSpacing: "3px", color: WHITE }}>
            TRILL TRAINS
          </span>
        </div>
        <div style={{ display: "flex", gap: "32px", marginBottom: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          {["Terms of Service", "Privacy Policy", "Disclaimer", "Contact"].map((link) => (
            <span key={link} style={{ fontSize: "11px", letterSpacing: "1px", color: GRAY, cursor: "pointer" }}>
              {link}
            </span>
          ))}
        </div>
        <div style={{ fontSize: "11px", color: "#444", letterSpacing: "1px" }}>
          © 2026 Trill Trains LLC. All rights reserved. Colorado, USA.
        </div>
      </footer>

      {/* CART OVERLAY */}
      {cartOpen && (
        <>
          <div
            onClick={() => setCartOpen(false)}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.6)", zIndex: 999,
            }}
          />
          <CartPanel
            cart={cart}
            onRemove={removeFromCart}
            onClose={() => setCartOpen(false)}
            onCheckout={() => { setCartOpen(false); setView("checkout"); }}
          />
        </>
      )}
    </div>
  );
}
