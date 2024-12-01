import { useMemo } from 'react';

const useRoleTranslations = () => {
  const roleTranslations = useMemo(() => ({
    Student: 'دانشجو',
    Administrator: 'ادمین',
    Teacher: 'استاد',
    Writer: 'نویسنده',
    Referee: 'داور',
    'Employee.Admin': 'ادمین کارمند',
    TournamentAdmin: 'ادمین مسابقه',
    CourseAssistance: 'کمک دوره',
    'Employee.Writer': 'نویسنده کارمند',
    TournamentMentor: 'منتور',
  }), []);

  return { roleTranslations };
};

export default useRoleTranslations;
