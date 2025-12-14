# IPOSG Dashboard

A **modern, responsive, and feature-rich dashboard** built with **React, TypeScript, Material-UI (MUI), Redux Toolkit**, and **Axios**, designed to manage products, orders, and users efficiently. This project demonstrates best practices in React development, state management, API integration, and responsive design.

---

## **Features**

### **Authentication**
- Login page with username/password validation.
- Protected routes based on user roles (`admin`, `user`).
- Unauthorized access handling.

### **Theme Management**
- Dark and light mode toggle with `ThemeToggle` component.
- Theme persistence across sessions.
- Integrated with Material-UI theme system.

### **Responsive Sidebar**
- Permanent drawer on desktop.
- Temporary drawer with hamburger menu on mobile.
- Auto-closes on link click in mobile view.
- Role-based menu items (Admin can see User Management).

### **Dashboard**
- Welcome messages with dynamic content.
- Summary of user activity, products, and orders.

### **Product Management**
- Product listing page with filters and search.
- Product details page with comprehensive info.
- Responsive layout with Material-UI Grid.

### **Order Management**
- Order listing and details.
- Responsive and visually consistent with the dashboard theme.

### **User Management**
- User listing as responsive **cards**.
- Fetching data via Axios instance from dummy API (`https://dummyjson.com/users`).
- Role-based display (admin only).
- Async Redux integration using `createAsyncThunk`.
- Separate `UserCard` component for modularity.

### **Notifications**
- Toast notifications using `react-toastify`.
- Automatically adapts to dark/light theme.

---

## **Tech Stack**

- **Frontend**: React, TypeScript, Material-UI (MUI), React Router v6  
- **State Management**: Redux Toolkit  
- **API Handling**: Axios with custom instance  
- **Styling**: MUI system, responsive Grid layout  
- **Notifications**: react-toastify  
- **Routing**: Protected routes with role-based access  

---

