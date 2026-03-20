# Agent Stack

**Which dev tools are ready for AI agents?**

Ranking 49 developer tools across 5 dimensions:

| Dimension | Max | What it measures |
|-----------|-----|-----------------|
| MCP Server | 20 | Official/community Model Context Protocol server |
| Platform API | 20 | REST/GraphQL API with OpenAPI spec |
| CLI | 20 | Command-line tool with JSON output + non-interactive mode |
| Skills | 20 | SKILL.md, CLAUDE.md, agent rules, prompt files |
| Docs | 20 | llms.txt, copy-as-markdown, AI quickstart, OpenAPI spec |

**Total: 100 points max**

Live at [agent-stack.crafter.run](https://agent-stack.crafter.run)

## Stack

- Next.js 16
- Tailwind CSS
- Geist Mono
- Bun

## Development

```bash
bun install
bun dev
```

## Adding a service

Edit `src/data/services.json`. Each service needs:

- Name, category, description, homepage, docs URL
- MCP, Platform API, CLI, Skills pillar data
- Docs signals (llms.txt, OpenAPI, AI quickstart, copy-as-markdown)
- Links to relevant documentation

Score is computed automatically from pillar data.

## License

MIT
