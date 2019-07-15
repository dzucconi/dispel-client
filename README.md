# Dispel

[![Netlify Status](https://api.netlify.com/api/v1/badges/c34e4c8f-b621-47f4-a895-b571a4171dfc/deploy-status)](https://app.netlify.com/sites/damonzucconi-dispel/deploys)

## Meta

- **State**: development
- **Production**:
  - **URL**: https://dispel.work.damonzucconi.com/
  - **URL**: https://damonzucconi-dispel.netlify.com/
- **Host**: https://app.netlify.com/sites/damonzucconi-dispel/overview
- **Deploys**: Merged PRs to `dzucconi/dispel-client#master` are automatically deployed to production. [Manually trigger a deploy](https://app.netlify.com/sites/damonzucconi-dispel/deploys)

## Parameters

| Param        | Description                                        | Type                                                       | Default |
| ------------ | -------------------------------------------------- | ---------------------------------------------------------- | ------- |
| `iterations` | Number of times a phrase is processed and repeated | `integer`                                                  | `10`    |
| `voice`      | AWS Polly voice ID                                 | (`enum`)[https://github.com/dzucconi/dispel-server#voices] | `Aditi` |
