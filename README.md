# Task_Manager_APIs
This is a RESTful API for managing tasks and task lists. It is built using Node.js and MongoDB.

## Getting Started

To get started with the API, follow these steps:

1.Clone this repository to your local machine.

2.Install the required dependencies using npm install.

3.Start the API using npm start.

4.Test the API using a tool like Postman or by sending requests from your application.

## API Endpoints
The following endpoints are available in the API:

### Task List Endpoints

**POST /api/createtasklist** - Create a new task list.

**GET /api/tasklist** - Get all task lists.

**GET /api/tasklist/:name** - Get a specific task list by name.

### Task Endpoints
**POST /api/createtask** - Create a new task.

**GET /api/task** - Get all tasks for the current user.

**GET /api/task/:id** - Get a specific task by ID.

### Search Endpoints
**GET /api/searchText** - Search for tasks by name or description.
## Fields
### Task List Fields

Name - The name of the task list.\
Description - A description of the task list.\
Active - A boolean indicating whether the task list is active or not.
### Task Fields
Task Name - The name of the task.\
Description - A description of the task.\
Due Date - The due date of the task in Indian format (dd-mm-yyyy).\
Period - The period of the task (e.g. Apr 2022, Q1 2023, etc.).\
Period Type - The type of period (monthly, quarterly, or yearly).\
Task List ID - The ID of the task list that the task belongs to.
