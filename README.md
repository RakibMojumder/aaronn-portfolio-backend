# Portfolio Web API with NestJS

This is a portfolio website.

## Tech Stack

- NestJS
- TypeScript
- MongoDB
- JWT Authentication
- Mongoose

## Prerequisites

Before running this project, ensure you have installed:

- Node.js (v16 or higher)
- pnpm (v7 or higher)
- MongoDB (v4.4 or higher)
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/RakibMojumder/aaronn-portfolio-backend.git
cd aaronn-portfolio-backend
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory:

```env
MONGODB_URI=
JWT_SECRET=-
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

4. Start the development server:

```bash
pnpm start:dev
```

The API will be available at `http://localhost:3000`
Swagger documentation will be available at `http://localhost:3000/api`

## API Endpoints

### Authentication

```
POST /users/register - Register new user
POST /users/login    - Login user
```

### Projects

```
GET     /projects                 - Get all projects
GET     /projects/:id             - Get a single project by ID
POST    /projects                 - Add a project
PUT     /projects/:id             - Update project by ID
DELETE  /projects/:id             - Remove project by ID
GET     /projects/other-projects  - Get other projects
```

### file upload

```
POST   /file-upload/upload         - Upload a file in Cloudinay
```

## Error Handling

The API uses standard HTTP status codes and returns error responses in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Error type"
}
```

### Database Schemas

The project uses Mongoose schemas with TypeScript interfaces. All schemas are defined in their respective module directories.

## Deployment

1. Build the project:

```bash
pnpm build
```

2. Start production server:

```bash
pnpm start:prod
```

### Live link: https://aaronn-portfolio-api.vercel.app

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Name - Rakib Ahmed
email: sujonahmed45a4@gmail.com
