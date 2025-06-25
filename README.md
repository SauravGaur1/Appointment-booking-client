# Appointment Booking Frontend

Live Demo: [https://appointment-booking-client-beryl.vercel.app/](https://appointment-booking-client-beryl.vercel.app/)

A modern, scalable appointment booking frontend built with Next.js, React, and Tailwind CSS. This app provides a seamless user experience for professionals and clients to manage, browse, and book appointment slots. It communicates with a Node.js/Express/MongoDB backend via REST APIs.

## Features

- **Authentication**: Register and login with protected routes.
- **Public Profiles**: Browse professionals and view their available slots.
- **Slot Management**: Professionals can create, view, and manage their slots (no overlapping slots allowed).
- **Booking**: Clients can book available slots; bookings update in real time.
- **My Bookings**: Users can view all bookings they have made, grouped by professional and slot details.
- **Dashboard**: Central hub for navigation, slot management, and bookings.
- **Profile Management**: Update your profile information.
- **Consistent UI**: Beautiful, responsive design with light/dark mode.
- **Show/Hide Password**: Toggle password visibility on login and register forms.
- **Error Handling**: User-friendly error messages and loading spinners.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Context API]
- [react-hook-form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [dayjs](https://day.js.org/)
- [react-hot-toast](https://react-hot-toast.com/)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd appointment-booking/client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   - Create a `.env.local` file if needed for API URLs, etc.
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Folder Structure

- `src/app/pages/` — All main pages (register, login, dashboard, profile, public profiles, bookings, etc.)
- `src/components/` — Reusable UI components (Card, Button, Spinner, PageTitle, etc.)
- `src/context/` — Auth context and provider
- `src/lib/axios.js` — Axios instance with token interceptor
- `public/` — Static assets

## API Endpoints

- **Auth:** `/auth/register`, `/auth/login`
- **Slots:** `/slots`, `/slots/:userId`
- **Bookings:** `/bookings`, `/my-bookings`
- **Profile:** `/profile`

> **Note:** This frontend expects a compatible backend API. See backend documentation for details.

## Deployment

This app is ready to deploy on [Vercel](https://vercel.com/) or any platform supporting Next.js.

## License

MIT

---

Made with ❤️ by Saurav Gaur.
