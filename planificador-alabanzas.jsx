import React, { useState, useCallback, useMemo, useEffect } from "react";

// ===== DEFAULT DATA =====
const DEFAULT_HIMNOS = [
  "A solas al huerto yo voy", "Al Cristo vivo sirvo", "Alcancé salvación",
  "Anhelo trabajar por el Señor", "Ante el trono celestial", "Castillo fuerte",
  "Cómo podré estar triste", "Con gran gozo y placer", "Cristo está buscando obreros",
  "Cuando combatido por la adversidad", "En el monte calvario", "En la Cruz",
  "En Jesucristo, fuente de paz", "En las aguas de la muerte",
  "Fiel eres tú, Señor", "Firmes y adelante", "Me guía Él", "Me hirió el pecado",
  "Oh amor de Dios", "Oh, qué amigo nos es Cristo", "Oh, yo quiero andar con Cristo",
  "Hay poder", "Santa Biblia", "Santo, Santo, grande eterno Dios", "Santo, Santo, Santo",
  "Sembraré la simiente preciosa", "Señor mi Dios", "Sublime gracia",
  "Te loamos, oh Dios", "Todas las promesas", "Una vez perdido vivía yo",
  "Yo me rindo a Él"
];

const DEFAULT_LENTAS = [
  "A ti sea la gloria", "Al estar ante ti", "Ante tu majestad",
  "Aunque la higuera no florezca", "Cante al Señor", "Contempla a Dios",
  "Cuán grande es Dios", "Damos honor a ti", "De tal manera",
  "Digno es el Señor", "Dios muestra su amor", "Dios puede salvar",
  "El poder de la cruz", "En ti confía mi corazón", "Grande es el Señor",
  "Increíble Dios", "La gloria de la cruz", "La Iglesia prevalecerá",
  "Mi alma esperará", "Mi pastor", "Poderoso", "Recordamos hoy",
  "Revelación", "Rey de gloria", "Salvo y hallado", "Santo por Siempre",
  "Sé que eres Dios", "Solo en Jesús", "Señor mi Redentor y Roca",
  "Su gracia es mayor", "Tú eres Dios", "Tú eres mi Rey", "Tu fidelidad",
  "Nadie es cómo tú", "Quién más", "Vine a adorarte", "A quién iré",
  "Tú eres mi Respirar"
];

const DEFAULT_RAPIDAS = [
  "Al que es digno", "Alabad a Jehová / Pueblos todos", "Alabemos al Señor",
  "Bueno es alabar", "Digno para siempre", "Dios del Universo", "Dios Poderoso",
  "El Dios que adoramos", "Envíame", "Eres Todopoderoso", "Eres Tú",
  "Gracia sublime es", "Hay libertad", "Hombres de compromiso", "La casa de Dios",
  "No a nosotros", "Por la causa", "Por siempre", "Quién como el Señor",
  "Quién nos separará", "Serviremos al Señor", "Somos el pueblo de Dios",
  "Te alabaré", "Tu nombre levantaré", "Tú nos creaste", "Tu Palabra",
  "Venga tu reino", "Venid, glorificad a Dios", "Porque bueno es Dios",
  "Tú nunca cambias", "Aquel que nos amó", "Haznos Uno"
];

const DEFAULT_KEYS = {
  "Castillo fuerte": "B", "Dios del Universo": "A", "Dios muestra su amor": "Em",
  "Cuán grande es Dios": "G", "Recordamos hoy": "D", "Cristo está buscando obreros": "G",
  "Alabemos al Señor": "E", "Quién más": "D", "Revelación": "D", "No a nosotros": "G",
  "Tu nombre levantaré": "G", "Hay poder": "G", "Su gracia es mayor": "D",
  "Señor mi Redentor y Roca": "D", "Por siempre": "F", "Te alabaré": "D",
  "Dios Poderoso": "Em", "Dios puede salvar": "G", "Gracia sublime es": "F",
  "Grande es el Señor": "A", "Tú eres mi Respirar": "Bb", "Tú nos creaste": "E",
  "Digno para siempre": "C", "Eres Tú": "Em", "El poder de la cruz": "C",
  "Santo por Siempre": "G", "Hay libertad": "C", "Santo, Santo, Santo": "C",
  "A ti sea la gloria": "B", "Haznos Uno": "E", "En la Cruz": "D",
  "Tú nunca cambias": "E", "La gloria de la cruz": "C#m", "De tal manera": "C",
  "Quién como el Señor": "Am", "Porque bueno es Dios": "C", "Serviremos al Señor": "B",
  "Digno es el Señor": "G", "Ante el trono celestial": "D", "Tu Palabra": "D",
  "Cuando combatido por la adversidad": "B", "En Jesucristo, fuente de paz": "C",
  "Venid, glorificad a Dios": "A", "Eres Todopoderoso": "Am", "Vine a adorarte": "E",
  "Rey de gloria": "E", "Poderoso": "B", "Solo en Jesús": "D",
  "En el monte calvario": "G", "Sublime gracia": "D", "Oh amor de Dios": "C",
  "Cante al Señor": "A", "Mi alma esperará": "F", "Tú eres mi Rey": "A",
  "Tú eres Dios": "E", "Ante tu majestad": "E", "El Dios que adoramos": "G",
  "Al que es digno": "D", "Venga tu reino": "G", "Somos el pueblo de Dios": "E",
  "Salvo y hallado": "G", "Bueno es alabar": "G", "Quién nos separará": "G",
  "Santo, Santo, grande eterno Dios": "C", "Oh, qué amigo nos es Cristo": "D",
  "Increíble Dios": "F", "La Iglesia prevalecerá": "E", "Señor mi Dios": "G",
};

