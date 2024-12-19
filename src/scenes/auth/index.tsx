import React, { useState } from "react";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import GymSubscription from "../subscription"; 

const AuthForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null); 
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        setUserId(userCredential.user.uid);
        console.log("Logged in:", userCredential);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: formData.username,
          email: formData.email,
        });

        setUserId(userCredential.user.uid); 
        console.log("User registered:", userCredential);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleSubscriptionSubmit = async (subscription: string) => {
    if (userId) {
      await setDoc(doc(db, "subscriptions", userId), {
        subscriptionPlan: subscription,
      });
      setIsSubscribed(true); 
      console.log("Subscription added:", subscription);
    }
  };

  return (
    <div className="flex justify-center items-center text-black min-h-screen bg-neutral-500">
      {/* Show form only if user is not authenticated */}
      {!userId && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 py-6 w-96"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            {isLogin ? "Login" : "Register"}
          </h2>

          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-green-700"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-500 underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </form>
      )}

      {userId && !isSubscribed && (
        <GymSubscription userId={userId} onSubmit={handleSubscriptionSubmit} />
      )}

      {isSubscribed && userId && (
        <div className="bg-white shadow-md rounded px-8 py-6 w-96 mt-6">
          <h2 className="text-2xl font-bold text-center mb-4">Subscription Success</h2>
          <p className="text-center">You are successfully subscribed to the {isSubscribed} plan!</p>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
