import React, { useState, useEffect } from "react";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore"; 
import { auth, db } from "../../../firebase"; 
import { motion } from "framer-motion"; 
import Result from "../result"; 

type SubscriptionPlan = "Basic" | "Premium" | "VIP";

interface UserData {
  nickname: string;
  email: string;
  subscription: string;
  startDate: string;
  endDate: string;
}

interface GymSubscriptionProps {
  userId: string;
  onSubmit: (subscription: string) => void;
}

const GymSubscription: React.FC<GymSubscriptionProps> = () => {
  const [subscription, setSubscription] = useState<SubscriptionPlan | "">("");
  const [subscriptionStartDate, setSubscriptionStartDate] = useState<string>("");
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<string>("");
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserData | null>(null); 

  const subscriptionDurations: Record<SubscriptionPlan, number> = {
    Basic: 1,
    Premium: 3,
    VIP: 6,
  };

  useEffect(() => {
    const fetchUserSubscription = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData?.subscription) {
            setHasSubscription(true); 
            setErrorMessage("You already have an active subscription.");
          }
        }
      }
    };

    fetchUserSubscription();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlan = e.target.value as SubscriptionPlan;
    setSubscription(selectedPlan);

    if (selectedPlan) {
      const currentDate = new Date();
      const startDate = currentDate.toISOString().split('T')[0];
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + subscriptionDurations[selectedPlan]);
      const endDateString = endDate.toISOString().split('T')[0];

      setSubscriptionStartDate(startDate);
      setSubscriptionEndDate(endDateString);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasSubscription) {
      alert(errorMessage);
      return;
    }

    const user = auth.currentUser;
    if (user && subscription) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        const subscriptionData = {
          subscription: subscription,
          startDate: subscriptionStartDate,
          endDate: subscriptionEndDate,
        };

        if (userDocSnap.exists()) {
          await updateDoc(userDocRef, subscriptionData);
          console.log("Subscription updated for user:", user.uid);
        } else {
          await setDoc(userDocRef, {
            ...subscriptionData,
            uid: user.uid,
            email: user.email,
            nickname: user.displayName || "Anonymous", 
          });
          console.log("User document created with subscription for user:", user.uid);
        }

        const userData = await getDoc(userDocRef);
        if (userData.exists()) {
          const data = userData.data();
          setUserInfo({
            nickname: data.nickname || "Anonymous",
            email: data.email || "",
            subscription: data.subscription || "",
            startDate: data.startDate || "",
            endDate: data.endDate || "",
          });
          setShowResult(true);
        }

      } catch (error) {
        console.error("Error updating or creating user document:", error);
      }
    } else {
      console.error("No user is signed in or subscription is empty");
    }
  };

  return (
    <>
      {showResult ? (
        <Result
          nickname={userInfo?.nickname || "Anonymous"}
          email={userInfo?.email || ""}
          subscription={userInfo?.subscription || ""}
          startDate={userInfo?.startDate || ""}
          endDate={userInfo?.endDate || ""}
        />
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 py-6 w-96"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-center mb-4">Choose Your Gym Subscription</h2>

          {hasSubscription ? (
            <div className="mb-4">
              <p className="text-red-500 font-bold">{errorMessage}</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Subscription Plan</label>
                <select
                  value={subscription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
                >
                  <option value="">Select a plan</option>
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              {subscription && (
                <div className="mb-4">
                  <p><strong>Subscription Start Date:</strong> {subscriptionStartDate}</p>
                  <p><strong>Subscription End Date:</strong> {subscriptionEndDate}</p>
                </div>
              )}

              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-700"
              >
                Submit Subscription
              </button>
            </>
          )}
        </motion.form>
      )}
    </>
  );
};

export default GymSubscription;
