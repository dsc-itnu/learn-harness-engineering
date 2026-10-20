/// <reference types="node" />
import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

const docsBase = process.env.DOCS_BASE_PATH ?? "/learn-harness-engineering/";
const brandLogo = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23D95C41" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12.1" y1="11.9" x2="18.9" y2="8.2" /><line x1="12.1" y1="12.1" x2="20.3" y2="12.9" /><line x1="12.2" y1="12.4" x2="16.6" y2="19.1" /><line x1="11.8" y1="12.4" x2="7.3" y2="19.2" /><line x1="11.9" y1="12.1" x2="3.7" y2="13.3" /><line x1="11.8" y1="11.7" x2="7.8" y2="4.4" /></svg>';
const repoLink = "https://github.com/dsc-itnu/learn-harness-engineering";
const socialLinks: Array<{ icon: "github"; link: string }> = [
  { icon: "github", link: repoLink }
];

const enHarnessDesignItems = [
  { text: "Overview", link: "/en/harness-designs/" },
  { text: "Breaking Down Codex's Harness Design", link: "/en/harness-designs/codex/" }
];

const enLectureItems = [
  { text: "Welcome", link: "/en/" },
  { text: "Why Capable Agents Still Fail", link: "/en/lectures/lecture-01-why-capable-agents-still-fail/" },
  { text: "What a Harness Actually Is", link: "/en/lectures/lecture-02-what-a-harness-actually-is/" },
  { text: "Why the Repository Must Become the System of Record", link: "/en/lectures/lecture-03-why-the-repository-must-become-the-system-of-record/" },
  { text: "Why One Giant Instruction File Fails", link: "/en/lectures/lecture-04-why-one-giant-instruction-file-fails/" },
  { text: "Why Long-Running Tasks Lose Continuity", link: "/en/lectures/lecture-05-why-long-running-tasks-lose-continuity/" },
  { text: "Why Initialization Needs Its Own Phase", link: "/en/lectures/lecture-06-why-initialization-needs-its-own-phase/" },
  { text: "Why Agents Overreach and Under-Finish", link: "/en/lectures/lecture-07-why-agents-overreach-and-under-finish/" },
  { text: "Why Feature Lists Are Harness Primitives", link: "/en/lectures/lecture-08-why-feature-lists-are-harness-primitives/" },
  { text: "Why Agents Declare Victory Too Early", link: "/en/lectures/lecture-09-why-agents-declare-victory-too-early/" },
  { text: "Why End-to-End Testing Changes Results", link: "/en/lectures/lecture-10-why-end-to-end-testing-changes-results/" },
  { text: "Why Observability Belongs Inside the Harness", link: "/en/lectures/lecture-11-why-observability-belongs-inside-the-harness/" },
  { text: "Why Every Session Must Leave a Clean State", link: "/en/lectures/lecture-12-why-every-session-must-leave-a-clean-state/" },
  { text: "From Manual Prompting to Autonomous Loops", link: "/en/lectures/lecture-13-loop-engineering/" },
  { text: "From Single Loops to Graph Engineering", link: "/en/lectures/lecture-14-graph-engineering/" }
];

const enProjectItems = [
  { text: "Welcome", link: "/en/projects/" },
  { text: "Prompt-Only vs. Rules-First", link: "/en/projects/project-01-baseline-vs-minimal-harness/" },
  { text: "Agent-Readable Workspace", link: "/en/projects/project-02-agent-readable-workspace/" },
  { text: "Multi-Session Continuity", link: "/en/projects/project-03-multi-session-continuity/" },
  { text: "Runtime Feedback and Scope Control", link: "/en/projects/project-04-incremental-indexing/" },
  { text: "Self-Verification and Role Separation", link: "/en/projects/project-05-grounded-qa-verification/" },
  { text: "Complete Harness (Capstone)", link: "/en/projects/project-06-runtime-observability-and-debugging/" },
  { text: "Your First Automated Loop", link: "/en/projects/project-07-loop-engineering-first-loop/" },
  { text: "Draw Your Workflow as a Graph", link: "/en/projects/project-08-graph-engineering-first-graph/" }
];

const enResourceItems = [
  { text: "Overview", link: "/en/resources/" },
  { text: "English Templates", link: "/en/resources/templates/" },
  { text: "English Reference", link: "/en/resources/reference/" },
  { text: "Advanced Pack", link: "/en/resources/openai-advanced/" }
];

const enSkillItems = [
  { text: "Skills Overview", link: "/en/skills/" }
];

export default withMermaid(
  defineConfig({
    base: docsBase,
    title: "Learn Harness Engineering",
    description:
      "A condensed, project-based course on designing the environments, state, verification, and control systems that make Codex and Claude Code reliable.",
    cleanUrls: true,
    srcExclude: ["temp/**"],
    ignoreDeadLinks: false,
    head: [['link', { rel: 'icon', type: 'image/svg+xml', href: brandLogo }]],
    themeConfig: {
      logo: brandLogo,
      search: { provider: "local" },
      socialLinks,
      nav: [
        { text: "Lectures", link: enLectureItems[1].link, activeMatch: '^/en/(lectures/.*)?$' },
        { text: "Projects", link: enProjectItems[0].link, activeMatch: '^/en/projects/' },
        { text: "Library", link: "/en/resources/", activeMatch: '^/en/resources/' },
        { text: "Skills", link: "/en/skills/", activeMatch: '^/en/skills/' },
        { text: "Codex Harness Design", link: "/en/harness-designs/", activeMatch: '^/en/harness-designs/' },
        { text: "Try Harness ↗", link: repoLink + "/blob/main/docs/en/resources/templates/index.md", target: "_blank", rel: "noopener noreferrer" }
      ],
      sidebar: {
        '/en/projects/': [{ text: "Projects", items: enProjectItems }],
        '/en/resources/': [{ text: "Resource Library", items: enResourceItems }],
        '/en/skills/': [{ text: "Skills", items: enSkillItems }],
        '/en/harness-designs/': [{ text: "Codex Harness Design", items: enHarnessDesignItems }],
        '/en/': [{ text: "Lectures", items: enLectureItems }]
      }
    },
    markdown: {
      theme: { light: 'github-light', dark: 'github-dark' },
    },
    mermaid: {
      theme: "base",
      themeVariables: {
        primaryColor: '#F4F3EE',
        primaryBorderColor: '#D1D1D1',
        primaryTextColor: '#1A1A1A',
        lineColor: '#B3B3B3',
        fontFamily: 'Inter, sans-serif',
        fontSize: '18px'
      },
      flowchart: { nodeSpacing: 40, rankSpacing: 56, padding: 12 },
    },
  })
);
