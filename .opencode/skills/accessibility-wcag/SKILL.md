---
name: accessibility-wcag
description:
  WCAG 2.1 AA compliance requirements including semantic markup, keyboard
  navigation, ARIA labels, and color contrast
license: Apache-2.0
---

<!-- MODIFIED: token-compressed, semantics preserved. License: Apache-2.0. -->

# Accessibility WCAG Skill

## Purpose

All web content meets WCAG 2.1 Level AA. Usable by people w/ disabilities: visual, auditory, motor, cognitive.

## Rules

### WCAG 2.1 AA Requirements

Four principles (POUR):

1. **Perceivable** - Info presentable in ways users can perceive
2. **Operable** - Interface operable by all users
3. **Understandable** - Info + operation understandable
4. **Robust** - Content robust for assistive tech

### Perceivable Requirements

#### Text Alternatives (1.1)

**MUST:**

- `alt` text for all meaningful images
- Empty `alt=""` for decorative images
- Captions for audio/video content
- Transcripts for audio-only content
- Descriptive link text (not "click here")

**Examples:**

```html
<!-- GOOD: Meaningful alt text -->
<img
  src="security-audit.jpg"
  alt="Security professional reviewing network logs on dual monitors"
/>

<!-- GOOD: Decorative image -->
<img src="divider.png" alt="" aria-hidden="true" />

<!-- BAD: Missing alt -->
<img src="chart.png" />

<!-- BAD: Useless alt text -->
<img src="photo.jpg" alt="Image" />
```

#### Time-based Media (1.2)

**MUST:**

- Captions for videos (prerecorded + live)
- Audio descriptions for video content
- Transcripts for audio content

#### Adaptable Content (1.3)

**MUST:**

- Semantic HTML (headings, lists, tables correct)
- Content accessible without CSS
- No sensory-only cues (color, shape, position)
- Proper reading order in DOM

**Examples:**

```html
<!-- GOOD: Semantic markup -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- BAD: Div soup -->
<div class="nav">
  <div class="item"><a href="/">Home</a></div>
  <div class="item"><a href="/about">About</a></div>
</div>
```

#### Distinguishable Content (1.4)

**MUST:**

- Contrast ratio ≥4.5:1 normal text
- Contrast ratio ≥3:1 large text (18pt+ or 14pt+ bold)
- No color-only information
- Text resize 200% w/o loss of functionality
- No background audio that can't be paused/stopped
- Text selectable + copyable

**Color Contrast Examples:**

```css
/* GOOD: High contrast (7:1) */
.text {
  color: #000000; /* Black */
  background-color: #ffffff; /* White */
}

/* GOOD: Sufficient contrast (4.6:1) */
.link {
  color: #0066cc; /* Blue */
  background-color: #ffffff; /* White */
}

/* BAD: Insufficient contrast (2.3:1) */
.subtle-text {
  color: #cccccc; /* Light gray */
  background-color: #ffffff; /* White */
}
```

### Operable Requirements

#### Keyboard Accessible (2.1)

**MUST:**

- All functionality via keyboard
- Visible focus indicators
- No keyboard traps
- Logical tab order
- Keyboard shortcuts for complex interfaces

**Examples:**

```html
<!-- GOOD: Button is keyboard accessible -->
<button onclick="submitForm()">Submit</button>

<!-- BAD: Div onClick is not keyboard accessible -->
<div onclick="submitForm()">Submit</div>
```

```css
/* GOOD: Visible focus indicator */
a:focus,
button:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* BAD: Removing focus outline without replacement */
*:focus {
  outline: none; /* Never do this without providing alternative! */
}
```

#### Enough Time (2.2)

**MUST:**

- Time limits can be turned off, adjusted, or extended
- Pause, stop, hide for auto-updating content
- No time limits unless essential (auctions, real-time games)

#### Seizures and Physical Reactions (2.3)

**MUST NOT:**

- Content flashing >3 times/sec
- Large flashing areas

#### Navigable (2.4)

