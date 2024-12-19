import React from 'react';

interface GymSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (subscription: string) => void;
}

const GymSubscriptionModal: React.FC<GymSubscriptionModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [subscription, setSubscription] = React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubscription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscription) {
      onSubmit(subscription);
      onClose(); // Close the modal after submitting the subscription
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Choose Your Gym Subscription</h2>
        <form onSubmit={handleSubmit}>
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

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-700"
            >
              Submit Subscription
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="text-red-500 underline w-full text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GymSubscriptionModal;
