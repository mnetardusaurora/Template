# Commit Message Guidelines

## Format

All commit messages should follow this professional format:

```
<type>: <subject>

<body>

<footer>
```

## Rules

1. **Type**: Use one of the following types
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, no logic changes)
   - `refactor`: Code refactoring
   - `test`: Adding or updating tests
   - `chore`: Maintenance tasks, dependency updates
   - `perf`: Performance improvements
   - `ci`: CI/CD changes

2. **Subject**:
   - Use imperative mood ("Add feature" not "Added feature")
   - Capitalize first letter
   - No period at the end
   - Keep under 50 characters

3. **Body** (optional but recommended):
   - Explain what and why, not how
   - Wrap at 72 characters
   - Separate from subject with blank line

4. **Footer** (optional):
   - Reference issues: `Closes #123`
   - Breaking changes: `BREAKING CHANGE: description`

## Professional Standards

NEVER include in commit messages:
- AI tool references (Claude, ChatGPT, Copilot, etc.)
- AI-generated markers or signatures
- Emojis or emoticons
- Informal language or jokes
- Attribution to AI tools

ALWAYS write commit messages as if written by a human developer:
- Clear, professional tone
- Technical accuracy
- Proper grammar and spelling
- Focus on changes made

## Examples

### Good Examples

```
feat: Add user authentication with JWT

Implement JWT-based authentication system with:
- Login and registration endpoints
- Token refresh mechanism
- Middleware for protected routes

Closes #145
```

```
fix: Resolve race condition in data fetching

Fixed race condition that occurred when multiple requests
were made simultaneously. Added request deduplication and
proper cleanup of pending requests.
```

```
refactor: Simplify error handling middleware

Consolidated error handling logic into a single middleware
function. Improved error messages and added proper logging
for debugging.
```

```
docs: Update API documentation for v2 endpoints

Updated all API endpoint documentation to reflect v2 changes.
Added examples for new query parameters and response formats.
```

### Bad Examples

```
Add stuff
```
(Too vague, no type, not descriptive)

```
feat: add authentication 🚀

Used Claude to implement JWT auth!
```
(Contains emoji and AI reference)

```
FEAT: ADDED USER AUTHENTICATION
```
(All caps, wrong tense)

```
feat: add authentication

Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```
(Contains AI attribution)

## Committing Through Claude Code

When Claude Code creates commits, ensure:

1. **No AI Signatures**: Remove any auto-generated signatures
2. **Professional Tone**: Use standard developer language
3. **Technical Focus**: Describe what was changed and why
4. **Proper Attribution**: If pair programming, use actual developer names

## Multi-Line Commits

For complex changes, use multi-line format:

```bash
git commit -m "feat: Add comprehensive CI/CD pipeline

Implement staging-first deployment workflow with:
- GitHub Actions for automated testing
- Branch protection for main and staging
- AWS Amplify integration for deployments
- Security scanning and validation

Includes workflows for:
- Staging tests and deployment
- Production promotion with approval
- Automated release tagging"
```

## When to Commit

Commit when:
- Feature is complete and tested
- Bug fix is verified
- Refactoring is self-contained
- Tests pass locally
- Code is properly formatted

Do NOT commit:
- Work in progress (use stash instead)
- Broken or untested code
- Secrets or credentials
- Generated files (unless required)

## Commit Frequency

- Small, focused commits are better than large ones
- Each commit should be a logical unit of work
- Commit frequently enough to not lose work
- Don't commit every line change

## Review Before Committing

Always check:
1. `git diff` - Review all changes
2. `git status` - Verify files included
3. Run tests - Ensure nothing broke
4. Lint check - Code style is correct
5. Message quality - Clear and professional

## Branch-Specific Commits

### Staging Branch
```
feat: Add new dashboard widget

Implemented dashboard widget showing real-time metrics.
Tested in development environment.
```

### Main Branch
Only through PRs from staging. Commit message is the PR merge commit.

### Feature Branches
```
wip: Add dashboard widget components

Work in progress on dashboard refactor.
Not ready for staging yet.
```

## Tools

Use these tools for better commits:

```bash
# Interactive staging
git add -p

# Amend last commit (only if not pushed)
git commit --amend

# Fix commit message (only if not pushed)
git commit --amend -m "New message"

# Review changes before committing
git diff --staged
```

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Commit Best Practices](https://cbea.ms/git-commit/)
- Project code standards: `.claude/workflows/code-standards.md`
