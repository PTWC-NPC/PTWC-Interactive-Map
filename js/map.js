// West Coast mining map. Styling mirrors the current PTWC website map; the data comes from the
// PTWC register (tools/build_public_map.py) and public reference layers.

// Concession layers, top of the list = drawn on top. Colours are those of the current map.
const CATS = [
  { name: "Mining Right", fill: "rgb(140,0,0)", stroke: "rgb(107,33,45)" },
  { name: "Mining Application", fill: "rgb(191,0,0)", stroke: "rgb(155,41,57)" },
  { name: "Mining Permit", fill: "rgb(166,30,77)", stroke: "rgb(110,20,52)" },
  { name: "Mining Permit Application", fill: "rgb(230,73,128)", stroke: "rgb(166,30,77)" },
  { name: "Prospecting Right", fill: "rgb(247,82,91)", stroke: "rgb(186,66,63)" },
  { name: "Prospecting Application", fill: "rgb(240,120,80)", stroke: "rgb(181,92,60)" },
  { name: "Borrow Pit Permit", label: "Borrow pit permit", fill: "rgb(156,120,84)", stroke: "rgb(110,82,55)" },
  { name: "Borrow Pit Application", label: "Borrow pit application", fill: "rgb(204,173,140)", stroke: "rgb(156,120,84)" },
  { name: "Other Developments (EA)", label: "Energy & industrial developments", fill: "rgb(151,117,250)", stroke: "rgb(95,61,196)" },
  { name: "Production Right", fill: "rgb(222,163,111)", stroke: "rgb(184,129,66)" },
  { name: "Production Application", fill: "rgb(237,183,135)", stroke: "rgb(201,148,87)" },
  { name: "Exploration Right", fill: "rgb(245,189,139)", stroke: "rgb(194,143,84)" },
  { name: "Exploration Application", fill: "rgb(255,224,178)", stroke: "rgb(222,194,145)" },
  { name: "Reconnaissance Permit", fill: "url(#hatch)", stroke: "rgb(60,60,60)", weight: 1 },
  { name: "Application Refused", fill: "rgb(147,199,143)", stroke: "rgb(86,125,82)" },
  { name: "Unknown Status", fill: "none", stroke: "rgb(60,60,60)", weight: 1 },
];

// DMPR exclusion and reference layers (whole country; tools/build_dmpr_layers.py). kind: area, line,
// outline (boundary with no fill) or point.
const REFERENCE = [
  { title: "Protected areas", items: [
    { file: "national_park", label: "National parks", color: "#2b8a3e" },
    { file: "nature_reserve", label: "Nature reserves", color: "#37b24d" },
    { file: "forest_nature_reserve", label: "Forest nature reserves", color: "#2f9e44" },
    { file: "forest_wilderness", label: "Forest wilderness areas", color: "#5c940d" },
    { file: "marine_protected_area", label: "Marine protected areas", color: "#1971c2" },
    { file: "special_nature_reserve", label: "Special nature reserves", color: "#0b7285" },
    { file: "protected_environment", label: "Protected environments", color: "#69db7c" },
    { file: "mountain_catchment", label: "Mountain catchment areas", color: "#82c91e" },
    { file: "world_heritage", label: "World Heritage Sites", color: "#e67700" },
  ]},
  { title: "Conservation areas", items: [
    { file: "ramsar", label: "Ramsar wetlands", color: "#15aabf" },
    { file: "biosphere_reserve", label: "Biosphere reserves", color: "#74b816" },
    { file: "botanical_garden", label: "Botanical gardens", color: "#40c057" },
    { file: "tfca", label: "Transfrontier conservation areas", color: "#94d82d" },
  ]},
  { title: "Protected area buffers", items: [
    { file: "buf_world_heritage", label: "World Heritage Sites (10 km)", color: "#e67700" },
    { file: "buf_national_park", label: "National parks (10 km)", color: "#2b8a3e" },
    { file: "buf_nature_reserve", label: "Nature reserves (5 km)", color: "#37b24d" },
    { file: "buf_forest_nature_reserve", label: "Forest nature reserves (5 km)", color: "#2f9e44" },
    { file: "buf_forest_wilderness", label: "Forest wilderness areas (5 km)", color: "#5c940d" },
    { file: "buf_mpa", label: "Marine protected areas (5 km)", color: "#1971c2" },
    { file: "buf_mountain_catchment", label: "Mountain catchment areas (5 km)", color: "#82c91e" },
    { file: "buf_protected_environment", label: "Protected environments (5 km)", color: "#69db7c" },
    { file: "buf_special_nature_reserve", label: "Special nature reserves (5 km)", color: "#0b7285" },
  ]},
  { title: "Heritage", items: [
    { file: "heritage_points", label: "Heritage sites (points)", color: "#d9480f", kind: "point" },
    { file: "heritage_polygons", label: "Heritage sites (areas)", color: "#d9480f" },
  ]},
  { title: "Defence, aviation and astronomy", items: [
    { file: "military", label: "Military installations", color: "#495057" },
    { file: "aerodrome_major", label: "Major civil aerodromes", color: "#364fc7" },
    { file: "aerodrome_other", label: "Other civil aerodromes", color: "#748ffc" },
    { file: "ska_stations", label: "SKA telescope stations", color: "#7048e8", kind: "point" },
    { file: "ska_corridors", label: "SKA phase 1 corridors", color: "#9775fa" },
    { file: "ska_core", label: "Core astronomy advantage area", color: "#5f3dc4" },
    { file: "ska_karoo_central", label: "Karoo Central astronomy advantage areas", color: "#845ef7" },
    { file: "ska_advantage", label: "Astronomy advantage areas", color: "#b197fc" },
    { file: "ska_buffers", label: "SKA buffers", color: "#d0bfff" },
  ]},
  { title: "Infrastructure", items: [
    { file: "eskom_transmission", label: "Eskom transmission lines", color: "#e8590c", kind: "line" },
    { file: "eskom_hv_lines", label: "Eskom high-voltage lines", color: "#fd7e14", kind: "line" },
    { file: "eskom_powerstations", label: "Eskom power stations", color: "#c92a2a", kind: "point" },
    { file: "eskom_hv_stations", label: "Eskom high-voltage stations", color: "#fd7e14", kind: "point" },
    { file: "railways", label: "Railways", color: "#343a40", kind: "line" },
    { file: "pipelines_transmission", label: "Transmission pipelines", color: "#0c8599", kind: "line" },
    { file: "pipelines_distribution", label: "Distribution pipelines", color: "#3bc9db", kind: "line" },
  ]},
  { title: "Administrative boundaries", items: [
    { file: "provinces", label: "Provinces", color: "#212529", kind: "outline", weight: 2.5 },
    { file: "district_municipalities", label: "District municipalities", color: "#495057", kind: "outline", weight: 1.6 },
    { file: "local_municipalities", label: "Local municipalities", color: "#868e96", kind: "outline", weight: 1 },
  ]},
];

