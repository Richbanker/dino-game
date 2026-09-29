# Production deployment checklist

The production workflow is defined in `.github/workflows/deploy.yml` and deploys the complete Docker stack to an Ubuntu VM over SSH.

## Required repository secrets

Configure these in **Settings → Secrets and variables → Actions**:

- `DEPLOY_HOST` — VM hostname or IP address
- `DEPLOY_PORT` — SSH port (optional; defaults to `22`)
- `DEPLOY_USER` — SSH user
- `DEPLOY_PATH` — absolute repository path on the VM
- `DEPLOY_SSH_KEY` — private SSH key
- `DEPLOY_KNOWN_HOSTS` — pinned `ssh-keyscan -H <host>` output

The workflow validates all required values before opening an SSH connection and validates the private key before deployment.

## Production environment

Create the GitHub Environment **production** and add this repository variable:

- `PRODUCTION_URL` — public HTTPS URL of the deployed application

When the variable is present, GitHub shows the URL in the deployment record and the workflow performs a retrying HTTP smoke test after every deployment.

## Server prerequisites

The repository at `DEPLOY_PATH` must already be checked out on the branch selected for deployment. The server must contain:

- Docker Engine and the Docker Compose plugin
- `.env.production`
- a deploy user allowed to run Docker
- host-level nginx configured for the client and API

## Release flow

1. Merge a reviewed change into `dev` or `main`.
2. The workflow validates configuration.
3. The VM performs a fast-forward-only pull.
4. Database and server containers start.
5. Migrations run in an ephemeral server container.
6. The client container starts.
7. The public production endpoint is smoke-tested.

A manual run may select a specific deployment branch through **Actions → Deploy → Run workflow**.
