#!/usr/bin/env python3
"""
AI-Ready Project Bootstrapper

Interactive CLI to:
1. Generate a project context file
2. Design a workflow markdown file
3. Audit existing docs for AI-readiness
4. Build a reusable AI context pack for a team
"""

import os
import textwrap
from pathlib import Path


def ask(prompt: str, default: str | None = None) -> str:
    if default:
        full = f"{prompt} [{default}]: "
    else:
        full = f"{prompt}: "
    ans = input(full).strip()
    return ans or (default or "")


def ask_yes_no(prompt: str, default: bool = True) -> bool:
    d = "Y/n" if default else "y/N"
    while True:
        ans = input(f"{prompt} ({d}): ").strip().lower()
        if not ans:
            return default
        if ans in ("y", "yes"):
            return True
        if ans in ("n", "no"):
            return False
        print("Please answer y or n.")


def choose_output_dir() -> Path:
    default = os.getcwd()
    path = ask("Output directory", default)
    p = Path(path).expanduser().resolve()
    p.mkdir(parents=True, exist_ok=True)
    return p


# ------------------ Project Context ------------------


def collect_project_context() -> dict:
    print("\n=== Project Context ===")
    ctx = {}
    ctx["project_name"] = ask("Project name")
    ctx["short_description"] = ask("Short description of the project")
    ctx["business_domain"] = ask("Business/domain area (e.g., fintech, healthcare, e-commerce)")
    ctx["primary_language"] = ask("Primary programming language(s)")
    ctx["tech_stack"] = ask("Tech stack (frameworks, databases, infra, etc.)")
    ctx["key_objectives"] = ask("Key objectives / what success looks like")
    ctx["non_functional"] = ask("Non-functional requirements (performance, security, compliance, etc.)")
    ctx["architecture_overview"] = ask("High-level architecture overview (services, modules, boundaries)")
    ctx["data_models"] = ask("Key data models/entities and their relationships")
    ctx["domain_rules"] = ask("Important domain rules / invariants")
    ctx["constraints"] = ask("Hard constraints (regulatory, legacy systems, SLAs, etc.)")
    ctx["naming_conventions"] = ask("Naming conventions (files, classes, DB tables, etc.)")
    ctx["coding_standards"] = ask("Coding standards / style guides used")
    ctx["testing_strategy"] = ask("Testing strategy (unit, integration, e2e, data tests)")
    ctx["deployment_envs"] = ask("Deployment environments (dev/stage/prod, regions, etc.)")
    ctx["known_pitfalls"] = ask("Known pitfalls / anti-patterns to avoid")
    ctx["never_do"] = ask("Things AI (and humans) should NEVER do in this project")
    ctx["good_examples"] = ask("Paths or descriptions of good reference implementations in the repo")
    ctx["bad_examples"] = ask("Paths or descriptions of bad patterns to avoid (if any)")
    return ctx


def render_project_context_md(ctx: dict) -> str:
    return textwrap.dedent(f"""\
    # Project Context: {ctx['project_name']}

    ## Overview
    **Short description:** {ctx['short_description']}
    **Business/domain:** {ctx['business_domain']}
    **Key objectives / success:** {ctx['key_objectives']}

    ## Technology
    - **Primary language(s):** {ctx['primary_language']}
    - **Tech stack:** {ctx['tech_stack']}
    - **Deployment environments:** {ctx['deployment_envs']}

    ## Architecture
    **High-level architecture overview:**
    {ctx['architecture_overview']}

    **Key data models / entities:**
    {ctx['data_models']}

    **Domain rules / invariants:**
    {ctx['domain_rules']}

    ## Standards and conventions
    - **Naming conventions:** {ctx['naming_conventions']}
    - **Coding standards / style guides:** {ctx['coding_standards']}
    - **Testing strategy:** {ctx['testing_strategy']}

    ## Requirements and constraints
    - **Non-functional requirements:** {ctx['non_functional']}
    - **Constraints (regulatory, legacy, SLAs, etc.):** {ctx['constraints']}

    ## Examples and patterns
    - **Good reference implementations:** {ctx['good_examples']}
    - **Bad patterns / anti-patterns:** {ctx['bad_examples']}

    ## Pitfalls and guardrails
    **Known pitfalls:**
    {ctx['known_pitfalls']}

    **NEVER do this (for AI and humans):**
    {ctx['never_do']}

    ---
    _This file is intended to be used as AI context and onboarding material._
    """)


# ------------------ Workflow Markdown ------------------


