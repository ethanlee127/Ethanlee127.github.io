# My Portfolio

A simple, fast résumé + projects website. It doesn't need a build step or any installs.

## Quick start

1. Open **`content.js`** in any text editor (Notepad or VS Code both work).
2. Replace the example text with your own info and save.
3. Double-click **`index.html`** to see it in your browser. Refresh after each edit.

## Customizing

| I want to…                     | Do this in `content.js`                                        |
|--------------------------------|----------------------------------------------------------------|
| Change the color               | `theme.accentColor: "#e11d48"`                                 |
| Default to dark mode           | `theme.defaultMode: "dark"`                                    |
| Add my photo                   | Put `me.jpg` in `assets/`, set `photo: "assets/me.jpg"`        |
| Add a résumé download button   | Put `resume.pdf` in `assets/`, set `resumePdf: "assets/resume.pdf"` |
| Add a project                  | Copy one `{ ... },` block in `projects` and edit it            |
| Add a project screenshot       | Put the image in `assets/`, set `image: "assets/shot.png"`     |
| Hide a section                 | Make its list empty, e.g. `skills: []`                         |
| Add GitHub/LinkedIn/etc.       | Add `{ label: "Twitter", url: "https://..." }` to `links`      |

**Other features**
- The nav menu builds itself from whichever sections have content.
- Project filter buttons are generated from your project `tags`.
- The dark/light toggle remembers each visitor's choice.
- Works on mobile.
- **Ctrl+P** prints a clean, résumé-style version of the page.

**If the page goes blank after an edit,** you probably have a missing comma or quote in `content.js`. Press F12 and open the Console tab, and it will point to the line.

## Putting it online (free)

**GitHub Pages**
1. Create a repo named `yourusername.github.io`.
2. Upload all the files in this folder.
3. Your site will be live at `https://yourusername.github.io` in about a minute.

**Netlify:** go to https://app.netlify.com/drop and drag this folder onto the page.
