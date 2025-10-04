# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for this project.

## What is an ADR?

An Architecture Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

## When to Create an ADR

Create an ADR when making decisions about:
- Architecture patterns and structure
- Technology choices (frameworks, libraries, services)
- Data models and database schemas
- API designs
- Security implementations
- Performance optimizations
- Infrastructure changes
- Significant refactoring approaches
- Third-party integrations

## When NOT to Create an ADR

Don't create ADRs for:
- Minor bug fixes
- Code style preferences
- Trivial implementation details
- Temporary solutions (unless documenting why it's temporary)

## ADR Format

Use the template at `.claude/templates/adr-template.md`

## Naming Convention

ADRs are numbered sequentially and formatted as:

```
YYYYMMDD-short-descriptive-title.md
```

Examples:
- `20241004-use-prisma-for-orm.md`
- `20241005-implement-rbac-authorization.md`
- `20241010-migrate-to-aws-amplify.md`

## ADR Lifecycle

### Statuses

- **Proposed**: Decision is under consideration
- **Accepted**: Decision has been approved and is being/has been implemented
- **Deprecated**: Decision is no longer current but not replaced
- **Superseded**: Decision has been replaced by a new ADR (link to new ADR)

### Process

1. **Propose**: Create ADR with status "Proposed"
2. **Discuss**: Share with team, gather feedback
3. **Decide**: Update status to "Accepted" or archive if rejected
4. **Implement**: Execute the decision
5. **Review**: Periodically review ADRs and update status if needed

## Example ADRs

### Example 1: Technology Choice

**Title**: Use Prisma as ORM for Database Access

**Context**: Need type-safe database access, migrations, and good developer experience

**Decision**: Use Prisma ORM

**Alternatives**: TypeORM, raw SQL, Drizzle

**Consequences**: Better type safety, simpler migrations, but potential performance overhead for complex queries

---

### Example 2: Architecture Pattern

**Title**: Implement Service Layer Pattern

**Context**: Controllers becoming too complex with business logic

**Decision**: Extract business logic to service layer

**Alternatives**: Keep logic in controllers, use repository pattern

**Consequences**: Better separation of concerns, easier testing, more files to maintain

---

## Viewing ADRs

ADRs are listed in chronological order below. For the latest decisions on a topic, search by tags or keywords.

### Current ADRs

*ADRs will be listed here as they are created*

---

## Best Practices

1. **Be Concise**: Focus on the decision and rationale, not implementation details
2. **Include Context**: Future you (or others) need to understand why
3. **List Alternatives**: Show you considered other options
4. **Update Status**: Keep ADRs current as decisions evolve
5. **Link Related ADRs**: Show how decisions relate to each other
6. **Use Clear Language**: Avoid jargon, write for future readers
7. **Include Consequences**: Document both positive and negative impacts

## Resources

- [ADR GitHub Organization](https://adr.github.io/)
- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- Template: `.claude/templates/adr-template.md`

## Contributing

When creating an ADR:
1. Copy the template from `.claude/templates/adr-template.md`
2. Name it following the convention: `YYYYMMDD-descriptive-title.md`
3. Fill in all sections thoughtfully
4. Get review from relevant team members
5. Update this README to list the new ADR
6. Commit and create PR for team review

---

*Keep this directory organized and up-to-date. ADRs are valuable historical context for future development.*
