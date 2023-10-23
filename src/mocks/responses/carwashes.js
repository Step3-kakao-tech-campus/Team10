const generateToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return `${year}-${month}-${date}`;
};

export const carwashes = {
  success: true,
  response: {
    carwash: [
      {
        carwash_id: 1,
        image:
          "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
        name: "포세이돈워시 용봉점",
        optime: {
          // 운영시간
          weekday: {
            // 평일
            start: "00:00:00",
            end: "23:59:00",
          },
          weekend: {
            // 주말
            start: "00:00:00",
            end: "23:59:00",
          },
        },
        bays: [
          {
            bay_no: "1",
            bay_bookedTime: [
              {
                start_time: `${generateToday()}T10:00`,
                end_time: `${generateToday()}T13:00`,
              },
              {
                start_time: `${generateToday()}T14:00`,
                end_time: `${generateToday()}T20:00`,
              },
              {
                start_time: `${generateToday()}T20:00`,
                end_time: `${generateToday()}T22:00`,
              },
              {
                start_time: `${generateToday()}T22:00`,
                end_time: `${generateToday()}T23:00`,
              },
            ],
          },
          {
            bay_no: "3",
            bay_bookedTime: [
              {
                start_time: `${generateToday()}T10:00`,
                end_time: `${generateToday()}T13:00`,
              },
              {
                start_time: `${generateToday()}T14:00`,
                end_time: `${generateToday()}T20:00`,
              },
              {
                start_time: `${generateToday()}T20:00`,
                end_time: `${generateToday()}T22:00`,
              },
              {
                start_time: `${generateToday()}T22:00`,
                end_time: `${generateToday()}T23:00`,
              },
            ],
          },
          {
            bay_no: "4",
            bay_bookedTime: [
              {
                start_time: `${generateToday()}T10:00`,
                end_time: `${generateToday()}T13:00`,
              },
              {
                start_time: `${generateToday()}T14:00`,
                end_time: `${generateToday()}T20:00`,
              },
              {
                start_time: `${generateToday()}T20:00`,
                end_time: `${generateToday()}T22:00`,
              },
              {
                start_time: `${generateToday()}T22:00`,
                end_time: `${generateToday()}T23:00`,
              },
            ],
          },
        ],
      },
      {
        carwash_id: 2,
        image:
          "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/1572934c-920f-4e84-a3d3-dcb4506eea13",
        name: "대성셀프세차장",
        optime: {
          // 운영시간
          weekday: {
            // 평일
            start: "00:00:00",
            end: "23:59:00",
          },
          weekend: {
            // 주말
            start: "00:00:00",
            end: "23:59:00",
          },
        },
        bays: [
          {
            bay_no: "1",
            bay_bookedTime: [
              {
                start_time: `${generateToday()}T10:00`,
                end_time: `${generateToday()}T13:00`,
              },
              {
                start_time: `${generateToday()}T14:00`,
                end_time: `${generateToday()}T20:00`,
              },
              {
                start_time: `${generateToday()}T20:00`,
                end_time: `${generateToday()}T22:00`,
              },
              {
                start_time: `${generateToday()}T22:00`,
                end_time: `${generateToday()}T23:00`,
              },
            ],
          },
          {
            bay_no: "3",
            bay_bookedTime: [
              {
                start_time: `${generateToday()}T10:00`,
                end_time: `${generateToday()}T13:00`,
              },
              {
                start_time: `${generateToday()}T14:00`,
                end_time: `${generateToday()}T20:00`,
              },
              {
                start_time: `${generateToday()}T20:00`,
                end_time: `${generateToday()}T22:00`,
              },
              {
                start_time: `${generateToday()}T22:00`,
                end_time: `${generateToday()}T23:00`,
              },
            ],
          },
          {
            bay_no: "4",
            bay_bookedTime: [
              {
                start_time: `${generateToday()}T10:00`,
                end_time: `${generateToday()}T13:00`,
              },
              {
                start_time: `${generateToday()}T14:00`,
                end_time: `${generateToday()}T20:00`,
              },
              {
                start_time: `${generateToday()}T20:00`,
                end_time: `${generateToday()}T22:00`,
              },
              {
                start_time: `${generateToday()}T22:00`,
                end_time: `${generateToday()}T23:00`,
              },
            ],
          },
        ],
      },
    ],
  },
  error: null,
};