const DEFAULT_HISTORY = [
  // 2025 - Enero
  {date:"2025-01-05",songs:["Cristo está buscando obreros","Eres Todopoderoso","Recordamos hoy","Digno para siempre","Pan de vida"]},
  {date:"2025-01-12",songs:["Castillo fuerte","Te alabaré","Contempla a Dios","Al que es digno","Por la causa"]},
  {date:"2025-01-19",songs:["Solo en Jesús","Quién más","De tal manera","Ante tu majestad","Venid, glorificad a Dios"]},
  {date:"2025-01-26",songs:["Oh amor de Dios","Dios Poderoso","Glorioso Intercambio","Santo por Siempre","Bueno es alabar"]},
  // Febrero
  {date:"2025-02-02",songs:["En Jesucristo, fuente de paz","Hay libertad","Vine a adorarte","Revelación","Digno para siempre"]},
  {date:"2025-02-09",songs:["Sublime gracia","Alabemos al Señor","Señor mi Redentor y Roca","Cuán grande es Dios","Quién nos separará"]},
  {date:"2025-02-16",songs:["Hay poder","Mi alma esperará","Grande es el Señor","Solo en Jesús","El Dios que adoramos"]},
  {date:"2025-02-23",songs:["Oh, qué amigo nos es Cristo","Eres Todopoderoso","Mi alma esperará","Su gracia es mayor","Dios del Universo"]},
  // Marzo
  {date:"2025-03-02",songs:["En Jesucristo, fuente de paz","Venid, glorificad a Dios","Santo por Siempre","Recordamos hoy","Digno para siempre"]},
  {date:"2025-03-09",songs:["Todas las promesas","Alabad a Jehová / Pueblos todos","Quién más","Revelación","El Gozo"]},
  {date:"2025-03-16",songs:["Alabemos al Señor","Aquel que nos amó","Tú eres mi Rey","Tu Palabra","El Dios que adoramos"]},
  {date:"2025-03-23",songs:["Sublime gracia","Venga tu reino","Tú eres Dios","Tú eres mi Respirar","Rey de gloria"]},
  {date:"2025-03-30",songs:["Cristo está buscando obreros","Tu nombre levantaré","Señor mi Redentor y Roca","A quién iré","Mi alma te Canta"]},
  // Abril
  {date:"2025-04-06",songs:["Solo en Jesús","Dios del Universo","Glorioso Intercambio","Arraigado","Dios Poderoso"]},
  {date:"2025-04-13",songs:["Oh, qué amigo nos es Cristo","Digno para siempre","Revelación","Mi alma esperará","Por siempre"]},
  {date:"2025-04-20",songs:["Hay poder","Celebrad a Cristo","Dios muestra su amor","Santo por Siempre","De tal manera"]},
  {date:"2025-04-27",songs:["En Jesucristo, fuente de paz","Serviremos al Señor","Cuán grande es Dios","Salvo y hallado","Eres Todopoderoso"]},
  // Mayo
  {date:"2025-05-04",songs:["Castillo fuerte","Tú nos creaste","Confio en ti","Recordamos hoy","Mi alma te Canta"]},
  {date:"2025-05-11",songs:["Oh tu fidelidad","Venga tu reino","Ante tu majestad","Grande es el Señor","Al que es digno"]},
  {date:"2025-05-18",songs:["Cuando combatido por la adversidad","El Dios que adoramos","Quién como el Señor","El me sostendrá","Por la causa"]},
  {date:"2025-05-25",songs:["Cristo está buscando obreros","Al que es digno","Increíble Dios","Su gracia es mayor","Tu Palabra"]},
  // Junio
  {date:"2025-06-01",songs:["He decidido seguir a Cristo","Alabad a Jehová / Pueblos todos","Señor mi Redentor y Roca","Contempla a Dios","Somos el pueblo de Dios"]},
  {date:"2025-06-08",songs:["Santo, Santo, Santo","Tu nombre levantaré","Mi Cristo mi Rey","Cuán grande es Dios","Solo Dios puede salvar"]},
  {date:"2025-06-15",songs:["Todas las promesas","Eres Tú","Mi alma esperará","En ti confía mi corazón","Así es tu amor"]},
  {date:"2025-06-22",songs:["Me guía Él","Alabemos al Señor","El me sostendrá","Sé que eres Dios","Alábenle"]},
  {date:"2025-06-29",songs:["Gozo da servir a Cristo","Digno para siempre","Rey de gloria","A quién iré","Envíame"]},
  // Julio
  {date:"2025-07-06",songs:["Su gracia es mayor","Bueno es alabar","Contempla a Dios","Al estar ante ti","En memoria de ti"]},
  {date:"2025-07-13",songs:["Gracia sublime es","Te alabaré","Mi pastor","Santo por Siempre","Desde el fondo del mar"]},
  {date:"2025-07-20",songs:["La casa de Dios","Quién más","Oh amor de Dios","Ante tu majestad","A ti sea la gloria"]},
  {date:"2025-07-27",songs:["Porque bueno es Dios","Serviremos al Señor","Gracias por la cruz","Ante el trono celestial","Dios Poderoso"]},
  // Agosto
  {date:"2025-08-03",songs:["Mi alma te Canta","Porque bueno es Dios","Revelación","Señor mi Redentor y Roca","Tú nos creaste"]},
  {date:"2025-08-10",songs:["Aquel que nos amó","Alabemos al Señor","Cuán grande es Dios","Solo en Jesús","Tu Palabra"]},
  {date:"2025-08-17",songs:["Hay libertad","Todas las promesas","Damos honor a ti","Eres Todopoderoso","El Dios que adoramos"]},
  {date:"2025-08-24",songs:["Aquel que nos amó","El Dios que adoramos","Salvo y hallado","Cante al Señor","Eres Tú"]},
  {date:"2025-08-31",songs:["Castillo fuerte","Venid, glorificad a Dios","Tú nunca cambias","Nadie es cómo tú","Eres Tú"]},
  // Septiembre
  {date:"2025-09-07",songs:["Me guía Él","Tú nunca cambias","Glorioso Intercambio","En memoria de ti","Nadie es cómo tú"]},
  {date:"2025-09-14",songs:["En la Cruz","Por siempre","La gloria de la cruz","Cuán grande es Dios","Quién como el Señor"]},
  {date:"2025-09-21",songs:["Te daré lo mejor","Digno para siempre","Dios puede salvar","De tal manera","Bueno es alabar"]},
  {date:"2025-09-28",songs:["Alabemos al Señor","La Iglesia prevalecerá","A quién iré","Grande es el Señor","Dios muestra su amor"]},
  // Octubre
  {date:"2025-10-05",songs:["Todas las promesas","Tú nunca cambias","Nombre sobre todo","Sé que eres Dios","Dios del Universo"]},
  {date:"2025-10-12",songs:["El me sostendrá","Tu nombre levantaré","Nadie es cómo tú","Rey de gloria","Envíame"]},
  {date:"2025-10-19",songs:["Alabad a Jehová / Pueblos todos","Tú eres Dios","Quién más","Contempla a Dios","Te alabaré"]},
  {date:"2025-10-26",songs:["Hay poder","Hay libertad","Dios muestra su amor","Al estar ante ti","Gracia sublime es"]},
  // Noviembre
  {date:"2025-11-02",songs:["Dios Poderoso","Te daré lo mejor","Dios puede salvar","La gloria de la cruz","Recordamos hoy"]},
  {date:"2025-11-09",songs:["Mi alma te Canta","Aquel que nos amó","Mi alma esperará","Vine a adorarte","Tú nos creaste"]},
  {date:"2025-11-16",songs:["En la Cruz","Eres Tú","Tú eres mi Rey","Ante tu majestad","Salvo y hallado"]},
  {date:"2025-11-23",songs:["El Dios que adoramos","Venid, glorificad a Dios","Contempla a Dios","A ti sea la gloria","Bueno es alabar"]},
  {date:"2025-11-30",songs:["Santo, Santo, Santo","Hay libertad","Serviremos al Señor","De tal manera","Gracia sublime es"]},
  // Diciembre
  {date:"2025-12-14",songs:["Oh amor de Dios","Por siempre","Señor mi Redentor y Roca","Cuán grande es Dios","Venga tu reino"]},
  {date:"2025-12-28",songs:["Dios del Universo","Quién nos separará","Sublime gracia","Solo en Jesús","Alabad a Jehová / Pueblos todos"]},
  // 2026 - Enero
  {date:"2026-01-04",songs:["Cristo está buscando obreros","Eres Todopoderoso","Recordamos hoy","Digno para siempre","Pan de vida"]},
  {date:"2026-01-11",songs:["Todas las promesas","Te alabaré","Contempla a Dios","Al que es digno","Por la causa"]},
  {date:"2026-01-18",songs:["Oh amor de Dios","Tú nunca cambias","Ante tu majestad","Venid, glorificad a Dios","Bueno es alabar"]},
  {date:"2026-01-25",songs:["Me hirió el pecado","Tú eres Dios","Santo por Siempre","Haznos Uno","Por la causa"]},
  // Febrero
  {date:"2026-02-01",songs:["En Jesucristo, fuente de paz","Hay libertad","Vine a adorarte","Venga tu reino","Mi alma te Canta"]},
  {date:"2026-02-08",songs:["Sublime gracia","El Dios que adoramos","Señor mi Redentor y Roca","Dios del Universo","Aquel que nos amó"]},
  {date:"2026-02-15",songs:["Oh, qué amigo nos es Cristo","Eres Tú","Tú eres mi Rey","Grande es el Señor","Mi alma esperará"]},
  {date:"2026-02-22",songs:["Me guía Él","Tu Palabra","Mi pastor","Damos honor a ti","Mi alma te Canta"]},
  // Marzo
  {date:"2026-03-01",songs:["Castillo fuerte","Dios del Universo","Dios muestra su amor","Cuán grande es Dios","Recordamos hoy"]},
  {date:"2026-03-08",songs:["Cristo está buscando obreros","Alabemos al Señor","Quién más","Revelación","No a nosotros"]},
  {date:"2026-03-15",songs:["Tu nombre levantaré","Hay poder","Su gracia es mayor","Señor mi Redentor y Roca","Por siempre"]},
  {date:"2026-03-22",songs:["Te alabaré","Dios Poderoso","Dios puede salvar","A quién iré","Haznos Uno"]},
  {date:"2026-03-29",songs:["Cuando combatido por la adversidad","Gracia sublime es","Grande es el Señor","Tú eres mi Respirar","Tú nos creaste"]},
  // Abril
  {date:"2026-04-05",songs:["Digno para siempre","Eres Tú","El poder de la cruz","Santo por Siempre","Hay libertad"]},
  {date:"2026-04-12",songs:["Santo, Santo, Santo","Quién más","Su gracia es mayor","A ti sea la gloria","Haznos Uno"]},
  {date:"2026-04-19",songs:["En la Cruz","Tú nunca cambias","La gloria de la cruz","De tal manera","Quién como el Señor"]},
  {date:"2026-04-26",songs:["Porque bueno es Dios","Serviremos al Señor","Digno es el Señor","Ante el trono celestial","Tu Palabra"]},
];

