---
title: "🍽 Savory Meals"
date: 2022-06-27
draft: false
author: Chetan Thapliyal
image: images/meals-title.jpg
tags: ["meals", "opensource", "php", "symfony"]
description: "OpenSource company meal management"
---

Meals, as the name suggests, is an application to manage meals. It was developed at AOE to manage employee lunch meals. What initially started as a small tool has now grown in to a mature and enterprise ready application, and it's still growing. It's been open source ever since, and we love to share it.

<!--more-->

{{< picture src="images/meals_screenshot.png" alt="AOE Meals" >}}

## So, what can it do?
- Create and manage meal plans
- Book meals
- Cancel, or offer booked meal to others
- Guest booking
- Accounting
- Show history of consumed meals and payments
- Online payment for consumed meals via PayPal
- Send notifications for last minute meals and weekly menu (Slack and Mattermost)
- Classical, as well as OAuth based user authentication

## Installation
### Hosted Environment
#### Prerequisites:
- PHP >= 7.4
- MySQL Database
- Node JS
- Yarn
- Mercure-Hub >= v0.13

#### Configuration:
A major part of the application can be configured via environment variables located in the .env file. If setting environment variable is not an option, like in shared web hosting, then create a .env.prod file and configure them there.

#### Setup:
1. Install application dependencies

    ```
    composer install
    ```

2. Create database schema
    ```
    bin/console doctrine:migrations:migrate -n
    ```

3. Generate static assets

   ```
   cd src\Resources && yarn build
   ```

### Cloud
A pre-built cloud installation image of meals can be found in [docker hub](https://hub.docker.com/r/aoepeople/meals). It is automatically updated whenever new features, security or bug fixes are introduced.

The application configuration is same as in the hosted environment. However, no setup is required here.


## Sounds delicious, but I like extra topping.
Not a problem. You can download the source code from [Github](https://github.com/AOEpeople/meals) on your local machine. The development environment is configured using `docker` and `ddev`, so these must be pre-installed. After this, just one command

```
make run-devbox
```

and voila! you have a fully configured ready to use development environment.

### Bon Appétit! :)
