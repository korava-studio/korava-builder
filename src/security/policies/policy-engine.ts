export enum PolicyDecision {
  Allow = "Allow",
  Deny = "Deny",
  Review = "Review",
  Escalate = "Escalate"
}

export interface PolicyRule {
  id: string;
  description: string;
  action: string;
  resource?: string;
  effect: PolicyDecision;
  priority: number;
  scope?: string;
}

export class PolicyEngine {
  private rules: PolicyRule[] = [];

  registerRule(rule: PolicyRule) {
    this.rules.push(rule);
    this.rules.sort((a, b) => b.priority - a.priority);
  }

  listRules() {
    return [...this.rules];
  }

  evaluate(action: string, resource: string, roles: string[], scope?: string) {
    const match = this.rules.find((rule) => {
      const actionMatches = rule.action === "*" || rule.action === action;
      const resourceMatches = !rule.resource || rule.resource === "*" || rule.resource === resource;
      const scopeMatches = !rule.scope || rule.scope === scope;
      return actionMatches && resourceMatches && scopeMatches;
    });

    return match ?? {
      id: "implicit-deny",
      description: "Implicit deny when no policy matches",
      action,
      effect: PolicyDecision.Deny,
      priority: -1
    };
  }
}
