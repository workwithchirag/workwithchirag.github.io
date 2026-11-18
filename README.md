# workwithchirag.github.io

Portfolio for Upwork clients. Shows NO email, phone, WhatsApp or GitHub; every contact button opens the Upwork profile.
Same projects and design as chiragghevariya.github.io (separate copy: update both when adding a project).
A static site (plain HTML, CSS and JS, no build step), published with GitHub Pages at **https://workwithchirag.github.io**.

```
chiragghevariya.github.io/
├── index.html      page shell (title, SEO tags)
├── projects.js     ← ALL CONTENT: your info + every project
├── app.js          renders the pages (no need to edit)
├── styles.css      design (colors at the top in :root)
├── assets/<project>/   optimized images (.webp) and videos (.mp4)
└── scripts/optimize-media.sh   turns raw files into assets/
```

## Preview locally
```bash
cd ~/Sites/workwithchirag.github.io
python3 -m http.server 8000     # open http://localhost:8000
```

## Update content
- **Contact details:** edit `window.SITE` at the top of `projects.js` (email, WhatsApp, phone, GitHub, LinkedIn).
- **Edit a project:** change its block in `projects.js`.
- **Add a project:** put raw files in `~/Sites/Project/st/portfolio/<folder>`, add lines to `scripts/optimize-media.sh`,
  run `./scripts/optimize-media.sh`, then copy a project block in `projects.js`.
  Phone screenshots: list them as `["01", "Caption", "phone"]`.

## Publish changes
```bash
cd ~/Sites/workwithchirag.github.io && git add . && git commit -m "update" && git push
```
