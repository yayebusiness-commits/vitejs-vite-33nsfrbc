import { useState } from "react";

const platforms = {
  Instagram: {
    icon: "📸",
    color: "#E1306C",
    bg: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
    formats: ["Reels", "Carousel", "Story", "Post statique", "Live"],
    bestTimes: ["6h-9h", "12h-14h", "19h-22h"],
    tips: ["Utilisez 5-10 hashtags ciblés", "Les Reels ont 3x plus de portée", "Stories quotidiennes = algorithme favorable", "CTA clair à chaque post"],
    frequency: "1 post/jour, 5-7 stories/jour"
  },
  TikTok: {
    icon: "🎵",
    color: "#69C9D0",
    bg: "linear-gradient(135deg, #010101, #69C9D0)",
    formats: ["Vidéo courte (15-30s)", "Duet", "Stitch", "Tendance/Son viral", "Tutorial"],
    bestTimes: ["7h-9h", "12h-15h", "19h-23h"],
    tips: ["Accrochez en 2 premières secondes", "Surfez sur les tendances sonores", "Sous-titres = +40% de vues", "Postez 2-3x/jour pour booster"],
    frequency: "2-3 vidéos/jour"
  },
  YouTube: {
    icon: "▶️",
    color: "#FF0000",
    bg: "linear-gradient(135deg, #282828, #FF0000)",
    formats: ["Vidéo longue (8-15min)", "Short", "Tutoriel", "Vlog", "Série"],
    bestTimes: ["12h-15h", "18h-21h (weekend)"],
    tips: ["Thumbnail = 70% du clic", "Les 30 premières secondes sont clés", "Description SEO complète", "Chapitres dans la vidéo"],
    frequency: "2-3 vidéos/semaine + Shorts quotidiens"
  },
  Facebook: {
    icon: "👥",
    color: "#1877F2",
    bg: "linear-gradient(135deg, #1877F2, #0a4fa8)",
    formats: ["Post texte", "Vidéo native", "Reel", "Événement", "Groupe"],
    bestTimes: ["9h-12h", "15h-17h"],
    tips: ["Vidéos natives > liens YouTube", "Groupes = meilleure portée organique", "Facebook Ads très ciblées", "Lives = push algorithmique"],
    frequency: "1 post/jour"
  }
};

const contentTypes = [
  { type: "Éducatif", emoji: "📚", prompt: "Apprenez quelque chose d'utile" },
  { type: "Inspirant", emoji: "✨", prompt: "Motivez votre audience" },
  { type: "Divertissant", emoji: "😂", prompt: "Faites sourire ou rire" },
  { type: "Promotionnel", emoji: "🛍️", prompt: "Présentez un produit/service" },
  { type: "Behind the scenes", emoji: "🎬", prompt: "Montrez les coulisses" },
  { type: "Tendance", emoji: "🔥", prompt: "Surfez sur l'actualité" },
];

const niches = ["Mode & Beauté", "Fitness & Santé", "Food & Cuisine", "Voyage", "Tech & Gaming", "Business & Finance", "Art & Créativité", "Lifestyle", "Éducation", "Humour"];

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function generateIdeas(niche, platform, contentType) {
  const ideas = {
    "Mode & Beauté": {
      "Éducatif": ["5 erreurs de style à éviter", "Comment porter le total look", "Guide des tailles : trouver son fit parfait"],
      "Inspirant": ["Ma transformation style en 1 an", "Comment la mode a boosté ma confiance", "De zéro à stylée avec petit budget"],
      "Divertissant": ["POV : tu tentes une tendance bizarre", "Rating les tenues les plus folles de la semaine", "Outfit challenge avec 5 pièces seulement"],
    },
    "Fitness & Santé": {
      "Éducatif": ["Les 5 exercices les plus efficaces", "Manger sainement sans se ruiner", "Comprendre les macros en 60 secondes"],
      "Inspirant": ["Ma transformation physique en 6 mois", "Comment j'ai changé mes habitudes", "Le jour où j'ai décidé de changer"],
      "Divertissant": ["Essayer des workouts viraux de TikTok", "1 semaine de régime de célébrité", "Réagir aux conseils fitness absurdes"],
    },
    "Food & Cuisine": {
      "Éducatif": ["Recette rapide en 15 minutes", "Les bases de la cuisine française", "Substituts sains pour vos plats préférés"],
      "Inspirant": ["Comment j'ai appris à cuisiner seul(e)", "La recette de ma grand-mère", "Food prep pour toute la semaine"],
      "Divertissant": ["Je tente une recette TikTok virale", "Rating des fast-foods de ma ville", "Cuisiner avec 5€ seulement"],
    },
  };

  const defaultIdeas = [
    `Top 5 conseils ${niche} pour débutants`,
    `Ma routine ${niche} quotidienne`,
    `Les erreurs que tout le monde fait en ${niche}`,
    `${contentType} : ce que personne ne vous dit sur ${niche}`,
    `Challenge ${niche} : 7 jours de transformation`,
  ];

  return (ideas[niche]?.[contentType]) || defaultIdeas;
}

