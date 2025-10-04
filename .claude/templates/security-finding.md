# Security Finding

**Date**: YYYY-MM-DD
**Reporter**: [Name/Agent]
**Severity**: [CRITICAL | HIGH | MEDIUM | LOW]
**Status**: [New | Under Investigation | Confirmed | Fixed | Risk Accepted]

---

##  Executive Summary

[One sentence description of the security issue]

**CVSS Score**: [If applicable: 0.0-10.0]

---

##  Finding Details

### Classification

**Vulnerability Type**: [e.g., SQL Injection, XSS, Authentication Bypass, etc.]

**CWE ID**: [If applicable, e.g., CWE-79, CWE-89]

**OWASP Top 10**: [If applicable, e.g., A01:2021 - Broken Access Control]

**Affected Component**: [Frontend | Backend | Infrastructure | Third-party library]

---

### Description

[Detailed description of the vulnerability]

**What is vulnerable**:
[Specific code, endpoint, or component that's vulnerable]

**How it can be exploited**:
[Step-by-step explanation of exploitation]

---

##  Location

**File**: `path/to/vulnerable/file.ts:line`

**Function/Method**: [Name of vulnerable function]

**Endpoint** (if API): `[METHOD] /api/path`

**Affected Versions**: [Version range or commit hashes]

---

## 💥 Impact

### Technical Impact

**Confidentiality**: [None | Low | Medium | High]
**Integrity**: [None | Low | Medium | High]
**Availability**: [None | Low | Medium | High]

**Description**:
[What an attacker could achieve]

### Business Impact

**Data at Risk**:
- [Type of data that could be exposed/modified/deleted]

**User Impact**:
- [How many users affected]
- [What users could experience]

**Compliance Impact**:
- [GDPR, SOC 2, PCI-DSS, etc. violations]

**Reputation Risk**:
- [Potential damage to brand/trust]

---

## 🔬 Proof of Concept

### Reproduction Steps

1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Observe vulnerability]

### Code Example

**Vulnerable Code**:
```typescript
// Current vulnerable code
[Paste vulnerable code snippet]
```

**Exploit Example**:
```bash
# How to exploit
curl -X POST https://api.example.com/endpoint \
  -d '{"malicious": "payload"}'
```

**Expected Result**:
[What happens when exploited]

---

##  Likelihood Assessment

**Attack Complexity**: [Low | Medium | High]
- [Explanation of how easy it is to exploit]

**Privileges Required**: [None | Low | High]
- [What access level needed to exploit]

**User Interaction**: [None | Required]
- [Does it require user action]

**Discoverability**: [Easy | Moderate | Difficult]
- [How likely is it to be found by attackers]

**Overall Likelihood**: [High | Medium | Low]

---

##  Remediation

### Immediate Actions (Emergency Mitigation)

If this needs immediate mitigation before proper fix:

1. [Emergency step 1 - e.g., disable feature]
2. [Emergency step 2 - e.g., add WAF rule]

**Temporary Risk**: [Any risks from mitigation]

---

### Permanent Fix

**Recommended Solution**:
[Description of the proper fix]

**Secure Code Example**:
```typescript
// Fixed code
[Paste secure code example]
```

**Implementation Steps**:
1. [ ] [Step 1]
2. [ ] [Step 2]
3. [ ] [Step 3]

**Verification Steps**:
1. [ ] [How to verify fix]
2. [ ] [Security test to confirm]

---

### Dependencies

**Required Changes**:
- [File/component 1]
- [File/component 2]

**Breaking Changes**: [Yes/No]
- [Description if yes]

**Migration Required**: [Yes/No]
- [Migration steps if yes]

---

##  Testing Requirements

**Security Tests**:
- [ ] Test exploit no longer works
- [ ] Test legitimate use cases still work
- [ ] Test edge cases
- [ ] Penetration test validation

**Regression Tests**:
- [ ] Unit tests for fix
- [ ] Integration tests
- [ ] E2E tests

**Test Cases**:
```
[Specific test cases to add]
```

---

##  Timeline

**Disclosure**: [If external disclosure, when]

**SLA Based on Severity**:
- CRITICAL: Immediate (same day)
- HIGH: Within 24 hours
- MEDIUM: Within 1 week
- LOW: Next sprint

**Target Fix Date**: [Date based on SLA]

**Actual Fix Date**: [Date when fixed]

---

## 👥 Responsible Parties

**Reported by**: [Name/Agent]

**Assigned to**: [Cybersecurity Agent + relevant domain agent]

**Reviewed by**: [Security team/Cybersecurity Agent]

**Approved by**: [Security lead/Manager]

---

##  References

**Internal References**:
- Related ADR: [Link]
- Related security findings: [Links]
- Code review: [Link to PR]

**External References**:
- CWE: [Link to CWE database]
- OWASP: [Link to OWASP guidance]
- CVE: [If applicable]
- Security advisories: [Links]

---

##  Notes

**Investigation Notes**:
[Notes from security investigation]

**Communication**:
- [ ] Security team notified
- [ ] Development team notified
- [ ] Management notified (if critical/high)
- [ ] Customers notified (if data breach)
- [ ] Regulatory bodies notified (if required)

**Lessons Learned**:
[What we learned and how to prevent similar issues]

---

##  Follow-up Actions

- [ ] Update security training
- [ ] Add security test to prevent regression
- [ ] Review similar code for same vulnerability
- [ ] Update security guidelines
- [ ] Create ADR if architectural change needed
- [ ] Update security documentation

---

## Severity Matrix (Reference)

### CRITICAL
- Remote code execution
- Authentication bypass
- Massive data breach
- System compromise

### HIGH
- SQL injection
- Sensitive data exposure
- Authorization bypass
- Stored XSS

### MEDIUM
- Reflected XSS
- CSRF
- Information disclosure
- Weak cryptography

### LOW
- Security misconfiguration (low risk)
- Verbose error messages
- Missing security headers
- Rate limiting issues

---

## Labels

`security` `[severity-level]` `[vulnerability-type]` `[component]`
