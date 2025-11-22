// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { account, databases, DATABASE_ID, USERS_COLLECTION_ID } from "../appwrite";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, adminOnly = false }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      try {
        const user = await account.get(); // throws if not logged in
        if(!user) {
          if(mounted) { setAllowed(false); setLoading(false); }
          return;
        }
        // Now fetch user doc from Appwrite databases collection
        // We assume we store the appwrite userId as "uid" or use $id
        const list = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
          // We will query by userId (field name 'userId') OR read by id if we saved the docId equal to user.$id
        ]);

        // attempt to find a document that matches user.$id or email
        const udoc = list.documents.find(d => d.userId === user.$id || d.email === user.email);
        const role = udoc?.role || "client";

        if (adminOnly) {
          if (role === "admin") setAllowed(true);
          else setAllowed(false);
        } else {
          setAllowed(true);
        }
      } catch (e) {
        setAllowed(false);
      } finally {
        if(mounted) setLoading(false);
      }
    }

    checkAuth();

    return () => { mounted = false; };
  }, [adminOnly]);

  if (loading) return <div>Loading...</div>;
  if (!allowed) return <Navigate to="/login" replace />;
  return children;
}