// Layers too large to download. Farms and farm portions are fetched as shapes for the area in view (the
// DMPR server takes a minute or more to draw them as images); the rest are drawn by the DMPR server as
// images (click for details). minZoom follows each layer's scale limit on the DMPR server.
const LIVE = [
  { title: "Property and cadastral (DMPR, zoom in)", items: [
    { label: "Farms", query: 25, color: "#212529", width: 1.4, minZoom: 11,
      name: p => p.FARMNAME, fields: { FARMNAME: "Farm", FARMNO: "Farm number", SG_CODE: "SG code", PROVINCE: "Province" } },
    { label: "Farm portions", query: 75, color: "#495057", width: .8, minZoom: 13,
      name: p => `Portion ${p.PORTION} of farm ${p.PARCEL_NO}`,
      fields: { PARCEL_NO: "Farm number", PORTION: "Portion", MAJ_REGION: "Registration division", PRCL_KEY: "Parcel key", PROVINCE: "Province" } },
    { label: "Holdings", ids: [28], minZoom: 11 },
    { label: "Erfs", ids: [27], minZoom: 13 },
    { label: "Servitudes", ids: [58, 59], minZoom: 8 },
    { label: "Wards", outline: [71], rgb: [134, 142, 150], width: 1, minZoom: 10 },
    { label: "Eskom medium-voltage lines and stations", ids: [113, 112], minZoom: 8 },
  ]},
  { title: "Geology (DMPR, 1:1 million)", items: [
    { label: "Geological units", ids: [92], minZoom: 8, opacity: .6 },
    { label: "Geological lines, dykes and structures", ids: [90, 89, 93, 123, 91], minZoom: 8 },
  ]},
  { title: "Mining grid (DMPR)", items: [
    // The DMPR server shows the grid level that suits the zoom: UTM zones down to cells.
    { label: "Mining grid", outline: [1, 2, 3, 4, 5, 6, 7], rgb: [25, 113, 194], width: 1, minZoom: 4 },
  ]},
];

// Inactive rights and permits (status "Withdrawn, Lapsed or Expired", from the register or the DMPR), by
// right type. Outlines only, dashed, so they can sit under or over the active layers.
const INACTIVE = "Withdrawn, Lapsed or Expired";
const INACTIVE_TYPES = [
  { t: "Mining Right", c: "#c92a2a" },
  { t: "Mining Permit", c: "#d6336c" },
  { t: "Prospecting Right", c: "#f76707" },
  { t: "Exploration Right", c: "#e8a33d" },
  { t: "Borrow Pit Permit", c: "#8c6a48" },
  { t: "Other", c: "#868e96" },
];

// Sea concession zones (the letter at the end of the concession number)
const SEA_ZONES = [
  { z: "a", label: "a-zone (shore)", c: "#a5d8ff" },
  { z: "b", label: "b-zone", c: "#74c0fc" },
  { z: "c", label: "c-zone", c: "#339af0" },
  { z: "d", label: "d-zone", c: "#1864ab" },
];

// ---------------------------------------------------------------- map and panes
const map = L.map("map", { zoomControl: false, minZoom: 3, maxZoom: 18, preferCanvas: false });
map.attributionControl.setPrefix(
  '<a href="https://protectthewestcoast.org/" target="_blank">Protect the West Coast</a> &middot; ' +
  '<a href="https://leafletjs.com" target="_blank">Leaflet</a>');
const pane = (name, z) => { map.createPane(name).style.zIndex = z; return name; };
pane("basemap", 200); pane("africa", 401); pane("sa", 402); pane("rivers", 403); pane("eez", 404);
pane("reference", 405); pane("live", 406); pane("towns", 460);
CATS.forEach((c, i) => { c.pane = pane("cat" + i, 440 - i); });

// ---------------------------------------------------------------- helpers
const esc = s => String(s ?? "").replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
// no-cache: revalidate with the server so refreshed data shows without a hard reload
const getJSON = f => fetch(`data/${f}.geojson`, { cache: "no-cache" }).then(r => { if (!r.ok) throw new Error(f); return r.json(); });
const shortUrl = u => { try { const x = new URL(u); const p = x.pathname.replace(/\/$/, ""); return x.host.replace(/^www\./, "") + (p.length > 22 ? "/…" + p.slice(-18) : p); } catch { return u; } };

