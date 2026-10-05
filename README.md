# iris.

*notebook entries & working drafts*

a one-page personal site, part portfolio, part notebook margin, part excuse to keep a song on loop.

---

there is no build step here. no framework, no bundler, no `package.json`, no node_modules.
three text files, one folder of images, and a song.

```
index.html      the whole page, in order
styles.css      ~860 lines of paper, ink and tape
script.js       ~80 lines, and all of them belong to the music player
assets/         images, favicons, and one mp3
```

## running it

open `index.html` and it works. that's the whole process.

if you'd rather serve it properly:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

any static server will do. there's nothing to compile and nothing to install first.

## what the page is

top to bottom, in the order it reads:

| section | what it is |
| --- | --- |
| **header** | sticky. the `iris.` wordmark, then `profile / index / signal`, three anchor links and nothing more |
| **hero** | the big name, a one-line lede, and a portrait with a torn-paper border and a `not a pitch` sticker |
| **player** | *faithful* by sage (me). real audio, real progress bar, click to seek, arrow keys to skip ten seconds |
| **profile** | two short paragraphs. code on one side, words on the other, slightly out of alignment on purpose |
| **gallery** | one wide photo, one poem excerpt pinned next to it in a taped card |
| **index** | three columns: books / manga, games, songs. each card is numbered `01`, `02`, `03` |
| **signal** | the closing statement, with a `sudo pacman -S story` sticker because of course there is one |
| **footer** | a line of text and a `back to top` |

## the look

everything is CSS custom properties at the top of `styles.css`. change a value there and the
whole page shifts with it.

```css
:root {
  --paper:  #f7f0e5;   /* the page itself */
  --ink:    #201d1a;   /* body text */
  --green:  #385243;   /* section kickers */
  --wine:   #884147;   /* margin notes, the progress fill */
  --hand:   "Caveat";  /* the loudest voice */
  --body-hand:    "Patrick Hand";
  --heading-hand: "Kalam";
  --code-hand:    "JetBrains Mono";
}
```

four Google fonts do the typographic heavy lifting: Caveat for labels and stamps, Patrick Hand
for body copy, Kalam for headings, JetBrains Mono for the timecode. if you'd rather not depend on
a network, drop the `<link>` in `index.html` and the `cursive` fallbacks in `:root` will take over.

the paper texture is three layers stacked on `body`: a gradient over `assets/background.jpg` set to
`fixed`, a faint `body::before` with a wine margin line down the right, and a `.grain` overlay of
1px grid lines. photos get a light `grayscale` + `sepia` filter so everything sits in the same room.
the slight rotations (`-1.5deg`, `2.2deg`, `-2.5deg`) are load-bearing. don't straighten them.

## the player

`script.js` is one IIFE and it only does one job. it grabs six elements, bails out if any are
missing, and wires up:

- **play / pause**: toggles `audio.play()`, and swaps the triangle for a pause bar by swapping
  border styles on `.play-icon` (no icon font, no svg)
- **seek**: click anywhere on the progress bar to jump
- **keyboard**: `←` and `→` move ten seconds in either direction
- **timecode**: `mm:ss`, padded, tabular figures, and safe when `audio.duration` is still `NaN`
- **state line**: `paused` / `playing` / `tap again`, the last one for when a browser blocks
  playback on load

the bar is a real `role="slider"` with `aria-valuenow` kept in sync, so it can be focused and
driven from the keyboard.

## making it yours

- **the words**: all the copy lives in `index.html` as plain text. there is no CMS, no JSON, nothing
  to fight with. edit and reload.
- **the list items**: the three favourites lists are `<ul>`s of bare `<li>` tags. the em dash and
  the wine colour come from `.lists li::before`.
- **the song**: drop a new file in `assets/`, change the `<audio src>`, and update the track name
  and artist. the album art is just the `.cover` image next to it.
- **the photos**: `profile.jpg` is the hero portrait and is forced to a square with
  `aspect-ratio: 1` and `object-fit: cover`. `muse.jpg` is the wide one, fixed at 420px tall
  (300px on mobile). `background.jpg` is tiled and blurred behind everything.
- **the little stamps**: some of the handwriting is CSS, not markup. `.hero-copy::before` draws
  the `01 / root` label, `.hero-portrait::after` draws the `not a pitch` sticker, `.quote-card::before`
  writes `margin:`, and `.signal::before` types the pacman command. `draft 02 / margin copy` at the
  top right is real markup. search the stylesheet for `content:` to find them all.
- **the poem**: change the text in `.quote-card p` and the credit under it.

## putting it online

it's static, so anywhere that serves files will do. no build command, publish the repo root as-is:

- **github pages**: push, then settings → pages → deploy from branch
- **netlify**: drag the folder onto the dashboard
- **vercel / cloudflare pages**: import the repo, leave the build settings blank

one thing to know before you deploy: `assets/profile.jpg` is **1.6 MB** on its own, and the whole
`assets/` folder is 3.1 MB. it'll load, but it won't load fast on a phone. running the images
through something like `squoosh` or `cwebp` would cut most of that without touching the layout.

## details that were on purpose

- **two breakpoints**: 820px stacks every grid and shrinks the player, 560px tightens the type and
  stacks the footer
- **`prefers-reduced-motion`**: all transitions collapse and smooth scrolling turns off
- **`svh` units**: the hero and the signal section size against the *small* viewport height, so
  mobile browser chrome sliding in and out doesn't crop the page
- **`backdrop-filter`**: used on the sticky header and the photo caption, with `-webkit-` prefixes
- **focus styles**: the nav links and play button invert to ink-on-paper instead of getting a
  default outline
- **alt text on everything**, and the decorative `.grain` layer is `aria-hidden`

needs a reasonably modern browser. it uses `svh`, `:focus-visible`, and `backdrop-filter`.
nothing exotic, but `flexbox`-era-guaranteed it is not.

## a note on the mood

the whole thing is one file of ink, tilted two degrees, on paper. every stamp, every dashed rule,
every `not a pitch` is a small joke that only makes sense if you know the page is a notebook
rather than a résumé. if you fork this, keep the margins. they're the point.
