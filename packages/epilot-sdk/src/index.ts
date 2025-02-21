import { authenticate, authorizeWithToken, UsernamePasswordAuthParams } from '@epilot/auth';

import { default as entityClient, getClient as getEntityClient, Client as EntityClient } from './entity-client';
import { default as fileClient, getClient as getFileClient, Client as FileClient } from './file-client';
import {
  default as organizationClient,
  getClient as getOrganizationClient,
  Client as OrganizationClient,
} from './organization-client';
import {
  default as permissionsClient,
  getClient as getPermissionsClient,
  Client as PermissionsClient,
} from './permissions-client';
import { default as pricingClient, getClient as getPricingClient, Client as PricingClient } from './pricing-client';
import {
  default as submissionClient,
  getClient as getSubmissionClient,
  Client as SubmissionClient,
} from './submission-client';
import { default as userClient, getClient as getUserClient, Client as UserClient } from './user-client';
import { default as workflowClient, getClient as getWorkflowClient, Client as WorkflowClient } from './workflow-client';

export class EpilotClient {
  entity: EntityClient = null;
  pricing: PricingClient = null;
  user: UserClient = null;
  file: FileClient = null;
  organization: OrganizationClient = null;
  submission: SubmissionClient = null;
  workflow: WorkflowClient = null;
  permissions: PermissionsClient = null;

  constructor() {
    this.entity = getEntityClient();
    this.pricing = getPricingClient();
    this.user = getUserClient();
    this.file = getFileClient();
    this.organization = getOrganizationClient();
    this.workflow = getWorkflowClient();
    this.permissions = getPermissionsClient();
    this.submission = getSubmissionClient();
  }

  public authorize(token: string) {
    this.entity = authorizeWithToken(this.entity, token);
    this.pricing = authorizeWithToken(this.pricing, token);
    this.user = authorizeWithToken(this.user, token);
    this.file = authorizeWithToken(this.file, token);
    this.organization = authorizeWithToken(this.organization, token);
    this.submission = authorizeWithToken(this.submission, token);
    this.workflow = authorizeWithToken(this.workflow, token);
    this.permissions = authorizeWithToken(this.permissions, token);

    return this;
  }

  public async login(credentials: UsernamePasswordAuthParams) {
    const authorizer = await authenticate(credentials);

    this.entity = authorizer.configureClient(this.entity);
    this.pricing = authorizer.configureClient(this.pricing);
    this.user = authorizer.configureClient(this.user);
    this.file = authorizer.configureClient(this.file);
    this.organization = authorizer.configureClient(this.organization);
    this.submission = authorizer.configureClient(this.submission);
    this.workflow = authorizer.configureClient(this.workflow);
    this.permissions = authorizer.configureClient(this.permissions);

    return this;
  }
}

export default EpilotClient;

export { entityClient };
export { pricingClient };
export { userClient };
export { fileClient };
export { organizationClient };
export { submissionClient };
export { workflowClient };
export { permissionsClient };
