# AI Product UI Research

Distinctive UI patterns from real, currently-trending AI products with citations. The design system will draw on these as references for what makes AI products feel new but coherent.

---

## Pattern catalog

### 1. Shimmer-gradient streaming text
- **Products:** ChatGPT, Claude, Vercel AI SDK components, shadcn/ui AI elements.
- **Visual:** A horizontal linear gradient (typically `from-foreground/30 via-foreground to-foreground/30`) sweeps left-to-right across in-flight text at ~2s cadence using `background-clip: text`. Only the most recent unstreamed tokens shimmer; settled text turns solid as the cursor advances.
- **Why AI:** Token-by-token rendering creates dead air between tokens that feels broken on slow networks. The shimmer turns latency into a "thinking aloud" rhythm rather than a stutter.
- **Replaces:** Spinner-over-blank-area, three-dot typing indicator.
- **Citations:**
  - https://ai-sdk.dev/elements/components/shimmer
  - https://www.shadcn.io/ai/shimmer
  - https://www.prompt-kit.com/docs/text-shimmer

### 2. Blinking caret token cursor
- **Products:** ChatGPT, Claude, Perplexity answers.
- **Visual:** A 2px-wide solid block caret blinks at ~500ms at the streaming tail; disappears the instant the stream completes. Often matches the text color rather than a system caret blue.
- **Why AI:** Distinguishes "still generating" from "done" without occupying real estate. Acts as a status light for a process with no fixed duration.
- **Replaces:** Toast notifications, separate "generating…" labels above the message.
- **Citation:** https://thefrontkit.com/blogs/ai-chat-ui-best-practices

