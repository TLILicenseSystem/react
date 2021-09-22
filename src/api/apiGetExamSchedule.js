import apiSpring from "./apiSpring";

export const getExamScheduleByDetails = async (
    examDate,
    roundId,
    examOrganizerCode,
    provinceCode
  ) => {
    try {
      const response = await apiSpring.get(
        `examschedule/searchDetail?examDate=${examDate}&roundId=${roundId}&examOrg=${examOrganizerCode}&provinceCode=${provinceCode}`
      );
      if (response.status === 200) {
        console.log("getExamSchedule response ", response.data);
        return response;
      } else {
        return response.data;
      }
    } catch (err) {
      console.log("msg", err);
      return "error";
    }
  };
  