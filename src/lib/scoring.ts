import type { Service } from "./types";

const STATUS_POINTS = { official: 20, community: 12, none: 0 } as const;
const CLI_STATUS_POINTS = { official: 12, community: 7, none: 0 } as const;
const SKILLS_STATUS_POINTS = { official: 8, community: 5, none: 0 } as const;

export function calculateScore(service: Service): number {
  const mcp = STATUS_POINTS[service.mcp.status];

  const api = STATUS_POINTS[service.platformApi.status];

  const cli =
    CLI_STATUS_POINTS[service.cli.status] +
    (service.cli.supportsJson ? 4 : 0) +
    (service.cli.nonInteractive ? 4 : 0);

  const skills =
    SKILLS_STATUS_POINTS[service.skills.status] +
    (service.skills.hasSkillFile ? 4 : 0) +
    (service.skills.hasAgentRules ? 4 : 0) +
    (service.skills.hasPrompts ? 4 : 0);

  const docs =
    (service.docs.llmsTxt ? 5 : 0) +
    (service.docs.openApiSpec ? 5 : 0) +
    (service.docs.aiQuickstart ? 5 : 0) +
    (service.docs.copyMarkdown ? 5 : 0);

  return mcp + api + cli + skills + docs;
}

export const MAX_SCORE = 100;

export interface ScoreBreakdown {
  mcp: number;
  platformApi: number;
  cli: number;
  skills: number;
  docs: number;
  total: number;
}

export function getScoreBreakdown(service: Service): ScoreBreakdown {
  const mcp = STATUS_POINTS[service.mcp.status];
  const platformApi = STATUS_POINTS[service.platformApi.status];
  const cli =
    CLI_STATUS_POINTS[service.cli.status] +
    (service.cli.supportsJson ? 4 : 0) +
    (service.cli.nonInteractive ? 4 : 0);
  const skills =
    SKILLS_STATUS_POINTS[service.skills.status] +
    (service.skills.hasSkillFile ? 4 : 0) +
    (service.skills.hasAgentRules ? 4 : 0) +
    (service.skills.hasPrompts ? 4 : 0);
  const docs =
    (service.docs.llmsTxt ? 5 : 0) +
    (service.docs.openApiSpec ? 5 : 0) +
    (service.docs.aiQuickstart ? 5 : 0) +
    (service.docs.copyMarkdown ? 5 : 0);

  return { mcp, platformApi, cli, skills, docs, total: mcp + platformApi + cli + skills + docs };
}
