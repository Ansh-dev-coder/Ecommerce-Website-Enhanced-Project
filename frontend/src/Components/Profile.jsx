import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">My Profile</h1>
        <div className="space-y-4 text-slate-700">
          <p>
            <span className="font-semibold text-slate-900">Username:</span>{' '}
            {user?.username || user?.userName || 'Guest'}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Email:</span>{' '}
            {user?.email || 'Not available'}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Member since:</span>{' '}
            {user?.createdAt || 'Not available'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