export default function App() {
  const [tab, setTab] = useState("strategy");
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");
  const [selectedNiche, setSelectedNiche] = useState("Mode & Beauté");
  const [selectedContent, setSelectedContent] = useState("Éducatif");
  const [ideas, setIdeas] = useState([]);
  const [calendar, setCalendar] = useState({});
  const [dragItem, setDragItem] = useState(null);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    const newIdeas = generateIdeas(selectedNiche, selectedPlatform, selectedContent);
    setIdeas(newIdeas);
    setGenerated(true);
  };

  const addToCalendar = (day, idea) => {
    setCalendar(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), { idea, platform: selectedPlatform, color: platforms[selectedPlatform].color }]
    }));
  };

  const removeFromCalendar = (day, idx) => {
    setCalendar(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== idx)
    }));
  };

  const p = platforms[selectedPlatform];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      fontFamily: "'Syne', sans-serif",
      color: "#f0f0f0",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }
        .tab-btn { background: none; border: none; cursor: pointer; font-family: 'Syne', sans-serif; font-weight: 600; font-size: 13px; padding: 10px 20px; border-radius: 30px; transition: all 0.2s; letter-spacing: 0.5px; }
        .tab-btn.active { background: #f0f0f0; color: #0d0d0d; }
        .tab-btn:not(.active) { color: #888; }
        .tab-btn:not(.active):hover { color: #f0f0f0; }
        .platform-card { cursor: pointer; border-radius: 16px; padding: 16px; border: 2px solid transparent; transition: all 0.25s; }
        .platform-card:hover { transform: translateY(-2px); }
        .platform-card.active { border-color: #f0f0f0; }
        .idea-card { background: #1c1c1c; border-radius: 12px; padding: 14px 18px; border: 1px solid #2a2a2a; transition: all 0.2s; cursor: grab; }
        .idea-card:hover { border-color: #444; transform: translateX(4px); }
        .add-btn { background: none; border: 1px solid #333; color: #888; padding: 4px 10px; border-radius: 20px; font-size: 11px; cursor: pointer; font-family: 'Syne', sans-serif; transition: all 0.2s; }
        .add-btn:hover { border-color: #888; color: #f0f0f0; }
        .cal-cell { background: #1a1a1a; border-radius: 10px; min-height: 80px; padding: 8px; border: 1px dashed #2a2a2a; transition: all 0.2s; }
        .cal-cell:hover { border-color: #444; }
        .cal-tag { border-radius: 6px; padding: 4px 8px; font-size: 10px; font-family: 'DM Sans', sans-serif; display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .remove-btn { background: none; border: none; cursor: pointer; font-size: 10px; opacity: 0.6; color: inherit; }
        .remove-btn:hover { opacity: 1; }
        .niche-pill { padding: 7px 14px; border-radius: 20px; border: 1px solid #2a2a2a; background: #1a1a1a; color: #888; font-family: 'DM Sans', sans-serif; font-size: 12px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .niche-pill.active { background: #f0f0f0; color: #0d0d0d; border-color: #f0f0f0; font-weight: 600; }
        .niche-pill:not(.active):hover { border-color: #555; color: #ccc; }
        .content-pill { padding: 10px 16px; border-radius: 10px; border: 1px solid #2a2a2a; background: #1a1a1a; cursor: pointer; transition: all 0.2s; text-align: center; }
        .content-pill.active { background: #1e1e1e; border-color: #555; }
        .content-pill:hover { border-color: #444; }
        .gen-btn { background: #f0f0f0; color: #0d0d0d; border: none; padding: 14px 32px; border-radius: 30px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.5px; }
        .gen-btn:hover { background: #fff; transform: scale(1.03); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease forwards; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "0 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff)", borderRadius: 8 }} />
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.5px" }}>ContentOS</span>
          </div>
          <div style={{ display: "flex", gap: 4, background: "#1a1a1a", padding: 4, borderRadius: 30 }}>
            {[["strategy", "Stratégie"], ["ideas", "Idées"], ["calendar", "Calendrier"]].map(([id, label]) => (
              <button key={id} className={`tab-btn ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>

        {/* STRATEGY TAB */}
        {tab === "strategy" && (
          <div className="fade-in">
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-1px", marginBottom: 6 }}>Stratégie par plateforme</h1>
              <p style={{ color: "#666", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>Sélectionnez une plateforme pour voir les meilleures pratiques</p>
            </div>

            {/* Platform selector */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
              {Object.entries(platforms).map(([name, data]) => (
                <div
                  key={name}
                  className={`platform-card ${selectedPlatform === name ? "active" : ""}`}
                  style={{ background: selectedPlatform === name ? "#1e1e1e" : "#141414" }}
                  onClick={() => setSelectedPlatform(name)}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{data.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{name}</div>
                  <div style={{ fontSize: 11, color: "#666", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{data.frequency}</div>
                </div>
              ))}
            </div>

            {/* Platform details */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#141414", borderRadius: 16, padding: 24, border: "1px solid #1e1e1e" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontSize: 20 }}>{p.icon}</span>
                  <span style={{ fontWeight: 700 }}>{selectedPlatform} — Formats</span>
                </div>
                {p.formats.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < p.formats.length - 1 ? "1px solid #1e1e1e" : "none" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#ccc" }}>{f}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: "#141414", borderRadius: 16, padding: 24, border: "1px solid #1e1e1e" }}>
                  <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>⏰ Meilleurs horaires</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {p.bestTimes.map((t, i) => (
                      <span key={i} style={{ background: "#1e1e1e", border: `1px solid ${p.color}44`, color: p.color, padding: "6px 12px", borderRadius: 20, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#141414", borderRadius: 16, padding: 24, border: "1px solid #1e1e1e", flex: 1 }}>
                  <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>💡 Conseils clés</div>
                  {p.tips.map((tip, i) => (
                    <div key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#aaa", marginBottom: 8, paddingLeft: 12, borderLeft: `2px solid ${p.color}66` }}>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* IDEAS TAB */}
        {tab === "ideas" && (
          <div className="fade-in">
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-1px", marginBottom: 6 }}>Générateur d'idées</h1>
              <p style={{ color: "#666", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>Configurez votre niche et obtenez des idées sur mesure</p>
            </div>

            {/* Niche selector */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: "#666", fontWeight: 600, letterSpacing: "1px", marginBottom: 12, textTransform: "uppercase" }}>Votre niche</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {niches.map(n => (
                  <button key={n} className={`niche-pill ${selectedNiche === n ? "active" : ""}`} onClick={() => setSelectedNiche(n)}>{n}</button>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: "#666", fontWeight: 600, letterSpacing: "1px", marginBottom: 12, textTransform: "uppercase" }}>Plateforme cible</div>
              <div style={{ display: "flex", gap: 8 }}>
                {Object.entries(platforms).map(([name, data]) => (
                  <button key={name} className={`niche-pill ${selectedPlatform === name ? "active" : ""}`} onClick={() => setSelectedPlatform(name)}>
                    {data.icon} {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Content type */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, color: "#666", fontWeight: 600, letterSpacing: "1px", marginBottom: 12, textTransform: "uppercase" }}>Type de contenu</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
                {contentTypes.map(({ type, emoji }) => (
                  <div key={type} className={`content-pill ${selectedContent === type ? "active" : ""}`} onClick={() => setSelectedContent(type)}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{emoji}</div>
                    <div style={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif", color: selectedContent === type ? "#f0f0f0" : "#666" }}>{type}</div>
                  </div>
                ))}
              </div>
            </div>

            <button className="gen-btn" onClick={handleGenerate}>✦ Générer les idées</button>

            {generated && ideas.length > 0 && (
              <div style={{ marginTop: 32 }} className="fade-in">
                <div style={{ fontSize: 12, color: "#666", fontWeight: 600, letterSpacing: "1px", marginBottom: 16, textTransform: "uppercase" }}>
                  Idées pour {selectedNiche} · {selectedPlatform} · {selectedContent}
                </div>
                {ideas.map((idea, i) => (
                  <div key={i} className="idea-card" style={{ marginBottom: 10, animationDelay: `${i * 0.08}s` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ color: "#444", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>0{i + 1}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#ddd" }}>{idea}</span>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {weekDays.slice(0, 3).map(day => (
                          <button key={day} className="add-btn" onClick={() => { addToCalendar(day, idea); }}>+ {day}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CALENDAR TAB */}
        {tab === "calendar" && (
          <div className="fade-in">
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-1px", marginBottom: 6 }}>Calendrier éditorial</h1>
              <p style={{ color: "#666", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>Planifiez vos contenus sur la semaine — ajoutez des idées depuis l'onglet Idées</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
              {weekDays.map(day => (
                <div key={day}>
                  <div style={{ textAlign: "center", fontWeight: 700, fontSize: 12, marginBottom: 8, color: "#888", letterSpacing: "1px", textTransform: "uppercase" }}>{day}</div>
                  <div className="cal-cell">
                    {(calendar[day] || []).map((item, idx) => (
                      <div key={idx} className="cal-tag" style={{ background: item.color + "22", color: item.color, border: `1px solid ${item.color}44` }}>
                        <span style={{ fontSize: 9, lineHeight: 1.3, flex: 1 }}>{item.idea.length > 30 ? item.idea.slice(0, 30) + "…" : item.idea}</span>
                        <button className="remove-btn" style={{ color: item.color }} onClick={() => removeFromCalendar(day, idx)}>✕</button>
                      </div>
                    ))}
                    {(!calendar[day] || calendar[day].length === 0) && (
                      <div style={{ textAlign: "center", color: "#333", fontSize: 10, fontFamily: "'DM Sans', sans-serif", paddingTop: 20 }}>Vide</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24, background: "#141414", borderRadius: 12, padding: 16, border: "1px solid #1e1e1e" }}>
              <div style={{ fontSize: 12, color: "#555", fontFamily: "'DM Sans', sans-serif" }}>
                💡 Conseil : Générez des idées dans l'onglet <strong style={{ color: "#888" }}>Idées</strong> puis ajoutez-les au calendrier avec les boutons Lun / Mar / Mer
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