**MUST:**

- Skip links bypass repeated content
- Descriptive page titles
- Logical focus order
- Clear link purposes
- Multiple nav ways (menu, search, sitemap)
- Visible focus indicators
- Clear headings + labels

**Examples:**

```html
<!-- GOOD: Skip link -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<nav>...</nav>

<main id="main-content">...</main>

<!-- GOOD: Descriptive title -->
<title>Security Services - ISO 27001 Implementation | Hack23</title>

<!-- BAD: Generic title -->
<title>Services</title>
```

#### Input Modalities (2.5)

**MUST:**

- Touch targets ≥44×44 pixels
- No device-motion-only cues
- Pointer events cancellable
- Clickable label text matches accessible name

### Understandable Requirements

#### Readable (3.1)

**MUST:**

- Page language via `lang` attribute
- Language of passages differing from page language
- Appropriate reading level (when possible)

**Examples:**

```html
<!-- GOOD: Language specified -->
<html lang="en">
  <!-- GOOD: Foreign language phrase -->
  <p>The phrase <span lang="fr">je ne sais quoi</span> is French.</p>
</html>
```

#### Predictable (3.2)

**MUST:**

- No context change on focus
- No context change on input (w/o warning)
- Consistent nav across pages
- Consistent component identification

#### Input Assistance (3.3)

**MUST:**

- Input errors identified clearly
- Labels/instructions for user input
- Error suggestions when possible
- Prevent errors in legal/financial transactions
- Review/confirmation before final submission

**Examples:**

```html
<!-- GOOD: Clear label and error -->
<label for="email">Email Address *</label>
<input
  type="email"
  id="email"
  aria-required="true"
  aria-describedby="email-error"
/>
<span id="email-error" class="error" role="alert">
  Please enter a valid email address (e.g., name@example.com)
</span>

<!-- GOOD: Required field indicator -->
<label for="password">
  Password *
  <span class="required-note">(required)</span>
</label>
<input type="password" id="password" aria-required="true" />
```

### Robust Requirements

#### Compatible (4.1)

**MUST:**

- Valid HTML (no duplicate IDs, proper nesting)
- ARIA correct (roles, states, properties)
- Name, role, value for all UI components
- Status messages programmatically determinable

**MUST REASON:**

- **Tabindex on Containers — Reasoning Required:**

  `tabindex="0"` (or any positive integer) on structural container (`<div>`,
  `<section>`, `<article>`, `<nav>`, `<p>`, etc.) creates explicit tab stop in
  focus order. Before adding, **MUST** reason through each question:

  **1. Container already has native interactive elements?**
  - `<button>`, `<a>`, `<input>`, `<select>`, `<textarea>`, `<details>`, etc.
    already focusable.
  - Yes: `tabindex` adds extra tab stop user must Tab through first. → Q2.
  - No (only static text/images): `tabindex` may fit (e.g. clickable card
    wrapper). → Q3.

  **2. WAI-ARIA pattern mandates it?**
  - Some ARIA patterns require `tabindex="0"` on non-interactive containers —
    e.g.:
    - `role="tabpanel"` w/ **no** focusable children
    - `role="dialog"` w/o focusable close button
    - `role="gridcell"` in interactive grids
  - Pattern **requires** it: document reasoning in code comment, add `tabindex`.
  - Pattern **recommends** it but container has focusable children: default
    **no** `tabindex` — avoid double-tab trap. Native children give keyboard
    access.

  **3. Keyboard users reach all interactive content efficiently w/o it?**
  - Mentally tab through page. Count tab stops. Container `tabindex` add
    redundant stop?
  - Children already reachable in 1–2 Tab presses: **omit** `tabindex`.
  - Container wraps large block user would skip entirely: `tabindex` may be
    warranted.

  **4. `tabindex` as CSS hook or event delegation?**
  - **Yes: stop.** Use different selector or `data-*` attribute. `tabindex` only
    for focus semantics, never styling/scripting convenience.

  **Decision rule:** default **do not** add `tabindex` to containers w/ native
  interactive children. Only exceptions: documented ARIA-mandated cases,
  justified w/ inline code comment.

