# West Coast Mining Map

Interactive map of prospecting, mining and related development applications on the West Coast and in
Namakwa, published by [Protect the West Coast](https://protectthewestcoast.org/).

The look follows the original PTWC map compiled by Michael Lambrecht (One Ocean Hub Research Group,
Department of Environmental and Geographical Science, University of Cape Town).

## What is in this folder

| Path | What it is |
|---|---|
| `index.html` | The page. Opens the map. |
| `js/map.js` | Layers, colours, popups, search and buttons. |
| `css/map.css` | Styling. |
| `data/concessions.geojson` | Mining rights, permits and applications: the PTWC register reconciled with every Western Cape record in the DMPR Mining Licence System, one record each. |
| `data/africa.geojson`, `south_africa.geojson`, `rivers.geojson` | Background layers (Natural Earth, public domain). |
| `data/towns.geojson` | Town positions (OpenStreetMap). |
| `data/dmpr/` | DMPR Mining Licence System layers (`tools/build_dmpr_layers.py`): sea concessions and national protected areas, buffers, heritage, defence, aviation, SKA, Eskom, rail, pipelines and municipal boundaries. |
| `data/eez.geojson` | South African EEZ (DMPR). |

## How the data is updated

The data is not edited by hand. From the project folder (one level up):

1. Export the Google Sheet "PTWC Mining Applications Register" (tab `Register`) to
   `sources/register_sheet_<date>.csv`.
2. Run `python3 tools/build_public_map.py`. It writes `data/concessions.geojson` and
   `data/no_boundary.json`, and copies only fields that are safe to publish (no Drive links,
   engagement notes or contact details).
3. To refresh the DMPR layers, run `python3 tools/build_dmpr_layers.py` (writes `data/dmpr/`; the
   tenure layers go to the project's own `data/dmpr/` and reach the map through step 2, so run step 2 again). The DMPR's
   public service only holds mining records for the Western Cape. Farms, erfs, servitudes, wards, geology,
   the mining grid and medium-voltage lines are not downloaded: the map draws them live from the DMPR
   server and asks it for details when clicked (farms and farm portions are fetched as shapes for the
   area in view, because the DMPR server is too slow to draw them).
4. New boundaries go in `sources/boundaries/manual/` as GeoJSON with a `PTWC ID` property.
5. Preview locally: `python3 -m http.server` inside this folder, then open http://localhost:8000.

## Viewing it locally

The page loads its data with `fetch`, so it must be served over http (opening `index.html`
straight from the file system will show an empty map). Any simple web server works, as does
GitHub Pages.

## Sources and credits

Original map design and data: One Ocean Hub Research Group, Department of Environmental and Geographical
Science, University of Cape Town (Michael Lambrecht). Further developed by Protect the West Coast.

Also: DMPR Mining Licence System public map service (geology: Council for Geoscience; municipal
boundaries: Municipal Demarcation Board, as credited by that service), Natural Earth, OpenStreetMap
contributors (town positions), Esri (imagery and topographic basemaps).

## Disclaimer

This map is updated as information becomes available. The accuracy of the boundaries and the
information shown cannot be guaranteed.