function concessionPopup(p) {
  const rows = [
    ["Status", p.Status],
    ["RIPL status", p.Stage],
    ["DMPR status", p["DMPR status"]],
    ["Discrepancy note", p.Discrepancy, "discrepancy"],
    ["Code", p.Code],
    ["Rights Holder", p["Rights Holder"]],
    ["Location", p.Location],
    ["Farms", p.Farms],
    ["Resource Targeted", p["Resource Targeted"]],
    ["Area (ha)", p["Area (ha)"] && Number(p["Area (ha)"]).toLocaleString("en-ZA")],
    ["Municipality", p.Municipality],
    ["Comment deadline", p["Comment deadline"], "deadline"],
    ["Submitted", p.Submitted], ["Issued", p.Issued], ["Expires", p.Expires],
    ["HDSA", p.HDSA],
    ["More information", (p.Links || []).map(u => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(shortUrl(u))}</a>`).join("<br>"), "", true],
    ["Record ID", p.id, "meta"],
    ["Source", p.Source, "meta"],
  ];
  return "<table>" + rows.filter(r => r[1]).map(([k, v, cls, raw]) =>
    `<tr class="${cls || ""}"><th>${k}</th><td>${raw ? v : esc(v)}</td></tr>`).join("") + "</table>";
}

// Friendlier names for the fields that recur across the DMPR reference layers
const NICE = { cur_nme: "Name", site_type: "Type", d_dclar: "Declared", legal_stat: "Legal status", sitename: "Site",
  siteno: "Location", site_categ: "Category", grading: "Grading", declaratio: "Declaration", tfca: "Name",
  abbr: "Abbreviation", treatystat: "Treaty status", MUNICNAME: "Municipality", MAP_TITLE: "Name",
  DISTRICT_N: "District", DESCRIPTIO: "Description", LINKNAME: "Line", STATIONA: "From", STATIONB: "To",
  Area_ha: "Area (ha)", Holder: "Holder", Concession: "Concession" };
function genericPopup(label, p) {
  const skip = /^(fid|objectid|shape|gis_area|latitude|longitude|eid|object id)/i;
  const rows = Object.entries(p).filter(([k, v]) => v !== null && v !== "" && v !== "Null" && !skip.test(k)).slice(0, 12);
  return `<table><tr><th colspan="2">${esc(label)}</th></tr>` +
    rows.map(([k, v]) => `<tr><th>${esc(NICE[k] || k.replace(/_/g, " "))}</th><td>${esc(v)}</td></tr>`).join("") + "</table>";
}

function highlight(e) {
  const l = e.target;
  if (l.setStyle) l.setStyle({ fillColor: "#ffff00", fillOpacity: 1 });
}

// ---------------------------------------------------------------- basemaps (off by default, like the current map)
const BASEMAPS = {
  "None": null,
  "OpenStreetMap": L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    { pane: "basemap", maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }),
  "Satellite": L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { pane: "basemap", maxZoom: 19, attribution: "Imagery &copy; Esri, Maxar, Earthstar Geographics" }),
  "Topographic": L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    { pane: "basemap", maxZoom: 19, attribution: "&copy; Esri and contributors" }),
};
let currentBase = null;
const landLayers = {};  // Africa and South Africa fills, made see-through when a basemap is shown
function setBasemap(name) {
  if (currentBase) map.removeLayer(currentBase);
  currentBase = BASEMAPS[name];
  if (currentBase) currentBase.addTo(map);
  Object.values(landLayers).forEach(l => l.setStyle({ fillOpacity: currentBase ? 0 : 1 }));
}

// Layers drawn live by the DMPR map service: either as outlines in our colours, or in the DMPR's own symbology
const DMPR = "https://gis-mininglicense.dmpr.gov.za/arcgis/rest/services/indwe/indweOp/MapServer";
function liveTiles(query, minZoom, opacity = 1) {
  const R = 6378137;
  const Live = L.TileLayer.extend({
    getTileUrl(c) {
      const size = 2 * Math.PI * R / Math.pow(2, c.z);
      const minx = -Math.PI * R + c.x * size, maxy = Math.PI * R - c.y * size;
      return `${DMPR}/export?bbox=${[minx, maxy - size, minx + size, maxy].join(",")}&bboxSR=3857&imageSR=3857` +
        `&size=256,256&dpi=96&format=png32&transparent=true&${query}&f=image`;
    },
  });
  return new Live("", { pane: "live", minZoom, maxZoom: 20, opacity, attribution: "Live layers: DMPR" });
}
function dmprOutlines(ids, rgb, width, minZoom) {
  const dyn = encodeURIComponent(JSON.stringify(ids.map(id => ({
    id, source: { type: "mapLayer", mapLayerId: id },
    drawingInfo: { renderer: { type: "simple", symbol: { type: "esriSFS", style: "esriSFSNull",
      outline: { type: "esriSLS", style: "esriSLSSolid", color: [...rgb, 230], width } } } } }))));
  return liveTiles(`dynamicLayers=${dyn}`, minZoom);
}
const dmprLive = (ids, minZoom, opacity) => liveTiles(`layers=show:${ids.join(",")}`, minZoom, opacity);
// Shapes from one DMPR layer for the area in view, refetched when the map moves (only at minZoom and closer)
function dmprShapes(x) {
  const group = L.featureGroup();
  let ctrl;
  const load = () => {
    if (ctrl) ctrl.abort();
    group.clearLayers();
    if (map.getZoom() < x.minZoom) return;
    ctrl = new AbortController();
    const b = map.getBounds();
    const q = new URLSearchParams({ geometry: [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()].join(","),
      geometryType: "esriGeometryEnvelope", inSR: 4326, spatialRel: "esriSpatialRelIntersects", outFields: Object.keys(x.fields).join(","),
      outSR: 4326, maxAllowableOffset: 40 / Math.pow(2, map.getZoom()) / 256, geometryPrecision: 6, resultRecordCount: 2000, f: "geojson" });
    fetch(`${DMPR}/${x.query}/query?${q}`, { signal: ctrl.signal }).then(r => r.json()).then(d => {
      L.geoJSON(d, { style: { pane: "live", color: x.color, weight: x.width, fill: true, fillOpacity: 0 },
        onEachFeature: (f, l) => l.bindPopup(genericPopup(x.name(f.properties),
          Object.fromEntries(Object.entries(x.fields).map(([k, n]) => [n, String(f.properties[k] ?? "").trim()])))) }).addTo(group);
    }).catch(() => {});
  };
  group.on("add", () => { map.on("moveend", load); load(); });
  group.on("remove", () => { map.off("moveend", load); if (ctrl) ctrl.abort(); group.clearLayers(); });
  return group;
}

// ---------------------------------------------------------------- layer panel
const Panel = L.Control.extend({
  options: { position: "topright" },
  onAdd() {
    const d = L.DomUtil.create("div", "layers-card");
    d.innerHTML = `<div class="layers-head"><h2>Map Layers</h2><button class="collapse-btn" title="Hide or show">&raquo;</button></div>
      <div class="layers-body"><input class="search" type="search" placeholder="Search holder, code or farm"><div class="results"></div><div class="sections"></div></div>`;
    L.DomEvent.disableClickPropagation(d);
    L.DomEvent.disableScrollPropagation(d);
    d.querySelector(".collapse-btn").onclick = () => d.classList.toggle("collapsed");
    if (window.innerWidth < 600) d.classList.add("collapsed");
    return d;
  },
});
const panel = new Panel().addTo(map);
const sectionsEl = panel.getContainer().querySelector(".sections");

// Every section with checkboxes gets Show all / Hide all buttons (rows hidden for having no areas are skipped).
function section(title, open, tools = true) {
  const s = document.createElement("details");
  s.className = "section"; s.open = open;
  s.innerHTML = `<summary>${esc(title)}</summary>`;
  if (tools) {
    const t = document.createElement("div");
    t.className = "sec-tools";
    t.innerHTML = '<button type="button" data-on="1">Show all</button><button type="button">Hide all</button>';
    t.addEventListener("click", e => {
      if (e.target.tagName !== "BUTTON") return;
      const on = !!e.target.dataset.on;
      s.querySelectorAll(".lyr").forEach(r => {
        const box = r.querySelector("input");
        if (r.style.display !== "none" && box.type === "checkbox" && box.checked !== on) box.click();
      });
    });
    s.append(t);
  }
  sectionsEl.append(s);
  return s;
}
const note = (parent, text) => { const d = document.createElement("div"); d.className = "note"; d.textContent = text; parent.append(d); };
const phaseHead = (parent, text) => { const d = document.createElement("div"); d.className = "phase"; d.textContent = text; parent.append(d); return d; };
function row(parent, label, swatch, checked, onChange, type = "checkbox", group) {
  const r = document.createElement("label");
  r.className = "lyr";
  r.innerHTML = `<input type="${type}" ${group ? `name="${group}"` : ""} ${checked ? "checked" : ""}>${swatch}<span>${esc(label)}</span><span class="n"></span>`;
  r.querySelector("input").addEventListener("change", e => onChange(e.target.checked));
  parent.append(r);
  return r;
}
const sq = (fill, stroke) => `<span class="sw" style="background:${fill === "url(#hatch)" ? "repeating-linear-gradient(135deg,#7c7c7c 0 1px,transparent 1px 5px)" : fill === "none" ? "transparent" : fill};border:1.5px solid ${stroke}"></span>`;
const lineSw = c => `<span class="sw line" style="border-top-color:${c}"></span>`;
const dotSw = (f, s) => `<span class="sw dot" style="background:${f};border:2px solid ${s}"></span>`;

// ---------------------------------------------------------------- onshore / offshore / oil and gas filters
// Four ticks that apply to every mining, prospecting and sea concession layer below. Each record carries
// Zone (Onshore or Offshore) and Commodity group (Oil and gas, or Minerals and other) from
// tools/build_public_map.py. A layer that fails the ticks is taken out of its group, so counts follow.
const filterOn = { Onshore: true, Offshore: true, "Oil and gas": true, "Minerals and other": true };
const filtered = [];  // { l: map layer, g: the group it sits in, p: its record properties }
const passes = p => filterOn[p.Zone || "Onshore"] && filterOn[p["Commodity group"] || "Minerals and other"];
const addFiltered = (l, g, p) => { filtered.push({ l, g, p }); g.addLayer(l); };
const filterSection = section("Offshore, onshore, oil and gas", true, false);
note(filterSection, "These ticks apply to every mining, prospecting and sea concession layer below. To see only offshore rights, untick Onshore. To take oil and gas out of the view, untick Oil and gas.");
const filterRows = {};
[["Onshore", "Onshore"], ["Offshore", "Offshore"], ["Minerals and other", "Minerals and other developments"], ["Oil and gas", "Oil and gas"]].forEach(([k, label]) => {
  filterRows[k] = row(filterSection, label, "", true, on => { filterOn[k] = on; applyFilters(); });
});
note(filterSection, "Minerals and other developments: diamonds, heavy minerals, sand, rock and the energy or industrial projects PTWC follows.");
const filterTools = document.createElement("div");
filterTools.className = "sec-tools";
filterTools.innerHTML = '<button type="button" data-p="off">Only offshore</button><button type="button" data-p="on">Only onshore</button><button type="button" data-p="all">Show everything</button>';
filterTools.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  const st = { off: [false, true], on: [true, false], all: [true, true] }[b.dataset.p];
  [["Onshore", st[0]], ["Offshore", st[1]], ["Minerals and other", true], ["Oil and gas", true]].forEach(([k, v]) => {
    filterOn[k] = v; filterRows[k].querySelector("input").checked = v;
  });
  applyFilters();
});
filterSection.append(filterTools);
function applyFilters() {
  filtered.forEach(f => {
    const show = passes(f.p), has = f.g.hasLayer(f.l);
    if (show && !has) f.g.addLayer(f.l); else if (!show && has) f.g.removeLayer(f.l);
  });
  updateCounts();
}
// a search hit that the ticks have hidden switches its own tick back on
const unfilter = p => [p.Zone || "Onshore", p["Commodity group"] || "Minerals and other"].forEach(k => {
  if (!filterOn[k]) filterRows[k].querySelector("input").click();
});

// ---------------------------------------------------------------- concessions
const searchIndex = [];
// One record per application or right: the PTWC register reconciled with the DMPR Mining Licence System
// (tools/build_public_map.py). Each popup says which source(s) the record comes from.
const concSection = section("Mining and development", true);
note(concSection, "PTWC register and DMPR Mining Licence System combined, one record each. DMPR mining records cover the Western Cape only.");
const catLayers = {};
CATS.forEach(c => {
  catLayers[c.name] = L.featureGroup();
  c.row = row(concSection, c.label || c.name, sq(c.fill, c.stroke), !c.off,
    on => on ? catLayers[c.name].addTo(map) : catLayers[c.name].remove());
});
const styleCat = c => ({ pane: c.pane, color: c.stroke, weight: c.weight || 2, opacity: 1,
  fill: c.fill !== "none", fillColor: c.fill, fillOpacity: 1 });

// RIPL status layers: the PTWC register's areas regrouped by their RIPL status,
// in process order. Off by default; drawn above the status layers when switched on.
const RIPL = [
  { phase: "Application" },
  { s: "Application received", c: "#ffd43b" },
  { phase: "Scoping" },
  { s: "Scoping report open for comment", c: "#ff922b" },
  { s: "Scoping report under review", c: "#ffc078" },
  { s: "Scoping accepted / EIA underway", c: "#ffa94d" },
  { phase: "Basic assessment" },
  { s: "BAR open for comment", c: "#fd7e14" },
  { s: "Revised BAR open for comment", c: "#e8590c" },
  { s: "BAR Submitted / under consideration", c: "#fab005" },
  { phase: "Environmental impact assessment" },
  { s: "EIAR open for comment", c: "#f76707" },
  { s: "Revised EIAR open for comment", c: "#d9480f" },
  { s: "EIAR submitted / under consideration", c: "#f59f00" },
  { phase: "Decision" },
  { s: "EA granted", c: "#c92a2a" },
  { s: "EA refused", c: "#69db7c" },
  { phase: "Appeal and review" },
  { s: "Appeal lodged / under appeal", c: "#9c36b5" },
  { s: "Appeal upheld", c: "#cc5de8" },
  { s: "Appeal dismissed", c: "#862e9c" },
  { s: "Judicial review lodged", c: "#5f3dc4" },
  { phase: "Closed" },
  { s: "EA suspended", c: "#adb5bd" },
  { s: "EA Withdrawn", c: "#868e96" },
  { s: "Withdrawn", c: "#ced4da" },
  { s: "Lapsed", c: "#dee2e6" },
  { phase: "Not yet classified" },
  { s: "", label: "No RIPL status yet", c: "none" },
];
pane("ripl", 445);
const riplSection = section("RIPL status", false);
const riplLayers = {};
RIPL.forEach(r => {
  if (r.phase) {
    r.el = phaseHead(riplSection, r.phase);
    return;
  }
  riplLayers[r.s] = L.featureGroup();
  r.row = row(riplSection, r.label || r.s, sq(r.c, r.c === "none" ? "#495057" : "rgba(0,0,0,.45)"), false,
    on => on ? riplLayers[r.s].addTo(map) : riplLayers[r.s].remove());
});
const styleRipl = r => ({ pane: "ripl", color: r.c === "none" ? "#495057" : "rgba(0,0,0,.55)", weight: 1.5,
  dashArray: r.c === "none" ? "4 3" : null, fill: r.c !== "none", fillColor: r.c, fillOpacity: .85 });

pane("inactive", 425);
const inactiveSection = section("Inactive rights and permits", false);
note(inactiveSection, "Withdrawn, lapsed, expired or otherwise inactive, from PTWC's register and the DMPR.");
INACTIVE_TYPES.forEach(it => {
  it.layer = L.featureGroup();
  it.row = row(inactiveSection, it.t, `<span class="sw" style="background:transparent;border:1.5px dashed ${it.c}"></span>`, false,
    on => on ? it.layer.addTo(map) : it.layer.remove());
});
function addInactive(f) {
  const it = INACTIVE_TYPES.find(x => x.t === f.properties["Right type"]) || INACTIVE_TYPES[INACTIVE_TYPES.length - 1];
  const style = { pane: "inactive", color: it.c, weight: 1.6, dashArray: "3 3", fillColor: it.c, fillOpacity: 0 };
  L.geoJSON(f, { style }).eachLayer(l => {
    l.bindPopup(concessionPopup(f.properties), { maxHeight: 400 });
    l.on({ mouseover: highlight, mouseout: () => l.setStyle(style) });
    addFiltered(l, it.layer, f.properties);
    searchIndex.push({ text: [f.properties.Code, f.properties["Rights Holder"], f.properties.Location, f.properties.Farms, f.properties["Resource Targeted"], f.properties.id].join(" ").toLowerCase(),
      title: f.properties["Rights Holder"] || f.properties.Code, sub: `Inactive ${it.t.toLowerCase()} · ${f.properties.Code || ""}`, layer: l,
      show: () => { unfilter(f.properties); const b = it.row.querySelector("input"); if (!b.checked) b.click(); } });
  });
}

let updated = "", dmprUpdated = "";
fetch("data/dmpr/manifest.json").then(r => r.json()).then(m => { dmprUpdated = m.updated; }).catch(() => {});
getJSON("concessions").then(data => {
  updated = data.updated || "";
  const byName = Object.fromEntries(CATS.map(c => [c.name, c]));
  data.features.forEach(f => {
    if (f.properties.Status === INACTIVE) return addInactive(f);
    const c = byName[f.properties.Status] || byName["Unknown Status"];
    const layer = L.geoJSON(f, { style: () => styleCat(c) });
    layer.eachLayer(l => {
      l.bindPopup(concessionPopup(f.properties), { maxHeight: 400 });
      l.on({ mouseover: highlight, mouseout: () => l.setStyle(styleCat(c)) });
      searchIndex.push({ text: [f.properties.Code, f.properties["Rights Holder"], f.properties.Location, f.properties.Farms, f.properties["Resource Targeted"], f.properties.id].join(" ").toLowerCase(),
        title: f.properties["Rights Holder"] || f.properties.Code, sub: `${f.properties.Status} · ${f.properties.Code || ""}`, layer: l,
        show: () => { unfilter(f.properties); if (!map.hasLayer(catLayers[c.name])) c.row.querySelector("input").click(); } });
    });
    addFiltered(layer, catLayers[c.name], f.properties);
    if (f.properties.Source === "DMPR") return;  // RIPL stages are PTWC's; DMPR-only records have none
    const r = RIPL.find(x => !x.phase && x.s === (f.properties.Stage || "")) || RIPL.find(x => x.s === "");
    const rl = L.geoJSON(f, { style: () => styleRipl(r) });
    rl.eachLayer(l => {
      l.bindPopup(concessionPopup(f.properties), { maxHeight: 400 });
      l.on({ mouseover: highlight, mouseout: () => l.setStyle(styleRipl(r)) });
    });
    addFiltered(rl, riplLayers[r.s], f.properties);
  });
  const tot = { Onshore: 0, Offshore: 0, "Oil and gas": 0, "Minerals and other": 0 };
  data.features.forEach(f => { tot[f.properties.Zone || "Onshore"]++; tot[f.properties["Commodity group"] || "Minerals and other"]++; });
  Object.keys(tot).forEach(k => { filterRows[k].querySelector(".n").textContent = tot[k]; });
  // counts; hide statuses with no areas, and phase headings with nothing under them
  let phase = null, phaseHasRows = false;
  const closePhase = () => { if (phase) phase.el.style.display = phaseHasRows ? "" : "none"; };
  RIPL.forEach(r => {
    if (r.phase) { closePhase(); phase = r; phaseHasRows = false; return; }
    const n = riplLayers[r.s].getLayers().length;
    r.row.querySelector(".n").textContent = n;
    r.row.style.display = n ? "" : "none";
    if (n) phaseHasRows = true;
  });
  closePhase();
  INACTIVE_TYPES.forEach(it => {
    const n = it.layer.getLayers().length;
    it.row.querySelector(".n").textContent = n;
    it.row.style.display = n ? "" : "none";
  });
  CATS.forEach(c => {
    const n = catLayers[c.name].getLayers().length;
    c.row.querySelector(".n").textContent = n;
    if (!n) c.row.style.display = "none";
    if (!c.off) catLayers[c.name].addTo(map);
  });
});

// ---------------------------------------------------------------- biodiversity priority areas (off by default)
// Critical Biodiversity Areas and Ecological Support Areas for the Western Cape (CapeNature's 2023
// Western Cape Biodiversity Spatial Plan, Nov 2025 update) and the Northern Cape (2024). Simplified and dissolved by
// tools/build_biodiversity_layers.py: zoom in and use the source datasets for parcel-level work.
const BIO = [
  { file: "CBA1", label: "Critical Biodiversity Areas 1 (natural)", color: "#2b8a3e",
    text: "Natural areas required to meet biodiversity targets for species, ecosystems and ecological processes. Maintain in a natural or near-natural state, with no further loss of natural habitat." },
  { file: "CBA2", label: "Critical Biodiversity Areas 2 (degraded)", color: "#82c91e",
    text: "Degraded or secondary areas still required to meet biodiversity targets. Rehabilitate and maintain; only low-impact, biodiversity-sensitive land uses are appropriate." },
  { file: "ESA1", label: "Ecological Support Areas 1 (natural)", color: "#1c7ed6",
    text: "Not essential for biodiversity targets, but they support the functioning of protected areas and Critical Biodiversity Areas and deliver ecosystem services (rivers, wetlands, groundwater sources and corridors). Keep functional and near-natural." },
  { file: "ESA2", label: "Ecological Support Areas 2 (restore)", color: "#74c0fc",
    text: "Ecological Support Areas now in a degraded state, to be restored from other land use (Western Cape only)." },
];
const alpha = (hex, a) => hex + Math.round(a * 255).toString(16).padStart(2, "0");
const bioSection = section("Biodiversity priority areas (SANBI)", false);
pane("bio", 410);
note(bioSection, "Critical Biodiversity Areas (CBA) and Ecological Support Areas (ESA) for the whole Western Cape and the Northern Cape. Data: CapeNature and the Northern Cape Department of Agriculture, Environmental Affairs, Rural Development and Land Reform, from the South African National Biodiversity Institute (SANBI) Biodiversity GIS (CC BY-NC-SA 4.0). Simplified for the web: use the source data for site-level work.");
BIO.forEach(b => {
  let layer;
  const r = row(bioSection, b.label, sq(alpha(b.color, .45), b.color), false, async on => {
    if (!layer) {
      const data = await getJSON("biodiversity/" + b.file);
      layer = L.geoJSON(data, {
        attribution: "Biodiversity data: CapeNature, NC DAEARDLR via SANBI Biodiversity GIS (CC BY-NC-SA 4.0)",
        style: { pane: "bio", color: b.color, weight: .6, fillColor: b.color, fillOpacity: .45 },
        onEachFeature: (f, l) => l.bindPopup(genericPopup(b.label, { Description: b.text, Source:
          (f.properties.Province === "NC" ? "Northern Cape CBA Map 2024 (Northern Cape Department of Agriculture, Environmental Affairs, Rural Development and Land Reform)"
            : "2023 Western Cape Biodiversity Spatial Plan, updated Nov 2025 (CapeNature)") + ", from SANBI's publicly available Biodiversity GIS data (CC BY-NC-SA 4.0)" }), { maxHeight: 300 }),
      });
    }
    on ? layer.addTo(map) : layer.remove();
  });
});

// ---------------------------------------------------------------- DMPR sea concessions (off by default)
const dmprSection = section("Sea concessions (DMPR)", false);
// Sea concessions (marine diamonds), grouped by zone: the letter at the end of the concession number
pane("sea", 440.5);
note(dmprSection, "Marine diamond concession areas, by zone from the shore outwards.");
const seaLayers = {};
const SEA_ALL = [...SEA_ZONES, { z: "", label: "Other", c: "#868e96" }];
SEA_ALL.forEach(sz => {
  seaLayers[sz.z] = L.featureGroup();
  sz.row = row(dmprSection, sz.label, sq(alpha(sz.c, .5), sz.c), false, on => on ? seaLayers[sz.z].addTo(map) : seaLayers[sz.z].remove());
});
getJSON("dmpr/sea_concessions").then(data => {
  data.features.forEach(f => {
    const p = f.properties;
    const z = (String(p.Concession || "").trim().slice(-1).toLowerCase());
    const sz = SEA_ALL.find(x => x.z === z) || SEA_ALL[SEA_ALL.length - 1];
    const style = { pane: "sea", color: sz.c, weight: 1.2, fillColor: sz.c, fillOpacity: .5 };
    L.geoJSON(f, { style }).eachLayer(l => {
      l.bindPopup(genericPopup("Sea concession", p), { maxHeight: 300 });
      l.on({ mouseover: highlight, mouseout: () => l.setStyle(style) });
      addFiltered(l, seaLayers[sz.z], { Zone: "Offshore", "Commodity group": "Minerals and other" });
    });
  });
  SEA_ALL.forEach(sz => {
    const n = seaLayers[sz.z].getLayers().length;
    sz.row.querySelector(".n").textContent = n;
    sz.row.style.display = n ? "" : "none";
  });
});

// ---------------------------------------------------------------- background layers (as on the current map)
const bg = section("Background", false);
const bgLayers = [
  { file: "towns", label: "Towns", on: true, sw: dotSw("#fff", "rgb(35,35,35)") },
  { file: "rivers", label: "Rivers", on: true, sw: lineSw("rgb(47,136,163)") },
  { file: "eez", label: "RSA EEZ", on: false, sw: lineSw("rgb(31,120,180)") },
  { file: "south_africa", label: "South Africa", on: true, sw: sq("rgb(164,180,132)", "rgb(35,35,35)") },
  { file: "africa", label: "Africa outline", on: true, sw: sq("rgb(191,191,191)", "rgb(124,124,124)") },
];
// Town dots and names show together from each town's own minimum zoom (`z` in data/towns.geojson,
// built by tools/build_more_towns.py), so the map stays readable zoomed out.
const townLabels = () => {};
const townMarkers = [];  // { m: marker, z: minimum zoom }
let townGroup = null;
function townTiers() {
  if (!townGroup) return;
  const zoom = map.getZoom();
  townMarkers.forEach(({ m, z }) => {
    const want = zoom >= z, has = townGroup.hasLayer(m);
    if (want && !has) townGroup.addLayer(m); else if (!want && has) townGroup.removeLayer(m);
  });
}
map.on("zoomend", () => { townTiers(); townLabels(); });
const BG_STYLE = {
  africa: { pane: "africa", color: "rgb(124,124,124)", weight: 1, fillColor: "rgb(191,191,191)", fillOpacity: 1, interactive: false },
  south_africa: { pane: "sa", color: "rgb(35,35,35)", weight: 1, fillColor: "rgb(164,180,132)", fillOpacity: 1, interactive: false },
  rivers: { pane: "rivers", color: "rgb(47,136,163)", weight: 1.3, interactive: false },
  eez: { pane: "eez", color: "rgb(31,120,180)", weight: 2, fill: false, interactive: false },
};
bgLayers.forEach(b => {
  let layer;
  const load = async () => {
    if (layer) return layer;
    const data = await getJSON(b.file);
    if (b.file === "towns") {
      townGroup = layer = L.featureGroup();
      data.features.forEach(f => {
        const m = L.circleMarker([f.geometry.coordinates[1], f.geometry.coordinates[0]], { pane: "towns", radius: 4.8, color: "rgb(35,35,35)", weight: 2, fillColor: "#fff", fillOpacity: 1, interactive: false })
          .bindTooltip(f.properties.name, { permanent: true, direction: "right", offset: [6, 0], className: "town-label", pane: "towns" });
        townMarkers.push({ m, z: f.properties.z == null ? 0 : f.properties.z });
      });
      townTiers();
    } else layer = L.geoJSON(data, { style: BG_STYLE[b.file] });
    if (b.file === "africa" || b.file === "south_africa") {
      landLayers[b.file] = layer;
      if (currentBase) layer.setStyle({ fillOpacity: 0 });
    }
    return layer;
  };
  const toggle = async on => { const l = await load(); on ? l.addTo(map) : l.remove(); townLabels(); };
  row(bg, b.label, b.sw, b.on, toggle);
  if (b.on) toggle(true);
});

// ---------------------------------------------------------------- reference layers (off by default)
const refStyle = it => {
  const kind = it.kind || "area", buffer = it.file.startsWith("buf_");
  if (kind === "line") return { pane: "reference", color: it.color, weight: it.weight || 2, opacity: .9 };
  if (kind === "outline") return { pane: "reference", color: it.color, weight: it.weight || 1.5, fill: false };
  return { pane: "reference", color: it.color, weight: buffer ? 1 : 1.5, dashArray: buffer ? "4 3" : null,
    fillColor: it.color, fillOpacity: buffer ? .12 : .25 };
};
const refSw = it => ({ line: lineSw(it.color), outline: sq("transparent", it.color), point: dotSw(it.color, "#fff") }[it.kind]
  || sq(alpha(it.color, it.file.startsWith("buf_") ? .15 : .33), it.color));
REFERENCE.forEach(group => {
  const s = section(group.title, false);
  if (group.title === "Protected area buffers") note(s, "Buffers the DMPR uses to screen applications near protected areas.");
  group.items.forEach(it => {
    let layer;
    const r = row(s, it.label, refSw(it), false, async on => {
      if (!layer) {
        const data = await getJSON("dmpr/" + it.file);
        layer = L.geoJSON(data, {
          style: refStyle(it),
          pointToLayer: (f, ll) => L.circleMarker(ll, { pane: "reference", radius: it.file === "eskom_hv_stations" ? 3.5 : 5, color: "#fff", weight: 1, fillColor: it.color, fillOpacity: 1 }),
          onEachFeature: (f, l) => l.bindPopup(genericPopup(it.label, f.properties), { maxHeight: 300 }),
        });
        r.querySelector(".n").textContent = data.features.length;
      }
      on ? layer.addTo(map) : layer.remove();
    });
  });
});

// Live layers. Clicking the map (not one of our shapes) asks the DMPR server what is under the pointer.
const liveOn = new Map();  // tile layer -> { ids, minZoom }
LIVE.forEach(group => {
  const s = section(group.title, false);
  group.items.forEach(x => {
    const layer = x.query ? dmprShapes(x) : x.outline ? dmprOutlines(x.outline, x.rgb, x.width, x.minZoom) : dmprLive(x.ids, x.minZoom, x.opacity);
    const sw = x.query ? lineSw(x.color) : x.outline ? lineSw(`rgb(${x.rgb.join(",")})`) : '<span class="sw live"></span>';
    const r = row(s, x.label, sw, false, on => {
      if (on) { layer.addTo(map); if (!x.query) liveOn.set(layer, { ids: x.outline || x.ids, minZoom: x.minZoom }); }
      else { layer.remove(); liveOn.delete(layer); }
    });
    r.querySelector(".n").textContent = `zoom ${x.minZoom}+`;
  });
});
map.on("click", e => {
  const t = e.originalEvent && e.originalEvent.target;
  if (t && t.classList && t.classList.contains("leaflet-interactive")) return;
  const ids = [...liveOn.values()].filter(v => map.getZoom() >= v.minZoom).flatMap(v => v.ids);
  if (!ids.length) return;
  const b = map.getBounds(), size = map.getSize();
  const q = new URLSearchParams({ geometry: `${e.latlng.lng},${e.latlng.lat}`, geometryType: "esriGeometryPoint", sr: 4326,
    layers: "all:" + ids.join(","), tolerance: 5, mapExtent: [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()].join(","),
    imageDisplay: `${size.x},${size.y},96`, returnGeometry: false, f: "json" });
  fetch(`${DMPR}/identify?${q}`).then(r => r.json()).then(d => {
    const res = (d.results || []).slice(0, 4);
    if (!res.length) return;
    L.popup({ maxHeight: 360 }).setLatLng(e.latlng)
      .setContent(res.map(x => genericPopup(x.layerName, x.attributes)).join("<hr>")).openOn(map);
  }).catch(() => {});
});

const bm = section("Basemap", false, false);
Object.keys(BASEMAPS).forEach((name, i) => row(bm, name, "", i === 0, on => on && setBasemap(name), "radio", "basemap"));

// ---------------------------------------------------------------- search
const input = panel.getContainer().querySelector(".search");
const results = panel.getContainer().querySelector(".results");
input.addEventListener("input", () => {
  const q = input.value.trim().toLowerCase();
  results.innerHTML = "";
  if (q.length < 2) return;
  const words = q.split(/\s+/);
  searchIndex.filter(s => words.every(w => s.text.includes(w))).slice(0, 8).forEach(s => {
    const d = document.createElement("div");
    d.innerHTML = `${esc(s.title)}<small>${esc(s.sub)}</small>`;
    d.onclick = () => {
      s.show();
      map.fitBounds(s.layer.getBounds(), { maxZoom: 12, padding: [40, 40] });
      s.layer.openPopup();
    };
    results.append(d);
  });
});

// ---------------------------------------------------------------- left-hand buttons
const Download = L.Control.extend({
  options: { position: "topleft" },
  onAdd() {
    const b = L.DomUtil.create("div", "btn-card");
    b.innerHTML = '<i class="fas fa-download"></i><span>Download map image</span>';
    L.DomEvent.disableClickPropagation(b);
    b.onclick = () => htmlToImage.toPng(document.getElementById("map"), {
      filter: n => !(n.classList && n.classList.contains("leaflet-control-container")),
    }).then(url => { const a = document.createElement("a"); a.href = url; a.download = "west-coast-mining-map.png"; a.click(); })
      .catch(err => alert("The image could not be created: " + err));
    return b;
  },
});
new Download().addTo(map);
L.control.zoom({ position: "topleft" }).addTo(map);
L.control.locate({ position: "topleft", locateOptions: { maxZoom: 14 } }).addTo(map);
L.control.measure({ position: "topleft", primaryLengthUnit: "kilometers", secondaryLengthUnit: "meters",
  primaryAreaUnit: "hectares", secondaryAreaUnit: "sqmeters" }).addTo(map);

// ---------------------------------------------------------------- about box (bottom right)
const About = L.Control.extend({
  options: { position: "bottomright" },
  onAdd() {
    const d = L.DomUtil.create("div", "about");
    const closed = '<i class="fas fa-info-circle"></i>';
    d.innerHTML = closed;
    d.onmouseenter = () => {
      d.classList.add("open");
      d.innerHTML = `<h3><i class="fas fa-info-circle"></i> About this map</h3>
        <p>Prospecting, mining and related development applications and rights, compiled by Protect the
        West Coast. Each application or right appears once: PTWC's register (West Coast, Namakwa and
        offshore) is combined with every Western Cape record in the DMPR Mining Licence System, and each
        popup gives its Record ID and source, matching the PTWC public register.${updated ? ` Data updated ${esc(updated)}.` : ""}</p>
        <p>Protected areas, buffers, heritage, infrastructure and boundaries cover the whole country and
        come from the DMPR Mining Licence System's public map service.${dmprUpdated ? ` Downloaded ${esc(dmprUpdated)}.` : ""}
        Layers marked "zoom" are drawn live from the DMPR server. The DMPR service credits the geology to the
        Council for Geoscience (1:1 000 000 Geological Map of South Africa, 2019) and the municipal boundaries to
        the Municipal Demarcation Board (2018).</p>
        <p>Biodiversity priority areas (Critical Biodiversity Areas and Ecological Support Areas): data made publicly
        available by the South African National Biodiversity Institute (SANBI) on its Biodiversity GIS website
        (bgis.sanbi.org), licensed CC BY-NC-SA 4.0. Western Cape: 2023 Western Cape Biodiversity Spatial Plan, updated
        November 2025 (CapeNature). Northern Cape: Critical Biodiversity Areas Map 2024 (Northern Cape Department of
        Agriculture, Environmental Affairs, Rural Development and Land Reform). Simplified for display by Protect the
        West Coast; use the source data for site-level decisions.</p>
        <p>Background: Natural Earth. Town positions: &copy; OpenStreetMap contributors.</p>
        <p>Original map design and data: One Ocean Hub Research Group, Department of Environmental and
        Geographical Science, University of Cape Town (M. Lambrecht). Further developed by Protect the West Coast.</p>
        <div class="disclaimer"><b><i class="fas fa-exclamation-triangle"></i> Disclaimer</b>
        <p>All information comes from records made publicly available by the Department of Mineral and
        Petroleum Resources (DMPR), the environmental assessment practitioners (EAPs) for each application,
        and other public sources such as newspaper notices. This map is updated as information becomes
        available. The accuracy of the boundaries and the information shown cannot be guaranteed.</p></div>`;
    };
    d.onmouseleave = () => { d.classList.remove("open"); d.innerHTML = closed; };
    return d;
  },
});
new About().addTo(map);

// ---------------------------------------------------------------- shareable view in the URL (#zoom/lat/lng)
function restoreView() {
  const m = location.hash.match(/^#(\d+)\/(-?[\d.]+)\/(-?[\d.]+)/);
  if (!m) return false;
  map.setView([+m[2], +m[3]], +m[1]);
  return true;
}
map.on("moveend", () => {
  const c = map.getCenter();
  history.replaceState(null, "", `#${map.getZoom()}/${c.lat.toFixed(3)}/${c.lng.toFixed(3)}`);
});
const hadHash = restoreView();
if (!hadHash) map.setView([-31.2, 18.3], 8);


// Layer counts in the panel follow the onshore / offshore / oil and gas ticks (rows are not hidden or shown here).
function updateCounts() {
  const n = (row, group) => { if (row) row.querySelector(".n").textContent = group.getLayers().length; };
  CATS.forEach(c => n(c.row, catLayers[c.name]));
  RIPL.forEach(r => { if (!r.phase) n(r.row, riplLayers[r.s]); });
  INACTIVE_TYPES.forEach(it => n(it.row, it.layer));
  SEA_ALL.forEach(sz => n(sz.row, seaLayers[sz.z]));
}
