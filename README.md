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
    Welcome to the Baker Museum database system and full-stack website project! Our goal was to design and implement a comprehensive database system tailored for an art museum setting, enabling efficient management of collections, exhibits, inventory, ticketing, and customer interactions.
  </p>
</div>

-----

### About the Museum of Fine Arts Project

Welcome to the Museum of Fine Arts database and full-stack website project! We aimed to design and implement a sophisticated database system tailored for an art museum environment.

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
git clone https://github.com/Ashishjob/museuma.git
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
We have 3 different user roles implemented for this: Admin, Employee, and User.
- Admin: The Admin has access to see and manage everything as they should.
  - username: baker
  - password: password123
- Employee: The Employee is able to manage whatever branch it is they work under (i.e. if they work in the Gift Shop branch, they can access the manage-giftshop page.
  - username: scammer
  - password: password123
- User: The User is any member of the public that can only view what the museum has to offer, purchase tickets/giftshop items, and leave complaints from their visit.
  - username: jtest
  - password: password

<a name="data-entry-forms"></a>
## Data entry forms to add new data, modify existing data, and 'delete' data
We have plenty of pages through which the admin or employee of that branch can access and add/edit/delete to/from.
### Admin/Employee/User:
- [Sign Up](https://www.bakermuseum.art/signup): This page is a data entry form where you can add your information to get into the system to be able to log in.
- [Edit Profile](https://www.bakermuseum.art/profile): This page is an editable data form where you can edit the data you entered from the Sign Up page.
- [Complaints](https://www.bakermuseum.art/complaints): This entry form is for users to enter complaints concerning their experience at the museum.

### Admin/Employee:
- [Manage Artworks](https://www.bakermuseum.art/admin/manage-artworks): This data entry form is for admins or employees who work in any department concerning artwork, to come in and add, delete, or edit artworks on premises at the museum.
- [Manage Gift Shop](https://www.bakermuseum.art/admin/manage-giftshop): This data entry form is for admins or employees who work in the giftshop department to be able to add, delete, or edit items that can be purchased by customers in the giftshop.
- [Manage Restaurant](https://www.bakermuseum.art/admin/manage-restaurant): This data entry form is for admins or employees who work in the restaurant department to be able to add, delete, or edit dishes available at the restaurant.

### Admin-Only:
- [Manage Employees](https://www.bakermuseum.art/admin/manage-employees): This data entry form is for admins to be able to add, delete (fire/terminate), and edit employees; however, firing only makes the employee "inactive" and there is a button at the top where the admin can view all inactive employees, and rehire them if desired.
- [Manage Exhibits](https://www.bakermuseum.art/admin/manage-exhibits): This data entry form is for admins to be able to add, delete (make inactive), and edit the exhibits at the museum. Similar to the rehiring for the employees, admins can also reactivate exhibits if they are to become open again.

<a name="triggers"></a>
## Triggers

### Stock Notification Trigger:
This trigger is designed to update the purchasable flag of an item and send a message to a message queue when the quantity of the item falls to zero from a positive value during an update operation.

```sql
update_purchasable_flag
BEGIN
     -- Check if quantity becomes 0
     IF NEW.quantity = 0 AND OLD.quantity > 0 THEN
         -- Set the purchasable flag to FALSE
         SET NEW.purchasable = FALSE;
 
         -- Insert message into message_queue using item title
         INSERT INTO message_queue (Item_id, message)
         VALUES (NEW.item_id, CONCAT('Item "', NEW.title, '" is out of stock. Please restock.'));
     END IF;
 END
```

### Restock Notification Clear Trigger:
This trigger ensures that when an item's quantity changes from zero or less to a positive value, the item's purchasable status is updated and any outstanding notifications about the item being out of stock are marked as resolved.

```sql
update_purchasable_flag_on
BEGIN
     -- Check if quantity becomes greater than 0
     IF NEW.quantity > 0 AND OLD.quantity <= 0 THEN
         -- Set the purchasable flag to TRUE
         SET NEW.purchasable = TRUE;
 
         -- Set the resolved value to TRUE
         UPDATE message_queue
         SET resolved = TRUE
         WHERE Item_id = NEW.item_id AND resolved = FALSE;
     END IF;
 END
```

### Bulk Discount Trigger:
This trigger helps in automating the application of bulk discounts for customers based on their ticket purchase history, aiming to incentivize larger ticket purchases.

```sql
apply_bulk_discount
BEGIN
     DECLARE total_tickets int;
     DECLARE discount float;
     DECLARE new_price float;
 
     -- Calculate total number of tickets for the customer
     SELECT COUNT(*) INTO total_tickets
     FROM tickets
     WHERE customer_id = NEW.customer_id;
 
     -- Check if total_tickets is 5 or more
     IF total_tickets >= 5 THEN
         SET discount = NEW.Price * 0.15;
         SET new_price = NEW.Price - discount;
         SET NEW.Price = new_price;
     END IF;
 END
```

<a name="queries"></a>
## Queries
We have 3 queries that go with the 3 reports we go more into detail later: one for a Sales Report, an Exhibit Report, and a Complaints Report.

### Sales Report Query:

- This query was built to get a report from the `customers`, `orders`, and `items` tables, so that the admins were able to find where their revenue was primarily coming from.

```sql
SELECT 
CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
i.title AS item_bought,
o.quantity AS quantity_bought,
o.total_price AS total_price,
o.order_date AS order_date
FROM 
customers c
JOIN 
orders o ON c.customer_id = o.customer_id
JOIN 
items i ON o.item_id = i.item_id;
```

### Exhibit Report Query:

- This query was built to get a report from the `exhibits`, `tickets`, and `complaints` tables for the admins to see statistics on each exhibit to help make future decisions concerning them.

```sql
SELECT 
e.Description AS Exhibit_Name,
COUNT(t.Ticket_id) AS Tickets_Bought,
SUM(t.Price) AS Amount_Made,
COUNT(c.complaint_id) AS Complaints_Received
FROM 
exhibits e
LEFT JOIN 
tickets t ON e.Exhibit_id = t.exhibit_id
LEFT JOIN 
complaints c ON e.Exhibit_id = c.exhibit_id
GROUP BY 
e.Exhibit_id, e.Description;
```

### Complaints Report Query:

- This query was built to get a report from the `complaints` and `customers` tables so that the admin would be able to see all the complaints logged by visitors/users regarding each specific exhibit.

```sql
SELECT 
complaints.complaint_id,
customers.first_name,
customers.last_name,
complaints.branch,
complaints.description,
complaints.date_and_time
    FROM 
    complaints
INNER JOIN 
customers ON complaints.customer_id = customers.customer_id;
```

<a name="reports"></a>
## Reports
We have 3 data reports: Sales, Exhibits, and Complaints.

### Sales:
In this report, we have Customer, Item Bought, Amount Spent, Quantity, and Date as our column identifiers to give a clear report on where the revenue is coming from in our museum. We additionally have search filters as well as aggregate data at the bottom of the report that tells us factors according to the placed filters, if there are any, such as the Most Active Customer, Most Popular Item, Total Earned, Total Quantity, and Total Count for the rows that appear.

![image](https://github.com/Ashishjob/museuma/assets/114624617/abbd8d2c-39d6-4838-9bf4-b004eda308bf)

### Exhibit:
In this report, we have Exhibit Name, Tickets Bought,	Amount Made, and # Of Complaints as our column identifiers to give a clear report on the status of each of the exhibits in our museum, with popularity, revenue, and complaints logged concerning them. We also have a search filter on it to find specific exhibits as well as aggregate data at the bottom of the report that tells us factors such as the Total Count of how many exhibits we are looking at, the Total Tickets Bought, the Total Amount Made, and the Total Complaints Received.

![image](https://github.com/Ashishjob/museuma/assets/114624617/e4dd57bf-2240-497e-8805-56d3f0a4823b)

### Complaints:
In this report, we have the Branch/Exhibit that the complaint is directed to, the Date and Time it was logged, the Complaint Message, and the User that logged the complaint as our identifiers to give a clear report on all the complaints that have been logged at our museum, so that they can be taken care of. We also have a search feature where the user can search by branch to find specific complaints concerning a branch/exhibit as well as a time filter, to look for certain times such as All Time, Last Week, Last Month, Last Year, or Between Dates where the user can select a start and stop time.

![image](https://github.com/Ashishjob/museuma/assets/114624617/020f463c-2a40-4eb2-9b4f-1f7849120243)