const DEFAULT_HIMNOS_LENTOS = [
  "A solas al huerto yo voy", "Sublime gracia", "Oh amor de Dios",
  "En Jesucristo, fuente de paz", "Oh, qué amigo nos es Cristo",
  "Santo, Santo, Santo", "Me hirió el pecado", "En el monte calvario",
  "Ante el trono celestial", "Yo me rindo a Él", "Fiel eres tú, Señor",
  "Cómo podré estar triste", "Cuando combatido por la adversidad",
  "Me guía Él", "En las aguas de la muerte", "En la Cruz"
];

// ===== HELPERS =====
function getSundaysOfMonth(y, m) {
  const s = [], d = new Date(y, m, 1);
  while (d.getDay() !== 0) d.setDate(d.getDate() + 1);
  while (d.getMonth() === m) { s.push(new Date(d)); d.setDate(d.getDate() + 7); }
  return s;
}
function shuffle(a) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
function getRecentSongs(h, c = 6) { const s = new Set(); h.slice(-c).forEach(w => w.songs.forEach(x => s.add(x))); return s; }
function pickSong(pool, excl, picked) {
  const a = pool.filter(s => !excl.has(s) && !picked.has(s));
  if (a.length === 0) { const f = pool.filter(s => !picked.has(s)); return f.length ? f[Math.floor(Math.random() * f.length)] : pool[Math.floor(Math.random() * pool.length)]; }
  return shuffle(a)[0];
}
function buildOrder(h, r1, r2, l1, l2, slow) {
  if (slow.has(h)) return { songs: [r1, r2, h, l1, l2], types: ["Rápida", "Rápida", "Himno", "Lenta", "Lenta"], orderLabel: "Himno lento → orden alternativo" };
  return { songs: [h, r1, l1, l2, r2], types: ["Himno", "Rápida", "Lenta", "Lenta", "Rápida"], orderLabel: "Orden normal" };
}
function genMonth(y, m, hist, him, len, rap, slow) {
  const suns = getSundaysOfMonth(y, m), res = [], tmp = [...hist];
  for (const sun of suns) {
    const ex = getRecentSongs(tmp, 6), pk = new Set();
    const h = pickSong(him, ex, pk); pk.add(h);
    const r1 = pickSong(rap, ex, pk); pk.add(r1);
    const r2 = pickSong(rap, ex, pk); pk.add(r2);
    const l1 = pickSong(len, ex, pk); pk.add(l1);
    const l2 = pickSong(len, ex, pk); pk.add(l2);
    const o = buildOrder(h, r1, r2, l1, l2, slow);
    const e = { date: sun.toISOString().split("T")[0], ...o };
    res.push(e); tmp.push({ date: e.date, songs: e.songs });
  }
  return res;
}

