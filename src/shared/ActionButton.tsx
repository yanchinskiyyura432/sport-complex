import { Link } from "react-router-dom";

type Props = {
	children: React.ReactNode;
};

const ActionButton: React.FC<Props> = ({ children }) => {
	return (
		<Link
			to="/auth"
			className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-primary-700"
		>
			{children}
		</Link>
	);
};

export default ActionButton;
