<div>
  <picture align="center">
    <source
      width="100%"
      media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
      srcset="/documentation/documentationHeader.png"
    />
    <source
      width="100%"
      media="(prefers-color-scheme: dark)"
      srcset="/documentation/documentationHeader.png"
    />
    <img alt="Logo">
  </picture>
  <h1 align="center">
    The Baker Museum
  </h1>
  <p>
    Welcome to the Baker Museum database system and full-stack website project! This initiative was developed as part of the Database Systems course (COSC 3380) at the University of Houston. Our goal was to design and implement a comprehensive database system tailored for an art museum setting, enabling efficient management of collections, exhibits, inventory, ticketing, and customer interactions.
  </p>
</div>

-----

### About the Museum of Fine Arts Project

Welcome to the Museum of Fine Arts database and full-stack website project! This initiative was undertaken as part of the Database Systems course (COSC 3380) at the University of Houston. Our aim was to design and implement a sophisticated database system tailored for an art museum environment.

#### Mini-World Description:
Our mini-world revolves around two main sections:
- **Users**: Customers, employees, and branch directors interact with the museum's services and activities. We manage and store information associated with each user, implementing features like memberships and employee roles.
- **Artistic Entities and Operations**: The museum's collections, art pieces, exhibits, tickets, and gift shop inventory are managed through the system. Customers can purchase tickets and items, employees curate exhibits, the restaurant, or the giftshop, and branch directors oversee their branch and implement additions, updates, and deletions to be made.

#### Key Relationships:
- **Directors**: Manage employees, organize exhibits, and oversee museum operations.
- **Exhibits**: Contain art pieces curated under specific themes.
- **Customers**: Make donations, purchase tickets, and report complaints.
- **Employees**: Manage gift shop items and ticket sales.

This database system enables efficient tracking of museum activities, financial transactions, and user interactions, empowering the Museum of Fine Arts to generate insightful reports for assessing its success and improving visitor experiences.

# Project Requirements
<h6>Each bullet will route to the specific instance in which we have implemented them</h6>

1. [**User Authentication for different user roles**](#user-auth)
2. [**Data entry forms to add new data, modify existing data, and 'delete' data**](#data-entry-forms)
3. [**At least 2 triggers**](#triggers)
4. [**At least 3 queries**](#queries)
5. [**At least 3 reports**](#reports)

# Technologies

**Frontend**:
![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) ![Three.js](https://img.shields.io/badge/-Three.js-black?logo=three.js&logoColor=white)

**Backend**: 
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)

**Database**: 
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white)

**Testing**: 
![Postman](https://img.shields.io/badge/-Postman-FF6C37?logo=postman&logoColor=white)

**Authentication**: 
![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens) ![JS-Cookies](https://img.shields.io/badge/-JS_Cookies-F7DF1E?logo=javascript&logoColor=black)

**Deployment**: 
![Vercel](https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/-Render-2D2D2D?logo=render&logoColor=white) ![Azure](https://img.shields.io/badge/-Azure-0089D6?logo=microsoft-azure&logoColor=white)

**Version Control**:
![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)

# Hosting Locally

- Install git on your machine if you haven't already.
- Make sure the latest version of [Node.js](https://nodejs.org/en/) is installed on your machine. Some features may not work on older versions of Node.js.

### Cloning The Repository

```bash
git clone [https://github.com/tthn0/CoogExpress](https://github.com/Ashishjob/museuma.git)
cd museuma
code .
```

> [!IMPORTANT]
> Ensure both `Source/client/example.env` and `Source/client/server.env` are renamed to `.env` and are properly configured before hosting locally.

### Starting The Client

```bash
cd museuma       # If not already in the client directory.
npm i -y         # Install dependencies.
npm start        # Start the client.
```

> [!NOTE]
> A new window will automatically open in your default browser on `http://localhost:3000`.

### Starting The Server

```bash
cd Backend       # If not already in the server directory.
npm i            # Install dependencies.
npm start        # Start the server.
```

> [!NOTE]
> A new window will become visible on your default browser on `http://localhost:8081`; however, it will not automatically open, so make sure to open this link manually.

<a name="user-auth"></a>

## User Authentication for different user roles
Explain the different roles, sample logins, and how we did it

<a name="data-entry-forms"></a>

## Data entry forms to add new data, modify existing data, and 'delete' data
Implement the screenshots of CRUD operations

<a name="triggers"></a>

## Triggers
Implement the description of each trigger, screenshots of the popup messages concerning them, and the code snippets

<a name="queries"></a>

## Queries
Implement the code snippets of the code behind the queries

<a name="reports"></a>

## Reports
Implement the screenshots of the reports