const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const TC = {
  "Himno": { bg: "#FEF3C7", text: "#92400E", border: "#F59E0B", dot: "#F59E0B" },
  "Rápida": { bg: "#D1FAE5", text: "#065F46", border: "#10B981", dot: "#10B981" },
  "Lenta": { bg: "#DBEAFE", text: "#1E40AF", border: "#3B82F6", dot: "#3B82F6" },
};

async function load() { try { const r = await window.storage.get("ucb-v3"); return r?.value ? JSON.parse(r.value) : null; } catch { return null; } }
async function save(s) { try { await window.storage.set("ucb-v3", JSON.stringify(s)); } catch {} }

const TABS = ["Generar", "Catálogo", "Estadísticas"];

export default function App() {
  const [ok, setOk] = useState(false);
  const [tab, setTab] = useState(0);
  const [him, setHim] = useState(DEFAULT_HIMNOS);
  const [len, setLen] = useState(DEFAULT_LENTAS);
  const [rap, setRap] = useState(DEFAULT_RAPIDAS);
  const [keys, setKeys] = useState(DEFAULT_KEYS);
  const [slow, setSlow] = useState(new Set(DEFAULT_HIMNOS_LENTOS));
  const [hist, setHist] = useState(DEFAULT_HISTORY);
  const [yr, setYr] = useState(2026);
  const [mo, setMo] = useState(4);
  const [gen, setGen] = useState(null);
  const [edit, setEdit] = useState(null);
  const [showH, setShowH] = useState(false);
  const [anim, setAnim] = useState(0);
  const [cp, setCp] = useState(false);
  const [prev, setPrev] = useState(false);
  const [addM, setAddM] = useState(false);
  const [nn, setNn] = useState("");
  const [nt, setNt] = useState("Himno");
  const [nk, setNk] = useState("");
  const [ns, setNs] = useState(false);
  const [ek, setEk] = useState(null);
  const [ev, setEv] = useState("");

  useEffect(() => { load().then(s => { if (s) { s.him && setHim(s.him); s.len && setLen(s.len); s.rap && setRap(s.rap); s.keys && setKeys(s.keys); s.slow && setSlow(new Set(s.slow)); s.hist && setHist(s.hist); } setOk(true); }); }, []);
  useEffect(() => { if (ok) save({ him, len, rap, keys, slow: [...slow], hist }); }, [him, len, rap, keys, slow, hist, ok]);

  const doGen = useCallback(() => { setGen(genMonth(yr, mo, hist, him, len, rap, slow)); setPrev(false); setCp(false); setAnim(k => k + 1); }, [yr, mo, hist, him, len, rap, slow]);
  const doRegenSun = useCallback((i) => {
    if (!gen) return;
    const bef = hist.concat(gen.slice(0, i)), ex = getRecentSongs(bef, 6), pk = new Set();
    const h = pickSong(him, ex, pk); pk.add(h);
    const r1 = pickSong(rap, ex, pk); pk.add(r1);
    const r2 = pickSong(rap, ex, pk); pk.add(r2);
    const l1 = pickSong(len, ex, pk); pk.add(l1);
    const l2 = pickSong(len, ex, pk); pk.add(l2);
    const o = buildOrder(h, r1, r2, l1, l2, slow);
    const u = [...gen]; u[i] = { ...u[i], ...o }; setGen(u);
  }, [gen, hist, him, len, rap, slow]);
  const doSwap = useCallback((si, soi) => setEdit({ si, soi }), []);
  const doPick = useCallback((song) => { if (!edit || !gen) return; const u = [...gen]; const e = { ...u[edit.si] }; e.songs = [...e.songs]; e.songs[edit.soi] = song; u[edit.si] = e; setGen(u); setEdit(null); }, [edit, gen]);
  const doConfirm = useCallback(() => { if (!gen) return; setHist(p => [...p, ...gen.map(g => ({ date: g.date, songs: g.songs }))]); setPrev(true); }, [gen]);
  const doFinish = useCallback(() => { setGen(null); setPrev(false); setCp(false); }, []);

  const clipTable = useCallback(() => {
    if (!gen) return "";
    let t = `${MONTHS[mo]}\tTono\tBpm\n`;
    for (const s of gen) { const d = new Date(s.date + "T12:00:00"); t += `Domingo ${d.getDate()}\tTono\tBpm\n`; for (const song of s.songs) t += `${song}\t${keys[song] || ""}\t\n`; }
    return t;
  }, [gen, mo, keys]);

  const doCopy = useCallback(async () => {
    const t = clipTable();
    try { await navigator.clipboard.writeText(t); } catch { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }
    setCp(true); setTimeout(() => setCp(false), 3000);
  }, [clipTable]);

  const doAdd = useCallback(() => {
    const name = nn.trim(); if (!name) return;
    if (nt === "Himno") { setHim(p => [...p, name]); if (ns) setSlow(p => new Set([...p, name])); }
    else if (nt === "Lenta") setLen(p => [...p, name]);
    else setRap(p => [...p, name]);
    if (nk) setKeys(p => ({ ...p, [name]: nk }));
    setNn(""); setNk(""); setNs(false); setAddM(false);
  }, [nn, nt, nk, ns]);

  const doDel = useCallback((name, type) => {
    if (type === "Himno") setHim(p => p.filter(s => s !== name));
    else if (type === "Lenta") setLen(p => p.filter(s => s !== name));
    else setRap(p => p.filter(s => s !== name));
    setSlow(p => { const n = new Set(p); n.delete(name); return n; });
  }, []);

  const doSaveKey = useCallback(() => { if (ek) { setKeys(p => ({ ...p, [ek]: ev })); setEk(null); setEv(""); } }, [ek, ev]);

  const repOpts = useMemo(() => {
    if (!edit || !gen) return [];
    const type = gen[edit.si].types[edit.soi];
    const pool = type === "Himno" ? him : type === "Rápida" ? rap : len;
    return pool.filter(s => s !== gen[edit.si].songs[edit.soi]).sort();
  }, [edit, gen, him, len, rap]);

  const fmtD = (ds) => `Domingo ${new Date(ds + "T12:00:00").getDate()}`;
  const getType = useCallback((n) => { if (him.includes(n)) return "Himno"; if (len.includes(n)) return "Lenta"; if (rap.includes(n)) return "Rápida"; return "?"; }, [him, len, rap]);

  const stats = useMemo(() => {
    const counts = {}; hist.forEach(w => w.songs.forEach(s => { counts[s] = (counts[s] || 0) + 1; }));
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const all = [...new Set([...him, ...len, ...rap])];
    const never = all.filter(s => !counts[s]);
    const recent = getRecentSongs(hist, 6);
    return { counts, sorted, never, total: hist.length, recent, all };
  }, [hist, him, len, rap]);

  if (!ok) return <div style={{ minHeight: "100vh", background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", color: "#FBBF24", fontFamily: "'Outfit'" }}>Cargando...</div>;

  return (
    <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", minHeight: "100vh", background: "linear-gradient(145deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)", color: "#E2E8F0", padding: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box}
        .hg{position:relative} .hg::before{content:'';position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:400px;height:200px;background:radial-gradient(ellipse,rgba(251,191,36,.15),transparent 70%);pointer-events:none}
        .cd{background:linear-gradient(135deg,rgba(30,41,59,.9),rgba(15,23,42,.95));border:1px solid rgba(148,163,184,.1);border-radius:16px;padding:24px;transition:all .3s;backdrop-filter:blur(10px)} .cd:hover{border-color:rgba(251,191,36,.3);box-shadow:0 8px 32px rgba(0,0,0,.3);transform:translateY(-2px)}
        .pl{padding:10px 16px;border-radius:10px;font-size:14px;font-family:'Outfit',sans-serif;font-weight:500;cursor:pointer;transition:all .2s;border:1px solid transparent;display:flex;align-items:center;gap:10px} .pl:hover{transform:scale(1.02);filter:brightness(1.1)}
        .bp{font-family:'Outfit';font-weight:600;padding:14px 32px;border:none;border-radius:12px;cursor:pointer;font-size:15px;transition:all .25s;letter-spacing:.5px} .bp:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .bs{font-family:'Outfit';font-weight:500;padding:8px 16px;border:1px solid rgba(148,163,184,.2);border-radius:8px;cursor:pointer;font-size:13px;background:rgba(30,41,59,.6);color:#94A3B8;transition:all .2s} .bs:hover{border-color:rgba(251,191,36,.4);color:#FBBF24;background:rgba(251,191,36,.05)}
        .sl{font-family:'Outfit';font-size:15px;padding:12px 16px;border-radius:10px;border:1px solid rgba(148,163,184,.15);background:rgba(15,23,42,.8);color:#E2E8F0;cursor:pointer;outline:none;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:36px} .sl:focus{border-color:#FBBF24}
        .ov{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:100;padding:20px}
        .md{background:linear-gradient(135deg,#1E293B,#0F172A);border:1px solid rgba(148,163,184,.15);border-radius:20px;padding:28px;max-width:500px;width:100%;max-height:75vh;overflow-y:auto}
        .ip{font-family:'Outfit';font-size:14px;padding:10px 14px;border-radius:8px;border:1px solid rgba(148,163,184,.2);background:rgba(15,23,42,.8);color:#E2E8F0;outline:none;width:100%} .ip:focus{border-color:#FBBF24} .ip::placeholder{color:#475569}
        .fd{animation:fi .5s ease forwards;opacity:0} @keyframes fi{to{opacity:1;transform:translateY(0)}from{opacity:0;transform:translateY(12px)}}
        .sc{background:rgba(15,23,42,.6);border:1px solid rgba(148,163,184,.08);border-radius:12px;padding:16px;text-align:center}
        .tb{font-family:'Outfit';font-size:14px;font-weight:500;padding:10px 24px;border:none;cursor:pointer;border-radius:10px 10px 0 0;transition:all .2s}
        .ta{background:rgba(251,191,36,.1);color:#FBBF24;border-bottom:2px solid #FBBF24} .ti{background:transparent;color:#64748B;border-bottom:2px solid transparent} .ti:hover{color:#94A3B8}
        .br{height:8px;border-radius:4px;transition:width .5s ease}
        .cr{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:8px;transition:background .15s;font-family:'Outfit';font-size:13px} .cr:hover{background:rgba(148,163,184,.05)}
        .kb{font-size:11px;padding:2px 8px;border-radius:6px;background:rgba(148,163,184,.1);color:#94A3B8;cursor:pointer;font-family:'Outfit';font-weight:600;transition:all .15s;border:1px solid transparent} .kb:hover{border-color:#FBBF24;color:#FBBF24}
        .db{opacity:0;font-size:14px;cursor:pointer;color:#EF4444;transition:opacity .15s;background:none;border:none;padding:2px 6px} .cr:hover .db{opacity:1}
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(148,163,184,.2);border-radius:3px}
      `}</style>

      {/* HEADER */}
      <div className="hg" style={{ textAlign: "center", padding: "40px 24px 16px" }}>
        <div style={{ fontSize: 13, fontFamily: "'Outfit'", fontWeight: 500, color: "#FBBF24", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>UCB Trigales</div>
        <h1 style={{ fontSize: "clamp(26px,5vw,40px)", fontWeight: 300, margin: 0, letterSpacing: -.5, lineHeight: 1.2 }}>
          Planificador de <span style={{ fontWeight: 700, color: "#FBBF24" }}>Alabanzas</span>
        </h1>
        <p style={{ fontFamily: "'Outfit'", fontSize: 13, color: "#64748B", marginTop: 6 }}>1 himno + 2 rápidas + 2 lentas · Sin repetir en 6 semanas · Tonalidades incluidas</p>
      </div>

      {/* TABS */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid rgba(148,163,184,.1)", marginBottom: 24 }}>
          {TABS.map((t, i) => <button key={t} className={`tb ${tab === i ? "ta" : "ti"}`} onClick={() => setTab(i)}>{t}</button>)}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 60px" }}>

        {/* ===== GENERAR ===== */}
        {tab === 0 && (<>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
            <select className="sl" value={mo} onChange={e => setMo(Number(e.target.value))}>{MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}</select>
            <select className="sl" value={yr} onChange={e => setYr(Number(e.target.value))}>{[2025,2026,2027].map(y => <option key={y} value={y}>{y}</option>)}</select>
            <button className="bp" onClick={doGen} style={{ background: "linear-gradient(135deg,#FBBF24,#F59E0B)", color: "#0F172A" }}>Generar Mes</button>
            <button className="bs" onClick={() => setShowH(!showH)}>{showH ? "Ocultar" : "Ver"} Historial ({hist.length})</button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
            {Object.entries(TC).map(([t, c]) => <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Outfit'", fontSize: 13, color: "#94A3B8" }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: c.dot }} />{t}</div>)}
          </div>

          {gen && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(100px,1fr))", gap: 10, marginBottom: 24 }}>
            {[[gen.length,"Domingos","#FBBF24"],[gen.length*5,"Canciones","#FBBF24"],[new Set(gen.flatMap(g=>g.songs)).size,"Únicas","#3B82F6"]].map(([v,l,c],i) =>
              <div key={i} className="sc"><div style={{ fontSize: 22, fontWeight: 700, color: c, fontFamily: "'Outfit'" }}>{v}</div><div style={{ fontSize: 11, color: "#64748B", fontFamily: "'Outfit'" }}>{l}</div></div>
            )}
          </div>}

          {showH && <div style={{ marginBottom: 24, padding: 20, background: "rgba(15,23,42,.5)", border: "1px solid rgba(148,163,184,.1)", borderRadius: 16, maxHeight: 380, overflowY: "auto" }}>
            <h3 style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 600, color: "#94A3B8", margin: "0 0 14px", letterSpacing: 1, textTransform: "uppercase" }}>Historial de Cultos</h3>
            {hist.slice().reverse().map((w, i) => <div key={i} style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(15,23,42,.5)", border: "1px solid rgba(148,163,184,.06)", marginBottom: 6 }}>
              <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: "#64748B", marginBottom: 4, fontWeight: 600 }}>{new Date(w.date+"T12:00:00").toLocaleDateString("es-CL",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: "#CBD5E1" }}>{w.songs.join("  ·  ")}</div>
            </div>)}
          </div>}

          {gen && <div key={anim} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {gen.map((sun, si) => <div key={si} className="cd fd" style={{ animationDelay: `${si*.1}s` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 11, fontWeight: 600, color: "#FBBF24", letterSpacing: 2, textTransform: "uppercase" }}>{MONTHS[mo]} {yr}</div>
                  <div style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }}>{fmtD(sun.date)}</div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: sun.orderLabel?.includes("alternativo") ? "#F59E0B" : "#64748B", marginTop: 3, fontStyle: "italic" }}>{sun.orderLabel}</div>
                </div>
                <button className="bs" onClick={() => doRegenSun(si)}>↻ Regenerar</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {sun.songs.map((song, soi) => {
                  const t = sun.types[soi], c = TC[t], k = keys[song];
                  return <div key={soi} className="pl" style={{ background: c.bg, color: c.text, borderColor: c.border+"33" }} onClick={() => doSwap(si, soi)} title="Click para cambiar">
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: c.dot+"22", color: c.dot, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{soi+1}</div>
                    <span style={{ flex: 1 }}>{song}</span>
                    {k && <span style={{ fontSize: 11, fontWeight: 700, background: c.dot+"22", padding: "2px 8px", borderRadius: 6 }}>{k}</span>}
                    <span style={{ fontSize: 11, opacity: .6 }}>{t}</span>
                  </div>;
                })}
              </div>
            </div>)}

            <div style={{ textAlign: "center", marginTop: 12 }}>
              {!prev ? <>
                <button className="bp" onClick={doConfirm} style={{ background: "linear-gradient(135deg,#10B981,#059669)", color: "#fff" }}>Confirmar Listado</button>
                <p style={{ fontFamily: "'Outfit'", fontSize: 12, color: "#64748B", marginTop: 8 }}>Al confirmar, se agregan al historial y podrás copiar la tabla</p>
              </> : <div style={{ background: "rgba(15,23,42,.6)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 16, padding: 24, textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 13, fontWeight: 600, color: "#10B981", letterSpacing: 1.5, textTransform: "uppercase" }}>Listado confirmado</div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: "#64748B", marginTop: 4 }}>Con tonalidades · Listo para pegar en Sheets</div>
                  </div>
                  <button className="bp" onClick={doCopy} style={{ background: cp ? "linear-gradient(135deg,#10B981,#059669)" : "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", padding: "10px 20px", fontSize: 13 }}>{cp ? "✓ Copiado" : "Copiar Tabla"}</button>
                </div>
                <div style={{ background: "#fff", borderRadius: 10, padding: 2, overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Outfit'", fontSize: 12, color: "#1E293B" }}>
                    <thead><tr style={{ background: "#2563EB" }}>
                      <td style={{ padding: "6px 10px", fontWeight: 700, color: "#fff", fontSize: 13 }}>{MONTHS[mo]}</td>
                      <td style={{ padding: "6px 8px", fontWeight: 600, color: "#fff", fontSize: 11, width: 60 }}>Tono</td>
                      <td style={{ padding: "6px 8px", fontWeight: 600, color: "#fff", fontSize: 11, width: 50 }}>Bpm</td>
                    </tr></thead>
                    <tbody>{gen.map((sun, si) => {
                      const d = new Date(sun.date+"T12:00:00");
                      return <React.Fragment key={si}>
                        <tr style={{ background: "#DBEAFE" }}>
                          <td style={{ padding: "6px 10px", fontWeight: 700, color: "#1E40AF", fontSize: 13 }}>Domingo {d.getDate()}</td>
                          <td style={{ padding: "6px 8px", color: "#64748B", fontWeight: 600, fontSize: 11 }}>Tono</td>
                          <td style={{ padding: "6px 8px", color: "#64748B", fontWeight: 600, fontSize: 11 }}>Bpm</td>
                        </tr>
                        {sun.songs.map((song, i) => <tr key={i} style={{ background: i%2===0?"#F8FAFC":"#fff" }}>
                          <td style={{ padding: "5px 10px", borderBottom: "1px solid #E2E8F0" }}>{song}</td>
                          <td style={{ padding: "5px 8px", borderBottom: "1px solid #E2E8F0", color: "#64748B", fontWeight: 600 }}>{keys[song]||""}</td>
                          <td style={{ padding: "5px 8px", borderBottom: "1px solid #E2E8F0", color: "#CBD5E1" }}></td>
                        </tr>)}
                      </React.Fragment>;
                    })}</tbody>
                  </table>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, flexWrap: "wrap", gap: 8 }}>
                  <p style={{ fontFamily: "'Outfit'", fontSize: 12, color: "#64748B", margin: 0 }}>{cp ? "Tabla copiada — pégala en Google Sheets con Ctrl+V" : "Tonalidades incluidas automáticamente"}</p>
                  <button className="bs" onClick={doFinish}>Cerrar y Continuar</button>
                </div>
              </div>}
            </div>
          </div>}

          {!gen && <div style={{ textAlign: "center", padding: "50px 20px", background: "rgba(15,23,42,.3)", borderRadius: 20, border: "1px dashed rgba(148,163,184,.15)" }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>♪</div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 16, color: "#64748B" }}>Selecciona un mes y presiona <strong style={{ color: "#FBBF24" }}>Generar Mes</strong></div>
            <div style={{ fontFamily: "'Outfit'", fontSize: 13, color: "#475569", marginTop: 6 }}>Sin repetir en 6 semanas · Con tonalidades sugeridas</div>
          </div>}
        </>)}

        {/* ===== CATÁLOGO ===== */}
        {tab === 1 && <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <h2 style={{ fontFamily: "'Outfit'", fontSize: 18, fontWeight: 600, margin: 0 }}>Catálogo <span style={{ color: "#64748B", fontWeight: 400, fontSize: 14 }}>({him.length+len.length+rap.length} canciones)</span></h2>
            <button className="bp" onClick={() => setAddM(true)} style={{ background: "linear-gradient(135deg,#FBBF24,#F59E0B)", color: "#0F172A", padding: "10px 20px", fontSize: 13 }}>+ Agregar Canción</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {[["Himnos",him,"Himno"],["Lentas",len,"Lenta"],["Rápidas",rap,"Rápida"]].map(([label,list,type]) => {
              const c = TC[type];
              return <div key={label} className="cd" style={{ padding: 18 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 600, color: c.dot, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.dot }} />{label} ({list.length})
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[...list].sort().map(s => <div key={s} className="cr" style={{ color: "#CBD5E1" }}>
                    <span style={{ flex: 1 }}>{s}</span>
                    {type==="Himno" && slow.has(s) && <span style={{ fontSize: 10, color: "#F59E0B", fontWeight: 600 }}>LENTO</span>}
                    <span className="kb" onClick={e => { e.stopPropagation(); setEk(s); setEv(keys[s]||""); }} title="Editar tonalidad">{keys[s]||"—"}</span>
                    <button className="db" onClick={() => { if(confirm(`¿Eliminar "${s}"?`)) doDel(s,type); }} title="Eliminar">✕</button>
                  </div>)}
                </div>
              </div>;
            })}
          </div>
        </div>}

        {/* ===== ESTADÍSTICAS ===== */}
        {tab === 2 && <div>
          <h2 style={{ fontFamily: "'Outfit'", fontSize: 18, fontWeight: 600, margin: "0 0 20px" }}>Estadísticas de Uso</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 10, marginBottom: 28 }}>
            {[[stats.total,"Cultos registrados","#FBBF24"],[stats.all.length,"Canciones totales","#3B82F6"],[stats.never.length,"Sin usar aún","#EF4444"],[stats.recent.size,"Bloqueadas (últ. 6)","#F59E0B"]].map(([v,l,c],i) =>
              <div key={i} className="sc"><div style={{ fontSize: 24, fontWeight: 700, color: c, fontFamily: "'Outfit'" }}>{v}</div><div style={{ fontSize: 11, color: "#64748B", fontFamily: "'Outfit'" }}>{l}</div></div>
            )}
          </div>

          <div className="cd" style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 600, color: "#94A3B8", margin: "0 0 14px", letterSpacing: 1, textTransform: "uppercase" }}>Más Usadas</h3>
            {stats.sorted.slice(0,15).map(([song,count],i) => {
              const mx = stats.sorted[0][1], pct = (count/mx)*100, t = getType(song), c = TC[t]||TC["Himno"];
              return <div key={song} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: "#64748B", width: 20, textAlign: "right" }}>{i+1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontFamily: "'Outfit'", fontSize: 13, color: "#E2E8F0" }}>{song}</span>
                    <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: c.dot, fontWeight: 600 }}>{count}x</span>
                  </div>
                  <div style={{ background: "rgba(148,163,184,.1)", borderRadius: 4, overflow: "hidden" }}><div className="br" style={{ width: `${pct}%`, background: c.dot+"AA" }} /></div>
                </div>
              </div>;
            })}
          </div>

          {stats.never.length > 0 && <div className="cd" style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 600, color: "#EF4444", margin: "0 0 14px", letterSpacing: 1, textTransform: "uppercase" }}>Canciones sin usar</h3>
            <p style={{ fontFamily: "'Outfit'", fontSize: 12, color: "#64748B", marginBottom: 12 }}>Están en el catálogo pero nunca han salido en un culto registrado</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {stats.never.sort().map(s => { const t = getType(s), c = TC[t]||TC["Himno"]; return <span key={s} style={{ fontFamily: "'Outfit'", fontSize: 12, padding: "4px 12px", borderRadius: 8, background: c.bg, color: c.text, border: `1px solid ${c.border}33` }}>{s}</span>; })}
            </div>
          </div>}

          <div className="cd">
            <h3 style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 600, color: "#F59E0B", margin: "0 0 14px", letterSpacing: 1, textTransform: "uppercase" }}>Bloqueadas actualmente</h3>
            <p style={{ fontFamily: "'Outfit'", fontSize: 12, color: "#64748B", marginBottom: 12 }}>Salieron en los últimos 6 domingos — no pueden repetirse aún</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {[...stats.recent].sort().map(s => <span key={s} style={{ fontFamily: "'Outfit'", fontSize: 12, padding: "4px 12px", borderRadius: 8, background: "rgba(245,158,11,.1)", color: "#F59E0B", border: "1px solid rgba(245,158,11,.2)" }}>{s}</span>)}
            </div>
          </div>
        </div>}
      </div>

      {/* MODALS */}
      {edit && gen && <div className="ov" onClick={() => setEdit(null)}>
        <div className="md" onClick={e => e.stopPropagation()}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: "#FBBF24", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Cambiar canción</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 14, color: "#94A3B8", marginTop: 4 }}>{gen[edit.si].types[edit.soi]} — {fmtD(gen[edit.si].date)}</div>
            </div>
            <button onClick={() => setEdit(null)} style={{ background: "none", border: "none", color: "#64748B", fontSize: 20, cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {repOpts.map(song => { const t = gen[edit.si].types[edit.soi], c = TC[t], k = keys[song]; return <button key={song} onClick={() => doPick(song)} style={{ background: "rgba(30,41,59,.6)", border: "1px solid rgba(148,163,184,.1)", borderRadius: 8, padding: "10px 14px", color: "#CBD5E1", fontFamily: "'Outfit'", fontSize: 13, cursor: "pointer", textAlign: "left", transition: "all .15s", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(148,163,184,.1)"; e.currentTarget.style.color = "#CBD5E1"; }}
            ><span>{song}</span>{k && <span style={{ fontSize: 11, color: "#64748B" }}>{k}</span>}</button>; })}
          </div>
        </div>
      </div>}

      {addM && <div className="ov" onClick={() => setAddM(false)}>
        <div className="md" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontFamily: "'Outfit'", fontSize: 16, fontWeight: 600, color: "#FBBF24" }}>Agregar Canción</div>
            <button onClick={() => setAddM(false)} style={{ background: "none", border: "none", color: "#64748B", fontSize: 20, cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={{ fontFamily: "'Outfit'", fontSize: 12, color: "#94A3B8", marginBottom: 4, display: "block" }}>Nombre</label><input className="ip" value={nn} onChange={e => setNn(e.target.value)} placeholder="Nombre de la canción" /></div>
            <div><label style={{ fontFamily: "'Outfit'", fontSize: 12, color: "#94A3B8", marginBottom: 4, display: "block" }}>Tipo</label><select className="sl" style={{ width: "100%" }} value={nt} onChange={e => setNt(e.target.value)}><option value="Himno">Himno</option><option value="Lenta">Lenta</option><option value="Rápida">Rápida</option></select></div>
            {nt === "Himno" && <div style={{ display: "flex", alignItems: "center", gap: 8 }}><input type="checkbox" checked={ns} onChange={e => setNs(e.target.checked)} id="slw" style={{ accentColor: "#FBBF24" }} /><label htmlFor="slw" style={{ fontFamily: "'Outfit'", fontSize: 13, color: "#94A3B8", cursor: "pointer" }}>Es himno de tempo lento</label></div>}
            <div><label style={{ fontFamily: "'Outfit'", fontSize: 12, color: "#94A3B8", marginBottom: 4, display: "block" }}>Tonalidad (opcional)</label><input className="ip" value={nk} onChange={e => setNk(e.target.value)} placeholder="Ej: G, Am, D" /></div>
            <button className="bp" onClick={doAdd} style={{ background: "linear-gradient(135deg,#10B981,#059669)", color: "#fff", marginTop: 8 }}>Agregar al Catálogo</button>
          </div>
        </div>
      </div>}

      {ek && <div className="ov" onClick={() => setEk(null)}>
        <div className="md" style={{ maxWidth: 360 }} onClick={e => e.stopPropagation()}>
          <div style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 600, color: "#FBBF24", marginBottom: 6 }}>Editar Tonalidad</div>
          <div style={{ fontFamily: "'Outfit'", fontSize: 15, color: "#E2E8F0", marginBottom: 16 }}>{ek}</div>
          <input className="ip" value={ev} onChange={e => setEv(e.target.value)} placeholder="Ej: G, Am, Bb" autoFocus onKeyDown={e => { if(e.key==="Enter") doSaveKey(); }} />
          <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "flex-end" }}>
            <button className="bs" onClick={() => setEk(null)}>Cancelar</button>
            <button className="bp" onClick={doSaveKey} style={{ background: "linear-gradient(135deg,#FBBF24,#F59E0B)", color: "#0F172A", padding: "10px 20px", fontSize: 13 }}>Guardar</button>
          </div>
        </div>
      </div>}
    </div>
  );
}
