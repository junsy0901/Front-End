import React, { useEffect, useState } from "react";
import Map from "./MapApi";
import questionIcon from "../imgs/question.png";
import order_icon from "../imgs/schedule_order_icon.svg";
import delete_icon from "../imgs/schedule_delete_icon.svg";
import FrameMap from "../imgs/FrameMap.svg";

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    fetch("/myschedule")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          // 임시 데이터 설정
          const tempSchedules = [
            {
              id: 1,
              name: "Temporary Event 1",
              startDate: "2024-08-28",
              endDate: "2024-08-29",
              days: [
                {
                  day: "Day 1",
                  places: [
                    {
                      tag: "장소",
                      name: "장소 이름",
                      address: "장소 주소",
                      thumbnail: "https://via.placeholder.com/150", // 썸네일 URL 추가
                    },
                    {
                      tag: "맛집",
                      name: "맛집 이름",
                      address: "맛집 주소",
                      thumbnail: "https://via.placeholder.com/150", // 썸네일 URL 추가
                    },
                  ],
                },
                {
                  day: "Day 2",
                  places: [
                    {
                      tag: "장소",
                      name: "장소 이름",
                      address: "장소 주소",
                      thumbnail: "https://via.placeholder.com/150", // 썸네일 URL 추가
                    },
                    {
                      tag: "맛집",
                      name: "맛집 이름",
                      address: "맛집 주소",
                      thumbnail: "https://via.placeholder.com/150", // 썸네일 URL 추가
                    },
                  ],
                },
              ],
            },
          ];
          setSchedules(tempSchedules);
          setSelectedDay(tempSchedules[0].days[0]); // 기본값 설정
        } else {
          setSchedules(data);
          setSelectedDay(data[0].days[0]); // 기본값 설정
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // 오류 발생 시 임시 데이터 설정
        const tempSchedules = [
          {
            id: 0,
            name: "서울 월드컵 공원",
            startDate: "2024-00-00",
            endDate: "2024-00-01",
            days: [
              {
                day: "Day 1",
                places: [
                  {
                    tag: "장소",
                    name: "장소 이름",
                    address: "장소 주소",
                    thumbnail: "https://via.placeholder.com/150", // 썸네일 URL 추가
                  },
                  {
                    tag: "맛집",
                    name: "맛집 이름",
                    address: "맛집 주소",
                    thumbnail: "https://via.placeholder.com/150", // 썸네일 URL 추가
                  },
                ],
              },
              {
                day: "Day 2",
                places: [
                  {
                    tag: "장소",
                    name: "장소 이름",
                    address: "장소 주소",
                    thumbnail: "https://via.placeholder.com/150", // 썸네일 URL 추가
                  },
                  {
                    tag: "맛집",
                    name: "맛집 이름",
                    address: "맛집 주소",
                    thumbnail: "https://via.placeholder.com/150", // 썸네일 URL 추가
                  },
                ],
              },
            ],
          },
        ];
        setSchedules(tempSchedules);
        setSelectedDay(tempSchedules[0].days[0]); // 기본값 설정
      });
  }, []);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex flex-col items-center justify-center h-[20vh]">
        <div className="flex items-center">
          <h1 className="text-lg font-medium">여행 스케줄 이름</h1>
          <div className="relative inline-block ml-2 group">
            <img src={questionIcon} alt="Question" className="w-4 h-4 cursor-pointer" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-2 text-sm bg-gray-700 text-white rounded hidden group-hover:block">
              STEP 4에서는 3단계의 선택을 바탕으로 짜여진 이동 동선 및 경로를 확인하실 수 있습니다.
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Enter route name"
          className="w-[30%] mt-2 p-2 border border-orange-300 rounded"
        />
      </div>

      {/* {schedules.length > 0 && (
        <div className="mb-10">
          <div className="flex">
            <div className="flex items-center justify-center text-center text-[12px] w-[80px] h-[25px] bg-main-green rounded mr-2">
              스케줄 {schedules[0].id}
            </div>
            <div className="flex items-center justify-center text-[12px]">
              {schedules[0].name}
            </div>
          </div>
          <div className="flex items-center justify-center text-center text-[12px] w-[160px] h-[25px] bg-[#FFFADD] rounded shadow-md mt-2">
            {schedules[0].startDate} ~ {schedules[0].endDate}
          </div>
        </div>
      )} */}
      <Map className="z-0 w-[50%] h-[70vh] bg-slate-200 mt-10" />
      <div className="flex flex-col items-center justify-center mt-10">
        <img
          className="z-0 w-[50%] h-[70vh] bg-slate-200"
          src={FrameMap}
          alt="Frame Map"
        />
      </div>
      <button
        className="mt-10 mb-10 m-auto flex items-center justify-center bg-main-orange font-bold text-[12px] w-[130px] h-[35px] rounded-xl"
        // onClick={createMap}
      >
        다시 생성하기
      </button>
      {schedules.length > 0 && (
        <div className="flex w-[80%] mt-4 m-auto">
          {schedules[0].days.map((day, index) => (
            <button
              key={index}
              className={`flex items-center justify-center text-center text-[12px] w-[80px] h-[40px] rounded-full m-auto ${
                selectedDay.day === day.day ? "bg-main-green" : "bg-gray-200"
              }`}
              onClick={() => handleDayClick(day)}
            >
              {day.day}
            </button>
          ))}
        </div>
      )}
      {selectedDay && (
        <div className="mt-4">
          <hr className="mt-5 mb-5" />
          <ul>
            {selectedDay.places.map((place, index) => (
              <li className="flex" key={index}>
                <div className="w-40 h-[145px] flex items-center justify-center">
                  <span className="text-center font-bold">{index + 1}</span>
                </div>
                <div>
                  <div className="flex items-center justify-center text-center text-[12px] w-[60px] h-[20px] bg-[#FBD0A5] rounded mb-5">
                    {place.tag}
                  </div>
                  <div className="flex items-center">
                    <img
                      src={place.thumbnail}
                      className="w-[125px] h-[85px] bg-slate-200"
                      alt={place.name} // alt 속성 추가
                    />
                    <div className="ml-5">
                      <div className="text-[14px]">{place.name}</div>
                      <div className="text-[14px]">{place.address}</div>
                    </div>
                  </div>
                </div>
                <div className="flex mr-20 m-auto">
                  <img className="flex items-center m-5" src={order_icon} alt="Order" />
                  <img
                    className="flex items-center m-5"
                    src={delete_icon}
                    alt="Delete"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        className="bg-black text-white text-center text-[14px] p-2 w-60 h-[40px] mt-20 mb-20 m-auto rounded-md flex items-center justify-center"
        // onClick={saveMap}
      >
        Save
      </button>
    </div>
  );
}

export default Schedule;