def collect_workflow() -> dict:
    print("\n=== Workflow Definition ===")
    wf = {}
    wf["branching_model"] = ask("Branching model (e.g., trunk-based, GitFlow, feature branches)")
    wf["issue_tracking"] = ask("Issue tracking system and conventions (Jira, GitHub issues, etc.)")
    wf["work_item_lifecycle"] = ask("How work moves from idea → done (states, approvals)")
    wf["commit_message_format"] = ask("Commit message format (e.g., Conventional Commits)")
    wf["pr_process"] = ask("PR process (who reviews, required checks, size limits, etc.)")
    wf["pr_checklist"] = ask("PR checklist items (tests, docs, screenshots, etc.)")
    wf["testing_requirements"] = ask("Testing requirements before merge")
    wf["ci_cd"] = ask("CI/CD pipeline overview (what runs where, required checks)")
    wf["release_process"] = ask("Release process (frequency, tagging, change logs)")
    wf["rollback_strategy"] = ask("Rollback strategy (how to revert safely)")
    wf["observability"] = ask("Observability expectations (logs, metrics, traces, alerts)")
    wf["security_checks"] = ask("Security checks (SAST, DAST, dependency scanning, secrets)")
    wf["data_pipelines"] = ask("If applicable: data pipeline orchestration and validation expectations")
    wf["ai_usage"] = ask("How AI should be used in this workflow (allowed, restricted, review rules)")
    return wf


def render_workflow_md(wf: dict) -> str:
    return textwrap.dedent(f"""\
    # Engineering Workflow

    ## Branching and work tracking
    - **Branching model:** {wf['branching_model']}
    - **Issue tracking:** {wf['issue_tracking']}

    **Work item lifecycle (idea → done):**
    {wf['work_item_lifecycle']}

    ## Commits and pull requests
    - **Commit message format:** {wf['commit_message_format']}

    **PR process:**
    {wf['pr_process']}

    **PR checklist (example):**
    {wf['pr_checklist']}

    ## Testing and quality gates
    **Testing requirements before merge:**
    {wf['testing_requirements']}

    **CI/CD overview:**
    {wf['ci_cd']}

    ## Releases and rollback
    **Release process:**
    {wf['release_process']}

    **Rollback strategy:**
    {wf['rollback_strategy']}

    ## Observability and security
    **Observability expectations:**
    {wf['observability']}

    **Security checks:**
    {wf['security_checks']}

    ## Data workflows
    **Data pipeline orchestration and validation:**
    {wf['data_pipelines']}

    ## AI usage in this workflow
    **Guidelines for AI usage:**
    {wf['ai_usage']}

    ---
    _This workflow is designed to be AI-aware: AI-generated changes must still pass all human and automated checks._
    """)


# ------------------ AI-Readiness Audit ------------------


def collect_existing_docs_info() -> dict:
    print("\n=== Existing Documentation Audit ===")
    has_docs = ask_yes_no("Do you have existing documentation (README, ADRs, Confluence, etc.)?")
    info = {"has_docs": has_docs}
    if not has_docs:
        return info

    info["doc_locations"] = ask(
        "Where do docs live? (paths, tools, URLs – high level, not secrets)"
    )
    info["doc_types"] = ask(
        "What types of docs do you have? (architecture, API, runbooks, data dictionaries, etc.)"
    )
    info["doc_gaps"] = ask(
        "Where do you feel docs are missing or out of date?"
    )
    info["ai_specific_docs"] = ask(
        "Do you have any AI-specific docs (prompt guides, AI usage policies, etc.)?"
    )
    info["audience"] = ask(
        "Who are the primary audiences for your docs? (new hires, SREs, data scientists, etc.)"
    )
    info["doc_quality"] = ask(
        "How would you rate doc quality today, and why?"
    )
    return info


def render_ai_readiness_audit_md(info: dict) -> str:
    if not info.get("has_docs"):
        return textwrap.dedent("""\
        # AI-Readiness Documentation Audit

        ## Current state
        - No existing documentation was reported.

        ## AI-readiness impact
        - AI systems will have very little context to work with.
        - Onboarding for humans will also be slower and more error-prone.

        ## Recommended next steps
        - Create a high-level README with architecture, domain, and key workflows.
        - Add a PROJECT_CONTEXT.md and WORKFLOW.md (generated by this tool).
        - Start a lightweight decision log (ADRs) for major architectural choices.
        """)

    return textwrap.dedent(f"""\
    # AI-Readiness Documentation Audit

    ## Current documentation
    - **Locations:** {info.get('doc_locations', '')}
    - **Types of docs:** {info.get('doc_types', '')}
    - **Primary audiences:** {info.get('audience', '')}

    ## Gaps and issues
    **Perceived gaps / outdated areas:**
    {info.get('doc_gaps', '')}

    **AI-specific documentation:**
    {info.get('ai_specific_docs', '')}

    **Self-assessed quality:**
    {info.get('doc_quality', '')}

    ## AI-readiness assessment (qualitative)
    - Are docs discoverable and linkable as context for AI? (paths, URLs, structure)
    - Do they describe *why* decisions were made, not just *what* exists?
    - Do they include examples, edge cases, and “never do this” guidance?
    - Are they updated as part of the normal workflow (e.g., PR checklist)?

    ## Recommended next steps
    - Identify 2–3 critical docs to update for AI-readiness (architecture, domain glossary, runbooks).
    - Add explicit “For AI” sections where helpful (inputs/outputs, constraints, examples).
    - Ensure docs are stored in locations that can be easily referenced in prompts.
    """)


