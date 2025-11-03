import { useAppContext } from "../context/AppContext";
import { CardItems } from "../data/dashboard-card-items";

export default function Cards() {
    const { open} = useAppContext();
  
  return (
<div
  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full px-6 
    ${open ? "lg:w-[1180px] " : "lg:w-[1184px] gap-10 "}
  `}
>      {CardItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="bg-[#2E362E] text-white p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              {/* Text + Label Section */}
              <div>
                <h2 className="text-lg font-semibold text-[#00C8DC]">
                  {item.label}
                </h2>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>

              {/* Icon Section */}
              <div className="p-3 bg-[#00C8DC]/20 rounded-full flex justify-center items-center">
                <Icon className="w-8 h-8 text-[#00C8DC]"  style={{ color: item.color }} />
              </div>
            </div>

            {/* Numbers Section */}
            <div className="flex justify-between items-end mt-4">
              <div>
                <p className="text-gray-400 text-sm">Records (30 days)</p>
                <h3 className="text-xl font-bold"  style={{ color: item.color }}>{item.totalRecords}</h3>
              </div>

              <div className="text-right">
                <p className="text-gray-400 text-sm">Total Amount</p>
                <h3 className="text-xl font-bold text-[#00C8DC]"  style={{ color: item.color }}>₹{item.totalAmount}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
