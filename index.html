<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>EcoRoute — Smart Waste Management | IT4020 SLIIT</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
  :root {
    --bg: #060a08;
    --surface: #0d1410;
    --surface2: #121a15;
    --border: #1e2d23;
    --green: #22c55e;
    --green-dim: #15803d;
    --green-glow: rgba(34,197,94,0.15);
    --blue: #38bdf8;
    --orange: #fb923c;
    --pink: #f472b6;
    --yellow: #facc15;
    --text: #e2e8e4;
    --muted: #5a6e61;
    --mono: 'JetBrains Mono', monospace;
    --display: 'Syne', sans-serif;
  }

  * { margin:0; padding:0; box-sizing:border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--display);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── Grid background ── */
  body::before {
    content:'';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  /* ── Animated orbs ── */
  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
    animation: drift 12s ease-in-out infinite alternate;
  }
  .orb1 { width:400px; height:400px; background:rgba(34,197,94,0.08); top:-100px; left:-100px; animation-delay:0s; }
  .orb2 { width:300px; height:300px; background:rgba(56,189,248,0.06); bottom:100px; right:-50px; animation-delay:-4s; }
  .orb3 { width:250px; height:250px; background:rgba(244,114,182,0.05); top:50%; left:50%; animation-delay:-8s; }

  @keyframes drift {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(30px,20px) scale(1.1); }
  }

  /* ── Layout ── */
  .wrap { position:relative; z-index:1; max-width:1100px; margin:0 auto; padding:0 24px 80px; }

  /* ── Hero ── */
  .hero {
    text-align: center;
    padding: 80px 0 60px;
    animation: fadeUp 0.8s ease both;
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--green-glow);
    border: 1px solid rgba(34,197,94,0.3);
    border-radius: 999px;
    padding: 6px 16px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--green);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 28px;
  }
  .live-dot {
    width: 7px; height: 7px;
    background: var(--green);
    border-radius: 50%;
    animation: pulse 1.4s ease infinite;
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1); box-shadow:0 0 0 0 rgba(34,197,94,0.5); }
    50% { opacity:0.8; transform:scale(1.2); box-shadow:0 0 0 6px rgba(34,197,94,0); }
  }

  .hero h1 {
    font-size: clamp(42px, 7vw, 82px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    margin-bottom: 12px;
  }
  .hero h1 span { color: var(--green); }
  .hero-sub {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--muted);
    letter-spacing: 0.05em;
    margin-bottom: 40px;
  }

  /* ── Architecture diagram ── */
  .arch-section {
    margin: 60px 0;
    animation: fadeUp 0.8s ease 0.2s both;
  }
  .section-label {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .section-label::after { content:''; flex:1; height:1px; background:var(--border); }

  .arch-diagram {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 40px;
    position: relative;
    overflow: hidden;
  }
  .arch-diagram::before {
    content:'';
    position:absolute;
    inset:0;
    background: radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 60%);
    pointer-events:none;
  }

  .gateway-box {
    text-align: center;
    margin-bottom: 32px;
  }
  .box {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: var(--surface2);
    border: 1px solid var(--green);
    border-radius: 12px;
    padding: 16px 28px;
    position: relative;
    box-shadow: 0 0 30px rgba(34,197,94,0.1);
  }
  .box-title { font-size: 14px; font-weight: 700; color: var(--green); }
  .box-port {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--muted);
    background: rgba(34,197,94,0.08);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .connector-line {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }
  .connector-line svg { color: var(--green-dim); }

  .services-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .svc-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 12px;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    cursor: default;
    position: relative;
  }
  .svc-box:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
  }
  .svc-box.bin:hover  { border-color:var(--green); box-shadow:0 8px 30px rgba(34,197,94,0.15); }
  .svc-box.disp:hover { border-color:var(--blue);  box-shadow:0 8px 30px rgba(56,189,248,0.15); }
  .svc-box.cit:hover  { border-color:var(--orange); box-shadow:0 8px 30px rgba(251,146,60,0.15); }
  .svc-box.ew:hover   { border-color:var(--pink);  box-shadow:0 8px 30px rgba(244,114,182,0.15); }

  .svc-icon { font-size: 24px; }
  .svc-name { font-size: 11px; font-weight: 700; text-align:center; line-height:1.3; }
  .svc-port { font-family:var(--mono); font-size:10px; color:var(--muted); }
  .svc-member { font-family:var(--mono); font-size:9px; color:var(--muted); text-align:center; margin-top:2px; }

  .svc-status {
    position: absolute;
    top: 10px; right: 10px;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--green);
    animation: pulse 1.4s ease infinite;
  }

  /* ── Team table ── */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin: 60px 0;
    animation: fadeUp 0.8s ease 0.4s both;
  }
  .member-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: border-color 0.2s, transform 0.2s;
  }
  .member-card:hover { transform:translateX(4px); }
  .member-card.m1:hover { border-color:var(--green); }
  .member-card.m2:hover { border-color:var(--blue); }
  .member-card.m3:hover { border-color:var(--orange); }
  .member-card.m4:hover { border-color:var(--pink); }

  .member-num {
    width: 40px; height: 40px;
    border-radius: 10px;
    display: flex; align-items:center; justify-content:center;
    font-weight: 800; font-size: 16px;
    flex-shrink:0;
  }
  .m1 .member-num { background:rgba(34,197,94,0.15); color:var(--green); }
  .m2 .member-num { background:rgba(56,189,248,0.15); color:var(--blue); }
  .m3 .member-num { background:rgba(251,146,60,0.15); color:var(--orange); }
  .m4 .member-num { background:rgba(244,114,182,0.15); color:var(--pink); }

  .member-info { flex:1; }
  .member-name { font-size: 13px; font-weight: 700; margin-bottom: 2px; }
  .member-role { font-family: var(--mono); font-size: 10px; color: var(--muted); }
  .member-port {
    font-family: var(--mono);
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 6px;
    font-weight: 500;
  }
  .m1 .member-port { background:rgba(34,197,94,0.1); color:var(--green); }
  .m2 .member-port { background:rgba(56,189,248,0.1); color:var(--blue); }
  .m3 .member-port { background:rgba(251,146,60,0.1); color:var(--orange); }
  .m4 .member-port { background:rgba(244,114,182,0.1); color:var(--pink); }

  /* ── Endpoints ── */
  .endpoints-section { margin: 60px 0; animation: fadeUp 0.8s ease 0.5s both; }

  .service-block { margin-bottom: 32px; }
  .service-block-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  .service-block-icon { font-size: 20px; }
  .service-block-name { font-size: 16px; font-weight: 700; }
  .service-block-port {
    font-family: var(--mono);
    font-size: 11px;
    padding: 2px 10px;
    border-radius: 6px;
  }

  .endpoint-list { display: flex; flex-direction:column; gap:6px; }
  .endpoint-row {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 14px;
    transition: border-color 0.15s, background 0.15s;
    cursor: pointer;
    font-family: var(--mono);
  }
  .endpoint-row:hover { background: var(--surface2); }

  .method {
    font-size: 10px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 0.05em;
    min-width: 46px;
    text-align: center;
    flex-shrink:0;
  }
  .GET    { background:rgba(34,197,94,0.15);  color:var(--green); }
  .POST   { background:rgba(250,204,21,0.15); color:var(--yellow); }
  .PUT    { background:rgba(56,189,248,0.15); color:var(--blue); }
  .DELETE { background:rgba(244,114,182,0.15); color:var(--pink); }

  .ep-path { font-size: 12px; color: var(--text); flex:1; }
  .ep-arrow {
    font-size: 11px;
    color: var(--muted);
    transition: color 0.15s, transform 0.15s;
  }
  .endpoint-row:hover .ep-arrow { color: var(--green); transform: translateX(3px); }

  /* ── Swagger links ── */
  .swagger-grid {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 10px;
    margin: 60px 0;
    animation: fadeUp 0.8s ease 0.6s both;
  }
  .swagger-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px;
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: border-color 0.2s, transform 0.2s;
  }
  .swagger-card:hover { transform: translateY(-2px); }
  .swagger-card.direct:hover { border-color: var(--green); }
  .swagger-card.gateway:hover { border-color: var(--blue); }
  .swagger-card-icon { font-size: 20px; }
  .swagger-card-info { flex:1; }
  .swagger-card-title { font-size: 12px; font-weight: 700; margin-bottom: 3px; }
  .swagger-card-url { font-family:var(--mono); font-size:10px; color:var(--muted); }
  .swagger-card-badge {
    font-family: var(--mono);
    font-size: 9px;
    padding: 2px 8px;
    border-radius: 999px;
    letter-spacing:0.08em;
  }
  .direct .swagger-card-badge  { background:rgba(34,197,94,0.1); color:var(--green); border:1px solid rgba(34,197,94,0.2); }
  .gateway .swagger-card-badge { background:rgba(56,189,248,0.1); color:var(--blue);  border:1px solid rgba(56,189,248,0.2); }

  /* ── How to run ── */
  .run-section {
    margin: 60px 0;
    animation: fadeUp 0.8s ease 0.7s both;
  }
  .terminal {
    background: #020402;
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }
  .terminal-bar {
    background: var(--surface);
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--border);
  }
  .dot { width:10px; height:10px; border-radius:50%; }
  .dot.r { background:#ef4444; }
  .dot.y { background:#eab308; }
  .dot.g { background:#22c55e; }
  .terminal-title { font-family:var(--mono); font-size:11px; color:var(--muted); margin-left:8px; }

  .terminal-body { padding: 24px; }
  .cmd-block { margin-bottom: 20px; }
  .cmd-label { font-family:var(--mono); font-size:9px; color:var(--muted); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px; }
  .cmd {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--green);
    line-height: 2;
  }
  .cmd .prompt { color: var(--muted); }
  .cmd .comment { color: #374d3d; }

  /* ── Live test panel ── */
  .test-section { margin: 60px 0; animation: fadeUp 0.8s ease 0.8s both; }
  .test-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }
  .test-panel-header {
    background: var(--surface2);
    padding: 16px 24px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .test-panel-title { font-size: 14px; font-weight: 700; }
  .test-panel-sub { font-family:var(--mono); font-size:10px; color:var(--muted); margin-left:auto; }

  .test-body { padding: 24px; display:flex; flex-direction:column; gap:16px; }

  .test-row { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
  .test-select, .test-input {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 14px;
    color: var(--text);
    font-family: var(--mono);
    font-size: 12px;
    outline: none;
    transition: border-color 0.2s;
  }
  .test-select:focus, .test-input:focus { border-color: var(--green); }
  .test-select { cursor:pointer; }
  .test-input { flex:1; min-width:200px; }

  .test-btn {
    background: var(--green);
    color: #020402;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-family: var(--display);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }
  .test-btn:hover { background: #16a34a; }
  .test-btn:active { transform: scale(0.97); }
  .test-btn.loading { opacity:0.7; pointer-events:none; }

  .btn-spinner {
    width:12px; height:12px;
    border:2px solid rgba(0,0,0,0.3);
    border-top-color:#020402;
    border-radius:50%;
    animation: spin 0.6s linear infinite;
    display:none;
  }
  .loading .btn-spinner { display:block; }
  .loading .btn-text { display:none; }

  @keyframes spin { to { transform:rotate(360deg); } }

  .response-box {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px;
    font-family: var(--mono);
    font-size: 11px;
    line-height: 1.7;
    min-height: 60px;
    max-height: 300px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-all;
    color: var(--muted);
    transition: border-color 0.3s;
    position: relative;
  }
  .response-box.success { border-color: rgba(34,197,94,0.4); color: var(--green); }
  .response-box.error   { border-color: rgba(244,114,182,0.4); color: var(--pink); }
  .response-box.loading-state { border-color: rgba(56,189,248,0.4); color: var(--blue); }

  .response-status {
    position: absolute;
    top: 10px; right: 12px;
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 700;
  }
  .status-ok  { background:rgba(34,197,94,0.15); color:var(--green); }
  .status-err { background:rgba(244,114,182,0.15); color:var(--pink); }

  /* ── Footer ── */
  .footer {
    text-align:center;
    padding:40px 0 20px;
    border-top:1px solid var(--border);
    margin-top:60px;
  }
  .footer-text { font-family:var(--mono); font-size:11px; color:var(--muted); line-height:2; }
  .footer-text a { color:var(--green); text-decoration:none; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* scrollbar */
  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:var(--bg); }
  ::-webkit-scrollbar-thumb { background:var(--border); border-radius:3px; }

  @media(max-width:700px) {
    .services-row { grid-template-columns:repeat(2,1fr); }
    .team-grid { grid-template-columns:1fr; }
    .swagger-grid { grid-template-columns:1fr; }
  }
</style>
</head>
<body>

<div class="orb orb1"></div>
<div class="orb orb2"></div>
<div class="orb orb3"></div>

<div class="wrap">

  <!-- Hero -->
  <div class="hero">
    <div class="hero-badge">
      <div class="live-dot"></div>
      IT4020 · SLIIT · 2026 · Group Assignment 2
    </div>
    <h1>Eco<span>Route</span></h1>
    <div class="hero-sub">SMART WASTE MANAGEMENT SYSTEM · MICROSERVICES ARCHITECTURE · NODE.JS + EXPRESS + SWAGGER</div>
  </div>

  <!-- Architecture -->
  <div class="arch-section">
    <div class="section-label">Architecture Overview</div>
    <div class="arch-diagram">
      <div class="gateway-box">
        <div class="box">
          <div class="svc-status"></div>
          <div class="box-title">⚡ API Gateway</div>
          <div class="box-port">:3000 — Single Entry Point</div>
        </div>
      </div>
      <div class="connector-line">
        <svg width="600" height="40" viewBox="0 0 600 40" fill="none">
          <line x1="300" y1="0" x2="300" y2="40" stroke="currentColor" stroke-width="1" stroke-dasharray="4,3"/>
          <line x1="80"  y1="20" x2="520" y2="20" stroke="currentColor" stroke-width="1"/>
          <line x1="80"  y1="20" x2="80"  y2="40" stroke="currentColor" stroke-width="1" stroke-dasharray="4,3"/>
          <line x1="520" y1="20" x2="520" y2="40" stroke="currentColor" stroke-width="1" stroke-dasharray="4,3"/>
        </svg>
      </div>
      <div class="services-row">
        <div class="svc-box bin">
          <div class="svc-status"></div>
          <div class="svc-icon">🗑️</div>
          <div class="svc-name">Smart Bin Management</div>
          <div class="svc-port">:3001</div>
          <div class="svc-member">Member 1</div>
        </div>
        <div class="svc-box disp">
          <div class="svc-status"></div>
          <div class="svc-icon">🚛</div>
          <div class="svc-name">Logistics & Dispatch</div>
          <div class="svc-port">:3002</div>
          <div class="svc-member">Member 2</div>
        </div>
        <div class="svc-box cit">
          <div class="svc-status"></div>
          <div class="svc-icon">🏆</div>
          <div class="svc-name">Citizen Engagement</div>
          <div class="svc-port">:3003</div>
          <div class="svc-member">Member 3</div>
        </div>
        <div class="svc-box ew">
          <div class="svc-status"></div>
          <div class="svc-icon">☢️</div>
          <div class="svc-name">E-Waste Tracker</div>
          <div class="svc-port">:3004</div>
          <div class="svc-member">Member 4</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Team -->
  <div class="section-label" style="margin-top:60px">Team Members</div>
  <div class="team-grid">
    <div class="member-card m1">
      <div class="member-num">1</div>
      <div class="member-info">
        <div class="member-name">Sewwandi M.P.S.S.S.</div>
        <div class="member-role">🗑️ Smart Bin Management Service</div>
      </div>
      <div class="member-port">:3001</div>
    </div>
    <div class="member-card m2">
      <div class="member-num">2</div>
      <div class="member-info">
        <div class="member-name">Hansika J.A.J.</div>
        <div class="member-role">🚛 Logistics & Dispatch Service</div>
      </div>
      <div class="member-port">:3002</div>
    </div>
    <div class="member-card m3">
      <div class="member-num">3</div>
      <div class="member-info">
        <div class="member-name">Dayarathnne S.H.N.R.</div>
        <div class="member-role">🏆 Citizen Engagement & Rewards</div>
      </div>
      <div class="member-port">:3003</div>
    </div>
    <div class="member-card m4">
      <div class="member-num">4</div>
      <div class="member-info">
        <div class="member-name">Gunarathene A.A.D.T.</div>
        <div class="member-role">☢️ Hazardous & E-Waste Tracker</div>
      </div>
      <div class="member-port">:3004</div>
    </div>
  </div>

  <!-- Endpoints -->
  <div class="endpoints-section">
    <div class="section-label">API Endpoints — Via Gateway (localhost:3000)</div>

    <div class="service-block">
      <div class="service-block-header">
        <span class="service-block-icon">🗑️</span>
        <span class="service-block-name">Smart Bin Management</span>
        <span class="service-block-port" style="background:rgba(34,197,94,0.1);color:var(--green)">:3001</span>
      </div>
      <div class="endpoint-list">
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/bins/bins</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method POST">POST</span><span class="ep-path">/api/bins/bins</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method POST">POST</span><span class="ep-path">/api/bins/bins/:id/update-level</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/bins/bins/status/full</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/bins/bins/notifications/all</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method DELETE">DELETE</span><span class="ep-path">/api/bins/bins/:id</span><span class="ep-arrow">→</span></div>
      </div>
    </div>

    <div class="service-block">
      <div class="service-block-header">
        <span class="service-block-icon">🚛</span>
        <span class="service-block-name">Logistics & Dispatch</span>
        <span class="service-block-port" style="background:rgba(56,189,248,0.1);color:var(--blue)">:3002</span>
      </div>
      <div class="endpoint-list">
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/dispatch/tasks/active</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/dispatch/tasks</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method POST">POST</span><span class="ep-path">/api/dispatch/dispatch/assign</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method PUT">PUT</span><span class="ep-path">/api/dispatch/tasks/:id/complete</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/dispatch/trucks</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/dispatch/trucks/fleet-status</span><span class="ep-arrow">→</span></div>
      </div>
    </div>

    <div class="service-block">
      <div class="service-block-header">
        <span class="service-block-icon">🏆</span>
        <span class="service-block-name">Citizen Engagement & Rewards</span>
        <span class="service-block-port" style="background:rgba(251,146,60,0.1);color:var(--orange)">:3003</span>
      </div>
      <div class="endpoint-list">
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/citizen/citizens</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method POST">POST</span><span class="ep-path">/api/citizen/citizens</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/citizen/profile/:id</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method PUT">PUT</span><span class="ep-path">/api/citizen/citizens/:id</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method DELETE">DELETE</span><span class="ep-path">/api/citizen/citizens/:id</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method POST">POST</span><span class="ep-path">/api/citizen/points/add</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method POST">POST</span><span class="ep-path">/api/citizen/rewards/redeem</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/citizen/rewards/catalog</span><span class="ep-arrow">→</span></div>
      </div>
    </div>

    <div class="service-block">
      <div class="service-block-header">
        <span class="service-block-icon">☢️</span>
        <span class="service-block-name">Hazardous & E-Waste Tracker</span>
        <span class="service-block-port" style="background:rgba(244,114,182,0.1);color:var(--pink)">:3004</span>
      </div>
      <div class="endpoint-list">
        <div class="endpoint-row"><span class="method POST">POST</span><span class="ep-path">/api/ewaste/ewaste/log</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/ewaste/ewaste</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/ewaste/ewaste/centers</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/ewaste/ewaste/reports</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method GET">GET</span><span class="ep-path">/api/ewaste/ewaste/audit-log</span><span class="ep-arrow">→</span></div>
        <div class="endpoint-row"><span class="method PUT">PUT</span><span class="ep-path">/api/ewaste/ewaste/:id/status</span><span class="ep-arrow">→</span></div>
      </div>
    </div>
  </div>

  <!-- Live Test Panel -->
  <div class="test-section">
    <div class="section-label">Live API Tester</div>
    <div class="test-panel">
      <div class="test-panel-header">
        <div class="live-dot"></div>
        <div class="test-panel-title">Test Endpoints Live</div>
        <div class="test-panel-sub">Make sure all services are running first</div>
      </div>
      <div class="test-body">
        <div class="test-row">
          <select class="test-select" id="quickSelect" onchange="fillEndpoint()">
            <option value="">── Quick Select ──</option>
            <optgroup label="🗑️ Bin Service">
              <option value="GET|http://localhost:3000/api/bins/bins">GET all bins</option>
              <option value="GET|http://localhost:3001/api-docs-json">GET bins (direct :3001)</option>
              <option value="GET|http://localhost:3000/api/bins/bins/status/full">GET full bins</option>
              <option value="GET|http://localhost:3000/api/bins/bins/notifications/all">GET notifications</option>
              <option value="GET|http://localhost:3000/health">GET gateway health</option>
            </optgroup>
            <optgroup label="🚛 Dispatch Service">
              <option value="GET|http://localhost:3000/api/dispatch/tasks/active">GET active tasks</option>
              <option value="GET|http://localhost:3000/api/dispatch/trucks">GET all trucks</option>
              <option value="GET|http://localhost:3000/api/dispatch/trucks/fleet-status">GET fleet status</option>
            </optgroup>
            <optgroup label="🏆 Citizen Service">
              <option value="GET|http://localhost:3000/api/citizen/citizens">GET all citizens</option>
              <option value="GET|http://localhost:3000/api/citizen/profile/cit-001">GET citizen cit-001</option>
              <option value="GET|http://localhost:3000/api/citizen/profile/cit-002">GET citizen cit-002</option>
              <option value="GET|http://localhost:3000/api/citizen/rewards/catalog">GET rewards catalog</option>
            </optgroup>
            <optgroup label="☢️ E-Waste Service">
              <option value="GET|http://localhost:3000/api/ewaste/ewaste">GET all e-waste</option>
              <option value="GET|http://localhost:3000/api/ewaste/ewaste/centers">GET centers</option>
              <option value="GET|http://localhost:3000/api/ewaste/ewaste/reports">GET reports</option>
              <option value="GET|http://localhost:3000/api/ewaste/ewaste/audit-log">GET audit log</option>
            </optgroup>
          </select>
        </div>

        <div class="test-row">
          <select class="test-select" id="methodSel" style="width:90px">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input class="test-input" id="urlInput" placeholder="http://localhost:3000/api/bins/bins" value="http://localhost:3000/api/bins/bins"/>
          <button class="test-btn" id="sendBtn" onclick="sendRequest()">
            <div class="btn-spinner"></div>
            <span class="btn-text">▶ Send</span>
          </button>
        </div>

        <textarea class="test-input" id="bodyInput" rows="3" placeholder='POST body (JSON) — e.g. {"fill_level": 85}' style="resize:vertical;width:100%;font-size:11px"></textarea>

        <div class="response-box" id="responseBox">Waiting for request...</div>
      </div>
    </div>
  </div>

  <!-- Swagger Links -->
  <div class="section-label">Swagger Documentation</div>
  <div class="swagger-grid">
    <a class="swagger-card direct" href="http://localhost:3001/api-docs" target="_blank">
      <span class="swagger-card-icon">🗑️</span>
      <div class="swagger-card-info">
        <div class="swagger-card-title">Bin Service — Direct</div>
        <div class="swagger-card-url">localhost:3001/api-docs</div>
      </div>
      <span class="swagger-card-badge">DIRECT</span>
    </a>
    <a class="swagger-card gateway" href="http://localhost:3000/bin/api-docs" target="_blank">
      <span class="swagger-card-icon">🗑️</span>
      <div class="swagger-card-info">
        <div class="swagger-card-title">Bin Service — Via Gateway</div>
        <div class="swagger-card-url">localhost:3000/bin/api-docs</div>
      </div>
      <span class="swagger-card-badge">GATEWAY</span>
    </a>
    <a class="swagger-card direct" href="http://localhost:3002/api-docs" target="_blank">
      <span class="swagger-card-icon">🚛</span>
      <div class="swagger-card-info">
        <div class="swagger-card-title">Dispatch Service — Direct</div>
        <div class="swagger-card-url">localhost:3002/api-docs</div>
      </div>
      <span class="swagger-card-badge">DIRECT</span>
    </a>
    <a class="swagger-card gateway" href="http://localhost:3000/dispatch/api-docs" target="_blank">
      <span class="swagger-card-icon">🚛</span>
      <div class="swagger-card-info">
        <div class="swagger-card-title">Dispatch Service — Via Gateway</div>
        <div class="swagger-card-url">localhost:3000/dispatch/api-docs</div>
      </div>
      <span class="swagger-card-badge">GATEWAY</span>
    </a>
    <a class="swagger-card direct" href="http://localhost:3003/api-docs" target="_blank">
      <span class="swagger-card-icon">🏆</span>
      <div class="swagger-card-info">
        <div class="swagger-card-title">Citizen Service — Direct</div>
        <div class="swagger-card-url">localhost:3003/api-docs</div>
      </div>
      <span class="swagger-card-badge">DIRECT</span>
    </a>
    <a class="swagger-card gateway" href="http://localhost:3000/citizen/api-docs" target="_blank">
      <span class="swagger-card-icon">🏆</span>
      <div class="swagger-card-info">
        <div class="swagger-card-title">Citizen Service — Via Gateway</div>
        <div class="swagger-card-url">localhost:3000/citizen/api-docs</div>
      </div>
      <span class="swagger-card-badge">GATEWAY</span>
    </a>
    <a class="swagger-card direct" href="http://localhost:3004/api-docs" target="_blank">
      <span class="swagger-card-icon">☢️</span>
      <div class="swagger-card-info">
        <div class="swagger-card-title">E-Waste Service — Direct</div>
        <div class="swagger-card-url">localhost:3004/api-docs</div>
      </div>
      <span class="swagger-card-badge">DIRECT</span>
    </a>
    <a class="swagger-card gateway" href="http://localhost:3000/ewaste/api-docs" target="_blank">
      <span class="swagger-card-icon">☢️</span>
      <div class="swagger-card-info">
        <div class="swagger-card-title">E-Waste Service — Via Gateway</div>
        <div class="swagger-card-url">localhost:3000/ewaste/api-docs</div>
      </div>
      <span class="swagger-card-badge">GATEWAY</span>
    </a>
  </div>

  <!-- How to Run -->
  <div class="run-section">
    <div class="section-label">How to Run</div>
    <div class="terminal">
      <div class="terminal-bar">
        <div class="dot r"></div><div class="dot y"></div><div class="dot g"></div>
        <div class="terminal-title">bash — ecoroute/</div>
      </div>
      <div class="terminal-body">
        <div class="cmd-block">
          <div class="cmd-label">Step 1 — Install dependencies (run once)</div>
          <div class="cmd">
            <span class="comment"># Run inside each service folder</span><br>
            <span class="prompt">$ </span>cd bin-service &amp;&amp; npm install &amp;&amp; cd ..<br>
            <span class="prompt">$ </span>cd dispatch-service &amp;&amp; npm install &amp;&amp; cd ..<br>
            <span class="prompt">$ </span>cd citizen-service &amp;&amp; npm install &amp;&amp; cd ..<br>
            <span class="prompt">$ </span>cd ewaste-service &amp;&amp; npm install &amp;&amp; cd ..<br>
            <span class="prompt">$ </span>cd api-gateway &amp;&amp; npm install &amp;&amp; cd ..
          </div>
        </div>
        <div class="cmd-block">
          <div class="cmd-label">Step 2 — Start all services (5 terminals)</div>
          <div class="cmd">
            <span class="comment"># Terminal 1</span><br>
            <span class="prompt">$ </span>cd bin-service &amp;&amp; npm start<br>
            <span class="comment"># Terminal 2</span><br>
            <span class="prompt">$ </span>cd dispatch-service &amp;&amp; npm start<br>
            <span class="comment"># Terminal 3</span><br>
            <span class="prompt">$ </span>cd citizen-service &amp;&amp; npm start<br>
            <span class="comment"># Terminal 4</span><br>
            <span class="prompt">$ </span>cd ewaste-service &amp;&amp; npm start<br>
            <span class="comment"># Terminal 5 — start gateway last</span><br>
            <span class="prompt">$ </span>cd api-gateway &amp;&amp; npm start
          </div>
        </div>
        <div class="cmd-block">
          <div class="cmd-label">Windows shortcut</div>
          <div class="cmd">
            <span class="prompt">$ </span>start-all.bat
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="footer-text">
      EcoRoute — Smart Waste Management System<br>
      IT4020 Modern Topics in IT · SLIIT · Year 4 Semester 1/2 · 2026<br>
      <a href="https://github.com/Nihara-D/ecoroute-smart-waste-management" target="_blank">github.com/Nihara-D/ecoroute-smart-waste-management</a>
    </div>
  </div>

</div>

<script>
function fillEndpoint() {
  const val = document.getElementById('quickSelect').value;
  if (!val) return;
  const [method, url] = val.split('|');
  document.getElementById('methodSel').value = method;
  document.getElementById('urlInput').value = url;
}

async function sendRequest() {
  const method = document.getElementById('methodSel').value;
  const url    = document.getElementById('urlInput').value.trim();
  const body   = document.getElementById('bodyInput').value.trim();
  const box    = document.getElementById('responseBox');
  const btn    = document.getElementById('sendBtn');

  if (!url) return;

  btn.classList.add('loading');
  box.className = 'response-box loading-state';
  box.innerHTML = 'Sending request...';

  const start = Date.now();

  try {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (body && method !== 'GET') opts.body = body;

    const res = await fetch(url, opts);
    const duration = Date.now() - start;
    const text = await res.text();

    let formatted;
    try {
      formatted = JSON.stringify(JSON.parse(text), null, 2);
    } catch { formatted = text; }

    box.className = res.ok ? 'response-box success' : 'response-box error';

    const statusEl = `<span class="response-status ${res.ok ? 'status-ok' : 'status-err'}">${res.status} ${res.statusText} · ${duration}ms</span>`;
    box.innerHTML = statusEl + formatted;
  } catch (err) {
    const duration = Date.now() - start;
    box.className = 'response-box error';
    box.innerHTML = `<span class="response-status status-err">ERROR · ${duration}ms</span>Failed to connect.\n\nMake sure your services are running:\n  • npm start in each service folder\n\nError: ${err.message}`;
  }

  btn.classList.remove('loading');
}

// Enter key sends request
document.getElementById('urlInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') sendRequest();
});
</script>
</body>
</html>