**ARIA Examples:**

```html
<!-- GOOD: ARIA for custom component -->
<div role="tablist" aria-label="Account settings">
  <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">
    Profile
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">
    Security
  </button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  <!-- Profile content -->
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  <!-- Security content -->
</div>

<!-- GOOD: Status message -->
<div role="status" aria-live="polite" aria-atomic="true">
  Changes saved successfully
</div>
```

## ARIA Best Practices

**Use ARIA When:**

- No native HTML element for component
- Need enhanced semantic meaning
- Need state/property not available in HTML

**ARIA Landmarks:**

```html
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <main role="main">
      <aside role="complementary">
        <footer role="contentinfo"></footer>
      </aside>
    </main>
  </nav>
</header>
```

**ARIA States and Properties:**

- `aria-label` - Provides accessible name
- `aria-labelledby` - References element that labels this one
- `aria-describedby` - References element that describes this one
- `aria-hidden` - Hides element from screen readers
- `aria-live` - Announces dynamic content changes
- `aria-expanded` - Indicates if expandable element is open
- `aria-pressed` - Indicates toggle button state
- `aria-current` - Indicates current item in set

## Testing Checklist

**MUST TEST:**

1. **Keyboard Navigation**
   - Tab through all interactive elements
   - Enter/Space activates buttons/links
   - Verify visible focus indicators
   - Check keyboard traps

2. **Screen Reader**
   - NVDA (Windows), VoiceOver (Mac), or JAWS
   - All content announced
   - Heading structure
   - Form labels + error messages

3. **Color Contrast**
   - WebAIM Contrast Checker
   - All text/background combos
   - Focus indicators

4. **Zoom/Resize**
   - Zoom 200%, verify functionality
   - Browser text-only zoom
   - Responsive design works

5. **Automated Tools**
   - WAVE (browser extension)
   - axe DevTools
   - Lighthouse accessibility audit
   - Pa11y

## Common Accessibility Errors

### 1. Missing Alt Text

```html
<!-- BAD -->
<img src="logo.png" />

<!-- GOOD -->
<img src="logo.png" alt="Hack23 Cybersecurity" />
```

### 2. Poor Color Contrast

```css
/* BAD: 2.5:1 ratio */
color: #999999;
background: #ffffff;

/* GOOD: 7:1 ratio */
color: #333333;
background: #ffffff;
```

### 3. Missing Form Labels

```html
<!-- BAD -->
<input type="text" placeholder="Email" />

<!-- GOOD -->
<label for="email">Email</label>
<input type="text" id="email" />
```

### 4. Empty Links

```html
<!-- BAD -->
<a href="report.pdf">
  <img src="pdf-icon.png" />
</a>

<!-- GOOD -->
<a href="report.pdf">
  <img src="pdf-icon.png" alt="Download Annual Report (PDF, 2MB)" />
</a>
```

### 5. Non-descriptive Link Text

```html
<!-- BAD -->
<a href="/services">Click here</a> for our services.

<!-- GOOD -->
<a href="/services">View our cybersecurity services</a>
```

## Related ISMS Policies

- **[Information Security Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Information_Security_Policy.md)** -
  Accessibility as part of service delivery

## Related Documentation

- [html-css-best-practices SKILL.md](../html-css-best-practices/SKILL.md) -
  Semantic HTML foundation

## Resources

- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM**: https://webaim.org/
- **A11Y Project**: https://www.a11yproject.com/
- **MDN Accessibility**:
  https://developer.mozilla.org/en-US/docs/Web/Accessibility

## Accessibility Statement

Every website MUST include an accessibility statement at
`/accessibility-statement.html` that includes:

- Commitment to accessibility
- WCAG 2.1 AA conformance claim
- Known issues and limitations
- Contact information for accessibility concerns
- Date of last review
