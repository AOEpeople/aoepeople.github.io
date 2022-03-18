---
title: "Running (faster) with Gitlab CI"
date: 2021-11-10
draft: false
author: Tolleiv Nietsch
image: /images/gitlab-ci-1.png
tags: ["Gitlab CI", "pipeline", "build processes", "continuous integration", "delivery"]
description: "Fast feedback on test, build and deploy with Gitlab CI pipelines"
---

Gitlab became our main tool for sourcecode and automation over the past 5 years.
Naturally, all of our build processes, continuous integration and delivery as well as platform management is completely automated, and Gitlab CI has proven to be a valuable tool.

So how do we organize our pipelines at AOE?

![Gitlab CI Repo](/images/gitlab-ci-1.png)

Initially, we have a repo which provides templates and starting points for all of our pipelines, so we can benefit from scaling to any number of microservices without having to think of management overhead.

![Gitlab CI Jobs](/images/gitlab-ci-3.png)

Each pipeline is a well-defined and small piece that declares it basic steps, such as "test", "build" and "deploy".
More complex pipelines are organized as sub-pipelines, e.g. deployments to multiple regions:

![Gitlab CI Pipeline](/images/gitlab-ci-2.png)

Using these abstractions we can quickly roll out our applications to new clusters or changed infrastructure topology, while keeping fast build processes so our developers get a quick feedback on merge requests and commits.

So, why do we not use something else than Gitlab CI? Having one tool helps a lot with keeping vital things close together, such as sourcecode, helm deployment definitions and necessary pipelines. Also, the feedback loop is short and allows for more effective work. After all, nobody likes waiting for pipelines reports.
