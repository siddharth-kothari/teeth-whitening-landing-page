import React from "react";

const AppointmentList = ({ aptData }: any) => {
  return (
    <div className="grid space-y-5 mt-5">
      {aptData &&
        aptData.map((data: any, idx: number) => (
          <div key={idx} className="border rounded-lg p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {data.appointment_date}
              </h2>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full capitalize ${
                  data.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : data.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {data.status}
              </span>
            </div>
            <p className="text-lg text-gray-600 mt-2">
              {data.appointment_time}
            </p>
          </div>
        ))}
    </div>
  );
};

export default AppointmentList;
