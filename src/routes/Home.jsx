import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../components/userContext';

export default function Home() {
  const navigate = useNavigate();
  const handleGoNotes = () => {
    navigate('/notes');
  };

  const { user } = useUserContext();
  return (
    <div className="text-center">
      <p className="mt-14 text-5xl font-medium">About me</p>
      <p className="mt-20 text-2xl">Email: {user.email}</p>
      <p className="mt-5 text-2xl">
        Date sign up: {new Date(user.date).toLocaleString().replace(',', '')}
      </p>
      <button
        className="mt-20 text-2xl bg-slate-200 pt-2 pb-2 pr-20 pl-20"
        onClick={handleGoNotes}
      >
        Go to notes
      </button>
    </div>
  );
}
