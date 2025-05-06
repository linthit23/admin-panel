import { useGetReportings } from './reportings'
import { FaUser, FaBookOpen, FaPaperPlane } from 'react-icons/fa'
import {
  FaMoneyBillTransfer,
  FaBookBookmark,
  FaBuildingUser,
} from 'react-icons/fa6'
import { TbAlarmFilled } from 'react-icons/tb'

export const Home = () => {
  const { data: reportings } = useGetReportings()

  return (
    <div className="flex justify-between items-center p-8">
      <div className="flex items-center flex-col gap-2">
        <FaUser className="text-3xl mr-2" color="#99e9ff" />
        <span className="text-sm">Total Students</span>
        <span className="text-2xl font-bold">
          {reportings?.studentsCount || 0}
        </span>
      </div>

      <div className="flex items-center flex-col gap-2">
        <FaBookOpen className="text-3xl mr-2" color="#99e9ff" />
        <span className="text-sm">Total Classes</span>
        <span className="text-2xl font-bold">
          {reportings?.classesCount || 0}
        </span>
      </div>

      <div className="flex items-center flex-col gap-2">
        <FaPaperPlane className="text-3xl mr-2" color="#99e9ff" />
        <span className="text-sm">Total Posts</span>
        <span className="text-2xl font-bold">
          {reportings?.postsCount || 0}
        </span>
      </div>

      <div className="flex items-center flex-col gap-2">
        <FaMoneyBillTransfer className="text-3xl mr-2" color="#99e9ff" />
        <span className="text-sm">Total Payments</span>
        <span className="text-2xl font-bold">
          {reportings?.paymentCount || 0}
        </span>
      </div>

      <div className="flex items-center flex-col gap-2">
        <FaBuildingUser className="text-3xl mr-2" color="#99e9ff" />
        <span className="text-sm">Total Bookings</span>
        <span className="text-2xl font-bold">
          {reportings?.bookingsCount || 0}
        </span>
      </div>

      <div className="flex items-center flex-col gap-2">
        <FaBookBookmark className="text-3xl mr-2" color="#99e9ff" />
        <span className="text-sm">Total Homeworks</span>
        <span className="text-2xl font-bold">
          {reportings?.bookingsCount || 0}
        </span>
      </div>

      <div className="flex items-center flex-col gap-2">
        <TbAlarmFilled className="text-3xl mr-2" color="#99e9ff" />
        <span className="text-sm">Total Alerts</span>
        <span className="text-2xl font-bold">
          {reportings?.alertsCount || 0}
        </span>
      </div>
    </div>
  )
}
