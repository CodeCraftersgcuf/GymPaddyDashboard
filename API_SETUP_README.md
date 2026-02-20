# GymPaddy Dashboard - API Integration Setup Guide

## Overview
This guide explains the complete API integration infrastructure set up for the GymPaddy Dashboard, including Axios configuration, TanStack Query setup, and how to use the custom API utilities.

---

## 📁 Project Structure

```
src/
├── config/
│   ├── apiConfig.ts          # Axios instance configuration
│   ├── apiRoutes.ts          # Centralized API route definitions
│   └── queryClient.ts        # TanStack Query client configuration
├── utils/
│   ├── apiCall.ts            # Custom API call wrapper
│   ├── queries/              # React Query hooks for data fetching
│   │   ├── userQueries.ts
│   │   ├── dashboardQueries.ts
│   │   ├── socialQueries.ts
│   │   ├── marketQueries.ts
│   │   ├── transactionQueries.ts
│   │   └── index.ts
│   └── mutations/            # React Query hooks for data mutations
│       ├── userMutations.ts
│       ├── socialMutations.ts
│       ├── marketMutations.ts
│       ├── verificationMutations.ts
│       ├── notificationMutations.ts
│       └── index.ts
└── main.tsx                  # App entry point with QueryClientProvider
```

---

## 🚀 Installation

Dependencies have been installed:
```bash
npm install axios @tanstack/react-query --legacy-peer-deps
```

---

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Note:** An `.env.example` file has been created for reference.

### 2. API Configuration (`src/config/apiConfig.ts`)

The Axios instance is pre-configured with:
- Base URL from environment variables
- 30-second timeout
- Automatic token injection from localStorage
- Response interceptor for 401 handling (auto-logout)

### 3. Query Client Configuration (`src/config/queryClient.ts`)

TanStack Query is configured with:
- No refetch on window focus
- 1 retry attempt for failed queries
- 5-minute stale time
- No retries for mutations

---

## 📖 Usage Guide

### Using Queries (GET requests)

**Example: Fetch all users**

```tsx
import { useGetAllUsers } from '../utils/queries';

const UserManagement = () => {
  const { data, isLoading, error } = useGetAllUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(user => (
        <div key={user.id}>{user.fullName}</div>
      ))}
    </div>
  );
};
```

**Example: Fetch user by ID**

```tsx
import { useGetUserById } from '../utils/queries';

const UserProfile = ({ userId }: { userId: string }) => {
  const { data: user, isLoading } = useGetUserById(userId);

  if (isLoading) return <div>Loading...</div>;

  return <div>{user?.fullName}</div>;
};
```

**Example: Fetch dashboard stats**

```tsx
import { useGetDashboardStats } from '../utils/queries';

const Dashboard = () => {
  const { data: stats } = useGetDashboardStats();

  return (
    <div>
      <h1>Total Users: {stats?.totalUsers}</h1>
      <h1>Total Revenue: ${stats?.totalRevenue}</h1>
    </div>
  );
};
```

### Using Mutations (POST, PUT, DELETE requests)

**Example: Create a new user**

```tsx
import { useCreateUser } from '../utils/mutations';

const AddUserModal = () => {
  const createUser = useCreateUser({
    onSuccess: () => {
      console.log('User created successfully!');
      // The query cache is automatically invalidated
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    },
  });

  const handleSubmit = (formData: CreateUserPayload) => {
    createUser.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
};
```

**Example: Update user**

```tsx
import { useUpdateUser } from '../utils/mutations';

const EditUser = ({ userId }: { userId: string }) => {
  const updateUser = useUpdateUser({
    onSuccess: () => {
      console.log('User updated!');
    },
  });

  const handleUpdate = (data: UpdateUserPayload) => {
    updateUser.mutate({ id: userId, data });
  };

  return (
    <button onClick={() => handleUpdate({ fullName: 'New Name' })}>
      Update User
    </button>
  );
};
```

**Example: Delete user**