# ------------------ AI Context Pack ------------------


def collect_ai_context_pack() -> dict:
    print("\n=== AI Context Pack Definition ===")
    pack = {}
    pack["team_name"] = ask("Team name")
    pack["repo_roots"] = ask("Main repo(s) or codebase roots this pack applies to")
    pack["primary_domains"] = ask("Primary problem domains this team owns")
    pack["ai_allowed"] = ask("Where AI is encouraged (tasks, areas)")
    pack["ai_restricted"] = ask("Where AI is restricted or forbidden (security, compliance, etc.)")
    pack["review_expectations"] = ask("Review expectations for AI-generated changes")
    pack["prompt_patterns"] = ask("Good prompt patterns that work well for this team")
    pack["prompt_anti_patterns"] = ask("Bad prompt patterns to avoid")
    pack["sensitive_areas"] = ask("Sensitive areas (PII, secrets, regulated data) and how to handle them")
    pack["reference_docs"] = ask("Key reference docs to include in AI context (paths/links)")
    pack["onboarding_notes"] = ask("Anything new engineers should know about using AI on this team")
    pack["rules_focus"] = ask(
        "Rules of engagement: How should AI stay on-task and avoid over-processing?"
    )
    pack["rules_token_limits"] = ask(
        "Rules of engagement: Any token or verbosity limits AI should follow?"
    )
    pack["rules_scope"] = ask(
        "Rules of engagement: What is the allowed scope of AI responses (what to include/exclude)?"
    )
    pack["rules_escalation"] = ask(
        "Rules of engagement: When should AI stop, ask for clarification, or escalate to a human?"
    )
    return pack


def render_ai_context_pack_md(pack: dict) -> str:
    return textwrap.dedent(f"""\
    # AI Context Pack – {pack['team_name']}

    ## Scope
    - **Team name:** {pack['team_name']}
    - **Codebase / repo roots:** {pack['repo_roots']}
    - **Primary domains owned:** {pack['primary_domains']}

    ## AI usage guidelines
    **Where AI is encouraged:**
    {pack['ai_allowed']}

    **Where AI is restricted or forbidden:**
    {pack['ai_restricted']}

    **Review expectations for AI-generated changes:**
    {pack['review_expectations']}

    ## Prompting patterns
    **Good prompt patterns (do more of this):**
    {pack['prompt_patterns']}

    **Bad prompt patterns (avoid this):**
    {pack['prompt_anti_patterns']}

    ## Safety and sensitivity
    **Sensitive areas and handling guidelines:**
    {pack['sensitive_areas']}

    ## Reference materials
    **Key reference docs to include in AI context:**
    {pack['reference_docs']}

    ## Onboarding notes
    {pack['onboarding_notes']}

    ## Rules of Engagement (AI Behavior Controls)

    **Stay on-task / avoid over-processing:**
    {pack['rules_focus']}

    **Token / verbosity limits:**
    {pack['rules_token_limits']}

    **Scope boundaries (what AI should or should not cover):**
    {pack['rules_scope']}

    **Escalation rules (when AI should stop or ask for clarification):**
    {pack['rules_escalation']}

    ---
    _This AI context pack is meant to be attached to prompts and shared with new team members._
    """)


# ------------------ Main flow ------------------


def main():
    print("AI-Ready Project Setup\n")

    out_dir = choose_output_dir()

    # Project context
    if ask_yes_no("Generate project context file?"):
        ctx = collect_project_context()
        ctx_md = render_project_context_md(ctx)
        ctx_path = out_dir / "PROJECT_CONTEXT.md"
        ctx_path.write_text(ctx_md, encoding="utf-8")
        print(f"  -> Wrote {ctx_path}")

    # Workflow
    if ask_yes_no("Generate workflow markdown file?"):
        wf = collect_workflow()
        wf_md = render_workflow_md(wf)
        wf_path = out_dir / "WORKFLOW.md"
        wf_path.write_text(wf_md, encoding="utf-8")
        print(f"  -> Wrote {wf_path}")

    # AI-readiness audit
    if ask_yes_no("Run AI-readiness audit for existing docs?"):
        audit_info = collect_existing_docs_info()
        audit_md = render_ai_readiness_audit_md(audit_info)
        audit_path = out_dir / "AI_READINESS_AUDIT.md"
        audit_path.write_text(audit_md, encoding="utf-8")
        print(f"  -> Wrote {audit_path}")

    # AI context pack
    if ask_yes_no("Create a reusable AI context pack for the team?"):
        pack = collect_ai_context_pack()
        pack_md = render_ai_context_pack_md(pack)
        pack_path = out_dir / "AI_CONTEXT_PACK.md"
        pack_path.write_text(pack_md, encoding="utf-8")
        print(f"  -> Wrote {pack_path}")

    print("\nDone. You’ve just made your project a lot more legible—to humans and AI.")


if __name__ == "__main__":
    main()