### 3. Inline numbered citation chips with paired source rail
- **Products:** Perplexity (canonical), ChatGPT Search, Gemini, Claude with web search.
- **Visual:** Superscript `¹²³` chips in the answer, tinted to the brand accent (Perplexity uses teal-cyan ~#20B8CD on near-black). Above or beside the answer, a horizontally-scrollable strip of source cards shows favicon + domain + title excerpt. Hovering a superscript highlights its card; transitions are <200ms.
- **Why AI:** Retrieval-augmented answers need verifiability without breaking flow. Inline chips give "where did this come from" at every claim; the rail gives "what's the broader source set."
- **Replaces:** Footnote lists at the bottom, raw URL dumps.
- **Citations:**
  - https://www.unusual.ai/blog/perplexity-platform-guide-design-for-citation-forward-answers
  - https://www.shapeof.ai/patterns/citations
  - https://www.saasui.design/application/perplexity-ai
  - https://www.shadcn.io/ai/inline-citation

### 4. Two-pane chat + artifact / preview split
- **Products:** Claude (Artifacts), v0 (preview pane), Lovable, Bolt.new, Granola.
- **Visual:** ~40/60 split with conversation on the left and a live, persistent output canvas on the right. The right pane swaps content type by output (React preview, SVG, doc, dashboard, transcript). The pane animates in only when an artifact is generated, not on every message.
- **Why AI:** AI generates artifacts (code, docs, data) that need to live alongside dialogue, not scroll away inside it. Keeps prompt context and result mutually visible during iteration.
- **Replaces:** Modal previews, downloads, separate output tabs.
- **Citations:**
  - https://albato.com/blog/publications/how-to-use-claude-artifacts-guide
  - https://www.eigent.ai/blog/claude-live-artifacts-guide
  - https://v0.app/
  - https://lovable.dev/
  - https://www.granola.ai/

### 5. AI-as-second-color note overlay
- **Products:** Granola.
- **Visual:** User-typed notes render in black; the AI-enhanced bullets render in mid-gray (~#9CA3AF) interleaved underneath the human structure. Every AI line carries an inline anchor link back to the transcript timestamp.
- **Why AI:** Makes provenance legible at a glance — you can always see which line is yours vs. the model's, and trace any AI line to its evidence in one click.
- **Replaces:** "AI summary" sections appended below the note; speech-bubble formatting.
- **Citations:**
  - https://overtheanthill.substack.com/p/granola
  - https://uxplanet.org/the-art-of-invisible-ai-what-granolas-70-retention-teaches-us-about-product-design-2de5a2836d17

### 6. Inline accept / reject diff overlay
- **Products:** Cursor (canonical), Windsurf, GitHub Copilot inline edits, Lovable Visual Edits.
- **Visual:** Proposed edits render directly in the file as red strikethrough lines + green new lines, with floating `Accept` / `Reject` (or `Tab` / `Esc`) chips pinned to the edit hunk. Speculative decoding makes them appear near-instantly. Multiple hunks get individual controls.
- **Why AI:** AI code edits are not commits — they're suggestions. The pattern lets users review at the line level inside the editor, the place the change will actually live, rather than in a separate review surface.
- **Replaces:** PR-style review pages, accepting whole AI-edit "patches" sight-unseen.
- **Citations:**
  - https://www.builder.io/blog/cursor-tips
  - https://www.builder.io/blog/cursor-design-mode-visual-editing
  - https://blog.sshh.io/p/how-cursor-ai-ide-works

### 7. Collapsible "thinking" / tool-use disclosure
- **Products:** Claude (extended thinking), Cursor agent, Claude Code, OpenAI o-series UIs.
- **Visual:** Above the final answer, a muted disclosure row like `▸ Thought for 12s` or `▸ Searched the web · 3 results · Ran terminal`. Expanding reveals the reasoning trace and any tool calls (search queries, file paths, shell commands) in monospace with subtle dividers between steps.
- **Why AI:** Agentic models do multi-step work that users want to audit but not see by default. Disclosure preserves trust without burying the answer.
- **Replaces:** Logs in a developer console, fully hidden reasoning, or fully exposed verbose chain-of-thought in the main thread.
- **Citations:**
  - https://cobusgreyling.medium.com/the-new-claude-think-tool-from-anthropic-for-improved-agentic-tool-use-12236e0e477f
  - https://www.anthropic.com/news/3-5-models-and-computer-use

### 8. Live agent action stream (file-touched ticker)
- **Products:** Cursor agent / background agents, Claude Code, Replit Agent, Bolt.new.
- **Visual:** A vertical list of compact rows during agent execution — each row is a single action (`Edited src/app/page.tsx`, `Ran npm install`, `Created components/Hero.tsx`) with a status glyph (spinner → check → red x). Rows append in real time and stay collapsed by default; clicking expands to the diff or shell output.
- **Why AI:** Long-running agentic tasks are otherwise opaque. The ticker gives a sense of progress and "what's it doing right now" without requiring the user to babysit a terminal.
- **Replaces:** A single "thinking…" spinner for minutes; raw shell logs.
- **Citations:**
  - https://www.mindstudio.ai/blog/claude-code-vs-cursor-automations-agentic-workflows
  - https://blog.sshh.io/p/how-cursor-ai-ide-works

### 9. Suggested-prompt starter cards
- **Products:** ChatGPT, Claude, Gemini, Perplexity, v0, Lovable.
- **Visual:** On empty state, a 2×2 or row-of-4 grid of low-contrast cards, each ~120–160px tall, with a small icon top-left and a 1–2 line example prompt. Clicking pre-fills the composer. Often rotates / personalizes over time.
- **Why AI:** A blank chat input is the worst empty state in software — users don't know what the model can do. Starter cards reveal capability surface area through example.
- **Replaces:** Onboarding modals, marketing-copy lists of features.
- **Citations:**
  - https://www.aiuxplayground.com/pattern/empty-state
  - https://mobbin.com/glossary/empty-state

### 10. Multi-modal composer with attachment & mode chips
- **Products:** ChatGPT, Claude, Gemini, Midjourney Imagine bar, v0.
- **Visual:** A pill-shaped composer (rounded-2xl, ~56px tall) with a `+` attachment button on the left, a row of toggle chips inside or just below (`Search`, `Research`, `Code`, `Image`, `Voice`), and a circular send/stop button on the right that morphs to a square stop icon mid-stream. Cmd/Ctrl+Enter to send-and-keep-prompt is standard.
- **Why AI:** One textbox now drives many modes (web search on/off, deep research, image gen, voice). Chips make mode visible and toggleable without leaving the composer.
- **Replaces:** Separate "tools" menu, separate product surfaces per modality.
- **Citations:**
  - https://docs.midjourney.com/hc/en-us/articles/33390732264589-Creating-on-Web
  - https://developers.openai.com/apps-sdk/concepts/ui-guidelines

### 11. Realtime canvas with sub-100ms reflection
- **Products:** Krea (canonical), Figma Make / Weave, Midjourney Draft Mode.
- **Visual:** Split canvas — left pane is editable input (sketch, primitives, webcam, screen share), right pane is the AI-rendered output that updates in <50ms on every input change. Often includes an "AI strength" slider mapping how far the output diverges from the input.
- **Why AI:** Image generation latency historically broke flow. Sub-frame reflection turns generation into direct manipulation — closer to Photoshop than to a prompt-and-wait tool.
- **Replaces:** Submit-and-wait prompt boxes, modal "generating…" overlays.
- **Citations:**
  - https://www.krea.ai/
  - https://docs.krea.ai/user-guide/features/realtime
  - https://www.hackdesign.org/toolkit/krea/

### 12. Live audio waveform as primary surface
- **Products:** ElevenLabs (Waveform UI components), Suno, Granola (recording state).
- **Visual:** Canvas-rendered bar waveforms at 60fps, three variants — scrolling (live mic input), static (finished clip with seekable playhead), and recording-with-history (drag back through prior takes). Active state often uses the brand accent; inactive bars fade to ~30% opacity.
- **Why AI:** Audio output has no visual analog by default. The waveform is *the* affordance — it shows there's content, lets users scrub, and signals capture state.
- **Replaces:** Generic `<audio>` player, file-list-with-play-buttons.
- **Citations:**
  - https://ui.elevenlabs.io/docs/components/waveform
  - https://ui.elevenlabs.io/docs/components/live-waveform

### 13. Stop / regenerate / branch on every message
- **Products:** ChatGPT, Claude, Perplexity, Gemini.
- **Visual:** A small row under each assistant message: `Copy · Regenerate · Like / Dislike · Branch / Edit`. The send button itself morphs to a stop square during streaming. Regenerate often opens a model-picker popover ("try with another model").
- **Why AI:** AI output is probabilistic — users frequently want a re-roll or a different model on the same prompt. Per-message controls treat each response as a disposable, swappable artifact.
- **Replaces:** Whole-thread retry, copy-paste-edit-resend.
- **Citation:** https://developers.openai.com/apps-sdk/concepts/ui-guidelines

### 14. Model & parameter rail in playgrounds
- **Products:** Anthropic Console Workbench, OpenAI Platform Playground, OpenRouter, Hugging Face Spaces.
- **Visual:** Right-side rail (~280–320px) with model dropdown at top, then sliders for temperature / top_p / max_tokens / thinking budget, then a system-prompt textarea. A "Compare" toggle splits the response area into N columns running the same prompt across selected models simultaneously.
- **Why AI:** Devs choosing a model need side-by-side empirical comparison, not docs. The rail turns the playground into an A/B harness.
- **Replaces:** Single-model chat with no introspection; switching tabs between providers.
- **Citations:**
  - https://platform.openai.com/playground/
  - https://www.getopenclaw.ai/tools/anthropic-console

### 15. Iridescent gradient as the "AI signal"
- **Products:** Notion AI (purple-pink shimmer on the AI menu trigger), Linear AI (animated border on AI actions), Gemini (Google four-color sparkle), Claude (subtle orange-to-rose on Claude branding), Vercel v0 (animated gradient borders on AI cards).
- **Visual:** A 200–400% oversized linear gradient (commonly purple→pink→cyan or warm orange→magenta) animates via `background-position` over 3–6s. Applied as: text fill on the AI menu word, ~1px border around AI-eligible inputs, or a soft glow on the AI button. Restraint is the rule — a single iridescent element per surface.
- **Why AI:** Becomes the universal "this is the AI affordance" semaphore. Users now scan for the gradient the way they once scanned for the magnifying-glass search icon.
- **Replaces:** Robot/sparkle icon alone; explicit "AI" labels in copy.
- **Citations:**
  - https://cruip.com/animated-gradient-borders-with-tailwind-css/
  - https://www.shadcn.io/button/glow-border-button
  - https://www.groovyweb.co/blog/ui-ux-design-trends-ai-apps-2026

---

## Cross-cutting visual treatments

- **Dark, near-black surfaces with one saturated accent** — Perplexity (teal), ElevenLabs (cinematic black), Cursor (deep slate + electric blue), Suno. Reads as "serious tool" not "consumer app."
  - https://getdesign.md/elevenlabs/design-md
  - https://www.designmd.co/d/perplexity

- **200ms is the universal AI motion budget** — citation hover, artifact pane slide-in, diff hunk appearance. Anything slower starts to feel like the AI is the bottleneck.
  - https://www.unusual.ai/blog/perplexity-platform-guide-design-for-citation-forward-answers

- **Monospace as agentic affordance** — tool calls, file paths, shell commands, model names all render in mono inside otherwise-prose surfaces. Signals "this is what the agent literally did."

---

## Product index

### Chat / conversational AI
- ChatGPT — https://chat.openai.com
- Claude — https://claude.ai
- Perplexity — https://www.perplexity.ai
- Gemini — https://gemini.google.com

### AI coding / dev tools
- Cursor — https://cursor.com
- v0 by Vercel — https://v0.dev
- Lovable — https://lovable.dev
- Bolt.new — https://bolt.new
- Replit Agent — https://replit.com
- Windsurf — https://windsurf.com
- Codeium — https://codeium.com

### AI creative / media
- Krea — https://krea.ai
- Runway — https://runwayml.com
- Suno — https://suno.com
- ElevenLabs — https://elevenlabs.io
- Pika — https://pika.art
- Midjourney — https://www.midjourney.com

### AI productivity / work
- Granola — https://granola.ai
- Notion AI — https://www.notion.so/product/ai
- Linear (AI features) — https://linear.app
- Glean — https://www.glean.com
- Hex — https://hex.tech
- Anthropic Console — https://console.anthropic.com
- OpenAI Platform — https://platform.openai.com

---

## Full source list

- https://thefrontkit.com/blogs/ai-chat-ui-best-practices
- https://developers.openai.com/apps-sdk/concepts/ui-guidelines
- https://www.groovyweb.co/blog/ui-ux-design-trends-ai-apps-2026
- https://www.patterns.dev/react/ai-ui-patterns/
- https://albato.com/blog/publications/how-to-use-claude-artifacts-guide
- https://www.eigent.ai/blog/claude-live-artifacts-guide
- https://www.mindstudio.ai/blog/what-is-claude-generative-ui-vs-canvas-artifacts
- https://www.unusual.ai/blog/perplexity-platform-guide-design-for-citation-forward-answers
- https://www.shapeof.ai/patterns/citations
- https://www.shadcn.io/ai/inline-citation
- https://www.saasui.design/application/perplexity-ai
- https://www.designmd.co/d/perplexity
- https://www.builder.io/blog/cursor-tips
- https://www.builder.io/blog/cursor-design-mode-visual-editing
- https://blog.sshh.io/p/how-cursor-ai-ide-works
- https://vercel.com/blog/announcing-v0-generative-ui
- https://vercel.com/blog/ai-sdk-3-generative-ui
- https://v0.app/
- https://lovable.dev/
- https://www.nxcode.io/resources/news/lovable-vs-bolt-new-2026-ai-app-builder-comparison
- https://www.krea.ai/
- https://docs.krea.ai/user-guide/features/realtime
- https://www.hackdesign.org/toolkit/krea/
- https://overtheanthill.substack.com/p/granola
- https://uxplanet.org/the-art-of-invisible-ai-what-granolas-70-retention-teaches-us-about-product-design-2de5a2836d17
- https://www.granola.ai/
- https://ui.elevenlabs.io/docs/components/waveform
- https://ui.elevenlabs.io/docs/components/live-waveform
- https://getdesign.md/elevenlabs/design-md
- https://docs.midjourney.com/hc/en-us/articles/33390732264589-Creating-on-Web
- https://cobusgreyling.medium.com/the-new-claude-think-tool-from-anthropic-for-improved-agentic-tool-use-12236e0e477f
- https://www.anthropic.com/news/3-5-models-and-computer-use
- https://www.mindstudio.ai/blog/claude-code-vs-cursor-automations-agentic-workflows
- https://platform.openai.com/playground/
- https://www.getopenclaw.ai/tools/anthropic-console
- https://www.aiuxplayground.com/pattern/empty-state
- https://mobbin.com/glossary/empty-state
- https://ai-sdk.dev/elements/components/shimmer
- https://www.shadcn.io/ai/shimmer
- https://www.prompt-kit.com/docs/text-shimmer
- https://cruip.com/animated-gradient-borders-with-tailwind-css/
- https://www.shadcn.io/button/glow-border-button
- https://techcrunch.com/2026/02/15/the-enterprise-ai-land-grab-is-on-glean-is-building-the-layer-beneath-the-interface/