```tsx
import { useDeleteUser } from '../utils/mutations';

const UserRow = ({ userId }: { userId: string }) => {
  const deleteUser = useDeleteUser({
    onSuccess: () => {
      console.log('User deleted!');
    },
  });

  return (
    <button onClick={() => deleteUser.mutate(userId)}>
      Delete
    </button>
  );
};
```

**Example: Ban user**

```tsx
import { useBanUser } from '../utils/mutations';

const BanUserButton = ({ userId }: { userId: string }) => {
  const banUser = useBanUser();

  const handleBan = () => {
    banUser.mutate({
      id: userId,
      data: {
        reason: 'Violation of community guidelines',
        duration: 7, // days
      },
    });
  };

  return <button onClick={handleBan}>Ban User</button>;
};
```

### Using Custom API Call Utility

For endpoints not yet wrapped in hooks:

```tsx
import apiCall from '../utils/apiCall';
import { API_ROUTES } from '../config/apiRoutes';

// GET request
const fetchData = async () => {
  try {
    const data = await apiCall.get(API_ROUTES.USERS.GET_ALL);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// POST request
const createData = async () => {
  try {
    const response = await apiCall.post(API_ROUTES.USERS.CREATE, {
      fullName: 'John Doe',
      email: 'john@example.com',
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// PUT request
const updateData = async (id: string) => {
  try {
    const response = await apiCall.put(API_ROUTES.USERS.UPDATE(id), {
      fullName: 'Jane Doe',
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// DELETE request
const deleteData = async (id: string) => {
  try {
    await apiCall.delete(API_ROUTES.USERS.DELETE(id));
    console.log('Deleted successfully');
  } catch (error) {
    console.error(error);
  }
};
```

---

## 🔑 Available Query Hooks

### User Queries
- `useGetAllUsers()` - Fetch all users
- `useGetUserById(id)` - Fetch user by ID
- `useGetUserByUsername(username)` - Fetch user by username
- `useGetUserStats()` - Fetch user statistics

### Dashboard Queries
- `useGetDashboardStats()` - Fetch dashboard statistics
- `useGetLatestUsers()` - Fetch latest registered users
- `useGetLatestPosts()` - Fetch latest posts
- `useGetUserStatistics()` - Fetch user growth statistics

### Social Queries
- `useGetAllPosts()` - Fetch all social posts
- `useGetUserPosts(userId)` - Fetch posts by user
- `useGetSocialStats()` - Fetch social statistics

### Market Queries
- `useGetAllListings()` - Fetch all marketplace listings
- `useGetUserListings(userId)` - Fetch listings by user
- `useGetMarketStats()` - Fetch market statistics

### Transaction Queries
- `useGetAllTransactions()` - Fetch all transactions
- `useGetUserTransactions(userId)` - Fetch user transactions
- `useGetTransactionStats()` - Fetch transaction statistics

---

## 🔧 Available Mutation Hooks

### User Mutations
- `useCreateUser()` - Create new user
- `useUpdateUser()` - Update user
- `useDeleteUser()` - Delete user
- `useBanUser()` - Ban user
- `useUnbanUser()` - Unban user

### Social Mutations
- `useDeletePost()` - Delete social post
- `useDeleteStatus()` - Delete status
- `useEndLiveStream()` - End live stream

### Market Mutations
- `useCreateListing()` - Create marketplace listing
- `useUpdateListing()` - Update listing
- `useDeleteListing()` - Delete listing
- `useBoostListing()` - Boost listing

### Verification Mutations
- `useApproveVerification()` - Approve verification
- `useRejectVerification()` - Reject verification

### Notification Mutations
- `useSendNotification()` - Send notification to specific users
- `useSendBulkNotification()` - Send bulk notification

---

## 🎯 API Routes Reference

All API routes are centralized in `src/config/apiRoutes.ts`. Access them via:

```tsx
import { API_ROUTES } from '../config/apiRoutes';

// Examples:
API_ROUTES.AUTH.LOGIN
API_ROUTES.USERS.GET_ALL
API_ROUTES.USERS.GET_BY_ID('123')
API_ROUTES.DASHBOARD.GET_STATS
API_ROUTES.SOCIAL.GET_ALL_POSTS
API_ROUTES.MARKET.GET_ALL_LISTINGS
```

