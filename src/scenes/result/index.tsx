import React from "react";

interface ResultProps {
  nickname: string;
  email: string;
  subscription: string;
  startDate: string;
  endDate: string;
}

const Result: React.FC<ResultProps> = ({ nickname, email, subscription, startDate, endDate }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 py-6 w-96">
      <h2 className="text-2xl font-bold text-center mb-4">Subscription Successful</h2>
      <p><strong>Nickname:</strong> {nickname}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Subscription Plan:</strong> {subscription}</p>
      <p><strong>Subscription Start Date:</strong> {startDate}</p>
      <p><strong>Subscription End Date:</strong> {endDate}</p>
    </div>
  );
};

export default Result;
