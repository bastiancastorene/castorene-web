# Security policy

## Scope

This repository serves a static public website through GitHub Pages. It does not process accounts, payments, forms, or private user data.

## Reporting a vulnerability

Do not publish possible vulnerabilities, credentials, or personal data in a public issue. Report them to [bastian.castorene@gmail.com](mailto:bastian.castorene@gmail.com) with a concise description, affected URL, and reproduction steps.

## Publication safeguards

- Drafts, local extraction files, credentials, and private keys must not be committed.
- Run `python3 scripts/preflight.py` before publishing.
- External links opened in a new tab must include `rel="noopener"`.