---

## 🔐 Authentication

The authentication token is automatically:
1. Retrieved from `localStorage` (key: `authToken`)
2. Attached to all requests as `Authorization: Bearer <token>`
3. Removed on 401 responses (with automatic redirect to login)

**Setting the token after login:**

```tsx
const handleLogin = async (credentials) => {
  const response = await apiCall.post(API_ROUTES.AUTH.LOGIN, credentials);
  localStorage.setItem('authToken', response.data.token);
  // Redirect to dashboard
};
```

**Logging out:**

```tsx
const handleLogout = async () => {
  await apiCall.post(API_ROUTES.AUTH.LOGOUT);
  localStorage.removeItem('authToken');
  // Redirect to login
};
```

---

## 📊 Query Cache Management

TanStack Query automatically manages cache invalidation. When you use mutations, the related queries are automatically refetched.

**Manual cache invalidation:**

```tsx
import { useQueryClient } from '@tanstack/react-query';

const MyComponent = () => {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    // Invalidate specific query
    queryClient.invalidateQueries({ queryKey: ['users'] });
    
    // Invalidate all queries
    queryClient.invalidateQueries();
  };

  return <button onClick={handleRefresh}>Refresh</button>;
};
```

---

## 🛠️ Creating New Query/Mutation Hooks

### Creating a New Query Hook

```tsx
// src/utils/queries/newQueries.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export const useGetNewData = (options?: UseQueryOptions<DataType>) => {
  return useQuery<DataType>({
    queryKey: ['new-data'],
    queryFn: () => apiCall.get<DataType>(API_ROUTES.NEW.GET_ALL),
    ...options,
  });
};
```

### Creating a New Mutation Hook

```tsx
// src/utils/mutations/newMutations.ts
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiCall from '../apiCall';
import { API_ROUTES } from '../../config/apiRoutes';

export const useCreateNewData = (options?: UseMutationOptions<any, Error, PayloadType>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: PayloadType) => 
      apiCall.post(API_ROUTES.NEW.CREATE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['new-data'] });
    },
    ...options,
  });
};
```

---

## 🐛 Error Handling

Errors are automatically logged to the console. You can handle them in your components:

```tsx
const { data, error, isError } = useGetAllUsers();

if (isError) {
  return <div>Error: {error.message}</div>;
}
```

For mutations:

```tsx
const createUser = useCreateUser({
  onError: (error) => {
    // Show toast notification
    console.error('Failed to create user:', error.message);
  },
});
```

---

## 📝 Best Practices

1. **Always use query hooks** instead of direct API calls for GET requests
2. **Use mutation hooks** for POST, PUT, DELETE operations
3. **Handle loading and error states** in your components
4. **Leverage automatic cache invalidation** - mutations automatically refetch related queries
5. **Use TypeScript interfaces** for type safety
6. **Keep API routes centralized** in `apiRoutes.ts`
7. **Don't store sensitive data** in localStorage except auth tokens
8. **Use environment variables** for API base URL

---

## 🔄 Migration from Dummy Data

To migrate existing components from dummy data to real API:

1. Import the appropriate query hook
2. Replace dummy data with the hook's `data` property
3. Add loading and error states
4. Remove local state management for server data

**Before:**
```tsx
const users = usersTable; // Dummy data

return (
  <div>
    {users.map(user => <UserRow key={user.id} user={user} />)}
  </div>
);
```

**After:**
```tsx
const { data: users, isLoading, error } = useGetAllUsers();

if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error loading users</div>;

return (
  <div>
    {users?.map(user => <UserRow key={user.id} user={user} />)}
  </div>
);
```

---

## 📚 Additional Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [API Documentation](./API_DOCUMENTATION.md) - Complete backend API reference

---

## 🤝 Support

For questions or issues with the API integration:
1. Check the API documentation
2. Verify environment variables are set correctly
3. Check browser console for error messages
4. Ensure backend server is running and accessible

---

**Last Updated:** February 19, 2026
