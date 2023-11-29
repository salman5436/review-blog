# Heart-y-Reviews

## Overview

Heart-y-Reviews is a full-stack Next.js application that allows users to create, view, edit, and delete reviews. It integrates NextAuth for authentication with a Google provider, Prisma as an ORM for PostgreSQL, and is deployed on Vercel.

## Features

- User authentication via Google (NextAuth)
- Create, view, edit, and delete reviews
- Draft and publish functionality for reviews
- Mobile responsive design with a custom burger menu
- Secure and scalable with Prisma and Vercel deployment

## Visit This Project

[Project Link](https://review-blog-phi.vercel.app/)  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repo:

```sh
   git clone https://github.com/salman5436/review-blog
```

2. Install NPM Packages:

```sh
   npm install
```

3. Setup environment variables in a `.env.local` file at the root of your project:

```env
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

DATABASE_URL=your_database_url

NEXTAUTH_SECRET=your_nextauth_secret
```

### Running Locally

To run the application locally:

```sh
   npm run dev
```

This will start the application in development mode on **http://localhost:3000**.

## Deployment

The application is configured for deployment on Vercel. Follow Vercel's documentation to deploy your Next.js application.

## Built With

- [Next.js](https://nextjs.org/) - The React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentican for Next.js
- [Prisma & Prisma Client](https://www.prisma.io/) - Prisma ORM
- [Postgres](https://vercel.com/docs/storage/vercel-postgres) - Vercel Postgres serverless SQL database that is integrated with Vercel
- [Vercel](https://vercel.com/) - The React framework
<!-- - []() -  -->

## Contribution

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Next Steps

Moving forward, the plan is to enhance the application with additional features such as:

- Implementing advanced user roles and permissions.
- Adding social media sharing options.
- Integrating a more robust comment and rating system (including rating scale and categorization)
- Improving the UI/UX for an even more engaging user experience
- Exploring the integration of additional OAuth providers.

## License

Distributed under the MIT License. See LICENSE for more information.
